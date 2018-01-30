const taskList = () =>
  import(/* webpackChunkName: "taskList" */ '@/components/order/taskList')
const orderList = () =>
  import(/* webpackChunkName: "orderList" */ '@/components/order/orderList')
const order = [{
  path: 'order/taskList',
  component: taskList,
  name: 'taskList',
  meta: { title: '任务列表' }
}, {
  path: 'order/orderList',
  component: orderList,
  name: 'orderList',
  meta: { title: '订单列表' }
}]

export default order
