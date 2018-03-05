<template>
  <div class="profitList">
    <div class="wrap">
      <h3>利润报表</h3>
      <span>日期查询</span>
      <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" format='yyyy-MM-dd'>
      </el-date-picker>
      <button class="BtnDisable" @click="search">查询</button>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gmtCreate" label="日期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.gmtCreate ? scope.row.gmtCreate.split(' ')[0] : '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="taskNum" label="任务数" align="center">
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数" align="center">
          </el-table-column>
          <el-table-column prop="makeOrderUserNum" label="下单用户数" align="center">
          </el-table-column>
          <el-table-column prop="newRechargeNum" label="新用户充值数" align="center">
          </el-table-column>
          <el-table-column prop="newRechargeNum" label="新用户充值金额" align="center">
          </el-table-column>
          <el-table-column prop="rechargeNum" label="充值笔数" align="center">
          </el-table-column>
          <el-table-column prop="rechargeSum" label="充值金额" align="center">
          </el-table-column>
          <el-table-column prop="rechargeSum" label="用户账户余额" align="center">
          </el-table-column>
          <el-table-column prop="sellerCost" label="用户消费余额" align="center">
          </el-table-column>
          <el-table-column prop="profit" label="利润" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'profitList',
  mixins: [pageCommon],
  data () {
    return {
      value3: '',
      currentPage: 1,
      apiUrl: '/api/statistics/search/getSubstationStatisticsByCondition',
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        substationId: this.userInfo.substationId,
        currPageNo: this.pageNo,
        limit: this.pageSize,
        startTime: this.value3 ? this.value3[0] : null,
        endTime: this.value3 ? this.value3[1] : null
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    search () {
      this.getList()
    },
    setList (data) {
      this.tableData = data
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.profitList
  padding 20px 0 20px 20px
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
