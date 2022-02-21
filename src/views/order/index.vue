<template>
  <div>
    <ListQuery
      ref="listQuery"
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
      <el-table-column prop="orderNo" label="订单编号" />
      <el-table-column prop="shop.shopName" label="店铺" />
      <el-table-column prop="customer" label="顾客" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="orderTime" label="下单时间" min-width="120" />
      <el-table-column prop="createdAt" label="创建时间" min-width="120" />
      <el-table-column prop="updatedAt" label="更新时间" min-width="120" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="text" @click="editHandler(scope.row)">
            编辑
          </el-button>
          <!-- <el-popconfirm title="确认删除?" @confirm="removeHandler(scope.row)">
            <template #reference>
              <el-button type="text" color="!text-red-500">删除</el-button>
            </template>
          </el-popconfirm> -->
        </template>
      </el-table-column>
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
    <Form v-model:visible="visible" :id="currentId" @submited="getList" />
  </div>
</template>
<script setup lang="ts">
import Form from "./components/Form.vue";
import { onMounted, ref, watchEffect, reactive } from "vue";

import { list as fetchList } from "./api";
const queryOptions = [
  {
    label: "订单编号",
    prop: "orderNo",
    type: "el-input",
    attrs: {
      placeholder: "请输入"
    }
  }
];

const query = reactive({
  page: 1,
  pageSize: 10,
  orderNo: ""
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

const editHandler = function (row) {
  visible.value = true;
  currentId.value = row.id;
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
