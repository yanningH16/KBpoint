<template>
  <div class="stationSet">
    <div class="wrap">
      <h3>站点设置</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本设置" name="first">
          <p class="first">
            <span>站点名称</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </p>
          <p class="first">
            <span>收款类型</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="first">
            <span>收款账号</span>
            <el-input disabled v-model="input1" placeholder="请输入内容"></el-input>
          </p>
          <p class="first">
            <span>客服电话</span>
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </p>
          <p class="first">
            <span>客服微信</span>
            <el-input v-model="input3" placeholder="请输入内容"></el-input>
          </p>
          <p class="first">
            <span class="qq">在线客服(QQ)</span>
            <el-input v-model="input4" placeholder="请输入内容"></el-input> <br>
            <span class="statement">多个客服QQ用逗号</span>
          </p>
          <p class="primary">
            <el-button type="primary" @click="sure">确定</el-button>
          </p>
        </el-tab-pane>
        <el-tab-pane label="用户升级规则设置" name="second">
          <el-table :data="tableData" stripe style="width: 700px" border="true">
            <el-table-column prop="levelDetail" label="会员等级" align="center">
            </el-table-column>
            <el-table-column prop="conditionNeed" label="升级条件" align="center">
              <template slot-scope="scope">
                <span>累计充值满{{scope.row.conditionNeed}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClickChange(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="cover"></div>
        </el-tab-pane>
        <el-tab-pane label="快递价格设置" name="third">
          <el-table :data="priceSet" stripe style="width: 700px" border="true">
            <el-table-column prop="logisticsTypeDetail" label="物流公司" align="center">
            </el-table-column>
            <el-table-column prop="levelDetail" label="会员等级" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格(元/单)" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClickPrice(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 用户升级设置的弹框 -->
    <div class="cover">
      <el-dialog title="修改升级条件" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <span>用户累计</span>
        <el-input v-model="value1" placeholder=''></el-input>
        <span>元后自动升级到该等级</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataLevel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 快递价格设置的弹框 -->
    <div class="cover">
      <el-dialog title="设计价格" :visible.sync="dialogVisible_1" width="40%" :before-close="handleClose">
        <span>价格</span>
        <el-input v-model="value2" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_1 = false">取 消</el-button>
          <el-button type="primary" @click="sure_1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" >
import { mapGetters } from 'vuex'
export default {
  name: 'stationSet',
  data () {
    return {
      activeName: 'first',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      dialogVisible: false,
      dialogVisible_1: false,
      id: '',
      options: [{
        value: '银行卡转账',
        label: '银行卡转账'
      }],
      value: '银行卡转账',
      value1: '',
      value2: '',
      tableData: [],
      priceSet: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.getInfo()
  },
  methods: {
    handleClick (tab, event) {
      if (this.activeName === 'first') {
        this.getInfo()
      } else if (this.activeName === 'second') {
        this.setInfo()
      } else if (this.activeName === 'third') {
        this.getPrice()
      }
    },
    // 获取分站基本信息
    getInfo () {
      this.$ajax.post('/api/substation/getBaseStationInfo', {
        substationId: this.userInfo.substationId
      }).then((data) => {
        let res = data.data.data
        if (data.data.code === '200') {
          this.input = res.substationName
          this.input1 = res.recipetContent
          this.input2 = res.serviceTelephone
          this.input3 = res.serviceWechatNum
          this.input4 = res.serviceQQ
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
    // 修改分站的基本信息
    sure () {
      this.$ajax.post('/api/substation/updateBaseStationInfo', {
        substationId: this.userInfo.substationId,
        substationName: this.input,
        recipetType: '1',
        recipetTypeDetail: this.value,
        recipetContent: this.input1,
        serviceQQ: this.input4,
        serviceWechatNum: this.input3,
        serviceTelephone: this.input2
      }).then(data => {
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getInfo()
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
    // 获取用户升级规则设置
    setInfo () {
      this.$ajax.post('/api/substation/getLevelUpList', {
        substationId: this.userInfo.substationId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (const word of res.data) {
            let obj = {
              levelDetail: word.levelDetail,
              conditionNeed: word.conditionNeed,
              id: word.id
            }
            arr.push(obj)
          }
          this.tableData = arr
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    // 用户升级规则设置的修改
    handleClickChange (val) {
      this.value1 = ''
      this.dialogVisible = true
      this.id = val.id
    },
    updataLevel () {
      this.$ajax.post('/api/substation/updateLevelUpRule', {
        id: this.id,
        condition: this.value1
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.setInfo()
        }
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    // 获取快递价格设置
    getPrice () {
      this.$ajax.post('/api/substation/getChargeRuleList', {
        substationId: this.userInfo.substationId,
        logisticType: 1
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (const word of res.data) {
            let obj = {
              logisticsTypeDetail: word.logisticsTypeDetail,
              levelDetail: word.levelDetail,
              price: word.price,
              id: word.id
            }
            arr.push(obj)
          }
          this.priceSet = arr
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    handleClickPrice (val) {
      this.id = val.id
      this.dialogVisible_1 = true
    },
    sure_1 () {
      if (this.value2 < 2.8) {
        this.$message({
          message: '修改价格不能低于2.8/单',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/substation/updateChargeRule', {
        id: this.id,
        price: this.value2
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogVisible_1 = false
          this.getPrice()
        }
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.stationSet
  padding 20px 0 20px 20px
  font-size 14px
  .wrap
    background #ffffff
    padding 20px
    padding-bottom 50px
    h3
      color #333
      padding 10px 0 10px 20px
      border-bottom 1px solid #ccc
      margin-bottom 20px
    .first
      margin-top 20px
      span
        margin-left 40px
        margin-right 20px
      .qq
        margin-left 10px
      .statement
        margin-left 118px
        font-size 12px
        color #ff3341
        display inline-block
        margin-top 5px
    .primary
      margin-left 233px
      margin-top 40px
    .cover
      width 720px
      height 120px
      background white
      position absolute
      top 271px
      left 0
      z-index 999
</style>
