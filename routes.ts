const routes = [
  { path: '/login', component: 'Login', layout: false },
  {
    path: '/',
    routes: [
      {
        path: '/',
        component: 'Dashboard',
      },
      {
        path: '/user',
        component: 'User',
      },
    ],
  },
  { path: '*', component: '404' },
];

export default routes;
