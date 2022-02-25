<script lang="ts">
export default {
  name: "ShopInfo"
};
</script>

<script setup lang="ts">
import { ECharts } from "echarts";
import echarts from "/@/plugins/echarts";
import { onBeforeMount, onMounted, nextTick } from "vue";
import { useEventListener, tryOnUnmounted, useTimeoutFn } from "@vueuse/core";

import { shopInfo } from "../api";

let echartInstance: ECharts;

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
});

function initechartInstance() {
  const echartDom = document.querySelector(".bar" + props.index);
  if (!echartDom) return;
  // @ts-ignore
  echartInstance = echarts.init(echartDom);
  echartInstance.clear(); //清除旧画布 重新渲染
}

function setOption(xAxis, series, legend) {
  echartInstance.setOption({
    title: {
      text: "店铺销售情况"
    },
    legend: {
      data: legend,
      right: 20
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: "62px",
      bottom: "0",
      left: "16px",
      right: "16px",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0
          // width: "70",
          // overflow: "truncate"
        },
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "金额",
        axisLabel: {
          formatter: "{value} 元"
        }
      },
      {
        type: "value",
        name: "数量",
        axisLabel: {
          formatter: "{value}"
        }
      }
    ],
    series: series
  });
}

onBeforeMount(() => {
  nextTick(() => {
    initechartInstance();
  });

  shopInfo().then(res => {
    if (res.result) {
      const xAxis = [];
      const series = [];
      const legend = ["销售额", "利润", "数量"];
      const amountList = [];
      const profitList = [];
      const numberList = [];
      res.result.forEach(item => {
        xAxis.push(item.shopName || "其他");
        amountList.push(item.totalAmount);
        profitList.push(item.totalNetProfit);
        numberList.push(item.totalNumber);
      });

      series.push({
        name: "销售额",
        data: amountList,
        type: "bar",
        label: {
          show: true,
          position: "top"
        }
      });
      series.push({
        name: "利润",
        data: profitList,
        type: "bar",
        label: {
          show: true,
          position: "top"
        }
      });
      series.push({
        name: "数量",
        data: numberList,
        type: "line",
        yAxisIndex: 1,
        smooth: true
      });

      setOption(xAxis, series, legend);
    }
  });
});

onMounted(() => {
  nextTick(() => {
    useEventListener("resize", () => {
      if (!echartInstance) return;
      useTimeoutFn(() => {
        echartInstance.resize();
      }, 180);
    });
  });
});

tryOnUnmounted(() => {
  if (!echartInstance) return;
  echartInstance.dispose();
  echartInstance = null;
});
</script>

<template>
  <div :class="'bar' + props.index" style="width: 100%; height: 35vh"></div>
</template>
