<template>
  <section class="section-no-header background-surface">
    <div class="reset-password card-module">
      <Headline :text="$t('enter-new-password')" :level="2" />
      <Alert
        class="mt-3"
        :visible="true"
        :closable="false"
        type="info"
        :message="$t('enter-8-chars-password')"
      />
      <form ref="loginForm" @submit.prevent="onSubmit" novalidate="true">
        <div class="form-item">
          <Input :label="$t('label.password')" type="password" name="password" @on-input="onInput" />
        </div>
        <div class="form-item">
          <Input
            :label="$t('label.confirm-password')"
            :value="confirmPassword"
            type="password"
            name="confirmPassword"
            @on-input="onInput"
          />
        </div>
        <Button
          :loading="isLoading"
          :disabled="$v.$invalid"
          :text="$t('action.set-new-password')"
          size="large"
        />
      </form>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, sameAs } from "vuelidate/lib/validators";
import { Result } from "../../data/Result";
import { Actions } from "../../store/actions";

@Component
export default class ResetPassword extends Vue {
  password = "";
  confirmPassword = "";

  isLoading = false;

  resetForm() {
    this.password = "";
    this.confirmPassword = "";
  }

  onInput({ value, name }) {
    this[name] = value;
  }

  @Validations()
  validations = {
    password: { required },
    confirmPassword: { required }
  };

  async onSubmit() {
    //Show successful sign up
    const { $invalid } = this.$v;
    // Force the validation of form
    if (!$invalid) {
      // Begin with a loading state
      // this.isLoading = true;
      const requestModel = {
        request: {
          password: this.password,
          confirmPassword: this.confirmPassword
        },
        token: this.$route.query.token
      };

      console.log(this.$route);

      const response: Result = await this.$store.dispatch(
        Actions.PASSWORD_RESET,
        requestModel
      );

      console.log(response);
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.reset-password {
  max-width: 460px;
  margin: 0 auto;
  background-color: $white;
  padding: 1.5rem 1rem;
}
</style>