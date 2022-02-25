<template>
  <SeamlessScroll
    ref="scroll"
    :data="props.list"
    :class-option="classOption"
    class="warp"
  >
    <ul class="item">
      <li v-for="(item, index) in props.list" :key="index">
        <span v-text="index"></span>
        <span v-text="item.goodsName"></span>
        <span v-text="item.value"></span>
      </li>
    </ul>
  </SeamlessScroll>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { templateRef } from "@vueuse/core";
import SeamlessScroll from "/@/components/ReSeamlessScroll";

type GoodsItem = {
  goodsCode: string;
  goodsName: string;
  value?: number;
};

type PropsType = {
  list: Array<GoodsItem>;
};

// eslint-disable-next-line no-undef
const scroll = templateRef<ElRef | null>("scroll", null);

let classOption = reactive({
  direction: "top"
});

const props = defineProps<PropsType>();
</script>
