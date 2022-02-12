<h1>vue-pure-admin精简版</h1>

[![license](https://img.shields.io/github/license/xiaoxian521/vue-pure-admin.svg)](LICENSE)

**中文** | [English](./README.en-US.md)

## 介绍

精简版是基于 https://github.com/xiaoxian521/vue-pure-admin 提炼出的架子，包含主体功能，更适合实际项目开发

## 配套视频

教程：<https://www.bilibili.com/video/BV1534y1S7HV/>  
UI 设计：<https://www.bilibili.com/video/BV17g411T7rq/>

## 配套文档

<https://pure-admin-doc.vercel.app/>

## 维护者

[xiaoxian521](https://github.com/xiaoxian521)

## 捐赠

如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持

<img src="http://yiming_chang.gitee.io/manages/pay.jpg" width="150px" height="150px" />

## 付费咨询、需求定制

作者精力有限，需要提供技术服务的可扫下面的二维码加微信，添加请备注来意

<img src="http://yiming_chang.gitee.io/manages/wechat.jpg" width="150px" height="150px" />

## 用法

### 安装依赖

pnpm install

### 安装一个包

pnpm add 包名

### 卸载一个包

pnpm remove 包名

我认为你应该先 fork 项目去开发，以便我更新时你可以同步拉取更新！！！

## ⚠️ 注意

精简版不接受任何 issues 和 pr，如果有问题请到完整版 https://github.com/xiaoxian521/vue-pure-admin/issues/new/choose 去提，谢谢！！！

## 功能模块

- 首页  *日销售额、日利润、总销售额、总利润、最近7天的销售额、利润折线图、各个商品总销售额饼图*、店铺销量、利润 直方图
- 店铺管理  店铺的增删改查
- 商品管理  商品的管理 商品分类、商品名称、商品编码、商品规格、规格单位
- 库存管理 查看各个商品的总库存 
  - 入库	商品入库   商品、数量、备注、日期
  - 库存    查看各个商品的总库存         商品数量
- 订单管理 商品、数量、金额、顾客、售出店铺、出售日期、顾客、联系方式、备注
- 统计分析



问题

	1. 库存是否要按店铺来管理
	2. 同一个商品进价不同如何管理



## TODO
  1. 优化类型 接口入参 返回