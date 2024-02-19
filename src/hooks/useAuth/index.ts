import { useEffect, useState } from 'react';
import storetify from 'storetify';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return { isLogin };
};

export default useAuth;
