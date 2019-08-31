<template>
  <div class="cookbook">
    <div class="cookbook-thumbnail">
      <img
        class="image-fluid"
        src="https://images.unsplash.com/photo-1496174883999-edcc585a373f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
        alt="recipe thumbnail"
      />
    </div>
    <p class="cookbook-label">Sweets</p>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>

.cookbook {
  background: $white;
  &-thumbnail {
    position: relative;
    height: 0;
    padding-top: 66.66%;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  &-label {

  }
}
</style>