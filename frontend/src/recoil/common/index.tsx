import { atom } from 'recoil';

export const currentUserName = atom({
    key: 'currentUserName',
    default: ''
});
