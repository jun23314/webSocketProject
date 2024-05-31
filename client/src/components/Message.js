import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Message = (props) => {
  const messageContent = props.messageContent;
  const username = props.username;
  /*const [who, setWho] = useState('me');
  useEffect(() => {
    username === messageContent.author ? setWho('me') : setWho('other');
  }, [props]);*/
  const who = username === messageContent.author ? 'me' : 'other';
  return (
    <MessageContainer who={who}>
       {who === 'me' ? (
          <>

      <div>

      <ChatBody who={who}>
        
          <MessageSub who={who}>
            <Time who={who}>{messageContent.time}</Time>
          </MessageSub>
      
          <MessageBody who={who}>
            <MessageText who={who}>{messageContent.message}</MessageText>
          </MessageBody>
         
      </ChatBody>

      </div>

        </>
      ) : (
        <>
        
        <div>

          <MessageSub who={who}>
            <Author who={who}>{messageContent.author}</Author>
          </MessageSub>

          <ChatBody who={who}>
            
              <MessageBody who={who}>
                <MessageText who={who}>{messageContent.message}</MessageText>
              </MessageBody>

              <MessageSub who={who}>
                <Time who={who}>{messageContent.time}</Time>
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
  padding: 2 5px;
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
  margin-left: 5px;
  font-weight: bold;
`;
