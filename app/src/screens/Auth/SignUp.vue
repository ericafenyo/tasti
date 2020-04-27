<template>
  <section class="section-no-header background-surface">
    <div class="wrapper">
      <div class="register">
        <Headline class="mb-8" :text="$t('let-us-create-your-account')" :level="2" />
        <Alert
          :message="alertOptions.message"
          :type="alertOptions.type"
          :visible="alertOptions.visible"
          :style="{marginTop: '1rem'}"
          @on-dismiss="showAlert({ visible: false })"
        />
        <form @submit.prevent class="form" novalidate="true">
          <div class="form-column">
            <div class="form-item">
              <Input
                type="text"
                name="first-name"
                required="true"
                placeholder="John"
                :label="$t('label.first-name')"
                v-model="formData.firstName"
                :className="[{'input-error': $v.formData.firstName.$error}]"
              />
            </div>

            <div class="form-item">
              <Input
                type="text"
                name="last-name"
                required="true"
                placeholder="Doe"
                :label="$t('label.last-name')"
                v-model="formData.lastName"
                :className="[{'input-error': $v.formData.lastName.$error}]"
              />
            </div>
          </div>

          <div class="form-item">
            <Input
              type="text"
              name="email"
              :label="$t('label.email')"
              v-model="formData.email"
              :placeholder="$t('email-placeholder')"
              :className="[{'input-error': $v.formData.email.$error}]"
            />
          </div>
          <div class="form-item">
            <Input
              type="password"
              name="password"
              :label="$t('label.password')"
              v-model="formData.password"
              :placeholder="$t('password-placeholder')"
              :className="[{'input-error': $v.formData.password.$error}]"
            />
          </div>

          <div class="form-item">
            <div class="privacy-agreement">
              <Checkbox>
                <span class="text-body">{{$t('accept')}}</span>
                <Link :text="$t('terms-and-conditions')" />
              </Checkbox>
            </div>
          </div>
          <Button
            size="large"
            :loading="isLoading"
            :disabled="$v.$invalid"
            :text="$t('create-account')"
            @click.native="onSubmit"
          />
          <div class="mt-3 text-center">
            <span class="text-body mr-2">{{$t('no-account-create-one')}}</span>
            <Link :text="$t('login')" to="/auth/sign-in" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Validations } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";
import camelCase from "lodash/camelCase";
import { HttpStatus } from "../../enums";

import Checkbox from "@/components/Checkbox.vue";

import { Result, Status } from "../../data/Result";
import { Actions } from "../../store/actions";
import {
  NotificationOptions,
  Notification,
  NotificationType
} from "../../components/Notification";

@Component({ components: { Checkbox } })
export default class SignUp extends Vue {
  isLoading: boolean = false;
  alertOptions: NotificationOptions = {};

  formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  @Validations()
  validations = {
    formData: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  };

  showAlert(options: NotificationOptions = { visible: false }) {
    this.alertOptions = options;
  }

  resetForm() {
    this.formData.firstName = "";
    this.formData.lastName = "";
    this.formData.email = "";
    this.formData.password = "";
  }

  async onSubmit() {
    const { $invalid } = this.$v;
    // Force the validation of form
    if (!$invalid) {
      // Begin with a loading state
      this.isLoading = true;
      const response: Result = await this.$store.dispatch(
        Actions.CREATE_USER,
        this.formData
      );

      // stop the loading indicator
      this.isLoading = false;
      switch (response.status) {
        case HttpStatus.CREATED:
          // Clear all form fields
          this.resetForm();

          // Redirects to the login page
          this.$router.replace({
            name: "sign-in",
            params: {
              username: response.data.email,
              notificationKey: "sign-up-success"
            }
          });
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          // Notice the user about the error.
          this.showAlert({
            type: "error",
            visible: true,
            message: this.$tc("http-error.service-unavailable")
          });
          break;

        case HttpStatus.CONFLICT:
          // Notice the user about the error.
          this.showAlert({
            type: "error",
            visible: true,
            message: this.$tc("http-error.duplicate-email")
          });
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.wrapper {
  height: 100%;
  @include phablet {
    padding-top: 3rem;
    height: initial;
  }
}

.register {
  max-width: 420px;
  height: 100%;
  margin: 0 auto;
  border-radius: 12px;
  background-color: $white;
  padding: 2rem 1rem;

  @include phone {
    padding: 2rem 1.5rem;
  }
  @include phablet {
    height: initial;
  }
}

@include phablet {
  background-color: $color-surface;
  padding-top: 4rem;
}

.account-notice {
  line-height: 48px;
  text-align: center;
  margin: 0 auto;
  max-width: 560px;
  font-size: 1.125rem;
  color: $color-primary-text;
  margin-top: 16px;

  @include laptop {
    margin: 24px auto;
  }

  .link {
    margin: 0 8px;
  }
}

.button {
  width: 100%;
  margin-top: 1rem;
}
</style>
