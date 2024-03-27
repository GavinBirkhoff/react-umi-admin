import { PageContainer } from '@/components';
import Card from './components/Card';

export default function Page() {
  return (
    <PageContainer>
      <Card
        header={{ label: '用户总数', value: 9899 }}
        footer={{ label: '日增用户数', value: 99 }}
      >
        Card
      </Card>
    </PageContainer>
  );
}
