<template>
  <div>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
      >
        <el-card>
          <!-- <template #header>
            <span style="font-size: 16px; font-weight: 500">销售数据</span>
          </template> -->
          <el-row :gutter="16">
            <el-col :span="8">
              <div>总销售额：</div>
              <CountTo :endVal="totalSaleInfoData.totalAmount" suffix="元" />
            </el-col>
            <el-col :span="8">
              <div>总利润：</div>
              <CountTo :endVal="totalSaleInfoData.totalNetProfit" suffix="元" />
            </el-col>
            <el-col :span="8">
              <div>总销售量：</div>
              <CountTo :endVal="totalSaleInfoData.totalNumber" />
            </el-col>
            <el-col :span="8">
              <div>月销售额：</div>
              <CountTo
                :endVal="totalSaleInfoData.currentMonthTotalAmount"
                suffix="元"
              />
            </el-col>
            <el-col :span="8">
              <div>月利润：</div>
              <CountTo
                :endVal="totalSaleInfoData.currentMonthTotalNetProfit"
                suffix="元"
              />
            </el-col>
            <el-col :span="8">
              <div>月销售量：</div>
              <CountTo :endVal="totalSaleInfoData.currentMonthTotalNumber" />
            </el-col>
          </el-row>

          <!-- <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReGithub />
            </template>
          </el-skeleton> -->
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"
              >最近12个月销售数据</span
            >
          </template>
          <LastYear />
          <!-- <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <LastYear />
            </template>
          </el-skeleton> -->
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">商品销售数据</span>
          </template>
          <!-- <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <RePie />
            </template>
          </el-skeleton> -->
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">店铺销售数据</span>
          </template>
          <!-- <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReLine />
            </template>
          </el-skeleton> -->
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">其他</span>
          </template>
          <!-- <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReBar />
            </template>
          </el-skeleton> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { totalSaleInfo } from "./api";
import LastYear from "./components/LastYear.vue";
import CountTo from "/@/components/ReCountTo/src/normal";

// const loading = ref(false);

const totalSaleInfoData = reactive({
  totalNumber: 0,
  totalAmount: 0,
  totalNetProfit: 0,
  currentMonthTotalNumber: 0,
  currentMonthTotalAmount: 0,
  currentMonthTotalNetProfit: 0
});

totalSaleInfo().then(res => {
  Object.assign(totalSaleInfoData, res.result);
});
</script>
