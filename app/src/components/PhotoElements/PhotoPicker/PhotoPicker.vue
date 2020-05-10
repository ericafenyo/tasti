<template>
  <vue-aspect-ratio :ar="aspectRatio">
    <Overlay :isOpen="showImageCropper">
      <ImageCropper
        :imageUrl="imagePickedFromFileSystemUrl"
        :aspectRatio="aspectRatio"
        class="cropper"
        @crop-confirmed="handleCropConfirmation"
      />
    </Overlay>

    <div
      class="image-frame"
      :class="{'disabled': ('disabled-frame'), 'image-frame-border-solid' : selectedImageUrl, 'image-frame-border-dashed' : !selectedImageUrl}"
      @click="handleEmptyFrameClick"
    >
      <template v-if="selectedImageUrl">
        <div class="delete-button" @click.stop="handleDeletePhotoClick">
          <Icon name="close" size="18" />
        </div>
        <img :src="selectedImageUrl" class="fluid" />
      </template>
      <template v-else>
        <span class="add-icon">
          <Icon color="#6286ED" name="add" width="32px" height="32px" />
        </span>
        <div class="label-text">Choose files to upload</div>
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
  </vue-aspect-ratio>
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

  @Prop({ type: String, default: "1:1" })
  aspectRatio: string;

  croppie;

  selectedImageUrl: string | null = null;
  selectedImageBlob: Blob | null = null;
  selectedFile: File | null = null;

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
    this.selectedImageBlob = null;
    this.handleImageChange();
  }

  handleFileSelection(file) {
    if (file) {
      const urlCreator = window.URL || (window as any).webkitURL;
      this.imagePickedFromFileSystemUrl = urlCreator.createObjectURL(file);
      this.selectedFile = file;
      this.showImageCropper = true;
    }
    (this.$refs.inputFile as HTMLInputElement).value = "";
  }

  handleCropConfirmation({ url, blob }) {
    this.imagePickedFromFileSystemUrl = null;
    this.selectedImageUrl = url;
    this.selectedImageBlob = blob;
    this.showImageCropper = false;
    this.handleImageChange();
  }

  handleImageChange() {
    this.$emit("input", this.selectedImageBlob);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.cropper {
  flex: 1 1 auto;
}

.image-frame {
  font-weight: 500;
  background-color: rgba($color-surface, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  text-align: center;
  color: #4a5568;
  border-radius: 4px;
  width: 100%;
  height: 100%;

  &-border-dashed {
    border: 2px dashed rgba(143, 146, 161, 0.2);
  }

  &-border-solid {
    border: 1px solid $color-border;
  }

  &:focus,
  &:active {
    border-color: $color-accent;
  }

  &:hover {
    border-color: #bfbfbf;
    .delete-button {
      display: flex;
    }
  }
}
.disabled-frame {
  opacity: 0.3;
}

.input-file {
  display: none;
}

.delete-button {
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  display: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
}

.image {
  width: 100%;
  height: 100%;
}

.add-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 18.9px;
  background-color: rgba($color-accent, 0.1);
}

.label-text {
  font-family: $poppins;
  display: inline-block;
  font-size: 12px;
  margin-top: 1rem;
  color: #8f92a1;
}
</style>
