<template>
  <div class="directions">
    <ol class="directions--list">
      <li
        ref="directions"
        v-for="(direction, index) in directions"
        :key="index"
        class="directions--list-item"
      >
        <div class="flex">
          <div class="directions--list-item-bullet">
            <span>{{index + 1}}</span>
          </div>
          <div class="directions--list-item-content">
            <textarea
              ref="textarea"
              placeholder="Describe your steps..."
              v-model="directions[index]"
              class="directions--list-item-text"
              name
              id
              rows="2"
            />
            <div @click.prevent="removeItem(index)" class="directions--list-item-actions">
              <Icon class="directions--list-item-actions-delete" name="close" />
            </div>
          </div>
        </div>
      </li>
    </ol>
    <div class="mt-3"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component, Watch } from "vue-property-decorator";
import autosize from "autosize";

import FormModule from "./FormModule.vue";

import Checkbox from "@/components/Checkbox.vue";
import Icon from "@/components/Icons/Icon.vue";

@Component({
  components: {
    FormModule,
    Checkbox,
    Icon
  }
})
export default class DirectionComposite extends Vue {
  $refs!: {
    textarea: HTMLTextAreaElement;
    directions: HTMLTextAreaElement[];
  };

  directions: string[] = [""];

  removeItem(index: number) {
    this.directions.splice(index, 1);
  }

  addDirectionPlaceholder() {
    this.directions.push("");
    this.$nextTick(() => {});
  }

  @Watch("directions", { immediate: true })
  onDirectionChanged(value: string[]) {
    this.$emit("input", value);
    this.$nextTick(() => {
      autosize(this.$refs.textarea);
    });
  }

  mounted() {
    autosize(this.$refs.textarea);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.directions {
  &--list-item {
    border-radius: 2px;
    margin-bottom: 1rem;
    // position: relative;

    &-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &:hover {
      .directions--list-item-text {
        background-color: rgba($color-surface, 0.5);
      }
      .directions--list-item-actions {
        opacity: 1;
        pointer-events: auto;
      }
    }

    &-bullet {
      width: 24px;
      height: 24px;
      font-size: 0.75rem;
      font-weight: 600;
      margin: 0.75rem 0;
      margin-right: 0.5rem;
      background-color: var(--white);
      border: 2px solid rgba(black, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: rgba(black, 0.5);
    }

    &-text {
      border: none;
      padding: 1rem;
      line-height: 1.5;
      text-align: justify;
      hyphens: auto;
      background-color: transparent;
      width: 100%;
      margin-right: 1rem;
    }

    &-actions {
      align-items: center;
      color: #8f92a1;
      opacity: 0;
      pointer-events: none;

      &-delete {
        padding: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>