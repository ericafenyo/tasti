<template>
  <section class="section-no-header background-surface">
    <div class="reset-password">
      <Headline :text="$t('enter-new-password')" :level="2" />
      <Alert
        :visible="true"
        :closable="false"
        :style="{marginTop: '1rem'}"
        :message="$t('enter-8-chars-password')"
        type="info"
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { Result } from "../../data/Result";
import { Actions } from "../../store/actions";
import { HttpStatus } from "../../enums";
import isEmpty from "lodash/isEmpty";

@Component
export default class ResetPassword extends Vue {
  isLoading = false;

  password = "";
  confirmPassword = "";

  @Validations()
  validations = {
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs("password") }
  };

  resetForm() {
    this.password = "";
    this.confirmPassword = "";
  }

  onInput({ value, name }) {
    this[name] = value;
  }

  async onSubmit() {
    //Show successful sign up
    const { $invalid } = this.$v;
    // Force the validation of form
    if (!$invalid) {
      // Begin with a loading state
      this.isLoading = true;
      const requestModel = {
        request: {
          password: this.password,
          confirmPassword: this.confirmPassword
        },
        token: this.$route.query.token,
        email: this.$route.query.email
      };

      const response: Result = await this.$store.dispatch(
        Actions.RESET_PASSWORD,
        requestModel
      );

      // stop the loading indicator
      this.isLoading = false;
      switch (response.status) {
        case HttpStatus.CREATED:
          // Clear all form fields
          this.resetForm();
          // Redirect to the login page with a message
          this.$router.replace({
            name: "sign-in",
            params: {
              notificationKey: "password-reset-success"
            }
          });
          break;

        case HttpStatus.UNAUTHORIZED:
          this.$router.replace({
            name: "sign-in",
            params: {
              notificationKey: "request-password-reset-expired"
            }
          });
          break;

        case HttpStatus.BAD_REQUEST:
          //TODO
          break;

        default:
          break;
      }
    }
  }

  // TODO: Replace with router meta
  created() {
    if (isEmpty(this.$route.query)) {
      this.$router.replace({ name: "sign-in" });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.reset-password {
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem 0rem;

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>