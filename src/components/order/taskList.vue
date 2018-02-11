<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>任务列表</h3>
      <ul>
        <li>
          物流平台:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          支付状态:
          <el-select v-model="value4" placeholder="请选择">
            <el-option v-for="item in payState" :key="item.value4" :label="item.label" :value="item.value4">
            </el-option>
          </el-select>
        </li>
        <li>
          用户名:
          <el-input v-model="input2" placeholder="请输入用户名"></el-input>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          任务编号:
          <el-input v-model="input1" placeholder="请输入编号"></el-input>
        </li>
        <li>
          提交日期:
          <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
          </el-date-picker>
        </li>
        <li>
          <button class="BtnDisable" @click="search">查询</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gmtCreate" label="提交日期" align="center">
          </el-table-column>
          <el-table-column prop="sellerTaskId" label="任务编号" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" align="center">
          </el-table-column>
          <el-table-column prop="logisticsType" label="快递公司" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.logisticsType==='1'">圆通</span>
            </template>
          </el-table-column>
          <el-table-column prop="importTotalNum" label="订单数" align="center">
          </el-table-column>
          <el-table-column prop="price" label="单价" align="center">
          </el-table-column>
          <el-table-column prop="actualCost" label="任务总价" align="center">
          </el-table-column>
          <el-table-column prop="status" label="付款状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==='0'">未付款</span>
              <span v-if="scope.row.status==='1'">已付款</span>
              <span v-if="scope.row.status==='2'">已撤销</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 当点击款已到账的弹框 -->
    <el-dialog title="用户充值确认" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <p>
        <span>到账日期</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </p>
      <p class="markets">
        <span>备注</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'rechargeList',
  mixins: [pageCommon],
  data () {
    return {
      dialogVisible: false,
      currentPage: 1,
      input: '',
      input1: '',
      input2: '',
      value1: '',
      textarea: '',
      value3: '',
      apiUrl: '/api/order/search/getSellerTaskByCondition',
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      payState: [{
        value4: '0',
        label: '未支付'
      }, {
        value4: '1',
        label: '支付成功'
      }, {
        value4: '2',
        label: '任务删除'
      }],
      value4: '',
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        currPageNo: this.pageNo,
        limit: this.pageSize,
        startTime: this.value3 ? this.value3[0] : null,
        endTime: this.value3 ? this.value3[1] : null,
        logisticsType: this.value,
        sellerTaskId: this.input1,
        status: this.value4,
        substationId: this.userInfo.substationId,
        userName: this.input2
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (val) {
      this.$router.push({ name: 'orderList', query: { sellerTaskId: val.sellerTaskId } })
    },
    search () {
      this.getList()
    },
    setList (data) {
      this.tableData = data
    },
    handleClickCecal () {
      this.$confirm('你确认取消订单么? 请谨慎操作', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rechargeList
  padding 20px
  font-size 14px
  width 100%
  .wrap
    background #ffffff
    padding 20px
    padding-bottom 20px
    overflow hidden
    margin-right 20px
    h3
      color #333
      padding 10px 0 10px 20px
      border-bottom 1px solid #ccc
      margin-bottom 20px
    p
      float right
      margin-right 20px
      margin-top -40px
      font-size 12px
      color #ff3341
    ul
      // margin-top 40px
      display -webkit-box
      display flex
      // width 100%
      li
        margin-right 30px
    .pager
      float right
      padding-bottom 20px
    .ulTow
      margin-top 20px
      border-bottom 1px solid #e5e5e5
      padding-bottom 24px
    .actTab
      border 1px solid #e5e5e5
      margin-top 20px
  .markets
    margin-top 20px
    span
      margin-right 28px
      vertical-align top
</style>
