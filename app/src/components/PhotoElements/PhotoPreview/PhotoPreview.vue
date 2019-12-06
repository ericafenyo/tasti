<template>
  <div class="photoPreview" :class="smallComputed">
    <img :src="imageUrl" @click="onClick" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class PhotoPreview extends Vue {
  @Prop({
    type: String,
    required: true,
    default: null,
  })
  readonly imageUrl!: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  readonly small!: boolean;

  get smallComputed() {
    return this.small ? 'small' : '';
  }

  @Emit('photoClick')
  onClick(): void {}
}
</script>

<style lang="scss" scoped>
.photoPreview {
  width: 224pt;
  height: 224pt;
  > img {
    width: 100%;
    height: 100%;
  }
}

.photoPreview.small {
  width: 64pt;
  height: 64pt;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
