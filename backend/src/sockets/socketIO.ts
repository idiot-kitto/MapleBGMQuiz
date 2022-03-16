import { Socket, Server } from "socket.io";

interface IUserSocket {
  [key: string]: {
    userName: string;
    answerNum: number;
  };
}

const AnswerList = [
  ["헤네시스"],
  ["엘리니아"],
  ["커닝시티"],
  ["리스항구"],
  ["페리온"],
  ["슬리피우드"],
  ["개미굴"],
  ["헤네시스시장"],
  ["리엔"],
  ["에레브"],
  ["엘나스"],
  ["오르비스"],
  ["아쿠아리움"],
  ["루디브리엄"],
  ["아랫마을"],
  ["지구방위본부", "지방본"],
  ["무릉"],
  ["백초마을"],
  ["마가티아"],
  ["아리안트"],
  ["리프레"],
  ["시간의신전"],
  ["에델슈타인"],
  ["더시드로비", "더시드대기실"],
  ["코크타운"],
  ["행복한마을"],
  ["소멸의여로", "여로"],
  ["츄츄아일랜드", "츄츄"],
  ["레헬른"],
  ["아르카나"],
  ["모라스"],
  ["에스페라"],
  ["판테온"],
  ["세르니움광장", "전르니움", "세르니움"],
  ["호텔아르크스", "아르크스"],
  ["리스토니아"],
  ["뾰족귀여우마을"],
  ["청운골", "청운"],
  ["세계가끝나는곳", "세끝"],
  ["셀라스"],
  ["캐시샵", "캐샵"],
  ["몬스터라이프", "몬라"],
  ["무릉도장", "무릉대청"],
  ["갓오브컨트롤", "갓오컨"],
  ["플래그", "플래그레이스"],
  ["마이스터빌", "마빌"],
  ["골드비치"],
  ["플로리나비치"],
  ["루타비스"],
  ["피에르", "피에르보스맵"],
  ["블러디퀸", "블러디퀸보스맵", "블퀸", "블퀸보스맵"],
  ["수련의숲"],
  ["악몽의시계탑", "시계탑"],
  ["루시드1페", "루시드1페이즈"],
  ["루시드2페", "루시드2페이즈"],
];

let RandomAnswerNumArray: number[] = [];
for (let i = 0; i < AnswerList.length; ++i) RandomAnswerNumArray.push(i);
RandomAnswerNumArray.sort(() => Math.random() - 0.5);

let AnswerNum: number = 0;
const UserObj: IUserSocket = {};

function checkAns(userInput: string) {
  if (AnswerList[RandomAnswerNumArray[AnswerNum]].includes(userInput))
    return true;
  return false;
}

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
        const flag = checkAns(sendData.answer.split(" ").join(""));
        io.emit("receive answer", {...sendData, isAnswer: flag});
        if (flag) {
          AnswerNum++;
          if (AnswerNum == AnswerList.length) {
            RandomAnswerNumArray.sort(() => Math.random() - 0.5);
            AnswerNum = 0;
          }
          UserObj[sendData.socketID].answerNum++;
          io.emit("get current users", UserObj);
          io.emit("correct answer", {
            flag: true,
            idx: RandomAnswerNumArray[AnswerNum],
          });
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
