export default [
  {
    path: '/member-all',
    name: '会员分析-整体',
    component: './member-all/index',
    jspPage:true
  },
  {
    path: '/enterprise',
    name: '企业会员',
    component: './member-all/enterprise/list'
  },
  {
    path: '/single',
    name: '个人会员',
    component: './member-all/single/list'
  },
  {
    path: '/single/detail',
    name: '个人会员详情',
    component: './member-all/single/detail/detail',
    hidden: true
  },
  {
    path: '/potential',
    name: '潜在会员',
    component: './member-all/potential/list'
  }
]
