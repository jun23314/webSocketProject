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
        {who === 'me' ? (
          <>
      <div>

      <ChatBody who={who}>

      
            <MessageSub who={who}>
              <Time>{messageContent.time}</Time>
            </MessageSub>

            <MessageBody who={who}>
              <MessageText who={who}>같이 주사위 게임 해요</MessageText>
              <JoinBody who={who}>
                <JoinText who={who} onClick={onJoinClick}>GO</JoinText>
              </JoinBody>
            </MessageBody>
       
      
      </ChatBody>

      </div>
      </>
      ) : (
        <>
      <div>

      <MessageSub who={who}>
      <Author>{messageContent.author}</Author>
      </MessageSub>

      <ChatBody who={who}>

        <MessageBody who={who}>
          <MessageText who={who}>같이 주사위 게임 해요</MessageText>
           <JoinBody who={who}>
            <JoinText who={who} onClick={onJoinClick}>GO</JoinText>
           </JoinBody>
        </MessageBody>
          
        <MessageSub who={who}>
           <Time>{messageContent.time}</Time>
        </MessageSub>

      </ChatBody>

      </div>
      </>
    )}
    </MessageContainer>
    
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  padding: 10px;
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

const ChatBody = styled.div`
  min-height: 40px;
  max-width: 550px;
  display: flex;
  align-items: center;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
`;

const MessageText = styled.p`
  margin: 0 5px;
  color: ${({ who }) => (who === 'me' ? '#000000' : '#FFFFFF')};
`;

const JoinBody = styled.div`
  min-height: 12px;
  max-width: 550px;
  border-radius: 10px;
  border: 2px solid #000000;
  color: white;
  display: flex;
  align-items: center;
  margin: 0 1px;
  padding: 0 3px;
  overflow-wrap: break-word;
  word-break: break-all;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  background-color: ${({ who }) => (who === 'me' ? '#000000' : '#FFFFFF')};
`;

const JoinText = styled.p`
  margin: 3px;
  font-weight: 700;
  color: ${({ who }) => (who === 'me' ? '#FFFFFF' : '#000000')};
`;

const MessageSub = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  margin-right: ${({ who }) => (who === 'me' ? '10px' : '')};
  margin-left: ${({ who }) => (who === 'me' ? '' : '10px')};
`;

const Time = styled.p`
  margin: ${({ who }) => (who === 'me' ? '12px 0 0 10px' : '12px 10px 0 0')};
`;

const Author = styled.p`
  margin-top: 5px;
  margin-left: 0;
  font-weight: bold;
`;
