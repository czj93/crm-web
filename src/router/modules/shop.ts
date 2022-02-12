import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const shopRouter = {
  path: "/shop",
  name: "shop",
  component: Layout,
  redirect: "/shop/list",
  meta: {
    icon: "home-filled",
    title: "店铺管理",
    showLink: true,
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/shop/list",
      name: "ShopList",
      component: () => import("/@/views/shop/index.vue"),
      meta: {
        title: $t("menus.hshome"),
        i18n: true,
        showLink: false
      }
    }
  ]
};

export default shopRouter;
