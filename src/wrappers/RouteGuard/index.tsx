import { useEffect } from 'react';
import storetify from 'storetify';
import { useLocation, history } from 'umi';

const RouteGuard = ()=> {
  const location = useLocation();

  useEffect(() => {
    const token = storetify('tokenKey');
    if (!token && location.pathname !== '/login') {
      // 如果本地没有 token 并且当前路径不是登录页面，则跳转到登录页面
      history.push('/login');
    }
  }, [location.pathname]);

  return null; // 路由守卫组件不需要渲染任何内容，直接返回 null
}

export default RouteGuard;