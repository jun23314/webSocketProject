import React, { useEffect, useRef, useState } from 'react';
// import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from './Message';
import { GameMessage } from './GameMessage';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ModalContent } from './Modal';
import Game from './game/Game';
import logo from "./game/assets/logo.svg";

function Chat({ socket, username, room }) {
  const inputRef = useRef();
  const [messageList, setMessageList] = useState([]);

  const messageBottomRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const sendMessage = async (message=null,type='text') => {
    const currentMsg = message || inputRef.current.value;
    if (currentMsg !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMsg,
        type: type,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      if (!message) {
        inputRef.current.value = '';
      } 
    }
  };
  
  const sendDiceGameMessage = async () => {
    const diceGameMessage = "주사위 게임 시작";
    sendMessage(diceGameMessage, 'diceGame');
  };

  const sendTextMessage = async () => {
    sendMessage(null, 'text');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitle>{room}번 채팅방</RoomTitle>
      </RoomHeader>
      <RoomBody>
        <MessageBox>
          {messageList.map((messageContent) => {
            if (messageContent.type === 'diceGame') {
              return (
                <GameMessage
                  messageContent={messageContent}
                  username={username}
                  onJoinClick={openModal}
                  key={uuidv4()}
                />
              
              );
            } else {
              return (
                <Message
                  messageContent={messageContent}
                  username={username}
                  key={uuidv4()}
                />
              );
            }
          })}
        
          <div ref={messageBottomRef} />
        </MessageBox>
      </RoomBody>

      <ChatInputBox>
        <ChatInput
          ref={inputRef}
          type='text'
          placeholder='메세지를 입력해주세요'
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendDiceGameMessage}>
          <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </button>
        <ChatButton onClick={sendTextMessage}>▹</ChatButton>
    
      </ChatInputBox>

      {showModal && (
        
          <ModalContent>
            <Game/>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        
      )}

    </RoomContainer>
  );
}

export default Chat;

const RoomContainer = styled.div`
  width: 80%;
  max-width: 600px;
  @media screen and (max-width: 550px) {
    width: 90%;
  }
  height: 440px;
  position: relative; 
`;

const RoomHeader = styled.div`
  height: 40px;
  border-radius: 6px 6px 0 0;
  background: #355463;
  position: relative;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em 0 2em;
  color: #fff;
  font-weight: 700;
  line-height: 45px;
`;

const RoomBody = styled.div`
  height: 360px;
  border: 1px solid #355463;
  background: #fff;
  position: relative;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
`;

const ChatInputBox = styled.div`
  height: 40px;
  border: 1px solid #355463;
  border-top: none;
  display: flex;
  border-radius: 0 0 6px 6px;
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px dotted #355463;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  transition: all 0.5s;
  color: lightgray;
  &:hover {
    background: steelblue;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    /* transition: all 0.5s; */
    font-size: 0.5rem;
  }
`;
const DiceGameButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  transition: all 0.5s;
  color: lightgray;
  &:hover {
    background: steelblue;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    font-size: 0.5rem;
  }
`;
const CloseButton = styled.button`
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 12px; /* 모서리를 둥글게 */
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  top: 10px; /* 부모 컴포넌트의 상단에 위치 */
  right: 10px; /* 부모 컴포넌트의 오른쪽에 위치 */

  &:hover {
    background-color: lightgray; /* 호버 효과 (선택 사항) */
  }
`;
