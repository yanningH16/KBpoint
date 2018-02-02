<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>用户充值记录</h3>
      <p class="right">请确认用户已经转账到您的支付宝账户，并且订单号和金额一致后再点击“款已到账,充值给用户”按钮</p>
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
          快递状态:
          <el-select v-model="value6" placeholder="请选择">
            <el-option v-for="item in deliveryState" :key="item.value6" :label="item.label" :value="item.value6">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>收件手机:</span>
          <el-input v-model="input" placeholder="请输入编号"></el-input>
        </li>
        <li>
          快递单号:
          <el-input v-model="input1" placeholder="请输入编号"></el-input>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          <span>订单号:</span>
          <el-input v-model="input2" placeholder="请输入编号"></el-input>
        </li>
        <li>
          用户名:
          <el-input v-model="input3" placeholder=""></el-input>
        </li>
        <li>
          提交日期:
          <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
          </el-date-picker>
        </li>
        <li>
          <button class="BtnDisable">查询</button>
        </li>
      </ul>
      <p style="margin-top:2px;padding-bottom:5px">
        <button class="centerBtn">重新获取单号</button>
      </p>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="name" label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="date" label="发布日期" width="150" align="center">
          </el-table-column>
          <el-table-column prop="company" label="快递公司" width="120" align="center">
          </el-table-column>
          <el-table-column prop="plant" label="平台" width="120" align="center">
          </el-table-column>
          <el-table-column prop="sendInfo" label="发货信息" width="200">
            <template slot-scope="scope">
              <p>发货人姓名:黄军</p>
              <p>发货人电话：15700177632</p>
              <p>发货人手机：15700177632</p>
              <p>物品质量：2.1kg</p>
              <p>发货人地址：浙江省杭州市 点点滴滴点点滴滴</p>
            </template>
          </el-table-column>
          <el-table-column prop="getInfo" label="收货信息" width="200">
            <template slot-scope="scope">
              <p>收货人姓名:黄军</p>
              <p>发货人电话：15700177632</p>
              <p>发货人手机：15700177632</p>
              <p>物品质量：2.1kg</p>
              <p>发货人地址：浙江省杭州市 点点滴滴点点滴滴</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderInfo" label="订单信息" width="200">
            <template slot-scope="scope">
              <p>平台订单号:4646546156156</p>
              <p>快递单号:465465948546156</p>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="200">
            <template slot-scope="scope">
              <p>商家已付款</p>
              <p>站点已付款</p>
              <p>快递单号:已成功</p>
            </template>
          </el-table-column>
          <el-table-column prop="taskNum" label="任务号" width="120" align="center">
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">款已到账</el-button>
              <el-button type="text" size="small" @click="handleClickCecal(scope.row)">取消订单</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
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
export default {
  name: 'rechargeList',
  data () {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 5,
      input: '',
      input1: '',
      input2: '',
      input3: '',
      value1: '',
      textarea: '',
      value3: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      payState: [{
        value4: '选项2',
        label: '双皮奶'
      }, {
        value4: '选项3',
        label: '蚵仔煎'
      }, {
        value4: '选项4',
        label: '龙须面'
      }],
      value4: '',
      orderState: [{
        value5: '选项3',
        label: '蚵仔煎'
      }, {
        value5: '选项4',
        label: '龙须面'
      }],
      value5: '',
      deliveryState: [{
        value6: '选项3',
        label: '蚵仔煎'
      }, {
        value6: '选项4',
        label: '龙须面'
      }],
      value6: '',
      tableData: [{
        name: '5454545454',
        date: '2017-02-01',
        company: '圆通',
        plant: '淘宝',
        taskNum: '545555'
      }]
    }
  },
  methods: {
    handleClick () {
      this.dialogVisible = true
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
    },
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
