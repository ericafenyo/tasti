<template>
  <div class="input-add-square" v-show="true">
    <input type="file" @change="onFileChanged" />
    <icon-add v-show="files == null" />
    <img
      id="upload-avatar"
      v-show="files !== null"
      width="100%"
      height="100%"
      :src="imageUrl"
      alt="recipe thumbnail"
    />
  </div>
</template>

<script>
import IconAdd from "../assets/icons/add.svg";
export default {
  components: {
    "icon-add": IconAdd
  },

  data() {
    return {
      files: null,
      imageUrl: ""
    };
  },

  methods: {
    onFileChanged({ target }) {
      const { files } = target;
      this.files = files[0];
      const input = target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = event => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageUrl = event.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
      this.$emit("on-change", files[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-add-square {
  @include center-content;
  margin-right: 15px;
  position: relative;
  overflow: hidden;
  width: 62px;
  height: 62px;
 
  flex-shrink: 0;
  border: 1px dashed $brown-grey;
  border-radius: 6px;

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}
</style>