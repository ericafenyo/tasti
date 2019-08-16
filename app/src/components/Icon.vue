<template>
  <div class="icon">
    <component :is="Input"></component>
  </div>
</template>

<script>
import IconAdd from "../asserts/icons/add.svg";
import Input from "./Input";
export default {
  components: {
    IconAdd,
    Input
  }
};
</script>