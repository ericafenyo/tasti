<template>
  <div class="flex">
    <div class="flex-1">
      <PhotoPicker :aspectRatio="1/1" v-model="model.image" />
    </div>
    <div class="flex-1 ml-3">
      <div class="form-field">
        <Input
          placeholder="What's the recipe name "
          label="Recipe Name"
          name="name"
          v-model="model.name"
        />
      </div>

      <div class="form-field">
        <Textarea
          label="Description"
          placeholder="Tell the story of your recipe"
          name="description"
          v-model="model.description"
        />
      </div>

      <div class="form-field">
        <Input
          label="Servings"
          placeholder="How many servings?"
          name="servings"
          v-model="model.servings"
        />
      </div>

      <div class="form-field">
        <Input
          name="duration"
          placeholder="How long does it take cook?"
          label="Preparation time"
          v-model="model.duration"
        />
      </div>
    </div>
  </div>
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
  onInfoChanged(value: any) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>