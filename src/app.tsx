import {history} from 'umi'
import {currentUser as queryCurrentUser} from "@/services/user"

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(){
    console.log('getInitialState');
    const fetchUserInfo = async () => {
        const msg = await queryCurrentUser();
        if(msg.success){
            return msg.data
        }else{
            history.push(loginPath);
        }
    };
    // 如果不是登录页面，执行
    const { location } = history;
    if (location.pathname !== loginPath) {
      const currentUser = await fetchUserInfo();
      return {
        fetchUserInfo,
        currentUser,
      };
    }
    return {
      fetchUserInfo,
    };
  }