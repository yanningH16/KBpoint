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
      <ul style="margin-top:20px">
        <li>
          用户名:&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="input1" placeholder=""></el-input>
        </li>
        <li>
          <span>电话:</span>
          <el-input v-model="input2" placeholder=""></el-input>
        </li>
        <li>
          IP:
          <el-input v-model="input3" placeholder=""></el-input>
        </li>
      </ul>
      <ul class="ulTow">
        <li>
          QQ:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input v-model="input" placeholder=""></el-input>
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
          <el-table-column prop="name" label="用户名" width="120" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机" width="120" align="center">
          </el-table-column>
          <el-table-column prop="QQ" label="QQ" width="120" align="center">
          </el-table-column>
          <el-table-column prop="wechat" label="微信" width="120" align="center">
          </el-table-column>
          <el-table-column prop="yu" label="余额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="cumulative" label="累计充值" width="120" align="center">
          </el-table-column>
          <el-table-column prop="level" label="会员等级" width="120" align="center">
          </el-table-column>
          <el-table-column prop="price" label="圆通价" width="120" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120" align="center">
          </el-table-column>
          <el-table-column prop="waitingState" label="审核状态" width="120" align="center">
          </el-table-column>
          <el-table-column prop="date" label="注册时间" width="150" align="center">
          </el-table-column>
          <el-table-column prop="referees" label="推荐人" width="150" align="center">
          </el-table-column>
          <el-table-column prop="invitation" label="邀请码" width="150" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">设置审核状态</el-button>
              <el-button type="text" size="small" @click="handleClickCecal(scope.row)">设置等级/价格</el-button>
              <el-button type="text" size="small" @click="pull">更多
                <i class="el-icon-caret-bottom"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 下拉列表 -->
        <div class="pull" v-show="pullClick">
          <p @click="auditPerson">设置推荐人</p>
          <p @click="stop">禁用</p>
          <p @click="deduct">扣除余额</p>
          <p @click="userPay">用户充值</p>
          <p @click="reset">重置密码</p>
        </div>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置等级价格的弹框 -->
    <el-dialog title="设置用户等级和价格" :visible.sync="dialogVisible_1" width="30%" :before-close="handleClose">
      <p style="margin-left:28px">
        <span>等级</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option v-for="item in level" :key="item.value2" :label="item.label" :value="item.value2">
          </el-option>
        </el-select>
      </p>
      <p style="margin-top:20px">
        <span>圆通价格</span>
        <el-input v-model="input4" placeholder=""></el-input> <br>
        <em style="font-size:12px;color:#ff3341;margin-left:58px">皇冠以上可自定义价格</em>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置推荐人弹框 -->
    <el-dialog title="设置推荐人" :visible.sync="dialogVisible_2" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        <span>推荐人</span>
        <el-input v-model="input5" placeholder=""></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击禁用触发的事件 -->
    <el-dialog title="禁用用户" :visible.sync="dialogVisible_3" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        你确定禁用6546546用户么
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_3 = false">确 定</el-button>
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
        <el-button type="primary" @click="dialogVisible_4 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击充值密码触发的事件 -->
    <el-dialog title="重置密码" :visible.sync="dialogVisible_5" width="30%" :before-close="handleClose">
      <p style="margin-top:20px">
        你确定要充值6546546用户密码么?请谨慎操作
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_5 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_5 = false">确 定</el-button>
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
      <p style="margin-top:20px">
        <span>收款卡号</span>&nbsp;
        <el-input v-model="input10" placeholder=""></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_6 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_6 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'userManger',
  data () {
    return {
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_2: false,
      dialogVisible_3: false,
      dialogVisible_4: false,
      dialogVisible_5: false,
      dialogVisible_6: false,
      pullClick: false,
      currentPage: 1,
      pageSize: 5,
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
      userLevel: [{
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
      userState: [{
        value5: '选项3',
        label: '蚵仔煎'
      }, {
        value5: '选项4',
        label: '龙须面'
      }],
      value5: '',
      value1: '',
      audit: [{
        value1: '选项3',
        label: '蚵仔煎'
      }, {
        value1: '选项4',
        label: '龙须面'
      }],
      value2: '',
      level: [{
        value2: '选项3',
        label: '蚵仔煎'
      }, {
        value2: '选项4',
        label: '龙须面'
      }],
      tableData: [{
        name: '5454545454',
        phone: '1510251321031',
        QQ: '15415154',
        wechat: '54654546546',
        yu: '5',
        cumulative: '11',
        level: 5,
        price: 5,
        state: '正常',
        waitingState: '审核通过',
        date: '2017-02-01',
        referees: '卧槽',
        invitation: 'dfld'
      }]
    }
  },
  methods: {
    handleClick () {
      this.dialogVisible = true
    },
    handleClickCecal () {
      this.dialogVisible_1 = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    pull () {
      this.pullClick = !this.pullClick
    },
    // 当点击设置推荐人触发的事件
    auditPerson () {
      this.dialogVisible_2 = true
    },
    // 当点击禁用的时候触发
    stop () {
      this.dialogVisible_3 = true
    },
    // 当点击扣除金额触发的事件
    deduct () {
      this.dialogVisible_4 = true
    },
    // 当点击用户充值触发的事件
    userPay () {
      this.dialogVisible_6 = true
    },
    // 当点击充值密码触发的事件
    reset () {
      this.dialogVisible_5 = true
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
      top 92px
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
