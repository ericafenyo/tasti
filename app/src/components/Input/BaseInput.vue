<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop(String) readonly label: string;
  @Prop(String) readonly text: string;
  @Prop(Boolean) readonly size: boolean;
  @Prop(String) readonly icon: string;
  @Prop(String) readonly type: string;
  @Prop(String) readonly state: string;
  @Prop() readonly className: any;
  @Prop(String) readonly placeholder: string;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly value: string;
  @Prop(String) readonly disabled: boolean;
  @Prop(String) readonly focused: boolean;
  @Prop(String) readonly required: boolean;
  @Prop(String) readonly helperText: boolean;
}
</script>