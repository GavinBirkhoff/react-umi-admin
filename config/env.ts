// 配置多环境下的环境变量
const getEnv = () => {
  switch (process.env.UMI_ENV) {
    case 'staging':
      return {
        BASE_URL: process.env.STAGING_BASE_URL,
      };
    case 'pd':
      return {
        BASE_URL: process.env.PD_BASE_URL,
      };
  }
};

const env = getEnv();

export default env;
