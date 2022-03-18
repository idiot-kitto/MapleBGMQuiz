import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Init from 'components/common/init';

import { useRecoilValue } from 'recoil';
import { currentUserName } from 'recoil/common';
import { sockets } from 'recoil/socket';

import useAlertModal from 'hooks/useAlertModal';

import { submitIcon, submitIconActive } from 'images';
import AudioObj from 'song';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 20vh;
`;

const ExplainWrapper = styled.div`
  position: absolute;
  top: 8%;
  color: azure;
  font-size: 14px;
  text-align: center;
`;

const ExplainText = styled.div``;
const ExplainText2 = styled.div`
  color: deeppink;
`;

const ScoreWrapper = styled.div`
  background-color: #fff;
  width: 240px;
  height: 62vh;
  border-radius: 20px;
  @media only screen and (max-width: 767px) {
    width: 200px;
    margin-right: 5px;
    margin-left: 10px;
  }

  @media only screen and (max-width: 319px) {
    display: none;
  }
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

const AnswerForm = styled.form`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-left: 13px;
`;

const AnswerInput = styled.input`
  width: 65%;
  height: 50px;
  background: #abe9ed;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  text-align: center;
`;

const AnswerButton = styled.button`
  width: 50px;
  height: 50px;
  background: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transform: translate(-4px, 2px);
`;

const ChatWrapper = styled.div`
  background-color: #fff;
  width: 400px;
  height: 62vh;
  border-radius: 20px;
  @media only screen and (max-width: 767px) {
    width: 360px;
    margin-right: 10px;
    margin-left: 5px;
  }
`;

const ChatTitle = styled.div`
  text-align: center;
  line-height: 50px;
`;

const ChatDiv = styled.div<{ myName: String; sender: String }>`
  padding: 0 10px 0 10px;
  line-height: 25px;
  text-align: ${props => (props.sender === props.myName ? 'right' : 'left')};
`;

const ChatSender = styled.div<{ myName: String; sender: String; flag: Boolean }>`
  font-size: 0.8rem;
  padding: 0 5px;
  display: ${props => (props.sender === props.myName || props.flag ? `none` : `flex`)};
`;

const ChatText = styled.div<{ myName: String; sender: String; isAnswer: Number }>`
  font-size: 0.8rem;
  word-break: break-word;
  background: ${props => (props.sender === props.myName ? '#abe9ed' : '#e4e6eb')};
  color: ${props => (props.isAnswer === 1 ? 'red' : props.isAnswer === -1 ? 'blue' : 'black')};
  margin-top: 2px;
  border-radius: 20px;
  padding: 0 10px;
  display: inline-block;
  max-width: 70%;
  text-align: left;
`;

const ChatListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  border-radius: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 5px;
`;

const CustomHR = styled.div`
  border: 0;
  height: 1px;
  background-color: gray;
  margin: 0 5px 0 5px;
  border-radius: 20px;
`;

const VolumeSlider = styled.input<{ flag: boolean }>`
  display: ${props => (props.flag ? `none` : `inline`)};
  margin-left: -10px;
  transform: translate(20px, 2px);
  width: 70px;
