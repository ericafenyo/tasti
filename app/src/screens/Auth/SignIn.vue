<template>
  <section class="section-no-header background-surface">
    <div class="wrapper">
      <div class="sign-in">
        <Headline text="Login To Your Account" :level="2" class="mb-8" />
        <Alert
          :visible="options.visible"
          :type="options.type"
          :closable="options.closable"
          :message="options.message"
          @on-dismiss="showAlert({ visible: false })"
        />
        <form @submit.prevent="onSubmit" novalidate="true">
          <div class="form-item">
            <Input
              type="text"
              name="email"
              :placeholder="$t('email-placeholder')"
              :label="$t('label.email')"
              :className="[{'input-error': $v.email.$error}]"
              :value="email"
              v-model="email"
            />
          </div>
          <div class="form-item">
            <Input
              label="Password"
              type="password"
              name="password"
              :placeholder="$t('password-placeholder')"
              :hasAction="true"
              :actionText="$t('forgot-password')"
              :actionRoute="'/auth/password/request-reset'"
              :className="[{'input-error': $v.password.$error}]"
              v-model="password"
            />
          </div>
          <Button
            size="large"
            :loading="isLoading"
            :disabled="$v.$invalid"
            :block="true"
            :text="$t('login')"
          />
          <div class="mt-3 text-center">
            <span class="text-body mr-2">{{$t('no-account-create-one')}}</span>
            <Link :text="$t('sign-up')" to="/auth/sign-up" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";
import { Validate, Validations } from "vuelidate-property-decorators";
import { required } from "vuelidate/lib/validators";
import isEmpty from "lodash/isEmpty";

import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { HttpStatus } from "@/enums";
import { Actions } from "@/store/actions";
import { Result } from "@/data/Result";
import {
  NotificationOptions,
  NotificationType
} from "@/components/Notification";

@Component
export default class SignIn extends Vue {
  isLoading: boolean = false;
  options: NotificationOptions = {};

  email: string = "";
  password: string = "";

  @Validations()
  validations = {
    email: { required },
    password: { required }
  };

  @Prop({ type: String, default: "" })
  readonly notificationKey!: string;

  @Prop({ type: String, default: "" })
  readonly username!: string;

  showAlert(options: NotificationOptions = { visible: false }) {
    this.options = options;
  }

  resetForm() {
    this.email = "";
    this.password = "";
  }

  async onSubmit() {
    const { $invalid } = this.$v;
    if (!$invalid) {
      // Start with loading a state
      this.isLoading = true;
      const response: Result = await this.$store.dispatch(
        Actions.AUTHENTICATE,
        {
          username: this.email,
          password: this.password
        }
      );
      // stop the loading indicator
      this.isLoading = false;
      if (response.status === HttpStatus.CREATED) {
        // reset form inputs
        this.resetForm();
        // Redirect to the home screen
        this.$router.replace({ name: "home" });
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        // reset form inputs
        // Show alert
        this.showAlert({
          type: "error",
          message: this.$tc("http-error.invalid-credentials"),
          visible: true
        });
      } else if (response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        // reset form inputs
        // Show alert
        this.showAlert({
          type: "error",
          message: this.$tc("http-error.service-unavailable"),
          visible: true
        });
      }
    }
  }

  mounted() {
    if (this.notificationKey) {
      const notification: any = this.$t(this.notificationKey);
      this.options = {
        closable: false,
        visible: true,
        type: notification.type,
        message: notification.message
      };
    }

    if (this.username) {
      this.email = this.username;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";

.wrapper {
  height: 100%;
  @include phablet {
    height: initial;
    padding-top: 3rem;
  }
}
.sign-in {
  max-width: 420px;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 12px;
  background-color: $white;

  @include phone {
    padding: 2rem 1.5rem;
  }
  @include phablet {
    height: initial;
  }
}
</style>