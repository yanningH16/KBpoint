<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>利润明细</h3>
      <ul class="ulTow">
        <li>
          交易类型:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          交易时间:
          <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
          </el-date-picker>
        </li>
        <li>
          <button class="BtnDisable" @click="search">查询</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gmtCreate" label="时间" align="center">
          </el-table-column>
          <el-table-column prop="typeDetail" label="类型" align="center">
          </el-table-column>
          <el-table-column prop="money" label="金额" align="center">
          </el-table-column>
          <el-table-column prop="beforMoney" label="变动前金额" align="center">
          </el-table-column>
          <el-table-column prop="afterMoney" label="变动后金额" align="center">
          </el-table-column>
          <el-table-column prop="comment" label="备注" align="center">
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
      apiUrl: '/api/invitor/getWettingPagingListByInvitorId',
      input: '',
      input1: '',
      value1: '',
      textarea: '',
      value3: '',
      options: [{
        value: '1',
        label: '下单获取利润'
      }, {
        value: '2',
        label: '利润结算'
      }, {
        value: '3',
        label: '用户退款扣除利润'
      }, {
        value: '4',
        label: '其他'
      }],
      value: '',
      tableData: []
    }
  },
  computed: {
    params () {
      return {
        invitorId: this.$route.query.invitorId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        type: this.value,
        startTime: this.value3 ? this.value3[0] : null,
        endTime: this.value3 ? this.value3[1] : null
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    setList (data) {
      this.tableData = data
    },
    search () {
      this.getList()
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
