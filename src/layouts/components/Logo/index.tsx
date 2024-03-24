import React from 'react';
import { styled, useNavigate } from 'umi';

interface LogoProps {
  theme?: 'light' | 'dark'; // 定义主题属性
}

const LogoWrapper = styled.div<{ theme: 'light' | 'dark' }>`
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
  line-height: 32px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const LogoImg = styled.img`
  width: 2em;
  height: 2em;
  margin: 10px 6px 10px 10px;
`;

const Logo: React.FC<LogoProps> = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  return (
    <LogoWrapper
      theme={theme}
      onClick={() => {
        navigate('/');
      }}
    >
      <LogoImg src="/logo.svg" alt="Logo" />
      <strong>G-ADMIN</strong>
    </LogoWrapper>
  );
};

export default Logo;
