import { useAuth } from '@/hooks';
import React from 'react';
import { Navigate } from 'umi';

const withAuth = (Component: React.ComponentType<any>) => {
  return (props: React.ComponentProps<any>) => {
    const { isLogin } = useAuth();
    if (isLogin) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default withAuth;
