<template>
  <div class="fluid">
    <Overlay :isOpen="showImageCropper">
      <ImageCropper
        :imageUrl="imagePickedFromFileSystemUrl"
        class="cropper"
        @crop-confirmed="handleCropConfirmation"
      />
    </Overlay>

    <div
      class="image-frame fluid"
      :class="disabled ? 'disabled-frame' : ''"
      @click="handleEmptyFrameClick"
    >
      <template v-if="selectedImageUrl">
        <div class="delete-button" @click.stop="handleDeletePhotoClick">
          <Icon name="delete"/>
        </div>
        <img :src="selectedImageUrl" class="fluid" />
      </template>
      <template v-else>
        <Icon name="add" width="32px" height="32px" />
        <div class="mt-2">Upload</div>
      </template>
    </div>
    <input
      ref="inputFile"
      type="file"
      class="input-file"
      name="uploadFieldName"
      accept="image/*"
      @change="handleFileSelection($event.target.files[0])"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import Icon from "@/components/Icons/Icon.vue";
import Overlay from "@/components/Overlay/Overlay.vue";
import ImageCropper from "@/components/PhotoElements/PhotoPicker/ImageCropper.vue";

@Component({
  components: {
    Icon,
    ImageCropper,
    Overlay
  }
})
export default class PhotoPicker extends Vue {
  @Prop({
    type: String,
    required: false,
    default: null
  })
  readonly imageUrl!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  readonly disabled!: boolean;

  croppie;

  selectedImageUrl: string | null = null;

  imagePickedFromFileSystemUrl: string | null = null;

  showImageCropper: boolean = false;

  @Watch("imageUrl", { immediate: true })
  handleImageUrlChange() {
    this.imagePickedFromFileSystemUrl = null;
    this.selectedImageUrl = this.imageUrl;
  }

  handleEmptyFrameClick() {
    if (!this.disabled) {
      (this.$refs.inputFile as HTMLElement).click();
    }
  }

  handleDeletePhotoClick() {
    this.selectedImageUrl = null;
    this.handleImageChange();
  }

  handleFileSelection(file) {
    if (file) {
      const urlCreator = window.URL || (window as any).webkitURL;
      this.imagePickedFromFileSystemUrl = urlCreator.createObjectURL(file);
      this.showImageCropper = true;
    }
    (this.$refs.inputFile as HTMLInputElement).value = "";
  }

  handleCropConfirmation(imageUrl) {
    this.imagePickedFromFileSystemUrl = null;
    this.selectedImageUrl = imageUrl;
    this.showImageCropper = false;
    this.handleImageChange();
  }

  handleImageChange() {
    this.$emit("image-changed", this.selectedImageUrl);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.cropper {
  flex: 1 1 auto;
}

.image-frame {
  text-align: center;
  font-weight: 500;
  color: #4a5568;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color-surface;
  border-radius: 4px;
  padding: 4px;
  border: 1px dashed #a0aec0;
  cursor: pointer;
}
.disabled-frame {
  opacity: 0.3;
}

.input-file {
  display: none;
}

.delete-button {
  position: absolute;
  top: 4px;
  right: 4px;
}
.image {
  width: 100%;
  height: 100%;
}
</style>
