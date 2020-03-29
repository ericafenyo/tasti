<template>
  <form @submit.prevent>
    <div class="flex">
      <div class="flex-1">
        <PhotoPicker aspectRatio="3:2" v-model="model.image" />
      </div>
      <div class="flex-1 ml-3">
        <div class="form-field">
          <Input label="Recipe Name" name="name" v-model="model.name" />
        </div>

        <div class="form-field">
          <Input label="Serving Time" name="serving" v-model="model.serving" />
        </div>

        <div class="form-field">
          <Input name="tags" label="Tags" v-model="model.tags" />
        </div>

        <div class="form-field">
          <Input name="facts" label="Nutrition Facts" v-model="model.facts" />
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import FormModule from "./FormModule.vue";

import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button/Button.vue";
import Icon from "@/components/Icons/Icon.vue";
import Input from "@/components/Input/Input.vue";
import { emit } from "cluster";

@Component({
  components: {
    FormModule,
    Checkbox,
    Button,
    Icon,
    Input
  }
})
export default class InfoComposite extends Vue {
  model = {
    image: null,
    name: "",
    serving: "",
    tags: "",
    facts: ""
  };

  @Watch("model", { immediate: true, deep: true })
  onInfoChanged(value) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>