<template>
  <FormModule title="How To Cook">
    <div>
      <div
        v-for="(direction, index) in directions"
        :key="index"
        class="editable-item editable mb-1"
      >
        <div class="flex">
          <div class="editable-item-checkbox mr-3">
            <Checkbox />
          </div>
          <div class="flex-1">
            <div class="editable-item-content">
              <p>{{direction}}</p>
            </div>
          </div>
        </div>
        <div @click.prevent="removeItem(index)" class="editable-item-actions">
          <Icon name="delete" />
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div :class="{'hidden': (editorEnabled)}">
        <div class="add-item" @click.prevent="enableEditor()">
          <Icon class="mr-2" name="add" />
          <span>Add Direction</span>
        </div>
      </div>
      <div :class="{'hidden': (!editorEnabled)}">
        <textarea @keyup.enter="saveItem()" v-model="direction" class="editor mb-2"></textarea>
        <!-- <div class="editor-controls">
          <Button class="mr-2" @on-click="saveItem()" text="Save" size="small" />
          <Button @on-click="enableEditor(false)" text="Cancel" size="small" type="text" />
        </div>-->
      </div>
    </div>
  </FormModule>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import autosize from "autosize";

import FormModule from "./FormModule.vue";

import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button/Button.vue";
import Icon from "@/components/Icons/Icon.vue";

@Component({
  components: {
    FormModule,
    Checkbox,
    Button,
    Icon
  }
})
export default class DirectionComposite extends Vue {
  direction: string = "";
  directions: string[] = ["Okra"];

  editorEnabled: boolean = false;

  saveItem() {
    const { direction } = this;

    if (!direction) {
      return;
    }

    this.directions.push(direction);
    this.direction = "";
  }

  removeItem(index: number) {
    this.directions.splice(index, 1);
  }

  enableEditor(enable: boolean = true) {
    this.direction = "";
    this.editorEnabled = enable;
  }

  @Watch("directions", { immediate: true })
  onDirectionChanged(value: string[]) {
    this.$emit("input", value);
  }

  mounted() {
    autosize(document.querySelectorAll("textarea"));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.editable-item {
  position: relative;
  padding: 8px 4px;
  border-radius: 2px;

  &-actions {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0;
    top: 50%;

    transform: translateY(-50%);
  }

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);

    .editable-item-actions {
      display: block;
    }
  }
}

.editable {
  cursor: pointer;
}

.editor {
  width: 100%;
  resize: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
}

.add-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  color: #4a5568;
  font-weight: 400;
  font-size: 14px;
  padding: 8px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
}
</style>