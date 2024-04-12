import Chart, { EChartsOption } from '@/components/Charts/Chart';
import { styled } from 'umi';

const DemoWrapper = styled.div`
  height: 280px;
`;

const DemoBarSale = () => {
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: 30,
      right: 2,
      top: 15,
      bottom: 40,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 180, 210, 160, 140, 230],
        type: 'bar',
        barWidth: 20,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };
  return (
    <DemoWrapper>
      <Chart options={options} />
    </DemoWrapper>
  );
};

export default DemoBarSale;
