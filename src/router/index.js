import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          name:'equipment_manage',
          path: '/equipment_manage',
          component: () => import(/* webpackChunkName: "equipment_manage" */ '../components/page/EquipmentManage.vue'),
          meta: { title: '装备管理' }
        },
        {
          path: '/logistics_manage',
          component: () => import(/* webpackChunkName: "equipment_manage" */ '../components/page/LogisticsManage.vue'),
          meta: { title: '后勤保障管理' }
        },
        {
          path: '/table',
          component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
          meta: { title: '战损评估' }
        },
        {
          path: '/tabs',
          component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
          meta: { title: '消息中心' }
        },
        {
          // markdown组件
          path: '/edgexandcloud',
          component: () => import(/* webpackChunkName: "markdown" */ '../components/page/EdgexAndCloud.vue'),
          meta: { title: '云边协同' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
          meta: { title: '车辆管理' }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
});
