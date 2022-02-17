import socket from 'components/common/socket';

import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

export const sockets = atom({
  key: 'socket',
  default: socket as Socket
});
