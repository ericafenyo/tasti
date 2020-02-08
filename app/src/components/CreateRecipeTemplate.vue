<template>
  <Modal
    :isOpen="true"
    @on-negative="$emit('on-close')"
    @on-positive="createRecipe"
    @on-close="$emit('on-close')"
  >
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
            :className="[{'input-error': $v.name.$error}]"
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
import { Actions } from "../store/actions";
const generator = require("generate-password");
@Component({
  components: {
    PhotoPicker
  }
})
export default class CreateRecipeTemplate extends Vue {
  name = "";
  image = null;

  @Validations()
  validations = {
    name: { required }
  };

  setData({ value, name }) {
    this[name] = value;
  }

  setImage({ blob, filename }) {
    this.image = new File([blob], filename);
  }

  async createRecipe() {
    const { $touch, $invalid } = this.$v;
    // Force the validation of form
    $touch();

    if (!$invalid) {
      const metadata = {
        contentType: "image/jpeg"
      };

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      try {
        const response = await this.$store.dispatch(
          Actions.CREATE_RECIPE,
          formData
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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