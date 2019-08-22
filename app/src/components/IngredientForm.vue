<template>
  <div class="edit-ingredient">
    <v-input label="Write Ingredient" value="220 CC water" />
  </div>
</template>

<script>
import Input from "./Input";
export default {
  components: {
    "v-input": Input
  }
};
</script>

<style lang="scss" scoped>
.edit-ingredient {
}
</style>