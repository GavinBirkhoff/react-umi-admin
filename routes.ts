const routes = [
  { path: "/login", component: "Login",layout: false  },
  {
    path: '/',
    routes: [
      { path: '/user', component: 'User' },
    ],
  },
  { path:"*", component:'NotFound' }
]

export default routes