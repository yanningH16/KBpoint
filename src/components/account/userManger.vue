<template>
  <div class="rechargeList">
    <div class="wrap">
      <h3>用户管理</h3>
      <ul>
        <li>
          审核状态:
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          用户等级:
          <el-select v-model="value4" placeholder="请选择">
            <el-option v-for="item in userLevel" :key="item.value4" :label="item.label" :value="item.value4">
            </el-option>
          </el-select>
        </li>
        <li>
          用户状态:
          <el-select v-model="value5" placeholder="请选择">
            <el-option v-for="item in userState" :key="item.value5" :label="item.label" :value="item.value5">
            </el-option>
          </el-select>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          <span style="margin-right:13px">用户名:</span>
          <el-input v-model="input1" placeholder=""></el-input>
        </li>
        <li>
          <span style="margin-right:30px">电话:</span>
          <el-input v-model="input2" placeholder=""></el-input>
        </li>
        <!-- <li>
          <span style="margin-right:42px">IP:</span>
          <el-input v-model="input3" placeholder=""></el-input>
        </li> -->
        <li>
          <button class="BtnDisable" @click="search">查询</button>
        </li>
      </ul>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="userName" label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="telephone" label="手机" width="120" align="center">
          </el-table-column>
          <el-table-column prop="balance" label="余额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="rechargeSum" label="累计充值" width="120" align="center">
          </el-table-column>
          <el-table-column prop="levelDetail" label="会员等级" width="120" align="center">
          </el-table-column>
          <el-table-column prop="price" label="圆通价" width="120" align="center">
          </el-table-column>
          <el-table-column prop="statusDetail" label="状态" width="120" align="center">
          </el-table-column>
          <!-- <el-table-column prop="checkStatus" label="审核状态" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.checkStatus==='0'">未提交</span>
              <span v-if="scope.row.checkStatus==='1'">未审核</span>
              <span v-if="scope.row.checkStatus==='2'">审核未通过</span>
              <span v-if="scope.row.checkStatus==='3'">审核通过</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="gmtCreate" label="注册时间" width="160" align="center">
          </el-table-column>
          <el-table-column prop="invitorName" label="推荐人" width="150" align="center">
          </el-table-column>
          <el-table-column prop="invitedCode" label="邀请码" width="150" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">设置审核状态</el-button>
              <el-button type="text" size="small" @click="handleClickCecal(scope.row)">设置等级/价格</el-button>
              <el-dropdown @command="userSet">
                <span style="font-size:12px;color:#409EFF;">
                  更多
                  <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="[scope.row,1]">设置推荐人</el-dropdown-item>
                  <el-dropdown-item :command="[scope.row,2]">扣除金额</el-dropdown-item>
                  <el-dropdown-item :command="[scope.row,3]">禁用</el-dropdown-item>
                  <el-dropdown-item :command="[scope.row,4]">用户充值</el-dropdown-item>
                  <el-dropdown-item :command="[scope.row,5]">重置密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 设置审核状态的弹框 -->
    <el-dialog title="设置审核状态" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>审核</span>
      <el-select v-model="value1" placeholder="请选择">
        <el-option v-for="item in audit" :key="item.value1" :label="item.label" :value="item.value1">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置等级价格的弹框 -->
    <el-dialog title="设置用户等级和价格" :visible.sync="dialogVisible_1" width="30%" :before-close="handleClose">
      <p style="margin-left:28px">
        <span>等级</span>
        <el-select v-model="value2" placeholder="请选择" @change="getLevel">
          <el-option v-for="item in level" :key="item.value2" :label="item.label" :value="item.value2">
          </el-option>
        </el-select>
      </p>
      <p style="margin-top:20px">
        <span>圆通价格</span>
        <el-input :disabled="disabled" v-model="input4" placeholder=""></el-input> <br>
        <em style="font-size:12px;color:#ff3341;margin-left:58px">最低价格不能低于2.8元</em>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="sure_1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置推荐人弹框 -->
    <el-dialog title="设置推荐人" :visible.sync="dialogVisible_2" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        <span>推荐人手机号</span>
        <el-input v-model="input5" placeholder=""></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_2 = false">取 消</el-button>
        <el-button type="primary" @click="sure_2">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击禁用触发的事件 -->
    <el-dialog title="禁用/解禁用户" :visible.sync="dialogVisible_3" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        <el-select v-model="value5" placeholder="请选择">
          <el-option v-for="item in userState" :key="item.value5" :label="item.label" :value="item.value5">
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_3 = false">取 消</el-button>
        <el-button type="primary" @click="sure_3">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 扣除金额 -->
    <el-dialog title="扣除金额" :visible.sync="dialogVisible_4" width="30%" :before-close="handleClose">
      <p>
        <span>金额(元)</span>
        <el-input v-model="input6" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px;margin-left:23px">
        <span>备注</span>
        <el-input v-model="input7" placeholder=""></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_4 = false">取 消</el-button>
        <el-button type="primary" @click="sure_4">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击充值密码触发的事件 -->
    <el-dialog title="重置密码" :visible.sync="dialogVisible_5" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        你确定要重置{{sellerUserName}}用户密码么?请谨慎操作
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_5 = false">取 消</el-button>
        <el-button type="primary" @click="sure_5">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户充值 -->
    <el-dialog title="用户充值" :visible.sync="dialogVisible_6" width="30%" :before-close="handleClose">
      <p>
        <span>金额(元)</span>&nbsp;
        <el-input v-model="input8" placeholder=""></el-input>
      </p>
      <p style="margin-top:20px;margin-left:25px">
        <span>备注</span>&nbsp;
        <el-input v-model="input9" placeholder=""></el-input>
      </p>
      <!-- <p style="margin-top:20px">
        <span>收款卡号</span>&nbsp;
        <el-input v-model="input10" placeholder=""></el-input>
      </p> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_6 = false">取 消</el-button>
        <el-button type="primary" @click="sure_6">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'userManger',
  mixins: [pageCommon],
  data () {
    return {
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_2: false,
      dialogVisible_3: false,
      dialogVisible_4: false,
      dialogVisible_5: false,
      dialogVisible_6: false,
      disabled: true,
      pullClick: false,
      currentPage: 1,
      sellerUserName: '',
      pageSize: 20,
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      textarea: '',
      value3: '',
      sellerAccountId: '',
      options: [{
        value: '0',
        label: '未提交'
      }, {
        value: '1',
        label: '未审核'
      }, {
        value: '2',
        label: '审核未通过'
      }, {
        value: '3',
        label: '审核通过'
      }],
      value: '',
      userLevel: [{
        value4: '1',
        label: '注册用户'
      }, {
        value4: '2',
        label: '高级用户'
      }, {
        value4: '3',
        label: '钻石用户'
      }, {
        value4: '4',
        label: '皇冠用户'
      }, {
        value4: '11',
        label: '渠道用户'
      }, {
        value4: '12',
        label: '代理商'
      }],
      value4: '',
      userState: [{
        value5: '1',
        label: '正常'
      }, {
        value5: '2',
        label: '冻结'
      }],
      value5: '',
      value1: '',
      audit: [{
        value1: '0',
        label: '未提交'
      }, {
        value1: '1',
        label: '未审核'
      }, {
        value1: '2',
        label: '审核未通过'
      }, {
        value1: '3',
        label: '审核通过'
      }],
      value2: '',
      level: [{
        value2: '1',
        label: '注册用户'
      }, {
        value2: '2',
        label: '高级用户'
      }, {
        value2: '3',
        label: '钻石用户'
      }, {
        value2: '4',
        label: '皇冠用户'
      }, {
        value2: '11',
        label: '渠道用户'
      }, {
        value2: '12',
        label: '代理商'
      }],
      tableData: [],
      apiUrl: '/api/seller/getPagingSellerListByCondtion'
    }
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        accountStatus: this.value5,
        checkStatus: this.value,
        level: this.value4,
        userName: this.input1,
        telephone: this.input2,
        qq: this.input,
        ip: this.input3,
        substationId: this.userInfo.substationId
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 点击查询请求接口
    search () {
      this.getList()
    },
    // 获取列表
    setList (data) {
      this.tableData = data
    },
    // 设置审核状态
    handleClick (val) {
      this.sellerAccountId = val.sellerAccountId
      this.dialogVisible = true
    },
    sure () {
      this.$ajax.post('/api/seller/setCheckStatus', {
        sellerAccountId: this.sellerAccountId,
        checkStatus: this.value1
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.dialogVisible = false
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
    },
    // 设置用户等级
    handleClickCecal (val) {
      this.dialogVisible_1 = true
      this.sellerAccountId = val.sellerAccountId
      this.value2 = val.level
      this.input4 = val.price
    },
    getLevel () {
      if (this.value2 === '11' || this.value2 === '12') {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.$ajax.post('/api/substation/getPriceByLevelByStationId', {
        substationId: this.userInfo.substationId,
        level: this.value2
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.input4 = res.data.price
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
    sure_1 () {
      if (this.input4 < 2.8) {
        this.$message({
          type: 'warning',
          message: '设置价格不能低于2.8元'
        })
        return false
      }
      this.$ajax.post('/api/seller/setLevelAndPrice', {
        sellerAccountId: this.sellerAccountId,
        price: this.input4,
        level: this.value2
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.dialogVisible_1 = false
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
    },
    userSet (val) {
      console.log(val)
      this.sellerAccountId = val[0].sellerAccountId
      this.sellerUserName = val[0].userName
      // 当点击设置推荐人触发的事件
      if (val[1] === 1) {
        this.dialogVisible_2 = true
      }
      // 当点击扣除金额触发的事件
      if (val[1] === 2) {
        this.dialogVisible_4 = true
      }
      // 当点击禁用触发的事件
      if (val[1] === 3) {
        this.dialogVisible_3 = true
      }
      // 当点击用户充值触发的事件
      if (val[1] === 4) {
        this.dialogVisible_6 = true
      }
      // 当点击重置密码触发的事件
      if (val[1] === 5) {
        this.dialogVisible_5 = true
      }
    },
    // 设置推荐人接口
    sure_2 () {
      this.$ajax.post('/api/seller/setInvitor', {
        sellerAccountId: this.sellerAccountId,
        invitorTelephone: this.input5
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.dialogVisible_2 = false
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
    },
    // 设置是否禁用
    sure_3 () {
      this.$ajax.post('/api/seller/setAccountStatus', {
        sellerAccountId: this.sellerAccountId,
        accountStatus: this.value5
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.dialogVisible_3 = false
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
    },
    // 扣除金额
    sure_4 () {
      if (this.input6 === '' || this.input7 === '') {
        this.$message({
          type: 'warning',
          message: '请正确填写内容!!!'
        })
        return false
      }
      this.$ajax.post('/api/seller/recharge/reduceMoneyFromSellerFund', {
        sellerAccountId: this.sellerAccountId,
        money: this.input6,
        comment: this.input7,
        operateUserId: this.userInfo.channelAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '扣除成功'
          })
          this.dialogVisible_4 = false
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
    },
    // 给商家充值钱
    sure_6 () {
      this.$ajax.post('/api/seller/recharge/addMoneyToSellerFund', {
        sellerAccountId: this.sellerAccountId,
        money: this.input8,
        comment: this.input9,
        operateUserId: this.userInfo.channelAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '扣除成功'
          })
          this.dialogVisible_6 = false
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
    },
    sure_5 () {
      this.$ajax.post('/api/seller/initPwd', {
        sellerAccountId: this.sellerAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '密码重置成功'
          })
          this.dialogVisible_5 = false
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
    padding-bottom 40px
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
    .table
      position relative
    .pull
      position absolute
      top 100px
      right 0
      width 105px
      height 150px
      background #ffffff
      box-shadow 0px 3px 4px rgba(192, 204, 218, 1)
      border 1px solid #ffffff
      font-size 12px
      color #6092E0
      z-index 666
      line-height 30px
      text-align center
      cursor pointer
  .markets
    margin-top 20px
    span
      margin-right 28px
      vertical-align top
</style>
