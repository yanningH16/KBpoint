<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>订单列表</h3>
      <!-- <p class="right">请确认用户已经转账到您的支付宝账户，并且订单号和金额一致后再点击“款已到账,充值给用户”按钮</p> -->
      <ul>
        <li>
          物流平台:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          付款状态:
          <el-select v-model="value4" placeholder="请选择">
            <el-option v-for="item in payState" :key="item.value4" :label="item.label" :value="item.value4">
            </el-option>
          </el-select>
        </li>
        <li>
          订单状态:
          <el-select v-model="value5" placeholder="请选择">
            <el-option v-for="item in orderState" :key="item.value5" :label="item.label" :value="item.value5">
            </el-option>
          </el-select>
        </li>
      </ul>
      <ul style="margin-top:20px">
        <li>
          任务号:&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="value6" placeholder="请输入编号"></el-input>
        </li>
        <li>
          <span>订单号:&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-input v-model="input2" placeholder="请输入编号"></el-input>
        </li>
        <li>
          <span>收件手机:</span>
          <el-input v-model="input" placeholder="请输入编号"></el-input>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          快递单号:
          <el-input v-model="input1" placeholder="请输入编号"></el-input>
        </li>
        <li>
          用户名:&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="input3" placeholder=""></el-input>
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
      <p style="margin-top:2px;padding-bottom:5px">
        <button class="centerBtn" @click="getOrderId">重新获取单号</button>
      </p>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" @selection-change="handSelect">
          <el-table-column fixed type="selection" width="55" @selection-change="chongse" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="gmtCreate" label="发布日期" width="150" align="center">
          </el-table-column>
          <el-table-column prop="logisticsType" label="快递公司" width="120" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.logisticsType==='1'">圆通</p>
            </template>
          </el-table-column>
          <el-table-column prop="shopType" label="平台" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.shopType==='1'">淘宝</span>
              <span v-if="scope.row.shopType==='2'">天猫</span>
              <span v-if="scope.row.shopType==='3'">京东</span>
              <span v-if="scope.row.shopType==='4'">平多多</span>
              <span v-if="scope.row.shopType==='5'">其它</span>
            </template>
          </el-table-column>
          <el-table-column prop="senderName" label="发货信息" width="380">
            <template slot-scope="scope">
              <p>发货人姓名:{{scope.row.senderName}}</p>
              <p>发货人电话：{{scope.row.senderTelephone}}</p>
              <p>发货人地址：{{scope.row.senderProvince+scope.row.senderCity+scope.row.senderRegion+scope.row.senderAddress}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="receiveName" label="收货信息" width="380">
            <template slot-scope="scope">
              <p>收货人姓名:{{scope.row.receiveName}}</p>
              <p>收货人电话：{{scope.row.receiveTelephone}}</p>
              <p>收货人地址：{{scope.row.receiveProvince+scope.row.receiveCity+scope.row.receiveRegion+scope.row.receiveAddress}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderInfo" label="订单信息" width="200">
            <template slot-scope="scope">
              <p>
                <span>单价:</span>{{scope.row.price||'--'}} 物品质量：{{scope.row.weight}}kg</p>
              <p>平台订单号:{{scope.row.thirdOrderId}}</p>
              <p>快递单号:{{scope.row.logisticsOrderId}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" label="状态" width="150">
            <template slot-scope="scope">
              <p v-if="scope.row.payStatus==='0'">是否付款： 未付款</p>
              <p v-if="scope.row.payStatus==='1'">商家已付款</p>
              <p v-if="scope.row.payStatus==='1'">站点已付款</p>
              <p v-if="scope.row.payStatus==='2'">任务已撤销</p>
              <p v-if="scope.row.status==='1'">快递单获取成功</p>
            </template>
          </el-table-column>
          <el-table-column prop="sellerOrderId" label="任务号" width="120" align="center" fixed='right'>
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
      pageSize: 20,
      input: '',
      input1: '',
      input2: '',
      input3: '',
      value1: '',
      textarea: '',
      value3: '',
      apiUrl: '/api/order/search/getSellerOrderByCondition',
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      payState: [{
        value4: '0',
        label: '未付款'
      }, {
        value4: '1',
        label: '已付款'
      }, {
        value4: '2',
        label: '任务取消'
      }],
      value4: '',
      orderState: [{
        value5: '0',
        label: '未获取运单'
      }, {
        value5: '1',
        label: '已获取运单'
      }, {
        value5: '2',
        label: '订单取消'
      }],
      value5: '',
      // deliveryState: [{
      //   value6: '选项3',
      //   label: '蚵仔煎'
      // }, {
      //   value6: '选项4',
      //   label: '龙须面'
      // }],
      value6: this.$route.query.sellerTaskId || '',
      tableData: [],
      // 任务id数组存储
      sellerOrderIds: []
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
        payStatus: this.value4,
        orderStatus: this.value5,
        thirdOrderId: this.input2,
        receiveTelephone: this.input,
        sellerTaskId: this.value6,
        logisticsOrderId: this.input1,
        sellerUserName: this.input3,
        substationId: this.userInfo.substationId
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
    },
    handSelect (val) {
      let arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].sellerOrderId)
      }
      this.sellerOrderIds = arr
    },
    // 当点击重新获取的时候进行请求
    getOrderId () {
      if (this.sellerOrderIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条数据'
        })
        return false
      }
      this.$ajax.post('/api/order/operate/reGetLogisticsOrderIds', {
        sellerOrderIds: this.sellerOrderIds
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '重新获取成功'
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
    margin-right 20px
    h3
      color #333
      padding 10px 0 10px 20px
      border-bottom 1px solid #ccc
      margin-bottom 20px
    .right
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
