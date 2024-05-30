import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const GameMessage = (props) => {
  const messageContent = props.messageContent;
  const username = props.username;
  const onJoinClick =props.onJoinClick
  const [who, setWho] = useState('me');

  useEffect(() => {
    username === messageContent.author ? setWho('me') : setWho('other');
  }, [props]);

  return (
    <MessageContainer who={who}>
      <div>
        <MessageBody who={who}>
          <MessageText who={who}>{"같이 주사위 게임 해요"}</MessageText>
          <button onClick={onJoinClick}>참여하기</button>
        </MessageBody>
        <MessageSub who={who}>
          <Time>{messageContent.time}</Time>
          <Author>{messageContent.author}</Author>
        </MessageSub>
      </div>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  padding: 0 10px;
  box-sizing: border-box;
`;

const MessageBody = styled.div`
  min-height: 40px;
  max-width: 550px;
  border-radius: 5px;
  border: 2px solid #000000;
  color: white;
  display: flex;
  align-items: center;
  margin: 0 3px;
  padding: 2px 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  background-color: ${({ who }) => (who === 'me' ? '#FFFFFF' : '#000000')};
`;

const MessageText = styled.p`
  margin: 0 5px;
  color: ${({ who }) => (who === 'me' ? '#000000' : '#FFFFFF')};
`;

const MessageSub = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  margin-right: ${({ who }) => (who === 'me' ? '10px' : '')};
  margin-left: ${({ who }) => (who === 'me' ? '' : '10px')};
`;

const Time = styled.p`
  margin-top: 5px;
  margin-right: 5px;
`;

const Author = styled.p`
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
`;
