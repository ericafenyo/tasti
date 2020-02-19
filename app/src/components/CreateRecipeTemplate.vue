<template>
  <Modal :isOpen="true" @on-close="$emit('on-close')">
    <template #button-negative>
      <Button :text="$t('cancel')" type="secondary" @on-click="$emit('on-close')" />
    </template>
    <template #button-positive>
      <Button :loading="isLoading" :text="$t('create')" @on-click="createRecipe" />
    </template>
    <template #content>
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
    </template>
  </Modal>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import * as path from "path";

import PhotoPicker from "@/components/PhotoElements/PhotoPicker/PhotoPicker.vue";
import { Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";
import { emit } from "cluster";
import { constants } from "../constants";
import { Actions } from "../store/actions";
import { HttpStatus } from "../enums";
import { Result } from "../data/Result";
const generator = require("generate-password");
@Component({
  components: {
    PhotoPicker
  }
})
export default class CreateRecipeTemplate extends Vue {
  isLoading = false;

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
      // Start the loading indicator
      this.isLoading = true;
      const metadata = {
        contentType: "image/jpeg"
      };
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      const response: Result = await this.$store.dispatch(
        Actions.CREATE_RECIPE,
        formData
      );

      // Stop the loading indicator
      this.isLoading = false;
      switch (response.status) {
        case HttpStatus.CREATED:
          // Navigate to the recipe page
          this.$router.replace({
            name: "recipe",
            params: { id: response.data.id }
          });
          break;

        case HttpStatus.NOT_FOUND:
          break;

        case HttpStatus.SERVICE_UNAVAILABLE:
        // Notice the user about the error.
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