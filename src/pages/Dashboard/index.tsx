import React from 'react';
import styles from './index.less';
import { PageContainer } from '@/components';

export default function Page() {
  return (
    <PageContainer>
      <h1 className={styles.title}>Page Dashboard</h1>
    </PageContainer>
  );
}
