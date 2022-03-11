import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Init from 'components/common/init';

import { useRecoilValue } from 'recoil';
import { currentUserName } from 'recoil/common';
import { sockets } from 'recoil/socket';

import AudioObj from 'song';
import henesys from 'song/Henesys.mp3';
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

const ScoreSubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 50px;
`;

const ScoreSubTitle1 = styled.div`
  width: 50%;
  text-align: center;
`;

const ScoreSubTitle2 = styled.div`
  width: 50%;
  text-align: center;
`;

const ScoreContentsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 40px;
`;

const ScoreContent1 = styled.div`
  width: 50%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
`;

const ScoreContent2 = styled.div`
  width: 50%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
`;

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

const ChatDiv = styled.div`
  padding: 0 10px 0 10px;
  line-height: 25px;
`;

const ChatContent = styled.div`
  font-size: 0.8rem;
  word-break: break-all;
`;

const ChatListWrapper = styled.div`
  width: 15vw;
  height: calc(100% - 50px);
  border-radius: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
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

  const audio = useRef<HTMLAudioElement>(henesys);

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
        setChatList((chatList: string[]) => chatList.concat(receiveData));
        document.querySelector('.chat-list')?.scrollBy({
          top: document.querySelector('.chat-list')?.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [myName, socket]);

  useEffect(() => {
    socket.off('correct answer');
    socket.on('correct answer', (answerInfo:{flag:Boolean, idx:Number}) => {
      console.log(answerInfo.flag);
      if (answerInfo.flag) {
        document.querySelector('.asd')?.setAttribute('src', AudioObj[Number(answerInfo.idx)].audio);
        audio.current.pause();
        audio.current.currentTime = 0;
        audio.current.play();
      }
    });
  }, [socket]);

  const UserList = allUsers.length ? (
    allUsers.map((data: any) => (
      <ScoreContentsWrapper>
        <ScoreContent1>{data.userName}</ScoreContent1>
        <ScoreContent2>{data.answerNum}</ScoreContent2>
      </ScoreContentsWrapper>
    ))
  ) : (
    <></>
  );

  const ChatLists = chatList.length ? (
    chatList.map((data: any) => (
      <ChatDiv>
        <ChatContent>
          {data.userName} : {data.answer}
        </ChatContent>
      </ChatDiv>
    ))
  ) : (
    <></>
  );

  return (
    <MainContainer>
      <Init />
      <ScoreWrapper>
        <ScoreTitle>스코어보드</ScoreTitle>
        <CustomHR />
        <ScoreSubTitleWrapper>
          <ScoreSubTitle1>유저</ScoreSubTitle1>
          <ScoreSubTitle2>점수</ScoreSubTitle2>
        </ScoreSubTitleWrapper>
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
        <ChatListWrapper className="chat-list">{ChatLists}</ChatListWrapper>
      </ChatWrapper>
      <audio ref={audio} className="asd" src={henesys} autoPlay controls={false} loop={true} />
    </MainContainer>
  );
};

export default Main;