`;

const Main = () => {
  const [answer, setAnswer] = useState('');
  const myName = useRecoilValue(currentUserName);
  const socket = useRecoilValue(sockets);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const [currentMusicIdx, setCurrentMusicIdx] = useState<number>(-1);
  const [currentMusicRealIdx, setCurrentMusicRealIdx] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.1);

  const audio = useRef<HTMLAudioElement | null>(null);

  const showAlert = useAlertModal();

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  const mobile = isMobile();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!answer.length) showAlert('정답을 입력하세요', '#abe9ed');
    else {
      setAnswer('');
      socket.emit('send answer', {
        socketID: socket.id,
        userName: myName,
        answer: answer
      });
    }
  };

  useEffect(() => {
    socket.off('loop notify');
    socket.on('loop notify', (flag: boolean) => {
      if (flag) showAlert('모든 문제를 풀어 노래가 반복됩니다', '#abe9ed');
    });
  }, [showAlert, socket]);

  useEffect(() => {
    if (myName) {
      socket.emit('login notify', {
        socketID: socket.id,
        userName: myName
      });
      socket.off('get current users');
      socket.on('get current users', (userData: any) => {
        let AllUsersTmp = Object.values(userData);
        AllUsersTmp.sort((a: any, b: any) => {
          return b.answerNum - a.answerNum;
        });
        setAllUsers(AllUsersTmp);
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
    socket.off('init music');
    socket.on('init music', (data: {musicIdx: number, musicRealIdx: number}) => {
      if (currentMusicIdx !== data.musicIdx) {
        setCurrentMusicIdx(data.musicIdx);
        setCurrentMusicRealIdx(data.musicRealIdx);
        document.getElementById('music')?.setAttribute('src', AudioObj[Number(data.musicIdx)].audio);
        audio.current?.pause();
        if (audio.current) audio.current.currentTime = 0;
        audio.current?.play();
      }
    });
  }, [currentMusicIdx, socket]);

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    socket.off('correct answer');
    socket.on('correct answer', (answerInfo: { flag: Boolean; idx: number, musicRealIdx: number }) => {
      if (answerInfo.flag) {
        setCurrentMusicIdx(answerInfo.idx);
        setCurrentMusicRealIdx(answerInfo.musicRealIdx);
        document.getElementById('music')?.setAttribute('src', AudioObj[Number(answerInfo.idx)].audio);
        audio.current?.pause();
        if (audio.current) audio.current.currentTime = 0;
        audio.current?.play();
      }
    });
  }, [allUsers, socket]);

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

  function CheckFlag(sender: string, idx: number) {
    if (idx === 0) return sender === myName ? true : false;
    else return sender === chatList[idx - 1].userName ? true : false;
  }

  const ChatLists = chatList.length ? (
    chatList.map((data: any, idx: number) => (
      <ChatDiv myName={myName} sender={data.userName}>
        <ChatSender myName={myName} sender={data.userName} flag={CheckFlag(data.userName, idx)}>
          {data.userName}
        </ChatSender>
        <ChatText myName={myName} sender={data.userName} isAnswer={data.isAnswer}>
          {data.answer}
        </ChatText>
      </ChatDiv>
    ))
  ) : (
    <></>
  );

  return (
    <MainContainer>
      <Init />
      <ExplainWrapper>
        <ExplainText>띄어쓰기를 허용합니다.</ExplainText>
        <ExplainText>pass를 입력하면 다음 노래로 넘어갑니다.</ExplainText>
        <ExplainText>개발자가 허용한 약어도 정답으로 인정됩니다.</ExplainText>
        <ExplainText2>Made by. @kitae0629</ExplainText2>
      </ExplainWrapper>
      <ScoreWrapper>
        <ScoreTitle>Score</ScoreTitle>
        <CustomHR />
        <ScoreSubTitleWrapper>
          <ScoreSubTitle1>유저</ScoreSubTitle1>
          <ScoreSubTitle2>점수</ScoreSubTitle2>
        </ScoreSubTitleWrapper>
        <CustomHR />
        {UserList}
      </ScoreWrapper>
      <ChatWrapper>
        <ChatTitle>
          [{currentMusicRealIdx + 1} / {AudioObj.length}] 여기가 어디더라?
          <VolumeSlider
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={e => {
              setVolume(e.target.valueAsNumber);
            }}
            flag={mobile}
          />
        </ChatTitle>
        <CustomHR />
        <ChatListWrapper className="chat-list">{ChatLists}</ChatListWrapper>
        <AnswerForm onSubmit={onSubmit}>
          <AnswerInput
            placeholder="정답을 입력하세요"
            type="answer"
            name="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            autoComplete="off"
          />
          <AnswerButton type="submit">
            <img
              src={submitIcon}
              alt="submitIcon"
              onMouseOver={e => (e.currentTarget.src = `${submitIconActive}`)}
              onMouseOut={e => (e.currentTarget.src = `${submitIcon}`)}
            />
          </AnswerButton>
        </AnswerForm>
      </ChatWrapper>
      <audio ref={audio} id="music" src={''} autoPlay controls={false} loop={true} />
    </MainContainer>
  );
};

export default Main;
