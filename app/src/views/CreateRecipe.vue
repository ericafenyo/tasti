<template>
  <section class="create-recipe pt-24">
    <div class="form-frame">
      <form @submit.prevent="onSubmit">
        <div class="form-module">
          <div class="container">
            <fieldset>
              <div class="flex">
                <PhotoPicker class="flex-shrink-0" :style="{width: '100px', height: '100px'}" />
                <Input
                  class="self-end ml-3 w-full"
                  type="text"
                  label="Recipe Name"
                  :hasHint="false"
                />
              </div>
            </fieldset>
          </div>
        </div>

        <!-- <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Gallery</legend>
              <div class="form-field"></div>
            </fieldset>
          </div>
        </div>-->

        <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Ingredients</legend>

              <div class="add-item">
                <Icon color="red" class="mr-2" name="add" />
                <span>Add Ingredient</span>
              </div>
              <div class="editable-item hidden">
                <div class="flex">
                  <div class="editable-item-checkbox mr-3">
                    <Checkbox />
                  </div>
                  <div class="flex-1">
                    <div class="editable-item-content hidden">
                      <p editable="true">{{textData}}</p>
                    </div>
                    <div>
                      <textarea class="editor mb-2" v-model="textData"></textarea>
                      <div class="editor-controls">
                        <Button text="Save" size="small" />
                        <Button text="Cancel" size="small" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="actions"></div>
              </div>
            </fieldset>
          </div>
        </div>
        <!-- <div class="form-module">
          <div class="container">
            <fieldset class="form-module-title">
              <legend class="header-2">How to Cook</legend>
              <div class="form-field"></div>
            </fieldset>
          </div>
        </div>
        <div class="form-module">
          <div class="container">
            <fieldset>
              <legend class="header-2">Additional Info</legend>
              <div></div>
            </fieldset>
          </div>
        </div>-->
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

import Headline from "@/components/Headline/Headline.vue";
import PhotoPicker from "../components/PhotoElements/PhotoPicker/PhotoPicker.vue";
import Input from "@/components/Input/Input.vue";
import Checkbox from "../components/Checkbox.vue";
import autosize from "autosize";
import Button from "@/components/Button/Button.vue";
import Icon from "../components/Icons/Icon.vue";
// import Upload from "../components/Upload.vue";

@Component({
  components: {
    Headline,
    PhotoPicker,
    Input,
    Checkbox,
    Button,
    Icon
  }
})
export default class CreateRecipe extends Vue {
  textData = "Text";
  onSubmit() {}
  onInput() {}

  mounted() {
    autosize(document.querySelectorAll("textarea"));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.create-recipe {
  height: 100%;
  width: 100%;
  background-color: $color-surface;
}

.editable {
  cursor: text;
}

.editor {
  background: rgba(9, 30, 66, 0.04);
  border-color: rgba(9, 30, 66, 0.13);
  box-shadow: inset 0 0 0 1px rgba(9, 30, 66, 0.13);
  margin-bottom: 4px;
  width: 100%;
  resize: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
}

.add-item{
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  border: 1px dashed #a0aec0;
  color: #4a5568;
  font-weight: 500;
  padding: 8px ;
  &:hover{
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
  }
}
</style>