<script>
export default {
  props: {
    level: {
      type: [Number, String]
    }
  },
  render: function(createElement) {
    return createElement(`h${this.level}`, this.$slots.default);
  }
};
</script>