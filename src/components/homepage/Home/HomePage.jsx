import React, { useEffect, useState } from "react";
import homeBg from './bg.png';
import vectorImg from './Vector.png';
import frameSvg from './frame.svg';
import roadmapImgBGMICODM from '../../../assets/Group311.svg';
import roadmapImgFF from '../../../assets/Group3111.svg';
import frameLogoPng from './FrameLogo.png';
import bgmiPng from './bgmi.png';
import codmPng from './codm.png';
import ffmaxPng from './ffmax.png';
import { Sidebar } from "../../ui/Sidebar/Sidebar";
import UpperNav from "../../ui/nav/UpperNav";
import { useNavigate } from "react-router-dom";
import { Bgmi } from '../../ui/Cards/Bgmi';
import { Codm } from '../../ui/Cards/Codm';
import { Freefire } from '../../ui/Cards/Freefire';
import { Valo } from '../../ui/Cards/Valo';
import { getUserData } from "../../../redux/features/auth_slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { acceptRejectTeamInviteUser, getTeam, getTeamHome } from "../../../redux/features/team.slice";
import toast from "react-hot-toast";
import { getGameData } from "../../../redux/features/gaming_slices/bgmiSlice";
import { handlePay } from "../../../helper/handlePay";
import { getTournament } from "../../../redux/features/tournament.slice";

const games = [
  { name: "Battleground Mobile India", shortName: "BGMI", image: bgmiPng },
  { name: "Call Of Duty Mobile", shortName: "CODM", image: codmPng },
  { name: "Free Fire Max", shortName: "FREEFIRE", image: ffmaxPng },
];

function getUserDataForRegistration(gameMode, game) {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)
  const teamInfo = userData.teamInfo
  const currUserId = userData._id
  const [finalData, setFinalData] = useState({})
  let teamId
  let teamMembers = []
  let inGameIds = []

  useEffect(() => {
    const fetchData = async () => {
      teamId = (teamInfo.map((id) => {
        if (id.teamForWhichGame === game) { return id }
      })).filter(Boolean)[0]

      try {
        if (gameMode === "squad" || gameMode === "duo") {
          if (teamInfo.length === 0) {
            toast.error("You need a team to register for this tournament");
            return;
          }
          if (!(teamInfo.some((team) => team.teamForWhichGame === game))) {
            toast.error(`You Dont have a ${game.toLowerCase()} team`);
            return;
          }
          if (teamId.teamRole != "teamLeader") {
            toast.error("Only team leader can start the registration process");
            return;
          }
          const res = await dispatch(getTeam(teamId.teamId))
          if (gameMode === "squad" && res.payload?.teamMembers.length != 3) {
            toast.error("Not enough members in team");
            return;
          }
          if (gameMode === "duo" && res.payload?.teamMembers.length <= 1) {
            toast.error("Not enough members in team");
            return;
          }
          teamMembers = res.payload.teamMembers
          const gameResults = await Promise.all(
            teamMembers.map((id) => dispatch(getGameData({ gameType: game, userId: id })).unwrap())
          );
          inGameIds = gameResults.map((data) => {
            const g = game.toLowerCase()
            if (!data[g].gameId) {
              toast.error("One of team member has not set its game details");
              return;
            }
            return data[g].gameId
          })
          setFinalData({
            userInGameId: inGameIds,
            userId: teamMembers,
            teamId: teamId?.teamId,
            gameMode: gameMode,
            leaderId: currUserId
          })
        } else {
          teamId = (teamInfo.map((id) => {
            if (id.teamForWhichGame === game) { return id }
          })).filter(Boolean)[0]
          const res = await dispatch(getGameData({ gameType: game, userId: currUserId })).unwrap()
          if (!res) {
            toast.error("Game details not set");
            return;
          }
          const g = game.toLowerCase()
          inGameIds = res[g].gameId
          setFinalData({
            userInGameId: inGameIds,
            userId: currUserId,
            teamId: teamId?.teamId,
            gameMode: gameMode,
          })
        }
      } catch (err) {
        toast.error("Something went wrong while registering");
        // console.error(err);
      }
    };
    fetchData();
  }, [gameMode, teamInfo, currUserId]);

  return finalData
}
// --- PAGE-SPECIFIC COMPONENTS ---

const WelcomeCard = () => {
  const data = useSelector((state) => state.auth?.userData)
  const uid = data.assembleId;
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = uid;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      // console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="bg-black/40 border border-zinc-600 backdrop-blur-[33px] p-5 rounded-xl flex flex-col gap-3 h-[186px] max-sm:mx-5">
      <h2 className="capitalize leading-tight flex flex-col gap-1">
        <span className="w-fit text-[#A6FF00] text-base font-semibold leading-none capitalize">
          Welcome,
        </span>
        <span className="w-fit text-base font-normal text-[#D9D9D9] tracking-[.02em] leading-none">
          {data.username || "Player"}
        </span>
      </h2>
      <div className="flex items-center gap-2">
        <p className="text-white text-xs font-semibold tracking-wider">
          ASSEMBLE UID : {uid}
        </p>
        <button
          onClick={copyToClipboard}
          className="text-gray-300 hover:text-white transition-colors"
          title="Copy UID"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <p className="w-full h-auto text-white text-base font-normal leading-snug tracking-[.04em] capitalize mt-2">
        This is Your Spot To Crush It In Scrims And Tournaments!
      </p>
    </div>
  );
};

