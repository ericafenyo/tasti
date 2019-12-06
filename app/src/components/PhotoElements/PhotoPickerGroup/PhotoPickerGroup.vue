<template>
  <div class="container">
    <div class="photo-container">
      <div v-for="index in number" :key="index" class="photo-and-label">
        <PhotoPicker
          class="photo-picker"
          :imageUrl="internalImageUrls[index - 1]"
          @imageChanged="handleImageChange($event, index - 1)"
          :disabled="index > numberOfImageSelected"
        />
        <div>Photo {{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Watch, Prop } from 'vue-property-decorator';
import PhotoPicker from '@transway/nsc-photo-picker/PhotoPicker.vue';

@Component({ components: { PhotoPicker } })
export default class PhotoPickerGroup extends Vue {
  @Prop({ type: Number, required: false, default: 1 })
  readonly number!: number;

  @Prop({ type: Array, required: false, default: [] })
  readonly imageUrls!: Array<string | null>;

  internalImageUrls: Array<string | null> = [];

  get numberOfImageSelected() {
    return this.internalImageUrls.filter(url => url).length + 1;
  }
  @Watch('imageUrls', { immediate: true })
  onPhotoUrlsPropUpdate() {
    this.internalImageUrls = Array.from(this.imageUrls);
  }

  handleImageChange(imageUrl: string | null, index) {
    this.$set(this.internalImageUrls, index, imageUrl);
    const compactedUrls = this.internalImageUrls.filter(url => url);
    for (let i = 0; i < this.number; i++) {
      compactedUrls[i] = compactedUrls[i] ? compactedUrls[i] : '';
    }
    this.internalImageUrls = compactedUrls;
    this.$emit('imageChanged', this.internalImageUrls);
  }
}
</script>

<style lang="scss" scoped>
@import '@transway/nsc-globalstyle/_variables.scss';
.photo-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .photo-and-label {
    @include paragraphe();
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .photo-picker:not(:last-child) {
      margin-right: 8px;
    }
    .photo-picker {
      margin-bottom: 8px;
    }
  }
}
</style>
