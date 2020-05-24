<template>
  <ul class="stepper" :class="compFullscreen">
    <li v-for="(item, key) in maxStep" :key="key" :class="{ active: currentStep >= key }" class="stepper-step" @click="changeStep(key)"></li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Stepper extends Vue {
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  readonly currentStep!: number;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  readonly maxStep!: number;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  readonly fullscreen!: boolean;

  @Emit('stepperChanged')
  changeStep(): void {}

  get compFullscreen() {
    return this.fullscreen ? 'stepper-fullscreen' : '';
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.stepper {
  list-style: none;
  display: flex;
  justify-content: space-between;

  &-fullscreen {
    .stepper-step {
      &:before {
        background-color: grey;
      }
    }
  }

  &-step {
    border-bottom: solid 2px grey;
    flex: 2;
    margin-top: 1em;
    position: relative;
    z-index: 1;

    &:before {
      content: '';
      width: 24px;
      height: 24px;
      border: solid 2px grey;
      background-color: var(--white);
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 2;
    }

    &:hover {
      &:before {
        border: solid 2px $blue;
        background-color: $blue;
      }
    }

    &.active:before {
      background-color: $blue;
      border-color: $blue;
    }

    &.active:hover {
      &:before {
        background-color: $blue;
      }
    }

    &.active:after {
      content: '';
      width: 97%;
      border-bottom: solid 2px $blue;
      z-index: 1;
      position: absolute;
      transform: translateX(-50%);
    }

    &:first-of-type {
      flex: 1;

      &.active:after {
        content: '';
        width: 100%;
        border-bottom: solid 2px grey;
        z-index: 1;
        position: absolute;
        transform: translateX(0);
      }

      &:before {
        left: 0;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
    }

    &:last-of-type {
      flex: 1;

      &.active:after {
        content: '';
        width: 195%;
        border-bottom: solid 2px $blue;
        z-index: 1;
        position: absolute;
        transform: translateX(-50%);
      }

      &:before {
        left: initial;
        right: 0 !important;
        transform: translate(50%, -50%);
        z-index: 2;
      }
    }
  }
}
</style>
