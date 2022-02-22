<template>
  <el-dialog
    width="800px"
    :title="title"
    :modelValue="props.visible"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="80px"
      ref="formRef"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="订单编号" prop="orderNo">
            <el-input
              v-model="form.orderNo"
              :disabled="!!form.id"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺" prop="shopId">
            <el-select
              v-model="form.shopId"
              remote
              clearable
              filterable
              :disabled="!!form.id"
              :loading="loadingShop"
              :remote-method="fetchShopList"
            >
              <el-option
                v-for="shop in shops"
                :key="shop.id"
                :value="shop.id"
                :label="shop.shopName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="顾客" prop="customer">
            <el-input
              v-model="form.customer"
              :disabled="!!form.id"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下单时间" prop="orderTime">
            <el-date-picker
              v-model="form.orderTime"
              type="datetime"
              placeholder="请选择"
              :disabled="!!form.id"
              value-format="YYYY-MM-DD hh:mm:ss"
              format="YYYY-MM-DD hh:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              :rows="2"
              :disabled="!!form.id"
              type="textarea"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table class="table-form" :data="form.goodsList" style="width: 100%">
        <el-table-column label="商品" width="180">
          <template #default="scope">
            <el-form-item
              :rules="rules.goodsCode"
              :inline-message="true"
              :prop="`goodsList[${scope.$index}].goodsCode`"
            >
              <el-select
                v-model="form.goodsList[scope.$index].goodsCode"
                remote
                clearable
                filterable
                :disabled="!!form.id"
                :loading="loadingGoods"
                :remote-method="fetchGoodsList"
              >
                <el-option
                  v-for="goodsItem in goods"
                  :key="goodsItem.id"
                  :value="goodsItem.goodsCode"
                  :label="goodsItem.goodsName"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template #default="scope">
            <el-form-item
              :rules="rules.number"
              :inline-message="true"
              :prop="`goodsList[${scope.$index}].number`"
            >
              <el-input
                placeholder="请输入数量"
                :disabled="!!form.id"
                v-model.number="form.goodsList[scope.$index].number"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="销售单价" width="180">
          <template #default="scope">
            <el-form-item
              :rules="rules.unitPrice"
              :inline-message="true"
              :prop="`goodsList[${scope.$index}].unitPrice`"
            >
              <el-input
                placeholder="请输入销售单价"
                :disabled="!!form.id"
                v-model.number="form.goodsList[scope.$index].unitPrice"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="!form.id"
              type="text"
              @click="addHandler(scope.$index)"
            >
              添加
            </el-button>
            <el-button
              v-if="!form.id"
              type="text"
              @click="delHandler(scope.$index)"
            >
              删除
            </el-button>
            <el-button v-if="!!form.id" type="text"> 退货/退款 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { debounce } from "lodash-es";
import type { ElForm } from "element-plus";
import { reactive, ref, toRaw, watchEffect } from "vue";

import { update, create, detail } from "../api";
import { list as shopList } from "/@/views/shop/api";
import { list as goodsList } from "/@/views/goods/api";
import { OrderGoods } from "../types";
// TODO：商品删除
type FormInstance = InstanceType<typeof ElForm>;

interface PropsType {
  id?: number;
  visible: boolean;
}
const emit = defineEmits(["update:visible", "submited"]);
const props = withDefaults(defineProps<PropsType>(), { visible: false });

const formRef = ref<FormInstance>();
const form = reactive({
  id: null,
  shopId: null,
  orderNo: "",
  remark: "",
  orderTime: "",
  customer: "",
  goodsList: []
});

const rules = reactive({
  goodsCode: [{ required: true, message: "此项必填" }],
  orderTime: [{ required: true, message: "此项必填" }],
  number: [{ required: true, message: "此项必填" }],
  unitPrice: [{ required: true, message: "此项必填" }]
});

function createOrderGoods(): OrderGoods {
  return {
    goodsCode: "",
    number: null,
    unitPrice: null,
    purchasePrice: null
  };
}

const modeuleName = "店铺";
const title = ref("新增" + modeuleName);

const loading = ref(false);

const handleClose = function (done) {
  formRef.value.resetFields();
  emit("update:visible", false);
  done();
};

const close = function () {
  emit("update:visible", false);
  formRef.value.resetFields();
};

const addHandler = function (index) {
  form.goodsList.splice(index + 1, 0, createOrderGoods());
};

const delHandler = function (index) {
  form.goodsList.splice(index, 1);
};

const submit = function () {
  formRef.value.validate(valid => {
    if (valid) {
      loading.value = true;
      const data = toRaw(form);
      if (props.id) {
        update(props.id, data)
          .then(submitCallback)
          .finally(() => {
            loading.value = false;
          });
      } else {
        create(data)
          .then(submitCallback)
          .finally(() => {
            loading.value = false;
          });
      }
    }
  });
};

const submitCallback = function () {
  close();
  emit("submited");
};

watchEffect(() => {
  if (props.visible) {
    fetchShopList("");
    fetchGoodsList("");
    if (!props.id && !form.goodsList.length) {
      form.goodsList.push(createOrderGoods());
    }
  } else {
    form.id = null;
    form.goodsList = [];
  }
  if (props.visible && props.id) {
    detail(props.id).then(res => {
      Object.assign(form, res.result);
    });
    title.value = `编辑${modeuleName}`;
  } else {
    title.value = `新增${modeuleName}`;
  }
});

const shops = ref([]);
const loadingShop = ref(false);
const fetchShopList = debounce(shopName => {
  loadingShop.value = true;
  shopList({
    page: 1,
    pageSize: 10,
    shopName
  }).then(res => {
    const { data } = res.result;
    shops.value = data;
    loadingShop.value = false;
  });
}, 300);

const goods = ref([]);
const loadingGoods = ref(false);
const fetchGoodsList = debounce(goodsName => {
  loadingGoods.value = true;
  goodsList({
    page: 1,
    pageSize: 10,
    goodsName
  }).then(res => {
    const { data } = res.result;
    goods.value = data;
    loadingGoods.value = false;
  });
}, 300);
</script>
