<template>
  <Modal :isOpen="true" @on-positive="createRecipe">
    <div class="new-recipe">
      <fieldset>
        <div class="flex">
          <PhotoPicker
            @image-changed="setImage"
            class="flex-shrink-0"
            :style="{width: '120px', height: '120px'}"
          />
          <Input
            class="self-end ml-3 w-full"
            type="text"
            label="Recipe Name"
            :className="[{'input-error': $v.data.name.$error}]"
            name="name"
            :hasHint="true"
            @on-input="setData"
          />
        </div>
      </fieldset>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import { storage } from "firebase";
import * as path from "path";

import PhotoPicker from "@/components/PhotoElements/PhotoPicker/PhotoPicker.vue";
import { Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";
import { emit } from "cluster";
import { constants } from "../constants";
const generator = require("generate-password");
@Component({
  components: {
    PhotoPicker
  }
})
export default class CreateRecipeTemplate extends Vue {
  // Create a storage reference from firebase storage service
  storageRef = storage()
    .ref()
    .child(constants.IMAGE_STORAGE_PATH);

  data = {
    name: "",
    image: null
  };

  @Validations()
  validations = {
    data: {
      name: { required }
    }
  };

  setData({ value, name }) {
    this.data[name] = value;
  }

  setImage({ blob, filename }) {
    console.log(blob);
    this.data.image = new File([blob], filename);
  }

  async createRecipe() {
    console.log(this.storageRef);

    const { $touch, $invalid } = this.$v;
    // Force the validation of form
    $touch();

    if (!$invalid) {
      const metadata = {
        contentType: "image/jpeg"
      };

      const baseName = generator.generate({
        length: 12,
        numbers: true,
        excludeSimilarCharacters: true
      });

      const imageRef = this.storageRef
        .child(baseName+".jpg")
        .put(this.data.image, metadata)
        .then((snapshot) => {
          console.log(snapshot);
          
          this.storageRef.child(snapshot.metadata.name).getDownloadURL()
          .then(url => {
            console.log(url);
            
          })
        })
        .catch(error => {
          console.log(error);
        });
      // const response = await this.$store.dispatch("createRecipe");
    } else {
      console.log("error");

      // this.showAlert({

      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.new-recipe {
  padding: 24px;
}
</style>