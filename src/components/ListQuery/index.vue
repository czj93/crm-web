<template>
  <div
    class="
      grid
      pt-8px
      pb-8px
      pl-8px
      pr-8px
      rounded
      grid-cols-4
      gap-4px
      bg-white
    "
  >
    <div class="flex" v-for="item in props.list" :key="item.prop">
      <span class="mr-4px text-12px flex-auto leading-32px whitespace-nowrap">{{
        item.label
      }}</span>
      <component
        :is="item.type"
        v-model="form[item.prop]"
        v-bind="item.attrs || {}"
        v-on="item.listeners || {}"
        @keyup.enter="queryHandler"
      />
    </div>
    <div
      class="text-right col-end-5"
      :class="[`col-start-${(props.list.length % 4) + 1}`]"
    >
      <slot>
        <el-button @click="createHandler" v-if="hasCreate">新增</el-button>
        <el-button @click="resetHandler">重置</el-button>
        <el-button type="primary" @click="queryHandler">查询</el-button>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRaw } from "vue";
import { initForm } from "./utils";
// defineProps 暂不支持从其他文件导入的类型，PropsType 无法抽离到单独的类型文件中
interface ListItem {
  type: string;
  prop: string;
  label: string;
  attrs?: object;
  listeners?: object;
}

interface PropsType {
  hasCreate: boolean;
  list: Array<ListItem>;
}

const props = withDefaults(defineProps<PropsType>(), { hasCreate: true });
const emit = defineEmits(["query", "reset", "create"]);

const form = initForm(props.list);

const resetHandler = () => {
  Object.assign(form, initForm(props.list));
  emit("reset", toRaw(form));
};

const queryHandler = () => {
  emit("query", toRaw(form));
};

const createHandler = () => {
  emit("create");
};

defineExpose(form);
</script>
<style scoped></style>
