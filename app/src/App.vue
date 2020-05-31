<template>
  <v-app>
    <router-view />
    <portal-target name="notification-outlet"></portal-target>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>