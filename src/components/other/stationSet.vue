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
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
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
            <el-button type="primary">确定</el-button>
          </p>
        </el-tab-pane>
        <el-tab-pane label="用户升级规则设置" name="second">
          <el-table :data="tableData" stripe style="width: 700px" border="true">
            <el-table-column prop="vip" label="会员等级" align="center">
            </el-table-column>
            <el-table-column prop="upgrade" label="升级条件" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClickChange(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="快递价格设置" name="third">
          <el-table :data="priceSet" stripe style="width: 700px" border="true">
            <el-table-column prop="company" label="物流公司" align="center">
            </el-table-column>
            <el-table-column prop="level" label="会员等级" align="center">
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
        <el-select v-model="value1" placeholder="请选择">
          <el-option v-for="item in coinPay" :key="item.value1" :label="item.label" :value="item.value1">
          </el-option>
        </el-select>
        <span>元后自动升级到该等级</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 快递价格设置的弹框 -->
    <div class="cover">
      <el-dialog title="设计价格" :visible.sync="dialogVisible_1" width="40%" :before-close="handleClose">
        <span>价格</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option v-for="item in setPrice" :key="item.value2" :label="item.label" :value="item.value2">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible_1 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
      coinPay: [{
        value1: '选项1',
        label: '黄金糕'
      }, {
        value1: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',
      setPrice: [{
        value2: '选项1',
        label: '黄金糕'
      }, {
        value2: '选项5',
        label: '北京烤鸭'
      }],
      value2: '',
      tableData: [{
        vip: '注册用户',
        upgrade: '累计充值1元'
      }, {
        vip: '注册用户',
        upgrade: '累计充值1元'
      }, {
        vip: '注册用户',
        upgrade: '累计充值1元'
      }, {
        vip: '注册用户',
        upgrade: '累计充值1元'
      }],
      priceSet: [{
        company: '圆通',
        level: '注册用户',
        price: '3.00'
      }, {
        company: '圆通',
        level: '注册用户',
        price: '3.00'
      }, {
        company: '圆通',
        level: '注册用户',
        price: '3.00'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    handleClickChange () {
      this.dialogVisible = true
    },
    handleClickPrice () {
      this.dialogVisible_1 = true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.stationSet
  padding 20px
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
</style>
