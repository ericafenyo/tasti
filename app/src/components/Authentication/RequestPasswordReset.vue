<template>
  <section class="section-no-header background-surface">
    <div class="request-reset card-module">
      <Headline :text="$t('forgot-your-password')" :level="2" />
      <p class="text-body mt-2 mb-8">{{$t('request-password-reset')}}</p>
      <form @submit.prevent="onSubmit" novalidate="true">
        <div class="form-item">
          <Input
            label="Email Address"
            type="text"
            name="email"
            placeholder="name@example.com"
            :value="email"
            @on-input="onInput"
          />
        </div>
        <Button
          :loading="isLoading"
          :disabled="$v.$invalid"
          size="large"
          :text="$t('action.reset-password')"
        />
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";

@Component
export default class RequestPasswordReset extends Vue {
  email = "";
  isLoading = false;

  resetForm() {
    this.email = "";
  }

  onInput({ value, name }) {
    this[name] = value;
  }

  @Validations()
  validations = {
    email: { required, email }
  };

  onSubmit() {}
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.request-reset {
  max-width: 460px;
  margin: 0 auto;
  background-color: $white;
  padding: 1.5rem 1rem;
}
</style>