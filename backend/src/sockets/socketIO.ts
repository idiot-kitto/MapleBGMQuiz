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
  "코크타운",
  "행복한마을",
  "소멸의여로",
  "츄츄아일랜드",
  "레헬른",
  "아르카나",
  "모라스",
  "에스페라",
  "판테온",
  "세르니움광장",
  "호텔아르크스",
  "리스토니아",
  "뾰족귀여우마을",
  "청운골",
  "세계가끝나는곳",
  "셀라스"
];

let RandomAnswerNumArray:number[] = [];
for(let i=0 ; i<AnswerList.length ; ++i) RandomAnswerNumArray.push(i);
RandomAnswerNumArray.sort(() => Math.random() - 0.5);

let AnswerNum:number = 0;
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
        io.emit("init music", RandomAnswerNumArray[AnswerNum]);
      }
    );

    socket.on(
      "send answer",
      (sendData: { socketID: string; userName: string; answer: string }) => {
        io.emit("receive answer", sendData);
        if (sendData.answer.split(' ').join('') === AnswerList[RandomAnswerNumArray[AnswerNum]]) {
          AnswerNum++;
          if(AnswerNum == AnswerList.length) {
            RandomAnswerNumArray.sort(() => Math.random() - 0.5);
            AnswerNum = 0;
          }
          UserObj[sendData.socketID].answerNum++;
          io.emit("get current users", UserObj);
          io.emit("correct answer", { flag: true, idx: RandomAnswerNumArray[AnswerNum] });
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
