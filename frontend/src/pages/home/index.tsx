import styled from 'styled-components';
import { maple } from 'images';
import { Link } from 'react-router-dom';

import Init from 'components/common/init';

import { useSetRecoilState } from 'recoil';
import { currentUserName } from 'recoil/common';

import { ReactEventHandler, useEffect, useRef } from 'react';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: #fff;
  margin-top: 20vh;
  width: 400px;
  height: 60vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TitleImgWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleImg = styled.img.attrs({
  src: maple
})`
  width: 128px;
  height: 128px;
`;

const IDInputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const IDInput = styled.input`
  width: 60%;
  height: 70px;
  background-color: #abe9ed;
  border-radius: 10px;
  border: none;
  text-align: center;

  @media only screen and (max-width: 324px) {
    font-size: 4px;
  }
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;

  a {
    width: 61%;
    background-color: #abe9ed;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: black;
    font-size: 1rem;
    line-height: 70px;
  }
`;

const Home = () => {
  const setMyName = useSetRecoilState(currentUserName);

  return (
    <LoginContainer>
      <LoginBox>
        <TitleImgWrapper>
          <TitleImg />
        </TitleImgWrapper>
        <IDInputWrapper>
          <IDInput
            placeholder="사용하실 닉네임을 입력해주세요"
            onChange={e => {
              setMyName(e.currentTarget.value);
            }}
          />
        </IDInputWrapper>
        <LoginButtonWrapper>
          <Link to="/main">입장</Link>
        </LoginButtonWrapper>
      </LoginBox>
    </LoginContainer>
  );
};

export default Home;
