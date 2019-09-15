<template>
  <a class="link" :class="`link-${type}`" href>{{text}}</a>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Link"
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  
  }
</style>