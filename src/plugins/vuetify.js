import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "@/locales/pt";
import en from "@/locales/en";

Vue.use(Vuetify, {
  lang: {
    locales: { pt, en },
    current: "pt"
  }
});

export default new Vuetify({});
