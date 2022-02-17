import { Socket, Server } from "socket.io";

interface IUserSocket {
  [key: string]: {
    userName: string;
    answerNum: number;
  };
}

const UserObj: IUserSocket = {};

const socketIO = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    socket.on(
      "login notify",
      (userData: { socketID: string; userName: string }) => {
        UserObj[userData.socketID] = {
          userName: userData.userName,
          answerNum: 0,
        };
        io.emit("get current users", UserObj);
      }
    );

    socket.on('send answer', (sendData: {userName: string, answer:string}) => {
      io.emit('receive answer', sendData);
    })

    socket.on("disconnect", () => {
      delete UserObj[socket.id];
      io.emit("get current users", UserObj);
      console.log(`${socket.id} disconnected`);
    });
  });
};

export default socketIO;