const NotificationPanel = () => {
  const dispatch = useDispatch()
  const receivedReq = useSelector((state) => state?.auth?.userData) || []
  const [notificationsData, setNotificationsData] = useState([])
  const [reqRes, setReqRes] = useState("")

  useEffect(() => {
    let fetchNotifications = async () => {
      if (receivedReq?.teamInviteRequests?.length > 0) {
        const results = await Promise.all(
          receivedReq.teamInviteRequests.map(async (p) => {
            const res = await dispatch(getTeam(p))
            return {
              id: res.payload._id,
              type: "invite",
              sender: res.payload.teamName,
              message: `Come hang out with our crew, the "${res.payload.teamName}," and let's play a few games!`,
            }
          })
        )
        setNotificationsData(results)
      } else {
        setNotificationsData([])
      }
    }
    fetchNotifications()
  }, [receivedReq, dispatch, reqRes, setReqRes])

  const handleAcceptReject = async (responseToReq, teamId) => {
    const userId = receivedReq._id
    const res = await dispatch(acceptRejectTeamInviteUser({ responseToReq, userId, teamId }))
    if (res.type === "acceptRejectTeamInviteUser/fulfilled") {
      await dispatch(getUserData(userId))
      toast.success(`Request ${responseToReq}ed`)
    }
  }

  return (
    <div className="bg-black/40 border border-zinc-600 backdrop-blur-[33px] p-5 rounded-xl overflow-y-scroll custom-scrollbar h-[243px] max-sm:mx-5">
      <h3 className="text-xs font-normal text-white mb-4 capitalize leading-none tracking-[.02em]">
        Notification Panel
      </h3>
      <div className="space-y-4">
        {notificationsData.map((notif) => (
          <div key={notif.id}>
            <div className="flex justify-between items-start">
              <p className="text-xs font-normal text-[#7FAFFF] leading-none tracking-[.04em]">
                {notif.sender}
              </p>
              <p className="text-xs text-gray-400 flex-shrink-0 ml-4">
                {notif.time}
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-base font-normal text-white leading-tight tracking-[.02em] pr-4">
                {notif.message}
              </p>
              {notif.type === "invite" && (
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button
                    onClick={() => (handleAcceptReject("accept", notif.id), setReqRes("accept"))}
                    className="w-[81px] h-[27px] flex items-center justify-center rounded-[4px] px-3 py-1 bg-[#06BF00] text-white hover:bg-green-700 transition-colors text-xs font-bold leading-tight tracking-wider capitalize">
                    Accept
                  </button>
                  <button
                    onClick={() => (handleAcceptReject("reject", notif.id), setReqRes("reject"))}
                    className="w-[81px] h-[27px] flex items-center justify-center rounded-[4px] px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-bold leading-tight tracking-wider capitalize">
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

const AddPlayerModal = ({ onClose }) => {
  const [players, setPlayers] = useState(
    searchResultsData.map((p) => ({ ...p, status: "invite" }))
  );

  const handleInviteToggle = (playerId) => {
    setPlayers(
      players.map((p) =>
        p.id === playerId
          ? { ...p, status: p.status === "invite" ? "cancel" : "invite" }
          : p
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Value"
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-black focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="ml-4 w-9 h-9 flex items-center justify-center bg-white rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-white p-3 rounded-lg text-black w-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={player.avatar}
                  alt="player avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-xs text-gray-500">{player.username}</p>
                  <p className="text-base font-bold text-black">
                    {player.name}
                  </p>
                </div>
                <div className="w-px h-10 bg-black/20 mx-2"></div>
                <div>
                  <p className="text-xs text-gray-500">NAME</p>
                  <p className="text-base font-bold text-black uppercase">
                    {player.name}
                  </p>
                </div>
              </div>

              {player.status === "invite" ? (
                <button
                  onClick={() => handleInviteToggle(player.id)}
                  className="bg-green-500 text-white text-xs font-bold py-2 px-4 rounded-md hover:bg-green-600 flex-shrink-0 transition-colors"
                >
                  Send invitation
                </button>
              ) : (
                <button
                  onClick={() => handleInviteToggle(player.id)}
                  className="bg-red-500 text-white text-xs font-bold py-2 px-6 rounded-md hover:bg-red-600 flex-shrink-0 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ player, isLeader }) => {
  const leaderWrapperClass = isLeader
    ? "p-[1px] bg-gradient-to-b from-[#00AF60] via-[#B1E9D5] via-40% to-[#00FFA3] to-69% to-[#006B44]"
    : "border border-zinc-700";

  return (
    <div className={`w-[176px] h-[191px] rounded-lg ${leaderWrapperClass} min-w-[176px]`}>
      <div className="w-full h-full bg-black/75 rounded-[7px] flex flex-col items-center justify-between px-5 py-3">
        <p
          className={`text-[10px] font-bold leading-none tracking-[.04em] uppercase ${isLeader ? "text-[#0CFFA7]" : "text-[#FBFF00]"
            }`}
        >
          {player.role}
        </p>
        <img
          src={player.avatar || "https://placehold.co/600x400/222222/ffffff?text=PI"}
          alt="Player Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="text-center flex flex-col gap-2 items-center">
          <p className="font-bold text-xs leading-none tracking-[.08em] uppercase text-white truncate w-full">
            {player.username}
          </p>
          <p className="font-sans text-[10px] font-normal leading-none tracking-[.04em] uppercase text-gray-400">
            Fullname
          </p>
          <p className="font-bold text-xs leading-none tracking-[.08em] uppercase text-white truncate w-full">
            {player.name}
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamLounge = () => {
  const [hasTeam, setHasTeam] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameSwitchOpen, setGameSwitchOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currTeamdata = useSelector((state) => state.auth?.userData?.teamInfo) || []

  const isGameThere = (currTeamdata.some(team => team.teamForWhichGame === games[currentGameIndex].shortName));
  const teamId = (currTeamdata.map((m) => {
    if (m.teamForWhichGame === games[currentGameIndex].shortName) {
      return m.teamId
    }
  }));

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await dispatch(getTeamHome(teamId.filter(Boolean)[0]))
      if (isGameThere) {
        setTeamData(res.payload)
        setHasTeam(true)
      } else {
        setTeamData({})
        setHasTeam(false)
      }
    }
    fetchTeam()
  }, [dispatch, isGameSwitchOpen, isGameThere, currentGameIndex])

  const handleGameChange = (index) => {
    setCurrentGameIndex(index);
    setGameSwitchOpen(false);
  };

  const currentGame = games[currentGameIndex];

  return (
    <div className="bg-black/40 border border-zinc-600 backdrop-blur-[33px] rounded-xl p-4 h-auto md:h-[445px] flex flex-col max-sm:mx-5">
      <div className="flex items-center justify-between rounded-lg bg-black/75 h-10 py-2 px-3 mb-4">
        <h3 className="text-white font-semibold text-sm">Team Lounge</h3>
        <button
          onClick={() => setGameSwitchOpen(!isGameSwitchOpen)}
          className="flex items-center gap-2 text-white font-semibold text-xs cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 3h5v5"></path>
            <path d="M4 20L20.5 3.5"></path>
            <path d="M20 16v5h-5"></path>
            <path d="M15 15l5.5 5.5"></path>
            <path d="M4 4l5 5"></path>
          </svg>
          <span>{currentGame.name}</span>
        </button>
        {isGameSwitchOpen && (
          <div className="absolute top-12 right-0 bg-zinc-800/90 backdrop-blur-sm rounded-lg p-4 w-64 z-10 border border-zinc-700">
            <p className="text-yellow-400 font-bold mb-2">Switch Game</p>
            <div className="flex flex-col gap-2">
              {games.map((game, index) => (
                <button
                  key={game.shortName}
                  onClick={() => handleGameChange(index)}
                  className={`w-full text-left p-2 rounded-md transition-colors ${currentGameIndex === index ? 'bg-zinc-700 font-bold' : 'bg-zinc-900 hover:bg-zinc-600'}`}
                >
                  {game.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!hasTeam ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-7 px-4">
          <div className="flex items-center justify-center">
            <img
              src={vectorImg}
              alt="Team illustration"
              className="w-full max-w-[320px] h-auto object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="text-sm font-bold text-white capitalize leading-none tracking-wider text-center">
              Put Together A Team!
            </h4>
            <p className="w-full max-w-sm text-sm font-normal text-white leading-6 tracking-wider text-center mt-4">
              When You Create A Team, You Can Join Squad Tournaments! It's A
              Great Way To Connect With Anyone Who Has An Assemble Account.
            </p>
            <button
              onClick={() => navigate('/TeamLounge')}
              className="mt-6 w-full max-w-sm py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <span className="text-sm capitalize leading-none tracking-wider text-center font-bold">
                Start A {currentGame.shortName} Squad!
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between text-white">
          <div className="flex flex-col gap-3">
            <img
              src={teamData?.banner || "https://placehold.co/600x400/222222/ffffff?text=TEAM BANNER"}
              alt="Team Banner"
              className="w-full h-20 object-cover rounded-lg"
            />
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-3">
                <img
                  src={teamData?.logo || "https://placehold.co/1080x1440/222222/ffffff?text=LOGO"}
                  alt="Team Logo"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <p className="text-xs font-normal text-gray-400 capitalize tracking-wider leading-none">
                    Team name
                  </p>
                  <p
                    className="font-bold text-xl capitalize tracking-wider leading-none mt-1"
                    style={{
                      fontFamily: "'BatmanForeverAlternate', sans-serif",
                    }}
                  >
                    {teamData?.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-normal text-gray-400 capitalize">
                  Team Size
                </p>
                <p className="text-xl font-bold mt-1">{teamData?.size}</p>
              </div>
            </div>
          </div>
          <div className="flex overflow-auto md:grid-cols-4 gap-4 place-items-center mt-5">
            {teamData?.players.map((player, index) => (
              <PlayerCard key={index} player={player} isLeader={index === 0} />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && <AddPlayerModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const FeaturedTournament = () => (
  <div className="bg-black/40 rounded-2xl p-4 flex flex-col gap-4">
    <div className="w-full p-1">
      <img
        src={frameSvg}
        alt="Tournament Poster"
        className="w-full h-auto rounded-lg object-contain"
      />
    </div>
    <div className="w-full flex flex-col md:flex-row items-center gap-5 px-1">
      <img
        src={frameLogoPng}
        alt="Tournament Logo"
        className="w-24 h-24 rounded-lg border border-white flex-shrink-0"
      />
      <div className="flex flex-1 items-center">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-xs font-normal text-white leading-none tracking-wider capitalize">
            Tournament Name
          </p>
          <h4
            className="font-bold text-lg text-white leading-none tracking-wider capitalize"
            style={{ fontFamily: "'BatmanForeverAlternate', sans-serif" }}
          >
            ASSEMBLE LAUNCHPAD CUP
          </h4>
          <p className="text-white font-normal text-base leading-tight tracking-wider capitalize">
            Kick off your adventure with Assemble by jumping into the first
            tournaments and snagging the Assemble Launchpad Cup along with some
            awesome prizes!
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TournamentCard = ({ tournament, onNavigate }) => (
  <div className="bg-black/40 rounded-xl border border-gray-700 p-4 flex flex-col gap-4">
    <img
      src={tournament.image}
      alt={tournament.game}
      className="w-full h-[109px] object-cover rounded-lg "
    />
    <h5 className="text-sm font-bold text-white text-center">
      {tournament.game}
    </h5>
    <div className="flex justify-between items-center text-xs">
      <div>
        <p className="text-xs font-normal text-white leading-none tracking-[.02em] capitalize">
          Entry Price / Team
        </p>
        <div className="flex items-center justify-center mt-1">
          <p className="text-lg sm:text-xl font-bold text-white tracking-wide capitalize">
            {tournament.entryFee}
          </p>
          <div className="ml-2 text-left">
            <p className="text-[10px] sm:text-xs font-bold text-green-500">68% Off</p>
            <p className="text-[10px] sm:text-xs font-normal text-red-500 line-through">999/-</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-400">Total Prizepool</p>
        <p className="text-white font-bold text-lg mt-1">
          {tournament.prizePool}
        </p>
      </div>
    </div>
    <button
      onClick={() => onNavigate(tournament)}
      className="w-full font-semibold h-12 px-4 py-2 bg-[#00FFA3] rounded-lg hover:bg-green-400 transition-colors text-black text-base leading-none tracking-[.02em] capitalize">
      Register Now
    </button>
  </div>
);

const HomePage = ({ onNavigateToTournament }) => {
  const [activeTab, setActiveTab] = useState("tournaments");
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTournament());
    };
    fetchData();
  }, [dispatch]);

  const tournamentDataDB = useSelector((state) => state?.tournament?.tournament?.matches)

  let tournamentsData = []

  tournamentDataDB.map((d) => {

    const game = games.map((g) => {
      if (g.shortName == d.game) {
        return g
      }
    }).filter(Boolean)[0]

    const prizePool = d.prizePool.reduce((acc, p) => acc + Number(p.amount), 0);

    let data = {
      id: d._id,
      game: game.name,
      entryFee: d.entryFee,
      prizePool,
      image: game.image,
      gameMode: d.mode,
      shortGameName: game.shortName
    }
    tournamentsData.push(data)
  })

  return (
    <main className="flex-1 h-full overflow-y-auto no-scrollbar">
      <div className="max-w-[1297px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <WelcomeCard />
            <NotificationPanel />
          </div>
          <div className="lg:col-span-2">
            <TeamLounge />
          </div>
        </div>
      </div>

      {/* --- TABS SECTION (Common for both) --- */}
      <div className="mt-6 flex h-[56px] sm:w-full w-[93%] max-w-[1297px] items-center gap-4 rounded-xl border border-white bg-black/60 p-2 mx-auto">
        <button
          onClick={() => setActiveTab("tournaments")}
          className={`h-full flex-1 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center ${activeTab === "tournaments"
            ? "bg-white text-black"
            : "bg-black/75 text-white hover:bg-white/10"
            }`}
        >
          Tournaments
        </button>
        <button
          onClick={() => setActiveTab("scrims")}
          className={`h-full flex-1 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center ${activeTab === "scrims"
            ? "bg-white text-black"
            : "bg-black/75 text-white hover:bg-white/10"
            }`}
        >
          Scrims
        </button>
      </div>

      {/* --- TAB CONTENT (Common for both) --- */}
      <div className="sm:w-full w-[93%] max-w-[1297px] mx-auto">
        {activeTab === "tournaments" && (
          <div className="mt-6 bg-black/40 border border-zinc-600 backdrop-blur-[33px] rounded-xl p-5 flex flex-col gap-8">
            <FeaturedTournament />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournamentsData.map((t) => (
                <TournamentCard key={t.id} tournament={t} onNavigate={onNavigateToTournament} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "scrims" && (
          <div className="mt-6 bg-black/40 border border-zinc-600 backdrop-blur-[33px] rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-4 md:custom-scrollbar-horizontal custom-scrollbar items-center justify-center h-[40vh]">
              {/* Replace with real components when ready  */}
              <p className="uppercase text-center text-zinc-300 font-bebas text-xl tracking-wider">
                somethin's cookin here 🔥
              </p>
            </div>
          </div>

        )}
      </div>
    </main>
  );
};

const TournamentDetailsPage = ({ tournament, onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeHeaderTab, setActiveHeaderTab] = useState('details');
  const data = getUserDataForRegistration(tournament.gameMode, tournament.shortGameName)
  const dispatch = useDispatch()
  const getTournamentDataDB = useSelector((state) => state?.tournament?.tournament?.matches)
  const tournamentDataDB = getTournamentDataDB.map((data) => {
    if (data._id == tournament.id) {
      return data
    }
  }).filter(Boolean)[0]

  const total = tournamentDataDB.prizePool.reduce((acc, p) => acc + Number(p.amount), 0);
  const winner = tournamentDataDB.prizePool.find((p) => p.rank == '1')
  const runnerUp1 = tournamentDataDB.prizePool.find((p) => p.rank == '2')
  const runnerUp2 = tournamentDataDB.prizePool.find((p) => p.rank == '3')
  const mvp = tournamentDataDB.prizePool.find((p) => p.rank == 'mvp') || "To Be Announced"
  const tournamentStatus = tournamentDataDB.status

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  const currTeamdata = useSelector((state) => state.auth?.userData?.teamInfo) || []
  const teamId = (currTeamdata.map((m) => {
    if (m.teamForWhichGame === tournament.shortGameName) {
      return m.teamId
    }
  })).filter(Boolean)[0]

  let isRegistered = false
  if (tournament.gameMode === "solo" && teamId) {
    isRegistered = tournamentDataDB.registeredTeamList.includes(teamId)
  } else if ((tournament.gameMode === "squad" || tournament.gameMode === "duo") && teamId) {
    isRegistered = tournamentDataDB.registeredTeamList.includes(teamId)
  }

  const sidebarTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon:
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    },
    {
      id: 'prizepool',
      label: 'Prizepool',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7-6 9-6 9s-6-2-6-9"></path>
          <path d="M12 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
        </svg>
      )
    },
    {
      id: 'game_details',
      label: 'Game Details',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6.182a4 4 0 0 0-3.535-1.818C12.44 4.364 12 6.182s-.44-1.818-2.465-1.818A4 4 0 0 0 6 6.182c0 2.2 1.818 4 4 4h4c2.182 0 4-1.8 4-4z"></path>
          <path d="M12 10.182V22M12 22l-4-4M12 22l4-4"></path>
        </svg>
      )
    },
    {
      id: 'placement_points',
      label: 'Placement Points',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      )
    }
  ];

  const content = {
    overview: {
      title: "Overview",
      body: tournamentDataDB?.overview || ""
    },
    rules: {
      title: "Rules And Regulations",
      body: tournamentDataDB?.rulesAndRegulations || ""
    },
    important: {
      title: "Important Details",
      body: tournamentDataDB?.importantDetails || ""
    }
  };

  const prizeData = {
    total,
    winner: winner?.amount || "",
    runnerUp1: runnerUp1?.amount || "",
    runnerUp2: runnerUp2?.amount || "",
    mvp: mvp?.amount ? mvp.amount : mvp
  };

  const PrizePoolDistribution = () => (
    <div className="bg-black/75 p-6 rounded-lg text-white">
      <h3 className="text-xl font-bold text-center mb-6 capitalize tracking-wider">Prize Pool Distribution</h3>
      <div className="flex justify-center mb-6">
        <div>
          <p className="text-base font-normal text-zinc-400 text-center capitalize tracking-wider">Total Prizepool</p>
          <p className="text-3xl font-bold text-center capitalize tracking-wider">{prizeData.total}</p>
        </div>
      </div>

      <div className="flex justify-around items-start mb-6">
        <div>
          <p className="text-base font-normal text-zinc-400 text-center capitalize tracking-wider">Winner</p>
          <p className="text-2xl font-bold text-center capitalize tracking-wider">{prizeData.winner}</p>
        </div>
        <div>
          <p className="text-base font-normal text-zinc-400 text-center capitalize tracking-wider">1st Runner Up</p>
          <p className="text-2xl font-bold text-center capitalize tracking-wider">{prizeData.runnerUp1}</p>
        </div>
        <div>
          <p className="text-base font-normal text-zinc-400 text-center capitalize tracking-wider">2nd Runner Up</p>
          <p className="text-2xl font-bold text-center capitalize tracking-wider">{prizeData.runnerUp2}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-base font-normal text-zinc-400 text-center capitalize tracking-wider">MVP</p>
        <p className="text-2xl font-bold capitalize tracking-wider">{prizeData.mvp}</p>
      </div>
    </div>
  );

  const GameDetails = () => {
    const details = {
      regStartDate: tournamentDataDB?.registrationStartDate,
      regStartTime: tournamentDataDB?.registrationStartTime,
      regEndDate: tournamentDataDB?.registrationEndDate,
      regEndTime: tournamentDataDB?.registrationEndTime,
      eventStartDate: tournamentDataDB?.scheduledDate,
      eventStartTime: tournamentDataDB?.scheduledTime,
      platform: tournamentDataDB?.streamingPlatform[0],
      url: tournamentDataDB?.streamingUrls || ""
    };

    const DetailItem = ({ label, value }) => {
      const getLabelColor = () => {
        if (label.toLowerCase().includes("registration start")) {
          return "text-green-400";
        }
        if (label.toLowerCase().includes("registration end")) {
          return "text-red-500";
        }
        return "text-white";
      };

      return (
        <div className="text-center md:text-left">
          <p className={`text-sm capitalize ${getLabelColor()}`}>{label}</p>
          <p className="text-lg font-bold text-white mt-1">{value}</p>
        </div>
      );
    };

    return (
      <div className="bg-black/75 p-6 rounded-lg text-white">
        <h3 className="text-xl font-bold text-center mb-8">Game Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <DetailItem label="Registration Start Date" value={details.regStartDate} />
          <DetailItem label="Registration Start Time" value={details.regStartTime} />
          <DetailItem label="Registration End Date" value={details.regEndDate} />
          <DetailItem label="Registration End Time" value={details.regEndTime} />
          <DetailItem label="Event Start Date" value={details.eventStartDate} />
          <DetailItem label="Event Start Time" value={details.eventStartTime} />
          <DetailItem label="Streaming Platform" value={details.platform} />
          <DetailItem label="Streaming URL" value={details.url} />
        </div>
      </div>
    );
  };

  const Roadmap = () => {
    return (
      <div className="bg-black/75 p-6 rounded-lg text-white w-full">
        <h3 className="text-4xl font-bold max-sm:text-2xl text-center">Roadmap</h3>
        <div className="mt-10 flex justify-center max-sm:mt-5">
          <img
            src={tournamentDataDB.game == "FREEFIRE" ? roadmapImgFF : roadmapImgBGMICODM}
            alt="Tournament Roadmap"
            className="w-[50%]  max-sm:w-[90%]"
          />
        </div>
      </div>
    );
  };

  const PlacementPoints = () => {
    const points = tournamentDataDB.placementPoint;

    return (
      <div className="bg-black/75 p-6 rounded-lg text-white">
        <h3 className="text-xl font-bold text-center mb-8">Placement Point Distribution</h3>
        <div className="grid grid-cols-3 gap-4 justify-around mb-8">
          {points.map(p => (
            <div key={p.rank} className="text-center">
              <p className="text-sm text-white">Rank {p.rank}</p>
              <p className="text-3xl font-bold text-white">{p.point} </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg text-white">Kill Points</p>
          <p className="text-2xl font-bold text-white">{tournamentDataDB.killPoints} / Kill</p>
        </div>
      </div>
    )
  };

  const RoundAndMatchDetails = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);

    const MatchRow = ({ match }) => (
      <div
        onClick={() => setSelectedMatch(match.name)}
        className={`rounded-lg p-4 flex justify-between items-center cursor-pointer transition-colors ${selectedMatch === match.name ? "bg-zinc-700" : "bg-zinc-900"
          }`}
      >
        <div className="text-center w-1/6">
          <p className="text-xs text-white">Match Name</p>
          <p className="font-bold text-white">{match.name}</p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-xs text-white">Match Date</p>
          <p className="font-bold text-white">{match.date}</p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-xs text-white">Match Time</p>
          <p className="font-bold text-white">{match.time}</p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-xs text-white">Map</p>
          <p className="font-bold text-white">{match.map}</p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-xs text-white">Id</p>
          <p className="font-bold text-white">{match.id}</p>
        </div>

        <div className="text-center w-1/6">
          <p className="text-xs text-white">Password</p>
          <p className="font-bold text-white">{match.password}</p>
        </div>
      </div>

    );

    const matchDetails = {
      knockoutMatches: [
        { name: 'K01', date: '01 October 2025', time: '12:00 PM', map: 'Erangel', id: '151649856', password: 'M3' },
        { name: 'K02', date: '01 October 2025', time: '12:00 PM', map: 'Erangel', id: '151649857', password: 'M3' },
      ],
      qualifierMatches: [
        { name: 'Q01', date: '01 October 2025', time: '12:00 PM', map: 'Erangel', id: '151649858', password: 'M3' },
        { name: 'Q02', date: '01 October 2025', time: '12:00 PM', map: 'Erangel', id: '151649859', password: 'M3' },
        { name: 'Q03', date: '01 October 2025', time: '12:00 PM', map: 'Erangel', id: '151649860', password: 'M3' },
      ]
    };



    return (
      <div className="space-y-6">
        <div className="bg-black/75 p-4 rounded-xl flex justify-between items-center">
          <div>
            <div className="bg-green-500 rounded-md px-4 py-2 text-center">
              <p className="font-bold text-sm text-black">Your Group</p>
              <p className="font-bold text-lg text-black">GROUP 01</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-sm">Current Date</p>
              <p className="font-bold text-lg">{currentTime.toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Current Time</p>
              <p className="font-bold text-lg">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
        <p className="text-left text-sm text-zinc-300">Check Out Your Match Schedule! We'll Share The ID And Password About 15-20 Minutes Before The Match Starts, So Keep An Eye Out!</p>

        {Object.entries(matchDetails).map(([category, matches]) => (
          <div key={category} className="space-y-4">
            <h3 className="font-bold text-lg">{category}</h3>
            {matches.map((match) => (
              <MatchRow key={match.name} match={match} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  const ResultView = () => {
    const teamData = [
      { name: 'TRX_VOLARIUME', logo: frameLogoPng, placement: 10, kills: 15, total: 25 },
      { name: 'TRX_VOLARIUME', logo: frameLogoPng, placement: 10, kills: 15, total: 25 },
      { name: 'TRX_VOLARIUME', logo: frameLogoPng, placement: 10, kills: 15, total: 25 },
      { name: 'TRX_VOLARIUME', logo: frameLogoPng, placement: 10, kills: 15, total: 25 },
      { name: 'TRX_VOLARIUME', logo: frameLogoPng, placement: 10, kills: 15, total: 25 },
    ]

    const ResultRow = ({ team }) => (
      <div className="flex items-center justify-between p-2">
        <div className="w-5/12 flex items-center gap-3">
          <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-md" />
          <p className="font-bold">{team.name}</p>
        </div>
        <div className="w-2/12 text-center font-bold">{team.placement}</div>
        <div className="w-2/12 text-center font-bold">{team.kills}</div>
        <div className="w-3/12 text-center font-bold text-white">{team.total}</div>
      </div>
    )
    return (
      <div className="space-y-6">
        <div className="bg-black/50 backdrop-blur-[33px] rounded-xl p-5 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="bg-green-500 rounded-md px-4 py-2 text-center">
                <p className="font-bold text-sm text-black">Your Group</p>
                <p className="font-bold text-lg text-black">GROUP 01</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-right">
                <p className="text-sm text-zinc-400">Current Date</p>
                <p className="font-bold text-lg">{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-400">Current Time</p>
                <p className="font-bold text-lg">{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          <p className="text-left text-sm text-zinc-300">You Can Check Out The Results Of Any Round, Group, Or Match. Our Services And Tournaments Are Here For You To See How Everything Works!</p>
          <div className="flex justify-center gap-4 items-end">
            <div className="text-center bg-white rounded-lg p-2 flex-1 max-w-sm">
              <p className="text-xs text-zinc-500 mb-1">Select Round</p>
              <p className="font-bold text-black">Knockout</p>
            </div>
            <div className="text-center bg-white rounded-lg p-2 flex-1 max-w-sm">
              <p className="text-xs text-zinc-500 mb-1">Select Group</p>
              <p className="font-bold text-black">Group 01</p>
            </div>
            <div className="text-center bg-white rounded-lg p-2 flex-1 max-w-sm">
              <p className="text-xs text-zinc-500 mb-1">Select Match</p>
              <p className="font-bold text-black">K01</p>
            </div>
            <button className="bg-green-500 px-8 py-3 rounded-md h-full">Search</button>
          </div>
        </div>

        <div className="bg-black/75 p-4 rounded-lg">
          <div className="flex justify-between text-white text-sm mb-4 px-2 font-bold border-b-2 border-white pb-2">
            <div className="w-5/12">Team Name</div>
            <div className="w-2/12 text-center">Placement Points</div>
            <div className="w-2/12 text-center">Kill Points</div>
            <div className="w-3/12 text-center">Total Points</div>
          </div>
          <div className="space-y-2">
            {teamData.map((team, index) => <ResultRow key={index} team={team} />)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 h-full overflow-y-auto no-scrollbar pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tabs */}
        <div className="w-full max-w-[1297px] mx-auto h-[56px] gap-4 rounded-xl p-2 border border-white bg-black/60 flex items-center max-sm:flex-col max-sm:h-[150px]">
          <button
            onClick={() => setActiveHeaderTab('details')}
            className={`h-full max-sm:w-full flex-1 rounded-lg transition-colors flex items-center justify-center ${activeHeaderTab === 'details' ? 'bg-white' : 'bg-transparent'
              }`}
          >
            <span className={`text-base capitalize tracking-wide leading-none font-semibold ${activeHeaderTab === 'details' ? 'text-black' : 'text-white'
              }`}>
              Tournament Details
            </span>
          </button>
          <button
            onClick={() => setActiveHeaderTab('match')}
            className={`h-full max-sm:w-full flex-1 rounded-lg transition-colors flex items-center justify-center ${activeHeaderTab === 'match' ? 'bg-white' : 'bg-transparent'
              }`}
          >
            <span className={`text-base capitalize tracking-wide leading-none font-semibold ${activeHeaderTab === 'match' ? 'text-black' : 'text-white'
              }`}>
              Round & Match Details
            </span>
          </button>
          <button
            onClick={() => setActiveHeaderTab('result')}
            className={`h-full max-sm:w-full  flex-1 rounded-lg transition-colors flex items-center justify-center ${activeHeaderTab === 'result' ? 'bg-white' : 'bg-transparent'
              }`}
          >
            <span className={`text-base capitalize tracking-wide leading-none font-semibold ${activeHeaderTab === 'result' ? 'text-black' : 'text-white'
              }`}>
              Result View
            </span>
          </button>
        </div>

        {activeHeaderTab === 'details' && (
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full md:w-[248px] flex-shrink-0 bg-black/50 backdrop-blur-[33px] rounded-xl p-4 flex-col gap-6 md:flex">
              <div className="text-center">
                <h3 className="font-bold text-base text-white leading-none capitalize">Assemble Launchpad Cup</h3>
                <p className="text-xs text-zinc-400 leading-none capitalize mt-2">
                  Check Out All The Info About The BGMI Tournament!
                </p>
              </div>
              <nav className="flex flex-col space-y-2 max-sm:mt-6">
                {sidebarTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-white text-black' : 'text-zinc-300 hover:bg-zinc-700'
                      }`}
                  >
                    <span className={activeTab === tab.id ? 'text-black' : 'text-zinc-400'}>{tab.icon}</span>
                    <span className="font-normal text-base leading-none tracking-normal capitalize">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Info Bar */}
              <div className="bg-black/75 p-4 rounded-xl flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between w-full gap-y-6 sm:gap-y-0">

                  {/* Entry Price / Team */}
                  <div className="w-1/2 sm:w-auto text-center">
                    <p className="text-sm sm:text-base font-normal text-white leading-none tracking-wider capitalize">
                      Entry Price / Team
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <p className="text-lg sm:text-xl font-bold text-white tracking-wide capitalize">
                        {tournament.entryFee}
                      </p>
                      <div className="ml-2 text-left">
                        <p className="text-[10px] sm:text-xs font-bold text-green-500">68% Off</p>
                        <p className="text-[10px] sm:text-xs font-normal text-red-500 line-through">999/-</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Prizepool */}
                  <div className="w-1/2 sm:w-auto text-center">
                    <p className="text-sm sm:text-base font-normal text-white leading-none tracking-wider capitalize">
                      Total Prizepool
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-white mt-1 tracking-wide capitalize">
                      {tournament.prizePool}
                    </p>
                  </div>

                  {/* Mode */}
                  <div className="w-1/2 sm:w-auto text-center">
                    <p className="text-sm sm:text-base font-normal text-white leading-none tracking-wider capitalize">
                      Mode
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-white mt-1 tracking-wide capitalize">
                      {tournamentDataDB.mode}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="w-1/2 sm:w-auto text-center">
                    <p className="text-sm sm:text-base font-normal text-white leading-none tracking-wider capitalize">
                      Status
                    </p>
                    <p className="text-lg sm:text-xl font-bold mt-1 tracking-wide capitalize" style={{ color: '#DBC0FF' }}>
                      {tournamentDataDB.status}
                    </p>
                  </div>
                </div>

                {/* Register Button */}
                {!isRegistered && (
                  <button
                    onClick={() =>
                      handlePay({
                        userInGameId: data.userInGameId,
                        userId: data.userId,
                        teamId: data.teamId,
                        tournamentId: tournament.id,
                        leaderId: data.leaderId,
                        wildcard: tournamentDataDB.wildCardEntryStatus,
                        gameMode: data.gameMode,
                        dispatch,
                      })
                    }
                    className="w-full bg-[#00FFA3] text-black font-bold h-10 sm:h-9 rounded-lg text-base sm:text-lg hover:bg-green-400 transition-colors flex items-center justify-center tracking-wider capitalize px-4"
                  >
                    REGISTER NOW
                  </button>
                )}
              </div>


              {/* Details Sections */}
              <div className="mt-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {content?.overview?.body && <div className="bg-black/75 p-4 rounded-lg flex flex-col gap-[11px] min-h-[114px]">
                      <h4 className="text-xl font-bold text-white tracking-wide capitalize leading-none">{content?.overview?.title}</h4>
                      <p className="text-white text-base leading-normal tracking-wider whitespace-pre-line">
                        {content?.overview?.body}
                      </p>
                    </div>}
                    {content?.rules?.body && <div className="bg-black/75 p-4 rounded-lg flex flex-col gap-[11px] min-h-[354px]">
                      <h4 className="text-xl font-bold text-white tracking-[.02em] capitalize leading-none">{content?.rules?.title}</h4>
                      <p className="text-white font-normal text-base leading-relaxed tracking-wider whitespace-pre-line mt-4">{content?.rules?.body}</p>
                    </div>}
                    {content?.important?.body && <div className="bg-black/75 p-4 rounded-lg flex flex-col gap-[11px]">
                      <h4 className="font-bold text-xl text-white tracking-[.02em] capitalize leading-none">{content?.important?.title}</h4>
                      <p className="text-white font-normal text-base leading-relaxed tracking-wider whitespace-pre-line">{content?.important?.body}</p>
                    </div>}
                  </div>
                )}
                {activeTab === 'prizepool' && <PrizePoolDistribution />}
                {activeTab === 'game_details' && <GameDetails />}
                {activeTab === 'roadmap' && <Roadmap />
                }
                {activeTab === 'placement_points' && <PlacementPoints />}
              </div>
            </div>
          </div>
        )}
        {activeHeaderTab === 'match' && (
          tournamentStatus === "live" ?
            < div className="mt-8">
              <RoundAndMatchDetails />
            </div> :

            (isRegistered ?
              < div className="mt-8 p-4 rounded-xl bg-red-200 text-rose-500 font-bold text-lg text-center shadow-md">
                Tournament not yet live
              </div> : < div className="mt-8 p-4 rounded-xl bg-red-200 text-rose-500 font-bold text-lg text-center shadow-md">
                Please register
              </div>)
        )}
        {activeHeaderTab === 'result' && (
          tournamentStatus === "live" ?
            < div className="mt-8">
              <ResultView />
            </div> :
            (isRegistered ?
              < div className="mt-8 p-4 rounded-xl bg-red-200 text-rose-500 font-bold text-lg text-center shadow-md">
                Tournament not yet live
              </div> : < div className="mt-8 p-4 rounded-xl bg-red-200 text-rose-500 font-bold text-lg text-center shadow-md">
                Please register
              </div>)

        )}
      </div>
    </main >
  )
}

// --- APP ---
const App = () => {
  //db connections
  const id = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const handleNavigateToTournament = (tournament) => {
    setSelectedTournament(tournament);
    setCurrentPage('tournamentDetails');
  };
  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedTournament(null);
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await dispatch(getUserData(id));
      };
      fetchData();
    }
  }, [dispatch, id]);
  return (
    <>
      <style>{`
        @font-face {
            font-family: 'BatmanForeverAlternate';
            src: url('https://db.onlinewebfonts.com/t/17216109b43ohvplcg1a09805.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a4a4a;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4a4a4a transparent;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
          background-color: #4a4a4a;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar-horizontal {
            scrollbar-width: thin;
            scrollbar-color: #4a4a4a transparent;
        }
      `}</style>
      <div className="bg-zinc-950 font-sans text-white w-screen h-screen overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <img
            src={homeBg}
            alt="background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 flex flex-col h-screen">
          {/* <UpperNav name="Home" />
          <div className="flex flex-1 w-full overflow-hidden pt-[10vh] px-2 md:px-6 gap-6">
            <div className="hidden md:block">
            <Sidebar />
            </div>
            <HomePage /> */}
          <UpperNav
            name={currentPage === 'home' ? 'Home' : 'Tournament Details'}
            onNavigateBack={handleNavigateHome}
          />
          <div className="flex flex-1 w-full overflow-hidden pt-[10vh] px-2 md:px-6 gap-6">
            {/* <div className="flex-shrink-0"> */}
            <Sidebar onNavigateHome={handleNavigateHome} />
            {/* </div> */}

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {currentPage === 'home' &&
                <HomePage
                  onNavigateToTournament={handleNavigateToTournament} />}
              {currentPage === 'tournamentDetails' &&
                <TournamentDetailsPage
                  tournament={selectedTournament}
                  onNavigateBack={handleNavigateHome} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

