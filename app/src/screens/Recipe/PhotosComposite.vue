<template>
  <div class="recipe-photos">
    <div class="recipe-photos-item" v-for="(item, index) in numberOfPhotos" :key="index">
      <PhotoPicker v-model="data[index]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class PhotosComposite extends Vue {
  numberOfPhotos = 4;
  data = [];

  @Watch("data", { immediate: true, deep: true })
  onInfoChanged(value: any) {
    this.$emit("input", this.data);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.recipe-photos {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;

  &-item {
    padding: 8px;
    width: 50%;
  }
}
</style>
