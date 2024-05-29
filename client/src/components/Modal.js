import React from 'react';
import styled from 'styled-components';

const ModalContent = ({ children }) => (
  <Content onClick={(e) => e.stopPropagation()}>
    {children}
  </Content>
);

export { ModalContent };

const Content = styled.div`

position: fixed; /* 부모의 상대 위치에 절대 위치 */
top: 50%; /* 뷰포트의 세로 중앙 */
left: 50%; /* 뷰포트의 가로 중앙 */
width: 300px;
height: 280px;
transform: translate(-50%, -50%); 
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;

flex-direction: column;
background-color: white;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 
`;