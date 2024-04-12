import { withAuth } from '@/hocs';
import { theme } from 'antd';
import { PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'umi';

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const PageContainerWrapper = styled.div`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  transition: transform 0.1s ease-in-out, opacity 0.3s ease-in-out; /* 添加过渡效果 */
`;

const PageContainer: React.FC<PropsWithChildren<PageContainerProps>> = ({
  className,
  children,
}) => {
  // 使用状态来控制进场和出场动画
  const [isVisible, setIsVisible] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    setIsVisible(true); // 组件挂载时设置为可见，触发进场动画
  }, []);
  return (
    <PageContainerWrapper
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        transform: isVisible ? 'translateX(0)' : 'translateX(5%)', // 控制从右侧入场
        opacity: isVisible ? 1 : 0, // 控制透明度
      }}
      className={className}
    >
      {children}
    </PageContainerWrapper>
  );
};

export default withAuth(PageContainer);
