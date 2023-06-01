import './assets/index.css'
import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "./components/LoginPage.vue";
import dashboard from "./dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "dashboard",
      path: "/dashboard",
      component: dashboard,
      meta: {
        needsAuth: true,
      },
    },

    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/:notFound(.*)",
      redirect: "/login",
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    next("/login");
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);

app.mount("#app");
export default router;
