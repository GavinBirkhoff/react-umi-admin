import { useNavigate } from 'umi';
import styles from './index.less'

const LogPanel = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate('/');
      }}
      className={styles.logo}
    >
      React Umi Admin
    </div>
  );
};

export default LogPanel;
