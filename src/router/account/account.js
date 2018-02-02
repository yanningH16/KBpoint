const userManger = () =>
  import(/* webpackChunkName: "userManger" */ '@/components/account/userManger')
const pushManger = () =>
  import(/* webpackChunkName: "pushManger" */ '@/components/account/pushManger')
const Profits = () =>
  import(/* webpackChunkName: "Profits" */ '@/components/account/profits')
const account = [{
  path: 'account/userManger',
  component: userManger,
  name: 'userManger',
  meta: { title: '用户管理' }
}, {
  path: 'account/pushManger',
  component: pushManger,
  name: 'pushManger',
  meta: { title: '推荐人管理' }
}, {
  path: 'account/profits',
  component: Profits,
  name: 'profits',
  meta: { title: '利润明细' }
}]

export default account
