import { useAuth } from '@/hooks';
import { Outlet, Navigate } from 'umi';

const RouteGuard: React.FC = (props)=> {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}

export default RouteGuard;