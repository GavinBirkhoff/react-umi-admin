import { styled } from 'umi';

interface YoyProps {
  yod: number;
  yow: number;
}

const YoyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 50px;
`;
const YoyItem = styled.div`
  width: 50%;
`;
const YoyLabel = styled.span`
  font-size: 12px;
  color: #666;
  margin-right: 5px;
`;

const YoyValue = styled.span<{ value: number }>`
  font-size: 12px;
  color: ${(props) => {
    if (props.value > 0) {
      return '#FF0000'; // 涨了，红色
    } else if (props.value < 0) {
      return '#008000'; // 跌了，绿色
    } else {
      return '#000000'; // 零，黑色
    }
  }};
`;

const Yoy: React.FC<YoyProps> = (props) => {
  const { yod, yow, ...restProps } = props;

  const formatPercentage = (value: number) => {
    if (value > 0) {
      return `+${value}%`; // 正数加+号
    } else {
      return `${value}%`; // 负数或零
    }
  };

  return (
    <YoyWrapper {...restProps}>
      <YoyItem>
        <YoyLabel>周同比</YoyLabel>
        <YoyValue value={yow}>{formatPercentage(yow)}</YoyValue>
      </YoyItem>
      <YoyItem>
        <YoyLabel>日同比</YoyLabel>
        <YoyValue value={yod}>{formatPercentage(yod)}</YoyValue>
      </YoyItem>
    </YoyWrapper>
  );
};

export default Yoy;
