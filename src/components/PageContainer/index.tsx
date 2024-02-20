import { withAuth } from '@/hocs';
import styles from './index.less';

interface PageContainerProps {
  children?: React.ReactNode;
  overlayClassName?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <main className={styles.PageContainer}>{children}</main>;
};

export default withAuth(PageContainer)
