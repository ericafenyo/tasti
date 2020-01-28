<template>
  <div class="cropper">
    <div ref="image" />
    <Button text="Crop" @on-click="handleCropConfirm" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import Button from "../../Button/Button.vue";
import Croppie from "croppie";

require("croppie/croppie.css");

@Component({ components: { Button } })
export default class ImageCropper extends Vue {
  @Prop({
    type: String,
    required: false,
    default: null
  })
  readonly imageUrl!: string;

  croppie;

  mounted() {
    this.croppie = new Croppie(this.$refs.image, {
      viewport: { width: 160, height: 120 },
      boundary: { width: 480, height: 480 },
      showZoomer: true,
      enableOrientation: false
    });
    if (this.imageUrl) {
      this.croppie.bind({
        url: this.imageUrl
      });
    }
  }

  async handleCropConfirm() {
    const urlCreator = window.URL || (window as any).webkitURL;
    const blob = await this.croppie.result({ type: "blob", size: "original" });
    const url = urlCreator.createObjectURL(blob);
    console.log(this.imageUrl);

    return this.$emit("crop-confirmed", { url, blob });
  }

  @Watch("imageUrl")
  handlePhotoUrlChange() {
    this.croppie.bind({
      url: this.imageUrl
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
