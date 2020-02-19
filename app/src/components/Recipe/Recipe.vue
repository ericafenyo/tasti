<template>
  <div>Recipe</div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Actions } from "../../store/actions";
import { Result } from "../../data/Result";
import { HttpStatus } from "../../enums";

@Component
export default class Recipe extends Vue {
  isLoading: boolean = false;
  recipeId = "";

  @Prop({ type: String, default: "" })
  id: string;

  created() {
    if (this.id) {
      this.recipeId = this.id;
    }
  }

  async mounted() {
    this.isLoading = true;
    const response: Result = await this.$store.dispatch(
      Actions.GET_RECIPE,
      this.recipeId
    );

    console.log(response);
    

    this.isLoading = false;
    switch(response.status){
        case HttpStatus.SUCCESS:
            
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>