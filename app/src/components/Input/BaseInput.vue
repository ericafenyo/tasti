<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop({ type: String, default: "" })
  readonly id!: string;
  @Prop({ type: String, default: "" })
  readonly name!: string;
  @Prop({ type: String, default: "" })
  readonly value!: string;
  @Prop({ type: String, default: "" })
  readonly placeholder!: string;
  @Prop({ type: Boolean, default: false })
  readonly focused!: boolean;
  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean;
}
</script>