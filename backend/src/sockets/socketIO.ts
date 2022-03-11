import { Socket, Server } from "socket.io";

interface IUserSocket {
  [key: string]: {
    userName: string;
    answerNum: number;
  };
}

const AnswerList = [
  "헤네시스",
  "엘리니아",
  "커닝시티",
  "리스항구",
  "페리온",
  "슬리피우드",
  "개미굴",
  "헤네시스시장",
  "리엔",
  "에레브",
  "엘나스",
  "오르비스",
  "아쿠아리움",
  "루디브리엄",
  "아랫마을",
  "지구방위본부",
  "무릉",
  "백초마을",
  "마가티아",
  "아리안트",
  "리프레",
  "시간의신전",
  "에델슈타인",
  "더시드로비",
];
let AnswerNum = 0;
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

    socket.on(
      "send answer",
      (sendData: { userName: string; answer: string }) => {
        io.emit("receive answer", sendData);
        if (sendData.answer === AnswerList[AnswerNum]) {
          const randNum = Math.floor(Math.random() * AnswerList.length);
          AnswerNum = randNum;
          io.emit("correct answer", { flag: true, idx: AnswerNum });
        }
      }
    );

    socket.on("disconnect", () => {
      delete UserObj[socket.id];
      io.emit("get current users", UserObj);
      console.log(`${socket.id} disconnected`);
    });
  });
};

export default socketIO;
