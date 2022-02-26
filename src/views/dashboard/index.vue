<template>
  <div>
    <el-row :gutter="24">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="margin-bottom: 20px"
      >
        <el-card>
          <el-row :gutter="16">
            <el-col :span="4" :xs="12">
              <span>总销售额：</span>
              <CountTo :endVal="totalSaleInfoData.totalAmount" suffix="元" />
            </el-col>
            <el-col :span="4" :xs="12">
              <span>总利润：</span>
              <CountTo :endVal="totalSaleInfoData.totalNetProfit" suffix="元" />
            </el-col>
            <el-col :span="4" :xs="12">
              <span>总销售量：</span>
              <CountTo :endVal="totalSaleInfoData.totalNumber" />
            </el-col>
            <el-col :span="4" :xs="12">
              <span>月销售额：</span>
              <CountTo
                :endVal="totalSaleInfoData.currentMonthTotalAmount"
                suffix="元"
              />
            </el-col>
            <el-col :span="4" :xs="12">
              <span>月利润：</span>
              <CountTo
                :endVal="totalSaleInfoData.currentMonthTotalNetProfit"
                suffix="元"
              />
            </el-col>
            <el-col :span="4" :xs="12">
              <span>月销售量：</span>
              <CountTo :endVal="totalSaleInfoData.currentMonthTotalNumber" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="margin-bottom: 20px"
      >
        <el-card>
          <LastYear />
        </el-card>
      </el-col>

      <el-col class="mb-16px" :xs="24" :sm="24" :md="12" :lg="6" :xl="8">
        <el-card style="height: 39vh">
          <template #header>
            <span class="text-18px font-bold">销量前十</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <el-table
              stripe
              size="small"
              :data="salestGoods"
              :show-header="false"
            >
              <el-table-column type="index" width="50" />
              <el-table-column prop="goodsName" label="商品" />
              <el-table-column prop="value" label="数量" />
            </el-table>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col class="mb-16px" :xs="24" :sm="24" :md="12" :lg="6" :xl="8">
        <el-card style="height: 39vh">
          <template #header>
            <span class="text-18px font-bold">销售额前十</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <el-table
              stripe
              size="small"
              :data="amountGoods"
              :show-header="false"
            >
              <el-table-column type="index" width="50" />
              <el-table-column prop="goodsName" label="商品" />
              <el-table-column prop="value" label="数量" />
            </el-table>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col class="mb-16px" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
        <el-card>
          <!-- <template #header>
            <span style="font-size: 16px; font-weight: 500">店铺销售情况</span>
          </template> -->
          <ShopInfo />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { goodsRank, totalSaleInfo } from "./api";
import LastYear from "./components/LastYear.vue";
import ShopInfo from "./components/ShopInfo.vue";
import CountTo from "/@/components/ReCountTo/src/normal";

const loading = ref(true);
const salestGoods = ref([]);
const amountGoods = ref([]);
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

goodsRank().then(res => {
  if (res.result) {
    salestGoods.value = res.result.number;
    amountGoods.value = res.result.amount;
    loading.value = false;
  }
});
</script>
