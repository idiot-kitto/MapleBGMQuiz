import { useRecoilState, useSetRecoilState } from 'recoil';
import { alertState, timeOutValueState } from 'recoil/common';

const useAlertModal = () => {
  const setAlertModal = useSetRecoilState(alertState);
  const [timeOutValue, setTimeOutValue] = useRecoilState(timeOutValueState);

  return (comment: string, bgColor: string) => {
    setAlertModal({ modalState: true, comment: comment, bgColor: bgColor });
    if (timeOutValue !== null) clearTimeout(timeOutValue);

    const setTimeoutValue = setTimeout(() => {
      setAlertModal({ modalState: false, comment: comment, bgColor: bgColor });
    }, 1500);
    setTimeOutValue(Number(setTimeoutValue));
  };
};

export default useAlertModal;