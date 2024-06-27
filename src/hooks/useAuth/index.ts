import storetify from 'storetify';
import { useModel } from 'umi';

const useAuth = () => {
  const { initialState } = useModel('@@initialState');
  // 判断是否是登陆状态
  const isLogin = !!storetify(TOKEN_KEY) && !!initialState?.currentUser.user;

  return { isLogin };
};

export default useAuth;
