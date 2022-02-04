<template>
  <el-select v-bind="$attrs">
    <el-option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    ></el-option>
  </el-select>
</template>
<script setup lang="ts">
interface OptionType {
  label: string;
  value: string | number;
}
type PropsType = {
  options: Array<OptionType>;
};
const props = withDefaults(defineProps<PropsType>(), { options: () => [] });
</script>
