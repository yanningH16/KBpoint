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
        <li>
          提交日期:
          <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
          </el-date-picker>
        </li>
        <li>
          <button class="BtnDisable">查询</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" fixed label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="date" label="提交日期" width="150" align="center">
          </el-table-column>
          <el-table-column prop="stopDate" label="到账日期" width="120" align="center">
          </el-table-column>
          <el-table-column prop="number" label="交易号" width="120" align="center">
          </el-table-column>
          <el-table-column prop="payNum" label="充值金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="payType" label="付款方式" width="120" align="center">
          </el-table-column>
          <el-table-column prop="payStyle" label="付款说明" width="120" align="center">
          </el-table-column>
          <el-table-column prop="paybefore" label="充值前金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120" align="center">
          </el-table-column>
          <el-table-column prop="payafter" label="充值后金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="market" label="备注" width="120" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">款已到账</el-button>
              <el-button type="text" size="small" @click="handleClickCecal(scope.row)">取消订单</el-button>
            </template>
          </el-table-column>
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
