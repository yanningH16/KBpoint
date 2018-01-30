const leftMoney = () =>
  import(/* webpackChunkName: "leftMoney" */ '@/components/money/leftMoney')
const rechargeList = () =>
  import(/* webpackChunkName: "rechargeList" */ '@/components/money/rechargeList')
const profitList = () =>
  import(/* webpackChunkName: "profitList" */ '@/components/money/profitList')
const money = [{
  path: 'money/leftMoney',
  component: leftMoney,
  name: 'leftMoney',
  meta: { title: '账户余额' }
}, {
  path: 'money/rechargeList',
  component: rechargeList,
  name: 'rechargeList',
  meta: { title: '用户充值记录' }
}, {
  path: 'money/profitList',
  component: profitList,
  name: 'profitList',
  meta: { title: '利润报表' }
}]

export default money
