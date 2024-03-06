import { useNavigate } from 'umi';
import styles from './index.less';

const LogPanel = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate('/');
      }}
      className={styles.logo}
    >
      <img className={styles.logoImg} src="/logo.svg" />{' '}
      <strong>R-ADMIN</strong>
    </div>
  );
};

export default LogPanel;
