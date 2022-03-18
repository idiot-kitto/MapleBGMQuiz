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
  ["더시드로비", "더시드대기실", "로비"],
  ["코크타운"],
  ["행복한마을"],
  ["소멸의여로", "여로"],
  ["츄츄아일랜드", "츄츄"],
  ["레헬른", "꿈의도시레헬른"],
  ["아르카나", "알카"],
  ["모라스"],
  ["에스페라", "베이스캠프", "베캠"],
  ["판테온"],
  ["세르니움광장", "전르니움", "세르니움"],
  ["호텔아르크스", "아르크스"],
  ["리스토니아"],
  ["뾰족귀여우마을"],
  ["청운골", "청운"],
  ["세계가끝나는곳", "세끝"],
  ["셀라스", "빛마닿", "빛이마지막으로닿는곳"],
  ["캐시샵", "캐샵", "캐시샾", "캐샾"],
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
  ["루시드1페", "루시드1페이즈", "몽환의숲"],
  ["루시드2페", "루시드2페이즈", "무너지는시계탑"],
  ["로그인", "구버전로그인", "로그인화면", "서버선택창", "서버"],
  ["로그인", "신버전로그인", "로그인화면", "서버선택창", "서버"],
  ["크리스탈가든"],
  ["반반"],
  ["벨룸"],
  ["엘리니아나무던전", "나무던전"],
  ["저주받은신전"],
  ["오르비스행", "오르비스행항해중", "항해중", "비행기", "항해"],
  ["까막산"],
  ["로스웰초원", "로스웰"],
  ["시간의갈림길", "갈림길"],
  ["에오스탑", "헬리오스탑"],
  ["장난감공장"],
  ["하늘숲", "천도과수원"],
  ["빨간코해적단소굴", "빨코"],
  ["더시드쉼터", "쉼터"],
  ["불타는세르니움광장", "후르니움", "불르니움"],
  ["검의무덤"],
  ["자동차극장", "낭만이저무는자동차극장"],
  ["무법자들이지배하는황야", "황야"],
  ["하늘고래산", "고래산", "에르밸리"],
  ["얌얌빌리지", "얌얌", "얌얌아일랜드", "머쉬버드숲"],
  ["일리야드들판", "일리야드"],
  ["전초기지"],
  [
    "버려진탑",
    "루디브리엄파티퀘스트",
    "루디파퀘",
    "루디브리엄파퀘",
    "루디파티퀘스트",
    "차원의균열",
    "차균",
  ],
  ["버섯의성"],
  ["엘린숲"],
  ["판타스틱테마파크", "판테마"],
  ["차원의도서관", "차도"],
  [
    "레벨의자",
    "만렙의자",
    "만렙의자브금",
    "만렙의자bgm",
    "레벨의자브금",
    "레벨의자bgm",
    "250의자",
    "250의자브금",
    "250의자bgm",
    "275의자",
    "275의자브금",
    "275의자bgm",
  ],
  ["몬스터파크", "몬파"],
  ["수로", "지하수로"],
  [
    "15번가클럽",
    "15번가클럽V",
    "클럽V",
    "클럽",
    "클럽v",
    "15번가클럽v",
    "15주년이벤트맵",
    "15주년이벤트",
  ],
  ["뉴트로킹덤", "뉴트로맵", "뉴트로", "16주년이벤트맵", "16주년이벤트"],
  [
    "호텔메이플",
    "17주년이벤트맵",
    "17주년",
    "17주년호텔메이플",
    "17주년이벤트",
    "메이플호텔",
  ],
  ["어드벤처아일랜드", "어드벤쳐아일랜드", "어드벤처", "어드벤쳐"],
  ["대만야시장", "야시장", "대만"],
  ["일본버섯신사", "버섯신사", "일본신사", "일본"],
  ["중국상해와이탄", "중국상해", "와이탄", "상해", "중국"],
  ["태국플로팅마켓", "태국", "플로팅마켓"],
  ["대난투", "대난투배틀스퀘어", "배틀스퀘어"],
  ["대만서문정", "대만", "서문정"],
];

let RandomAnswerNumArray: number[] = [];
for (let i = 0; i < AnswerList.length; ++i) RandomAnswerNumArray.push(i);
RandomAnswerNumArray.sort(() => Math.random() - 0.5);

let AnswerNum: number = 0;
const UserObj: IUserSocket = {};

function checkAns(userInput: string) {
  if (AnswerList[RandomAnswerNumArray[AnswerNum]].includes(userInput)) return 1;
  else if (userInput === "pass") return -1;
  else return 0;
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
        io.emit("receive answer", { ...sendData, isAnswer: flag });
        if (flag === 1) {
          AnswerNum++;
          if (AnswerNum == AnswerList.length) {
            RandomAnswerNumArray.sort(() => Math.random() - 0.5);
            AnswerNum = 0;
            io.emit("loop notify", true);
          }
          UserObj[sendData.socketID].answerNum++;
          io.emit("get current users", UserObj);
          io.emit("correct answer", {
            flag: true,
            idx: RandomAnswerNumArray[AnswerNum],
          });
        } else if (flag === -1) {
          AnswerNum++;
          if (AnswerNum == AnswerList.length) {
            RandomAnswerNumArray.sort(() => Math.random() - 0.5);
            AnswerNum = 0;
            io.emit("loop notify", true);
          }
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
