<template>
  <form @submit.prevent>
    <div class="recipe-photos">
      <div class="recipe-photos-item" v-for="(item, index) in numberOfPhotos" :key="index">
        <PhotoPicker :aspectRatio="aspectRatio" v-model="data[index]" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import autosize from "autosize";

@Component
export default class PhotosComposite extends Vue {
  aspectRatio = "3:2";
  numberOfPhotos = 4;
  data = [];

  @Watch("data", { immediate: true, deep: true })
  onInfoChanged(value) {
    this.$emit("input", this.data);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.recipe-photos {
  display: flex;
  flex-wrap: wrap;

  &-item {
    padding: 8px;
    width: 50%;
  }
}
</style>
