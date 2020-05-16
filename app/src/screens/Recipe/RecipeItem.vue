<template>
<div class="recipe-item">
    <div>
        <div>
            <Avatar/>
            <span>Ana Smith</span>
        </div>
        <div class="aspect-ratio">
            <img src="" alt="">
        </div>
        <div>
            <h3>Buckweat noodles</h3>
            <p>Sooo easy to make and double or triple needed if needed. Serve as the main meal with a salad and crusty bread, or as a side dish.</p>

        </div>
    </div>

</div>
  
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
export default class RecipeItem extends Vue{

}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";


</style>
