<template>
  <div class="profitList">
    <div class="wrap">
      <h3>利润报表</h3>
      <span>日期查询</span>
      <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
      </el-date-picker>
      <button class="BtnDisable">查询</button>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="taskNum" label="任务数" align="center">
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数" align="center">
          </el-table-column>
          <el-table-column prop="setPersonNum" label="下单任务数" align="center">
          </el-table-column>
          <el-table-column prop="newPay" label="新用户充值数" align="center">
          </el-table-column>
          <el-table-column prop="newPayNum" label="新用户充值金额" align="center">
          </el-table-column>
          <el-table-column prop="payNum" label="充值笔数" align="center">
          </el-table-column>
          <el-table-column prop="PayMoney" label="充值金额" align="center">
          </el-table-column>
          <el-table-column prop="yu" label="用户账户余额" align="center">
          </el-table-column>
          <el-table-column prop="xiaofei" label="用户消费余额" align="center">
          </el-table-column>
          <el-table-column prop="profits" label="利润" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'profitList',
  data () {
    return {
      value3: '',
      currentPage: 1,
      tableData: [{
        date: '2016-05-02',
        taskNum: '5',
        orderNum: '5',
        setPersonNum: '5',
        newPay: '5',
        newPayNum: '5.5',
        payNum: '5',
        PayMoney: '5',
        yu: 5,
        xiaofei: 5,
        profits: 5
      }, {
        date: '2016-05-02',
        taskNum: '5',
        orderNum: '5',
        setPersonNum: '5',
        newPay: '5',
        newPayNum: '5.5',
        payNum: '5',
        PayMoney: '5',
        yu: 5,
        xiaofei: 5,
        profits: 5
      }]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.profitList
  padding 20px
  font-size 14px
  .wrap
    background #ffffff
    padding 20px
    padding-bottom 20px
    overflow hidden
    h3
      color #333
      padding 10px 0 10px 20px
      border-bottom 1px solid #ccc
      margin-bottom 20px
    .BtnDisable
      margin-left 24px
    .table
      margin-top 20px
    .pager
      float right
      margin-right 20px
      margin-top 20px
</style>
