<template>
  <div class="cropper">
    <div ref="image" />
    <Button text="Crop" :loading="isCropping" @on-click="handleCropConfirm" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
const Croppie = require("croppie");

require("croppie/croppie.css");

@Component
export default class ImageCropper extends Vue {
  isCropping = false;
  cropper: any;

  @Prop({ type: String, default: "" })
  readonly imageUrl!: string;

  @Prop({ type: String, default: "1/1" })
  readonly aspectRatio!: string;

  get computeViewPortSize() {
    if (this.aspectRatio == "1/1") {
      return { width: 300, height: 200 };
    }

    const [width, height] = this.aspectRatio.split("/");
    return { width: 100 * Number(width), height: 100 * Number(height) };
  }

  mounted() {
    this.cropper = new Croppie(this.$refs.image, {
      viewport: this.computeViewPortSize,
      boundary: { width: 480, height: 480 },
      showZoomer: true,
      enableOrientation: false
    });
    this.bindToChanges();
  }

  async handleCropConfirm() {
    if (this.cropper) {
      this.isCropping = true;
      const urlCreator = window.URL || (window as any).webkitURL;
      const blob = await this.cropper.result({
        type: "blob",
        size: "original"
      });
      const url = urlCreator.createObjectURL(blob);
      this.isCropping = false;
      return this.$emit("crop-confirmed", { url, blob });
    }
  }

  @Watch("imageUrl")
  handlePhotoUrlChange() {
    this.bindToChanges();
  }

  private bindToChanges() {
    if (this.imageUrl && this.cropper) {
      this.cropper.bind({
        url: this.imageUrl
      });
    }
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
