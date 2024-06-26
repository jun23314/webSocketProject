import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat';
import styled from 'styled-components';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== '' && room !== '') {
      socket.emit('join_room', { room, username });
      setShowChat(true);
    } else {
      setErrorMsg('사용자 이름과 입장할 방을 입력해주세요.');
    }
  };

  return (
    <ChatApp>
      {!showChat ? (
        <ChatContainer>
          <ChatTitle>컴퓨터 네트워크 17조</ChatTitle>
          <ChatInput
            type='text'
            placeholder='사용할 이름을 입력해주세요'
            onChange={(e) => {
              setErrorMsg('');
              setUsername(e.target.value);
            }}
          />
          <ChatInput
            type='text'
            placeholder='입장할 방을 입력해주세요'
            onChange={(e) => {
              setErrorMsg('');
              setRoom(e.target.value);
            }}
          />
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <ChatButton onClick={joinRoom}>JOIN</ChatButton>
        </ChatContainer>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </ChatApp>
  );
}

export default App;

const ChatApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #212121;
  display: grid;
  place-items: center;
`;

const ChatContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 2px solid #000000;
  border-radius: 6px;
  padding: 10px;
  width: 300px;
`;
const ChatTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 1rem;
  color: #000000;
`;
const ChatInput = styled.input`
  height: 35px;
  margin: 7px;
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  height: 10px;
  font-size: 0.8rem;
`;

const ChatButton = styled.button`
  width: 120px;
  height: 50px;
  margin: 10px auto;
  border: none;
  border-radius: 20px;
  padding: 5px;
  font-size: 16px;
  background: #000000;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background: rgb(35, 65, 89);
    transition: all 0.5s;
  }
  &:active {
    font-size: 0.8rem;
  }
`;
