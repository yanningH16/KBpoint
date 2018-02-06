<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>推荐人管理</h3>
      <ul class="ulTow">
        <li>
          任务编号:
          <el-input v-model="input1" placeholder="请输入编号"></el-input>
        </li>
        <li>
          抽成类型:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <button class="BtnDisable">查询</button>
        </li>
        <li>
          <button class="centerBtn" @click="addReferees">添加推荐人</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="invitorName" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="invitorCode" label="邀请码" align="center">
          </el-table-column>
          <el-table-column prop="rakeType" label="抽成类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.rakeType==='1'">无</span>
              <span v-if="scope.row.rakeType==='2'">差价</span>
              <span v-if="scope.row.rakeType==='3'">固定金额</span>
            </template>
          </el-table-column>
          <el-table-column prop="rakeMoney" label="单笔抽成/成本价" align="center">
          </el-table-column>
          <el-table-column prop="inviteSum" label="推荐用户数" align="center">
          </el-table-column>
          <el-table-column prop="balance" label="账户余额" align="center">
          </el-table-column>
          <el-table-column prop="gmtCreate" label="添加时间" align="center">
          </el-table-column>
          <el-table-column prop="gmtModify" label="最后修改时间" align="center">
          </el-table-column>
          <el-table-column prop="comment" label="备注" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">利润明细</el-button>
              <el-button @click="handleClickChange(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleClickBill(scope.row)" type="text" size="small">调账</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 当点修改的弹框 -->
    <el-dialog title="修改推荐人" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <p>
        <span>推荐人姓名</span>
        <el-input v-model="input2" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>推荐人手机</span>
        <el-input v-model="input3" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>抽成类型</span>&nbsp;&nbsp;&nbsp;
        <el-select v-model="value2" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value2" :label="item.label" :value="item.value2">
          </el-option>
        </el-select>
      </p>
      <p style="margin-top:20px">
        <span>抽成/成本价</span>
        <el-input v-model="input5" placeholder=""></el-input>
      </p>
      <p class="markets">
        <span>备注</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 当点击调账的时候触发 -->
    <el-dialog title="调账" :visible.sync="dialogVisible_1" width="30%" :before-close="handleClose">
      <p>
        <span>推荐人姓名</span>
        <el-input v-model="input2" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>推荐人手机</span>
        <el-input v-model="input3" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>调账类型</span>&nbsp;&nbsp;&nbsp;
        <el-select v-model="value3" placeholder="请选择">
          <el-option v-for="item in billType" :key="item.value3" :label="item.label" :value="item.value3">
          </el-option>
        </el-select>
      </p>
      <p style="margin-top:20px">
        <span style="margin-right:40px">金额</span>
        <el-input v-model="input6" placeholder=""></el-input>
      </p>
      <p class="markets">
        <span style="margin-right:40px">原因</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea1">
        </el-input>
      </p>
      <p style="margin-top:20px;margin-left:70px" v-if="this.value3==='4'">
        <el-radio v-model="radio" label="1">加钱</el-radio>
        <el-radio v-model="radio" label="0">减钱</el-radio>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="sure_1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 当点添加的的弹框 -->
    <el-dialog title="添加推荐人" :visible.sync="dialogVisible_2" width="30%" :before-close="handleClose">
      <p>
        <span>推荐人姓名</span>
        <el-input v-model="input2" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>推荐人手机</span>
        <el-input v-model="input3" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px">
        <span>抽成类型</span>&nbsp;&nbsp;&nbsp;
        <el-select v-model="value2" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value2" :label="item.label" :value="item.value2">
          </el-option>
        </el-select>
      </p>
      <p style="margin-top:20px">
        <span>抽成/成本价</span>
        <el-input v-model="input5" placeholder=""></el-input>
      </p>
      <p class="markets">
        <span>备注</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_2 = false">取 消</el-button>
        <el-button type="primary" @click="sure_2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'pushManger',
  mixins: [pageCommon],
  data () {
    return {
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_2: false,
      radio: '',
      currentPage: 1,
      pageSize: 5,
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input5: '',
      input6: '',
      textarea: '',
      textarea1: '',
      getObj: {},
      // 推荐人调账获取对应id
      invitorId: '',
      options: [{
        value: '1',
        label: '无'
      }, {
        value: '2',
        label: '差价'
      }, {
        value: '3',
        label: '固定金额'
      }],
      value: '',
      type: [{
        value2: '1',
        label: '无'
      }, {
        value2: '2',
        label: '差价'
      }, {
        value2: '3',
        label: '固定金额'
      }],
      value2: '',
      billType: [{
        value3: '1',
        label: '下单获得利润'
      }, {
        value3: '2',
        label: '利润结算'
      }, {
        value3: '3',
        label: '用户退款扣除利润'
      }, {
        value3: '4',
        label: '其它'
      }],
      value3: '',
      tableData: [],
      apiUrl: '/api/invitor/getListByStationIdAndNameAndRakeType'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    params () {
      return {
        condition: this.input1,
        substationId: this.userInfo.substationId,
        rakeType: this.value,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
      this.$router.push({ name: 'profits', query: { invitorId: val.invitorId } })
    },
    // 获取列表的接口
    setList (data) {
      this.tableData = data
    },
    // 当点击修改触发的事件
    handleClickChange (val) {
      console.log(val)
      this.input2 = val.invitorName
      this.input3 = val.invitorTelephone
      this.value2 = val.rakeType
      this.input5 = val.rakeMoney
      this.textarea = val.comment
      this.getObj = {
        invitorName: val.invitorName,
        invitorTelephone: val.invitorTelephone,
        rakeType: val.rakeType,
        //  === '1' ? '无' : val.rakeType === '2' ? '差价' : '固定金额'
        rakeMoney: val.rakeMoney,
        comment: val.comment,
        invitorId: val.invitorId
      }
      this.dialogVisible = true
    },
    sure () {
      this.$ajax.post('/api/invitor/updateInvitorInfo', {
        substationInvitorId: this.getObj.invitorId,
        telephone: this.input3,
        name: this.input2,
        rakeType: this.value2,
        rakeMoney: this.input5,
        comment: this.textarea
      }).then(data => {
        // console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.data,
            type: 'success'
          })
          this.dialogVisible = false
          this.getList()
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    // 当点击调账触发的事件
    handleClickBill (val) {
      console.log(val)
      this.invitorId = val.invitorId
      this.input2 = val.invitorName
      this.input3 = val.invitorTelephone
      this.dialogVisible_1 = true
    },
    sure_1 () {
      this.$ajax.post('/api/invitor/adjustAccounts', {
        invitorId: this.invitorId,
        type: this.value3,
        money: this.input6,
        operateUserId: this.userInfo.substationAccountId,
        comment: this.textarea1,
        extraType: this.radio
      }).then(data => {
        // console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.data,
            type: 'success'
          })
          this.dialogVisible_1 = false
          this.getList()
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    // 当点击添加推荐人触发事件
    addReferees () {
      this.dialogVisible_2 = true
    },
    sure_2 () {
      this.$ajax.post('/api/invitor/addInvitor', {
        substationId: this.userInfo.substationId,
        substationAccountId: this.userInfo.substationAccountId,
        telephone: this.input3,
        name: this.input2,
        rakeType: this.value2,
        rakeMoney: this.input5,
        comment: this.textarea
      }).then(data => {
        // console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.data,
            type: 'success'
          })
          this.dialogVisible_2 = false
          this.getList()
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
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
      margin-right 45px
      vertical-align top
</style>
