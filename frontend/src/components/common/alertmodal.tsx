import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { alertState } from 'recoil/common';

const AlertModalContainer = styled.div<{ modalState: boolean; bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 50px;
  position: fixed;
  top: ${props => (!props.modalState ? '-70px' : '5px')};
  left: 50%;
  background-color: ${props => props.bgColor};
  border-radius: 8px;
  color: black;
  letter-spacing: 4px;
  transition: top 0.5s ease;
  transform: translateX(-50%);
`;

const AlertModal = () => {
  const alert = useRecoilValue(alertState);

  return (
    <AlertModalContainer modalState={alert.modalState} bgColor={alert.bgColor}>
      {alert.comment}
    </AlertModalContainer>
  );
};

export default AlertModal;