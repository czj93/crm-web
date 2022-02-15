import Layout from "/@/layout/index.vue";

const goodsRouter = {
  path: "/goods",
  name: "GoodsType",
  component: Layout,
  redirect: "/goods/list",
  meta: {
    icon: "home-filled",
    title: "商品管理",
    showLink: true,
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/goods/list",
      name: "GoodsList",
      component: () => import("/@/views/goods/index.vue"),
      meta: {
        title: "商品管理",
        i18n: true,
        showLink: true
      }
    }
  ]
};

export default goodsRouter;
