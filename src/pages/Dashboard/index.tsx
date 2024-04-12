import { PageContainer } from '@/components';
import { Col, Progress, Row } from 'antd';
import { styled } from 'umi';
import Card from './components/Card';
import { DemoBar, DemoBarSale, DemoLine, DemoPie } from './components/Charts';
import Rank from './components/Rank';
import Trend from './components/Trend';
import Yoy from './components/Yoy';

const PageWrapper = styled(PageContainer)`
  background-color: transparent !important;
  padding: 0;
`;

export default function DashboardPage() {
  return (
    <PageWrapper>
      <Row gutter={20}>
        <Col span={6}>
          <Card
            header={{ label: '用户总数', value: 9899 }}
            footer={{ label: '日增用户数', value: 99 }}
          >
            <Yoy yod={18} yow={-7} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            header={{ label: '总访问量', value: 9899 }}
            footer={{ label: '日访问量', value: 99 }}
          >
            <DemoLine />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            header={{ label: '支付笔数', value: 9899 }}
            footer={{ label: '转化率', value: '70%' }}
          >
            <DemoBar />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            header={{ label: '总销售额', value: 9899 }}
            footer={() => <Yoy yod={18} yow={-7} />}
          >
            <Progress percent={50} status="active" />
          </Card>
        </Col>
        <Col span={14}>
          <Card title={'销售额'}>
            <DemoBarSale />
          </Card>
        </Col>
        <Col span={10}>
          <Card title={'销售门店销售额排名额'}>
            <Rank />
          </Card>
        </Col>
        <Col span={14}>
          <Card title={'线上热门搜索'}>
            <Trend />
          </Card>
        </Col>
        <Col span={10}>
          <Card title={'销售额类别占比'}>
            <DemoPie />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
}
