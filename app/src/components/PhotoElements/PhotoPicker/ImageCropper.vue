<template>
  <div class="cropper">
    <div ref="image" />
    <Button text="Crop" @on-click="handleCropConfirm"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import Button from '../../Button/Button.vue'
import Croppie from 'croppie';

require('croppie/croppie.css');

@Component({components:{ Button }})
export default class ImageCropper extends Vue {
  @Prop({
    type: String,
    required: false,
    default: null,
  })
  readonly imageUrl!: string;

  croppie;

  mounted() {
    this.croppie = new Croppie(this.$refs.image, {
      viewport: { width: 168, height: 168 },
      boundary: { width: 480, height: 480 },
      showZoomer: true,
      enableOrientation: false,
    });
    if (this.imageUrl) {
      this.croppie.bind({
        url: this.imageUrl,
      });
    }
  }

  async handleCropConfirm() {
    const imageBlob = await this.croppie.result('blob');
    const urlCreator = window.URL || (window as any).webkitURL;
    return this.$emit('crop-confirmed', urlCreator.createObjectURL(imageBlob));
  }

  @Watch('imageUrl')
  handlePhotoUrlChange() {
    this.croppie.bind({
      url: this.imageUrl,
    });
  }
}
</script>

<style lang="scss" scoped>
.cropper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
