import memberAll from './member-all'
import memberStore from './member-store'

export const inRoutes=[
  ...memberAll,
  ...memberStore
]

export default [
  {
    path: '/',
    component: './index/index',
    // redirect: '/member-all',
  },
  {
    path: '/',
    component: '../layouts',
    routes: inRoutes
  }
]
