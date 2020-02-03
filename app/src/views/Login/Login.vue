<template>
  <section class="section-no-header background-surface">
    <div class="login card-module">
      <div class="container">
        <Headline text="Login To Your Account" :level="3" class="mb-5" />
        <Alert
          :visible="alertVisible"
          :type="alertType"
          :message="alertMessage"
          @on-dismiss="showAlert({ visible: false })"
        />
        <portal to="notification-outlet">
          <Notice :visible="true" />
        </portal>
        <form ref="loginForm" @submit.prevent="onSubmit" novalidate="true">
          <div class="form-item">
            <Input
              label="Email Address"
              type="text"
              name="email"
              :className="[{'input-error': $v.email.$error}]"
              placeholder="name@example.com"
              :value="email"
              @on-input="onInput"
            />
          </div>
          <div class="form-item">
            <Input
              label="Password"
              type="password"
              name="password"
              :value="password"
              :className="[{'input-error': $v.password.$error}]"
              placeholder="Enter 8 or more characters"
              @on-input="onInput"
            />
          </div>
          <Button :disabled="$v.$invalid" size="large" text="Login" />
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";

import Headline from "@/components/Headline/Headline.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { HttpStatus, AlertKeys } from "../../enums";
import { Actions } from "../../store/actions";
import { Result } from "../../data/Result";
import {
  AlertOptions,
  AlertType
} from "../../components/Notification/Alert.vue";

@Component({
  components: {
    Headline,
    Input,
    Button
  }
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";

  alertVisible = false;
  alertMessage = "";
  alertType = "";

  showAlert(options?: AlertOptions) {
    if (options) {
      this.alertType = options.type;
      this.alertMessage = options.message;
      this.alertVisible = options.visible;
    }
  }

  resetForm() {
    this.email = "";
    this.password = "";
  }

  @Validations()
  validations = {
    email: { required },
    password: { required }
  };

  async onSubmit(event) {
    const { $invalid } = this.$v;
    console.log(event);

    if (!$invalid) {
      const response: Result = await this.$store.dispatch(
        Actions.AUTHENTICATE,
        {
          username: this.email,
          password: this.password
        }
      );

      if (response.status === HttpStatus.CREATED) {
        // Show success notification
        // Redirect to the home screen
        // this.$router.replace("/");
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        // reset form inputs
        this.resetForm();

        // Show alert
        const alertObject: any = this.$t(AlertKeys.INVALID_CREDENTIALS);
        this.showAlert({
          type: alertObject.type,
          message: alertObject.message,
          visible: true
        });
      }
    }
  }

  onInput({ value, name }) {
    this[name] = value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
.login {
  max-width: 432px;
  margin: 0 auto;
  background-color: $white;
  padding: 2rem 0;
  height: 100%;

  @include phablet {
    height: initial;
    padding: 2rem 1rem;
    margin-top: 3rem;
    border: 1px solid $color-border;
    border-radius: 6px;
  }

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>