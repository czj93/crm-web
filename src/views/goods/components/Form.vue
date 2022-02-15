<template>
  <el-dialog
    width="60%"
    :title="title"
    :modelValue="props.visible"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form :inline="true" :model="form" label-width="100px" ref="formRef">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="商品名称" prop="goodsCode">
            <el-input v-model="form.goodsCode" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品编码" prop="goodsName">
            <el-input v-model="form.goodsName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="规格" prop="spces">
            <el-input v-model="form.spces" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
            <el-input v-model="form.unit" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="进货价格" prop="purchasePrice">
            <el-input
              v-model.number="form.purchasePrice"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建议零售价" prop="retailPrice">
            <el-input
              v-model.number="form.retailPrice"
              placeholder="请输入"
            ></el-input>
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
import type { ElForm } from "element-plus";
import { reactive, ref, toRaw, watchEffect } from "vue";
import { GoodsStatus } from "../types";

import { update, create, detail } from "../api";

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
  goodsName: "",
  goodsCode: "",
  spces: "",
  unit: "",
  status: GoodsStatus.Putaway,
  purchasePrice: null,
  retailPrice: null,
  remark: ""
});
const modeuleName = "商品";
const title = ref("新增" + modeuleName);

const loading = ref(false);

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
  if (props.visible && props.id) {
    detail(props.id).then(res => {
      Object.assign(form, res.result);
    });
    title.value = `编辑${modeuleName}`;
  } else {
    title.value = `新增${modeuleName}`;
  }
});
</script>
