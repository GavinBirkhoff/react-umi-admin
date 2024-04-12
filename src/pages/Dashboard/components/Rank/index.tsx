import { styled } from 'umi';

const RankWrapper = styled.div`
  height: 280px;
`;
const RankList = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  padding-top: 10px;
`;

const RankItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 51px;
  list-style: none;
  font-size: 13px;
  cursor: pointer;
  position: relative;
`;

const RankListItem = styled(RankItem)<{ $special: number }>`
  &::before {
    content: attr(data-index);
    background-color: ${({ $special }) =>
      $special < 3 ? '#000' : 'transparent'};
    width: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 50%;
    color: ${({ $special }) => ($special < 3 ? '#FFF' : '#000')};
    position: absolute;
    left: 0px;
  }

  a {
    color: #000;
    padding-left: 30px;
  }
`;

const data = [
  { shop: '北京市朝阳区三里屯路', sale: 9899 },
  { shop: '上海市浦东新区陆家嘴', sale: 8200 },
  { shop: '广州市天河区珠江新城', sale: 7200 },
  { shop: '深圳市福田区会展中心', sale: 6300 },
  { shop: '成都市武侯区锦里古街', sale: 5200 },
];

const Rank = () => {
  return (
    <RankWrapper>
      <RankList>
        {data &&
          data.map((item, index) => (
            <RankListItem key={index} $special={index} data-index={index + 1}>
              <a>{item.shop}</a>
              <span>{item.sale}</span>
            </RankListItem>
          ))}
      </RankList>
    </RankWrapper>
  );
};

export default Rank;
