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
          <el-table-column prop="referees" label="推荐人" align="center">
          </el-table-column>
          <el-table-column prop="type" label="抽成类型" align="center">
          </el-table-column>
          <el-table-column prop="onePrice" label="单笔抽成/成本价" align="center">
          </el-table-column>
          <el-table-column prop="referessNum" label="推荐用户数" align="center">
          </el-table-column>
          <el-table-column prop="yu" label="账户余额" align="center">
          </el-table-column>
          <el-table-column prop="date" label="添加时间" align="center">
          </el-table-column>
          <el-table-column prop="lastDate" label="最后修改时间" align="center">
          </el-table-column>
          <el-table-column prop="market" label="备注" align="center">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_1 = false">确 定</el-button>
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
        <el-button type="primary" @click="dialogVisible_2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'pushManger',
  data () {
    return {
      dialogVisible: false,
      dialogVisible_1: false,
      dialogVisible_2: false,
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
      type: [{
        value2: '选项1',
        label: '黄金糕'
      }, {
        value2: '选项2',
        label: '双皮奶'
      }],
      value2: '',
      billType: [{
        value3: '选项1',
        label: '下单获得利润'
      }, {
        value3: '选项2',
        label: '利润结算'
      }, {
        value3: '选项3',
        label: '用户退款扣除利润'
      }, {
        value3: '选项4',
        label: '其它'
      }],
      value3: '',
      tableData: [{
        referees: '张胜男',
        date: '2017-02-01',
        type: '无',
        onePrice: '1.2',
        referessNum: '5',
        yu: '3.00',
        lastDate: '2017-02-01',
        market: '已付款'
      }]
    }
  },
  methods: {
    handleClick () {
      this.$router.push({ name: 'profits' })
    },
    // 当点击修改触发的事件
    handleClickChange () {
      this.dialogVisible = true
    },
    // 当点击调账触发的事件
    handleClickBill () {
      this.dialogVisible_1 = true
    },
    // 当点击添加推荐人触发事件
    addReferees () {
      this.dialogVisible_2 = true
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
