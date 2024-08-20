import { createStore } from "vuex";
import apps from "./modules/apps";

export default createStore({
  modules: {
    apps,
  },
});
