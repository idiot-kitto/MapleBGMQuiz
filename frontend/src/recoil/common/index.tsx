import { atom } from 'recoil';

export const currentUserName = atom({
  key: 'currentUserName',
  default: ''
});

export const alertState = atom({
  key: 'alertState',
  default: {
    modalState: false,
    comment: '',
    bgColor: ''
  }
});

export const timeOutValueState = atom({
  key: 'timeOutValueState',
  default: 0
});
