<template>
  <div class="edit-profile">
    <Composite title="Edit Profile">
      <div class="form-field">
        <Input label="Full Name" value="Nick Evans" />
      </div>

      <div class="form-field">
        <Textarea label="Bio" placeholder="Bio" value="Nick Evans" />
      </div>

      <div class="form-field">
        <Input label="Name" value="Nick Evans" />
      </div>
      <div class="form-field">
        <Button size="small" text="Update profile"/>
      </div>
    </Composite>

    <Composite class="mt-4" title="Change Password">
      <div class="form-field">
        <Input label="Old password" value="Nick Evans" />
      </div>

      <div class="form-field">
        <Input label="New password" value="Nick Evans" />
      </div>

      <div class="form-field">
        <Input label="Confirm new password" value="Nick Evans" />
      </div>

      <div class="form-field">
        <ButtonGroup>
          <Button text="Update password" size="small" />
          <Link text="I forgot my password" />
        </ButtonGroup>
      </div>
    </Composite>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from "vue-property-decorator";

@Component
export default class EditProfile extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/scss/_resources.scss";
</style>