import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Init from 'components/common/init';

import { useRecoilValue } from 'recoil';
import { currentUserName } from 'recoil/common';
import { sockets } from 'recoil/socket';

// interface UserSocket {
//   [key: string]: string;
// }

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 20vh;
`;

const ScoreWrapper = styled.div`
  background-color: #fff;
  width: 15vw;
  height: 60vh;
  border-radius: 20px;
`;

const ScoreTitle = styled.div`
  text-align: center;
  line-height: 50px;
`;

const ScoreContentsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 50px;
`;
const ScoreContent1 = styled.div``;
const ScoreContent2 = styled.div``;

const GameWrapper = styled.div`
  background-color: #fff;
  width: 50vw;
  height: 60vh;
  border-radius: 20px;
`;

const Greeting = styled.div`
  text-align: center;
  line-height: 50px;
`;

const HintWrapper = styled.div`
  text-align: center;
  line-height: 36vh;
`;
const HintImg = styled.div``;

const AnswerForm = styled.form`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const AnswerInput = styled.input`
  width: 65%;
  height: 100px;
  background: pink;
  border: none;
  font-size: 1.5rem;
  text-align: center;
`;

const AnswerButton = styled.button`
  width: 15%;
  height: 100px;
  background: yellow;
`;

const ChatWrapper = styled.div`
  background-color: #fff;
  width: 15vw;
  height: 60vh;
  border-radius: 20px;
`;

const ChatTitle = styled.div`
  text-align: center;
  line-height: 50px;
`;

const CustomHR = styled.div`
  border: 0;
  height: 1px;
  background-color: black;
`;

const Main = () => {
  const [answer, setAnswer] = useState('');
  const myName = useRecoilValue(currentUserName);
  const socket = useRecoilValue(sockets);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!answer.length) alert('정답을 입력하세요');
    else {
      setAnswer('');
      socket.emit('send answer', {
        userName: myName,
        answer: answer
      });
    }
  };

  useEffect(() => {
    if (myName) {
      socket.emit('login notify', {
        socketID: socket.id,
        userName: myName
      });
      socket.off('get current users');
      socket.on('get current users', (userData: any) => {
        setAllUsers(Object.values(userData));
      });
    
      socket.off('receive answer');
      socket.on('receive answer', (receiveData: any) => {
        setChatList((chatList:string[]) => chatList.concat(receiveData));
      });
    }
  }, [myName, socket]);

  const UserList = allUsers.length ? allUsers.map((data: any) => (
    <ScoreContentsWrapper>
      <ScoreContent1>{data.userName}</ScoreContent1>
      <ScoreContent2>{data.answerNum}</ScoreContent2>
    </ScoreContentsWrapper>
  )) : <></>;

  const ChatLists = chatList.length ? chatList.map((data: any) => (
    <ScoreContentsWrapper>
      <ScoreContent1>{data.userName}</ScoreContent1>
      <ScoreContent2>{data.answer}</ScoreContent2>
    </ScoreContentsWrapper>
  )) : <></>;

  return (
    <MainContainer>
      <Init />
      <ScoreWrapper>
        <ScoreTitle>스코어보드</ScoreTitle>
        <CustomHR />
        <ScoreContentsWrapper>
          <ScoreContent1>유저</ScoreContent1>
          <ScoreContent2>점수</ScoreContent2>
        </ScoreContentsWrapper>
        <CustomHR />
        {UserList}
      </ScoreWrapper>
      <GameWrapper>
        <Greeting>{myName}님 안녕하세요!</Greeting>
        <HintWrapper>
          <HintImg>힌트</HintImg>
        </HintWrapper>
        <AnswerForm onSubmit={onSubmit}>
          <AnswerInput
            placeholder="정답을 입력하세요"
            type="answer"
            name="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            autoComplete="off"
          />
          <AnswerButton type="submit">맞추기</AnswerButton>
        </AnswerForm>
      </GameWrapper>
      <ChatWrapper>
        <ChatTitle>채팅 창</ChatTitle>
        <CustomHR />
        {ChatLists}
      </ChatWrapper>
    </MainContainer>
  );
};

export default Main;
