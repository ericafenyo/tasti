<template>
  <div class="create-recipe pt-24">
    <div class="container">
      <Headline text="Create New Recipe" :level="3" class="mb-4" />
      <form @submit.prevent="onSubmit">
        <div class="form-item">
          <div>
            <div>
              <input type="file" />
            </div>
            <div>
              <input type="text" placeholder />
            </div>
          </div>
        </div>

        <!-- <div class="form-item">
            <div class="card">
                <div class="card-section-header">
                    <span></span>
                    <span>icon</span>
                </div>
                <div class="section-card-body">
                    <div>
                        item
                    </div>
                    <div>
                        icon plus
                        <p>upload  more</p>
                    </div>
                </div>
            </div>
          
        </div> -->
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

import Headline from "@/components/Headline/Headline.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
// import Upload from "../components/Upload.vue";

@Component({
  components: {
    Headline,
    Input,
    Button
  }
})
export default class CreateRecipe extends Vue {
  onSubmit() {}
  onInput() {}
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.create-recipe {
  height: 100%;
  background-color: $color-surface;
}
</style>