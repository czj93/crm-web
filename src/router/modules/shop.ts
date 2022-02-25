import Layout from "/@/layout/index.vue";

const shopRouter = {
  path: "/shop",
  name: "shop",
  component: Layout,
  redirect: "/shop/list",
  meta: {
    icon: "shop",
    title: "店铺管理",
    showLink: true,
    rank: 0
  },
  children: [
    {
      path: "/shop/list",
      name: "ShopList",
      component: () => import("/@/views/shop/index.vue"),
      meta: {
        title: "店铺列表",
        showLink: false
      }
    }
  ]
};

export default shopRouter;
