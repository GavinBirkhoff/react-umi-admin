import { styled } from 'umi';

interface CardProps {
  children: React.ReactNode;
  header: { label: string; value: number };
  footer: { label: string; value: number };
}

const CardWarp = styled.div`
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #000;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
`;

const CardBody = styled.div`
  padding: 0 20px;
  height: 50px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-top: 1px solid #f7f7f7;
  font-size: 12px;
  margin: 0 5px;
  padding: 0 15px;
  box-sizing: border-box;
`;

const CardHeaderValue = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CardLabel = styled.span`
  margin-right: 10px;
`;

const Card: React.FC<CardProps> = ({ children, header, footer }) => {
  return (
    <CardWarp>
      <CardHead>
        <CardLabel>{header.label}</CardLabel>
        <CardHeaderValue>{header.value}</CardHeaderValue>
      </CardHead>
      <CardBody>{children}</CardBody>
      <CardFooter>
        <CardLabel>{footer.label}</CardLabel>
        <span>{footer.value}</span>
      </CardFooter>
    </CardWarp>
  );
};

export default Card;
