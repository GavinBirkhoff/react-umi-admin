import storetify from 'storetify';
import { useModel } from 'umi';

const useAuth = () => {
  const { initialState } = useModel('@@initialState');
  const isLogin = !!storetify(TOKEN_KEY) && !!initialState?.currentUser.user;

  return { isLogin };
};

export default useAuth;
