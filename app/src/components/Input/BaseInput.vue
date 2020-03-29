<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop({ type: String, default: "" }) id: string;
  @Prop({ type: String, default: "" }) name: string;
  @Prop({ type: String, default: "" }) value: string;
  @Prop({ type: String, default: "" }) placeholder: string;
  @Prop({ type: Boolean, default: false }) focused: boolean;
  @Prop({ type: Boolean, default: false }) disabled: boolean;
}
</script>