<template>
  <section class="background-surface">
    <div class="container">
      <div class="layer py-4">
        <div class="recipe-image-wrapper">
          <div class="mb-3">
            <Button size="small" :text="$t('action.edit')" />
          </div>
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?fit=crop&w=1436&h=1024"
            alt
          />
          <div class="mx-4">
            <div>
              <Headline text="Sautéed Orange & Mustard Bruschetta" />
              <p
                class="text-body"
              >Quick and easy way to cook turkey in the slow cooker. With only two ingredients, the only hard part is waiting.</p>
            </div>

            <div class="ingredients">
              <div>cooking spray</div>
              <div>1/2 teaspoon vanilla extract</div>
              <div>1/2 cup whole milk</div>
              <div>2 large eggs1 tablespoon maple syrup</div>
              <div>1 pinch salt</div>
              <div>4 pieces 1/2-inch thick pieces brioche</div>
              <div>2 teaspoons dried basil</div>
            </div>

            <div class="direction my-6">
              <div>Heat a Belgian waffle iron.</div>
              <div>Mix the flour, sugar, and baking powder together in a mixing bowl. Stir in 1 cup eggnog, butter, and the egg until well blended. Add more eggnog if needed to make a pourable batter.</div>
              <div>Lightly grease or spray the waffle iron with non-stick cooking spray. Pour some batter onto the preheated waffle iron, close the top, and cook until golden brown and crisp on both sides. Waffles are usually cooked with steam subsides. Transfer waffles to a serving plate, and keep warm.</div>
              <div>Meanwhile, place the raspberry preserves in a pan, and heat over medium heat until pourable.</div>
              <div>To serve, drizzle raspberry preserves over each waffle, and top with raspberries. If desired, add a dollop of whipped cream to each waffle.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Overlay :centerVertical="false" :centerHorizontal="false" :isOpen="true" :translucent="true">
      <CreateRecipe class="my-8" />
    </Overlay>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Actions } from "../../store/actions";
import { Result } from "../../data/Result";
import CreateRecipe from "../../screens/Recipe/Create.vue";
import { HttpStatus } from "../../enums";

@Component({ components: { CreateRecipe } })
export default class Recipe extends Vue {
  isLoading: boolean = false;
  recipeId = "";

  @Prop({ type: String, default: "" })
  id!: string;

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
    switch (response.status) {
      case HttpStatus.OK:
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.container {
  width: 900px;
}

.overlay {
  background-color: $color-surface;
}

.recipe-image-wrapper {
  margin: 0 24px;
  background-color: #fff;
  padding: 12px;
}

.ingredients {
  div {
    position: relative;
    padding-left: 16px;
    margin: 16px 0;
  }
  div::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
    background-color: #989898;
  }
}

.direction {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 4px;
    border-radius: 2px;
    background-color: #a5affb;
    left: 8px;
    height: 100%;
  }
  div {
    position: relative;
    padding-left: 32px;
    margin: 32px 0;
  }
  div::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: 1;
    background-color: #6979f8;
  }
}
</style>