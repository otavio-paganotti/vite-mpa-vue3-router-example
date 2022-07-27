import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@dashboard/layouts/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@dashboard/views/Index.vue'),
      }
    ],
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
