const stationSet = () =>
  import(/* webpackChunkName: "stationSet" */ '@/components/other/stationSet')
const other = [{
  path: 'other/stationSet',
  component: stationSet,
  name: 'stationSet',
  meta: { title: '站点设置' }
}]

export default other
