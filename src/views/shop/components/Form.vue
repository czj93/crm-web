<template>
  <el-dialog
    width="30%"
    :title="title"
    :modelValue="props.visible"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <el-form
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="60px"
      ref="formRef"
    >
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="名称" prop="shopName">
            <el-input v-model="form.shopName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
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
  shopName: "",
  remark: ""
});

const rules = reactive({
  shopName: [{ required: true, message: "此项必填" }]
});

const modeuleName = "店铺";
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
