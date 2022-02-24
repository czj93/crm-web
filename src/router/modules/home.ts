import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/dashboard",
  meta: {
    icon: "home-filled",
    title: $t("menus.hshome"),
    showLink: true,
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("/@/views/dashboard/index.vue"),
      meta: {
        title: $t("menus.hshome"),
        i18n: true,
        showLink: true
      }
    }
  ]
};

export default homeRouter;
