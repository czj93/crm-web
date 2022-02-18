<template>
  <div>
    <ListQuery
      ref="listQuery"
      :hasCreate="false"
      :list="queryOptions"
      @query="queryHandler"
      @create="createHandler"
    />
    <el-divider class="!mt-12px !mb-12px"></el-divider>
    <el-table
      v-loading="loading"
      class="mt-8px"
      :data="list"
      row-key="id"
      stripe
    >
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="goodsCode" label="商品编码" />
      <el-table-column prop="goodsName" label="商品名称" />
      <el-table-column prop="shopId" label="店铺" />
      <el-table-column prop="number" label="数量" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
    </el-table>
    <div class="text-right mt-8px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="query.page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect, reactive } from "vue";

import { list as fetchList } from "./api";
const queryOptions = [
  {
    label: "商品",
    prop: "goodsName",
    type: "el-input",
    attrs: {
      placeholder: "请输入"
    }
  }
];

const query = reactive({
  page: 1,
  pageSize: 10,
  shopId: null
});

const loading = ref(false);
const currentId = ref(null);
const total = ref(0);
const visible = ref(false);
const listQuery = ref("listQuery");
const list = ref([]);

onMounted(() => {
  getList();
});

const queryHandler = function (params) {
  Object.assign(query, params);
  getList();
};

const createHandler = function () {
  visible.value = true;
};

const getList = function () {
  loading.value = true;
  fetchList(query)
    .then(res => {
      const { data, pagination } = res.result;
      list.value = data;
      total.value = pagination.total;
      query.page = pagination.current;
    })
    .finally(() => {
      loading.value = false;
    });
};

const pageChange = function (current) {
  query.page = current;
  getList();
};

watchEffect(() => {
  if (!visible.value) currentId.value = null;
});
</script>
