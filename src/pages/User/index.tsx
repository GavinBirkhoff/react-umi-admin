import { Button } from 'antd';
import styles from './index.less';

const UserPage = ()=> {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
export default UserPage