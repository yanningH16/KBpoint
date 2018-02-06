<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>用户充值记录</h3>
      <p>请确认用户已经转账到您的支付宝账户，并且订单号和金额一致后再点击“款已到账,充值给用户”按钮</p>
      <ul>
        <li>
          付款方式:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          充值状态:
          <el-select v-model="value4" placeholder="请选择">
            <el-option v-for="item in payState" :key="item.value4" :label="item.label" :value="item.value4">
            </el-option>
          </el-select>
        </li>
        <li>
          订单号:
          <el-input v-model="input1" placeholder="请输入编号"></el-input>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          <span>用户名:</span>
          <el-input v-model="input" placeholder="请输入编号"></el-input>
        </li>
        <!-- <li>
          提交日期:
          <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
          </el-date-picker>
        </li> -->
        <li>
          <button class="BtnDisable" @click="search">查询</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="userName" fixed label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="gmtCreate" label="提交日期" width="180" align="center">
          </el-table-column>
          <el-table-column prop="passTime" label="到账日期" width="180" align="center">
          </el-table-column>
          <el-table-column prop="rechargeId" label="交易号" width="190" align="center">
          </el-table-column>
          <el-table-column prop="money" label="充值金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="payTypeDetail" label="付款方式" width="120" align="center">
          </el-table-column>
          <el-table-column prop="comment" label="付款说明" width="120" align="center">
          </el-table-column>
          <el-table-column prop="beforMoney" label="充值前金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="stautsDetail" label="状态" width="120" align="center">
          </el-table-column>
          <el-table-column prop="afterMoney" label="充值后金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="comment" label="备注" width="120" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.stautsDetail==='等待付款'||scope.row.stautsDetail==='等待收款'||scope.row.stautsDetail==='等待收货'">款已到账</el-button>
              <el-button type="text" size="small" @click="handleClickCecal(scope.row)" v-if="scope.row.stautsDetail==='等待付款'||scope.row.stautsDetail==='等待收款'||scope.row.stautsDetail==='等待收货'">驳回订单</el-button>
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
      <!-- <p>
        <span>到账日期</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
      </p>
      <p class="markets">
        <span>备注</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p> -->
      <span>确认已到账?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="surePay">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
export default {
  mixins: [pageCommon],
  name: 'rechargeList',
  data () {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 20,
      input: '',
      input1: '',
      value1: '',
      textarea: '',
      rechargeId: '',
      options: [{
        value: '1',
        label: '银行卡付款'
      }],
      value: '',
      payState: [{
        value4: '1',
        label: '等待付款'
      }, {
        value4: '2',
        label: '等待收货'
      }, {
        value4: '3',
        label: '等待收款'
      }, {
        value4: '4',
        label: '充值失败'
      }, {
        value4: '5',
        label: '订单取消'
      }, {
        value4: '6',
        label: '充值完成'
      }],
      value4: '',
      tableData: [{
        name: '5454545454',
        date: '2017-02-01',
        stopDate: '2017-02-01',
        number: '1212131566',
        payNum: '3.00',
        payType: '银行卡转账',
        payStyle: '哈哈哈',
        paybefore: '3.00',
        state: '待审核',
        payafter: '6.00',
        market: '呜呜呜'
      }],
      apiUrl: '/api/seller/recharge/getRechargeListBySubstationId'
    }
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        substationId: this.userInfo.substationId,
        payType: this.value,
        rechargeStatus: this.value4,
        rechargeId: this.input1,
        userName: this.input
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
    // 获取列表
    setList (data) {
      this.tableData = data
    },
    handleClick (val) {
      console.log(val)
      this.dialogVisible = true
      this.rechargeId = val.rechargeId
    },
    surePay () {
      this.$ajax.post('/api/seller/recharge/passRechargeSheet', {
        rechargeId: this.rechargeId,
        operateUserId: this.userInfo.substationAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '通过成功'
          })
          this.getList()
          this.dialogVisible = false
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClickCecal (data) {
      console.log(data)
      let rechargeId = data.rechargeId
      this.$confirm('你确认取消订单么? 请谨慎操作', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((data) => {
        this.$ajax.post('/api/seller/recharge/cancelRechargeSheet', {
          rechargeId: rechargeId
          // operateUserId: this.userInfo.substationAccountId
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              type: 'success',
              message: '已驳回'
            })
            this.getList()
          } else {
            this.$message({
              type: 'warning',
              message: data.data.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
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
  ::-webkit-scrollbar
    display block
    width 100%
    height 8px
  ::-webkit-scrollbar-thumb
    background #eeeeee
    border-radius 5px
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
