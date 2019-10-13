import Vue from "vue";

// Vee-validate
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// import en from 'vee-validate/dist/locale/en.json';

// Styles
import "../src/scss/index.scss";
import "./scss/normalize.css";
import "./scss/bootstrap-grid.css";

import App from "./App.vue";
import { store } from "./store";

//loop over all rules
// for (let rule in rules) {
// 	extend(rule, {
// 		// ...rules[rule], // add the rule
// 		// message: en.messages[rule] // add its message
// 	});
// }

// Custom  vee-validate rule
// extend('checkbox', {
// 	validate: (value) => value
// });

// // Register Component globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: h => h(App),
  store
}).$mount("#app");
