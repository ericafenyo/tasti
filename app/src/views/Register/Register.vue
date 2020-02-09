<template>
  <section class="section-no-header background-surface">
    <div class="register">
      <Headline text="Create a Free Account" :level="3" />
      <Alert
        :message="alertOptions.message"
        :type="alertOptions.type"
        :visible="alertOptions.visible"
        @on-dismiss="showAlert({ visible: false })"
        class="mt-6"
      />
      <form @submit.prevent class="form" novalidate="true">
        <div class="form-column">
          <div class="form-item">
            <Input
              label="First Name"
              type="text"
              name="first-name"
              required="true"
              placeholder="John"
              :value="formData.firstName"
              :className="[{'input-error': $v.formData.firstName.$error}]"
              @on-input="onInput"
            />
          </div>

          <div class="form-item">
            <Input
              label="Last Name"
              type="text"
              name="last-name"
              required="true"
              placeholder="Doe"
              :value="formData.lastName"
              :className="[{'input-error': $v.formData.lastName.$error}]"
              @on-input="onInput"
            />
          </div>
        </div>

        <div class="form-item">
          <Input
            label="Email Address"
            type="text"
            name="email"
            placeholder="name@example.com"
            :value="formData.email"
            :className="[{'input-error': $v.formData.email.$error}]"
            @on-input="onInput"
          />
        </div>
        <div class="form-item">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter 8 or more characters"
            :value="formData.password"
            :className="[{'input-error': $v.formData.password.$error}]"
            @on-input="onInput"
          />
        </div>

        <div class="form-item">
          <div class="privacy-agreement">
            <Checkbox>
              Accept
              <a href="#">Terms and Conditions</a>
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
          <Link :text="$t('login')" to="/login" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required, email, minLength } from "vuelidate/lib/validators";
import camelCase from "lodash/camelCase";
import { HttpStatus } from "../../enums";
import { HttpErrorResponse } from "../../types";

import Headline from "@/components/Headline/Headline.vue";
import Input from "@/components/Input/Input.vue";
import Checkbox from "@/components/Checkbox.vue";
import { Observable, Subject, interval, from } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import { Result, Status } from "../../data/Result";
import { Actions } from "../../store/actions";
import {
  NotificationOptions,
  Notification,
  NotificationType
} from "../../components/Notification";

@Component({
  components: {
    Headline,
    Input,
    Checkbox
  }
})
export default class Register extends Vue {
  alertVisible = false;
  isLoading = false;

  noticeOptions: NotificationOptions = {};
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
    //Show successful sign up
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
            path: "/login",
            query: { username: response.data.email }
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

  onInput({ value, name }) {
    this.formData[camelCase(name)] = value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.register {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  max-width: 432px;
  margin: 0 auto;
  background-color: $white;
  padding: 2rem 1.5rem;
  border-radius: 6px;
  margin-top: 3rem;

  //   @include phablet {
  //   height: initial;
  //   margin-top: 3rem;
  //   border: 1px solid $color-border;
  //   border-radius: 12px;
  // }

  form {
    margin-top: 24px;
  }

  // @include laptop {
  //   padding: 2rem 1rem;
  //   border: 1px solid $color-border;
  // }
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
