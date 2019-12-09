<template>
  <FormModule title="Additional Info">
    <div class="flex -mx-2 mt-2">
      <div class="form-field w-full px-2">
        <Input @on-input="onInput" name="serving" label="Serving Time" />
      </div>

      <div class="form-field w-full px-2">
        <Input @on-input="onInput" name="tags" label="Tags" />
      </div>
    </div>
    <div class="form-field">
      <Input @on-input="onInput" name="facts" label="Nutrition Facts" />
    </div>
  </FormModule>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import autosize from "autosize";

import FormModule from "./FormModule.vue";

import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button/Button.vue";
import Icon from "@/components/Icons/Icon.vue";
import Input from "@/components/Input/Input.vue";

@Component({
  components: {
    FormModule,
    Checkbox,
    Button,
    Icon,
    Input
  }
})
export default class RecipeInfoFormModule extends Vue {
  info: { [key: string]: string } = {
    serving: "",
    tags: "",
    facts: ""
  };

  onInput({ value, name }) {
    this.info[name] = value;
    this.$emit("on-input", { name: "info", value: this.info });
  }

  @Watch("info")
  onInfoChanged(value) {
    console.log(this.info);
    
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>