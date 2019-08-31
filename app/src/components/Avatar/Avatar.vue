<template>
  <div class="avatar" :class="`avatar-${size}`" @click="$emit('on-click')">
    <div class="avatar-content">
      <img v-if="hasImage" :src="imageUrl" alt="Avatar" class="avatar-content-image" />
      <span v-if="!hasImage" class="avatar-content-text">{{initials}}</span>
    </div>
  </div>
</template>

<script>
/**
 * This is a demo docs
 */
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    initials: {
      type: String,
      default: "AZ"
    },
    size: {
      type: String,
      default: "medium"
    }
  },

  computed: {
    hasImage() {
      return this.imageUrl;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  font-family: Helvetica, Arial, sans-serif;
  width: 48px;
  height: 48px;
  position: relative;

  &-small {
    width: 2rem;
    height: 2rem;
  }

  &-medium {
    width: 3rem;
    height: 3rem;
  }

  &-large {
    width: 4rem;
    height: 4rem;
  }

  &-content {
    position: absolute;
    border-radius: 50%;
    background-color: #45515e;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &-image {
      width: 100%;
      height: 100%;
    }

    &-text {
      color: $white;
      letter-spacing: 0.063em;
    }
  }
}
</style>