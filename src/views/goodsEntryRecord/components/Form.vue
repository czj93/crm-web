<template>
  <el-dialog
    width="60%"
    :title="title"
    :modelValue="props.visible"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="100px"
      ref="formRef"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="商品名称" prop="goodsCode">
            <el-select
              v-model="form.goodsCode"
              remote
              filterable
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺" prop="shopId">
            <el-select
              v-model="form.shopId"
              remote
              filterable
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
          <el-form-item label="数量" prop="number">
            <el-input
              v-model.number="form.number"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              :rows="2"
              type="textarea"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
  goodsCode: "",
  shopId: null,
  number: null,
  remark: "",
  date: null
});

const rules = reactive({
  goodsCode: [{ required: true, message: "此项必填" }],
  number: [
    { required: true, message: "此项必填" }
    // { required: true, type: "number", message: "请输入数字" }
  ],
  date: [{ required: true, message: "此项必选" }]
});

const modeuleName = "入库";
const title = ref("新增" + modeuleName);
const shops = ref([]);
const goods = ref([]);

const loading = ref(false);
const loadingShop = ref(false);
const loadingGoods = ref(false);

const handleClose = function (done) {
  formRef.value.resetFields();
  done();
};

const close = function () {
  emit("update:visible", false);
  formRef.value.resetFields();
};

const submit = function () {
  formRef.value.validate(valid => {
    loading.value = true;
    if (valid) {
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
  }
  if (props.visible && props.id) {
    detail(props.id).then(res => {
      Object.assign(form, res.result);
    });
    title.value = `编辑${modeuleName}`;
  } else if (props.visible) {
    title.value = `新增${modeuleName}`;
  }
});

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
