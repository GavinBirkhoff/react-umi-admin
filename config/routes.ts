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
        path: '/profile',
        component: 'Profile',
      },
      {
        path: '/user',
        component: 'User',
      },
      {
        path: '/docs',
        component: 'Docs',
      },
    ],
  },
  { path: '*', component: '404' },
];

export default routes;
