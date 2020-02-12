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
          :text="$t('action.reset-password')"
          class="w-full"
          size="large"
        />

        <div class="mt-3 text-center">
          <span class="text-body mr-2">{{$t('just-remembered')}}</span>
          <Link :text="$t('login')" to="/auth/sign-in" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { Result } from "../../data/Result";
import { Actions } from "../../store/actions";
import { HttpStatus } from "../../enums";

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

  async onSubmit(event) {
    const { $invalid } = this.$v;
    if (!$invalid) {
      this.isLoading = true;
      const response: Result = await this.$store.dispatch(
        Actions.REQUEST_PASSWORD_RESET,
        this.email
      );

      if (
        response.status == HttpStatus.CREATED ||
        response.status == HttpStatus.NOT_FOUND
      ) {
        // Redirect to the login page with a message
        this.$router.replace('/auth/sign-in')
      }

      // stop the loading indicator
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.request-reset {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  max-width: 432px;
  margin: 0 auto;
  background-color: $white;
  padding: 1.5rem;
}
</style>