import henesys from 'song/Henesys.mp3';
import ellinia from 'song/Ellinia.mp3';
import kerning_city from 'song/Kerning_City.mp3';
import lith_harbor from 'song/Lith_Harbor.mp3';
import perion from 'song/Perion.mp3';
import sleepywood from 'song/sleepywood.mp3';
import ancient_move from 'song/Ancient_Move.mp3';
import go_picnic from 'song/Go_Picnic.mp3';
import rien_village from 'song/Rien_Village.mp3';
import queens_garden from 'song/Queens_Garden.mp3';
import snowy_village from 'song/Snowy_Village.mp3';
import shining_harbor from 'song/Shining_Harbor.mp3';
import aquarium from 'song/Aquarium.mp3';
import ludibrium from 'song/Ludibrium.mp3';
import down_town from 'song/Down_Town.mp3';
import omega_sector from 'song/omega_sector.mp3';
import mureung from 'song/Mureung.mp3';
import white_herb from 'song/White_Herb.mp3';
import dispute from 'song/Dispute.mp3';
import ariant from 'song/Ariant.mp3';
import leafre from 'song/Leafre.mp3';
import time_temple from 'song/Time_Temple.mp3';
import edelstein from 'song/Edelstein.mp3';
import the_seed_lobby from 'song/The_Seed_Lobby.mp3';
import coketown from 'song/CokeTown.mp3';
import whitechristmas from 'song/WhiteChristmas.mp3';
import lake_of_oblivion from 'song/Lake_of_Oblivion.mp3';
import chew_chew_island from 'song/Chew_Chew_Island.mp3';
import lachln_the_illusion_city from 'song/Lachln_the_Illusion_City.mp3';
import thetuneofazurelight from 'song/TheTuneOfAzureLight.mp3';
import memoryofkritias from 'song/MemoryOfKritias.mp3';
import soupoflife from 'song/SoupOfLife.mp3';
import pantheon from 'song/Pantheon.mp3';
import the_holy_land from 'song/The_Holy_Land.mp3';
import welcome_to_arcs_hotel from 'song/Welcome_to_Arcs_Hotel.mp3';
import romantic_senset from 'song/Romantic_SunSet.mp3';
import fox_village from 'song/Fox_Village.mp3';
import cheongun from 'song/CheongUn.mp3';
import the_worlds_end from 'song/The_Worlds_End.mp3';
import where_stars_rest from 'song/Where_Stars_Rest.mp3';
import calm_village from 'song/Calm_Village.mp3';
import monster_life from 'song/Monster_Life.mp3';
import mureung_school from 'song/Mureung_School.mp3';
import god_of_control from 'song/God_of_Control.mp3';
import capturetheflag from 'song/captureTheFlag.mp3';
import profession from 'song/Profession.mp3';
import gold_beach from 'song/Gold_Beach.mp3';
import beachway from 'song/Beachway.mp3';
import yggdrasil_prayer from 'song/Yggdrasil_Prayer.mp3';
import joyful_tea_party from 'song/Joyful_Tea_Party.mp3';
import queens_palace from 'song/Queens_Palace.mp3';
import raindrop_flower from 'song/Raindrop_Flower.mp3';
import clock_tower_of_nightmare from 'song/Clock_Tower_Of_Nightmare.mp3';
import weird_forest_in_the_girls_dream from 'song/Weird_Forest_In_The_Girls_Dream.mp3';
import broken_dream from 'song/Broken_Dream.mp3';

const AudioObj = [
  { audio: henesys, answer: '헤네시스' },
  { audio: ellinia, answer: '엘리니아' },
  { audio: kerning_city, answer: '커닝시티' },
  { audio: lith_harbor, answer: '리스항구' },
  { audio: perion, answer: '페리온' },
  { audio: sleepywood, answer: '슬리피우드' },
  { audio: ancient_move, answer: '개미굴' },
  { audio: go_picnic, answer: '헤네시스시장' },
  { audio: rien_village, answer: '리엔' },
  { audio: queens_garden, answer: '에레브' },
  { audio: snowy_village, answer: '엘나스' },
  { audio: shining_harbor, answer: '오르비스' },
  { audio: aquarium, answer: '아쿠아리움' },
  { audio: ludibrium, answer: '루디브리엄' },
  { audio: down_town, answer: '아랫마을' },
  { audio: omega_sector, answer: '지구방위본부' },
  { audio: mureung, answer: '무릉' },
  { audio: white_herb, answer: '백초마을' },
  { audio: dispute, answer: '마가티아' },
  { audio: ariant, answer: '아리안트' },
  { audio: leafre, answer: '리프레' },
  { audio: time_temple, answer: '시간의신전' },
  { audio: edelstein, answer: '에델슈타인' },
  { audio: the_seed_lobby, answer: '더시드로비' },
  { audio: coketown, answer: '코크타운' },
  { audio: whitechristmas, answer: '행복한마을' },
  { audio: lake_of_oblivion, answer: '소멸의여로' },
  { audio: chew_chew_island, answer: '츄츄아일랜드' },
  { audio: lachln_the_illusion_city, answer: '레헬른' },
  { audio: thetuneofazurelight, answer: '아르카나' },
  { audio: memoryofkritias, answer: '모라스' },
  { audio: soupoflife, answer: '에스페라' },
  { audio: pantheon, answer: '판테온' },
  { audio: the_holy_land, answer: '세르니움광장' },
  { audio: welcome_to_arcs_hotel, answer: '호텔아르크스' },
  { audio: romantic_senset, answer: '리스토니아' },
  { audio: fox_village, answer: '뾰족귀여우마을' },
  { audio: cheongun, answer: '청운골' },
  { audio: the_worlds_end, answer: '세계가끝나는곳'},
  { audio: where_stars_rest, answer: '셀라스'},
  { audio: calm_village, answer: '캐시샵'},
  { audio: monster_life, answer: '몬스터라이프'},
  { audio: mureung_school, answer: '무릉도장'},
  { audio: god_of_control, answer: '갓오브컨트롤'},
  { audio: capturetheflag, answer: '플래그'},
  { audio: profession, answer: '마이스터빌'},
  { audio: gold_beach, answer: '골드비치'},
  { audio: beachway, answer: '플로리나비치'},
  { audio: yggdrasil_prayer, answer: '루타비스'},
  { audio: joyful_tea_party, answer: '피에르'},
  { audio: queens_palace, answer: '블러디퀸'},
  { audio: raindrop_flower, answer: '수련의숲'},
  { audio: clock_tower_of_nightmare, answer: '악몽의시계탑'},
  { audio: weird_forest_in_the_girls_dream, answer: '루시드1페'},
  { audio: broken_dream, answer: '루시드2페'},
];

export default AudioObj;
