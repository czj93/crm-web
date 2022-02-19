import Layout from "/@/layout/index.vue";

const orderRouter = {
  path: "/order",
  name: "order",
  component: Layout,
  redirect: "/order/list",
  meta: {
    icon: "home-filled",
    title: "订单管理",
    showLink: true,
    rank: 0
  },
  children: [
    {
      path: "/order/list",
      name: "OrderList",
      component: () => import("/@/views/order/index.vue"),
      meta: {
        title: "订单列表",
        showLink: false
      }
    }
  ]
};

export default orderRouter;
