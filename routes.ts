const routes = [
  { path: "/login", component: "Login",layout: false  },
  {
    path: '/',
    routes: [
      { path: '/', component: 'Dashboard' },
      { path: '/user', component: 'User' },
    ],
    wrappers: [
      '@/wrappers/RouteGuard', // 使用路由守卫
    ],
  },
  { path:"*", component:'NotFound' }
]

export default routes