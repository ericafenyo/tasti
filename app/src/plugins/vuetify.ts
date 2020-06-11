import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#4299e1",
        surface: "#eff3f6",
        accent: "#4299e1",
      },
    },
  },
});
