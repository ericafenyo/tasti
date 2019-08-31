<template>
  <v-modal title="Edit Ingredient">
    <edit-ingredient />
  </v-modal>
</template>

<script>
import Modal from "../components/Modal";
import IngredientForm from "../components/IngredientForm";
export default {
  components: {
    "v-modal": Modal,
    "edit-ingredient": IngredientForm
  }
};
</script>

<style lang="scss" scoped>
</style>