<template>
  <div class="register">
    <div class="register-form">
        <Headline text="Create a Free Account" :level="3" />
      <Notice
        :title="notificationOptions.title"
        placement="top-right"
        :message="notificationOptions.message"
        :type="notificationOptions.type"
        :visible="noticeVisible"
        @onDismiss="showNotice(false)"
      />

      <Alert
        placement="top-right"
        :message="notificationOptions.message"
        type="error"
        :visible="alertVisible"
        @onDismiss="showAlert(false)"
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
              :className="[{'input-error': $v.formData.firstName.$error}]"
              placeholder="John"
              @on-input="onInput"
            />
          </div>

          <div class="form-item">
            <Input
              label="Last Name"
              type="text"
              name="last-name"
              required="true"
              :className="[{'input-error': $v.formData.lastName.$error}]"
              placeholder="Doe"
              @on-input="onInput"
            />
          </div>
        </div>

        <div class="form-item">
          <Input
            label="Email Address"
            type="text"
            name="email"
            :className="[{'input-error': $v.formData.email.$error}]"
            placeholder="name@example.com"
            @on-input="onInput"
          />
        </div>
        <div class="form-item">
          <Input
            label="Password"
            type="password"
            name="password"
            :className="[{'input-error': $v.formData.password.$error}]"
            placeholder="Enter 8 or more characters"
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
        <Button text="Create Account" type="primary" v-stream:click="register$" />
      </form>
    </div>
    <div class="container">
      <div class="account-notice">
        <span>Already have an account?</span>
        <Link to="/login" text="Sign in" />
      </div>
    </div>
  </div>
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
import { AlertOptions } from "../../components/Notification/Alert.vue";
import { Observable, Subject, interval, from } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import { Result, Status } from "../../data/Result";

@Component({
  components: {
    Headline,
    Input,
    Checkbox
  }
})
export default class Register extends Vue {
  alertVisible = false;
  noticeVisible = false;
  notificationOptions = {};

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

  async onSubmit() {
    const { $touch, $invalid } = this.$v;
    // Force the validation of form
    $touch();

    // if (!$invalid) {
    //   try {
    const response = (await this.$store.dispatch(
      "createUser",
      this.formData
    )) as Observable<Result>;

    const subscription = response.subscribe({
      next: result => {
        switch (result.status) {
          case Status.Loading:
            console.log("Loading");
            break;
          case Status.Success:
            console.log(result.data);
            break;

          case Status.Error:
            console.log(result.data);
            break;

          default:
            console.log("unknown");
            break;
        }
      },

      complete: () => {
        console.log("completed");
      }
    });

    // if (response.status === HttpStatus.CREATED) {
    //   this.showNotice();
    //   this.$router.replace("/login");
    // }

    // const errorResponse: HttpErrorResponse = error;

    // this.notificationOptions = {
    //   message: errorResponse.message,
    //   title: "Error"
    // };

    // this.showAlert();
    // setTimeout(() => {
    //   this.showAlert(false);
    // }, 10000);

    // console.error("There was an error while signing up");
  }

  onInput({ value, name }) {
    this.formData[camelCase(name)] = value;
  }

  showAlert(bool = true) {
    this.alertVisible = bool;
  }

  showNotice(bool = true) {
    this.noticeVisible = bool;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.register {
  height: 100vh;
  .register-form {
    max-width: 460px;
    margin: 0 auto;
    background-color: $white;
    padding: 1.5rem 1rem;

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
}

@media screen and (max-width: 578px) {
  .register- {
    margin: 0 !important;
  }
}
</style>
