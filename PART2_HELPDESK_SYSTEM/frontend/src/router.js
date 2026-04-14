import Vue from "vue";
import Router from "vue-router";
import Responses from "./views/Responses.vue";
import New from "./views/New.vue";
import Edit from "./views/Edit.vue";
import Quiz from "./views/Quiz.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Responses },
    { path: "/new", component: New },
    { path: "/edit/:id", component: Edit },
    { path: "/quiz", component: Quiz },
  ],
});
