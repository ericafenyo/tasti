<template>
<div>
  <button class="ui-input">
      <input
        @input="handleInput"
        v-model="value"
        type="text"
        id="input-text"
        class="ui-input-input"
      />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: ""
  }),

  components: {

  },

  methods: {
    handleInput: function(event) {
      console.log(" zegrg");
    }
  }
};
</script>

