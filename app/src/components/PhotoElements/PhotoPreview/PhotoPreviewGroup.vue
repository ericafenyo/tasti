<template>
  <div class="photo-preview-group">
    <div>
      <PhotoPreview :imageUrl="mainImageUrl" @photoClick="openSlideShow(0)" />
    </div>
    <div class="photo-preview-group-others">
      <PhotoPreview v-for="(url, index) in imageUrlList" :key="index" :imageUrl="url" small @photoClick="openSlideShow(index + 1)" />
    </div>
    <GlobalPopup v-if="showSlideShow" @onClose="closePopup">
      <div class="photo-preview-group-slideshow">
        <img :src="allImages[imageToDisplay]" />
        <div class="photo-preview-group-slideshow-left-arrow" @click="previousSlide" />
        <div class="photo-preview-group-slideshow-right-arrow" @click="nextSlide" />
      </div>
    </GlobalPopup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import GlobalPopup from '@transway/nsc-popup-global-popup/GlobalPopup.vue';
import PhotoPreview from './PhotoPreview.vue';

@Component({ components: { PhotoPreview, GlobalPopup } })
export default class PhotoPreviewGroup extends Vue {
  @Prop({
    type: String,
    required: true,
    default: null,
  })
  readonly mainImageUrl!: string;

  @Prop({
    type: Array,
    required: false,
    default: [],
  })
  readonly imageUrlList!: Array<string>;

  showSlideShow: boolean = false;

  imageToDisplay: number = 0;

  get allImages(): Array<String> {
    return [this.mainImageUrl, ...this.imageUrlList];
  }

  openSlideShow(slide: number) {
    this.showSlideShow = true;
    this.imageToDisplay = slide;
  }

  closePopup() {
    this.showSlideShow = false;
  }

  previousSlide() {
    if (this.imageToDisplay <= 0) {
      this.imageToDisplay = this.allImages.length - 1;
    } else {
      this.imageToDisplay = this.imageToDisplay - 1;
    }
  }

  nextSlide() {
    if (this.imageToDisplay >= this.allImages.length - 1) {
      this.imageToDisplay = 0;
    } else {
      this.imageToDisplay = this.imageToDisplay + 1;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@transway/nsc-globalstyle/_variables.scss';

.photo-preview-group {
  width: 224pt;
  display: flex;
  flex-direction: column;

  &-others {
    padding-top: 8pt;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    > div {
      width: 64pt;
      margin-right: 16pt;
      margin-bottom: 8pt;
      justify-content: center;
    }
    > div:nth-child(3n) {
      margin-right: 0;
    }
  }

  &-slideshow {
    width: 75vh;
    height: 75vh;

    &-left-arrow {
      position: absolute;
      @include triangle(left, var(--white), 1em);
      left: 1em;
      top: 50%;
      cursor: pointer;
    }

    &-right-arrow {
      position: absolute;
      @include triangle(right, var(--white), 1em);
      right: 1em;
      top: 50%;
      cursor: pointer;
    }

    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
