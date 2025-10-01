import React, { useState, useRef, useEffect } from "react";
import loungeBG from "./loungeBG.png";
import UpperNav from "../../ui/nav/UpperNav";
import { Sidebar } from "../../ui/Sidebar/Sidebar";
import vector1 from "./Vector.png";
import { Plus, Copy, Check } from "lucide-react";
import checkPattern from "./check.png";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, getTeam, reqToJoinTeam, sendTeamJoinReq, uploadTeamImage } from "../../../redux/features/team.slice";
import Loader from "../../Loader"
import { getUserData, searchUser } from "../../../redux/features/auth_slices/AuthSlice";
import toast from "react-hot-toast";
import { getGameData } from "../../../redux/features/gaming_slices/bgmiSlice";

const gamesToSend = [
  "BGMI",
  "CODM",
  "FREEFIRE",
]

const url = {
  logo: "https://placehold.co/600x400/222222/ffffff?text=TEAM LOGO",
  banner: "https://placehold.co/600x400/222222/ffffff?text=TEAM BANNER",
}

const FloatingLabelInput = ({
  name,
  label,
  value,
  onChange,
  as = "input",
  options = [],
  containerClassName = "",
  wordCount,
  wordLimit,
  error,
  ...props
}) => {
  const count = value
    ? value
      .trim() // remove leading/trailing spaces
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    : 0;

  const inputTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    fontSize: "16px",
    lineHeight: "100%",
  };

  const labelTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    lineHeight: "100%",
  };

  const commonInputStyles =
    "peer w-full h-full rounded-xl px-6 pt-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 ";

  const errorStyles = error
    ? "border-2 border-red-500 ring-red-500/20"
    : "focus:ring-cyan-400";

  const commonLabelStyles =
    "absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out text-base capitalize peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#737373] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#737373]";

  const InputComponent = as;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="relative h-full">
        {as === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${commonInputStyles} ${errorStyles} appearance-none`}
            style={inputTextStyle}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="py-4">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <InputComponent
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${as === "textarea"
              ? `${commonInputStyles} resize-none pb-7`
              : commonInputStyles
              } ${errorStyles}`}
            style={inputTextStyle}
            placeholder=" "
            {...props}
          />
        )}
        <label
          htmlFor={name}
          className={commonLabelStyles}
          style={labelTextStyle}
        >
          {label}
        </label>

        {as === "textarea" && wordLimit && (
          <div
            className="absolute bottom-3 right-6 text-[10px] pointer-events-none"
            style={{ fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif" }}
          >
            <span
              className={count > wordLimit ? "text-red-500" : "text-gray-400"}
            >
              {count} / {wordLimit}
            </span>
          </div>
        )}

        {as === "select" && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const LeaderCard = ({ leader }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(leader.assembleUid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // revert back after 1.5s
  };
  return (
    <div
      className="rounded-[8px] p-[2px] w-full max-w-[319px] "
      style={{
        background:
          "linear-gradient(180deg, #00AF60 0%, #B1E9D5 40.5%, #00FFA3 69%, #006B44 100%)",
      }}
    >
      <div
        className="bg-black rounded-[8px] w-full h-full flex flex-col items-center text-center border-2 p-4 gap-4"
        style={{
          borderImageSource:
            "linear-gradient(180deg, #00AF60 0%, #B1E9D5 40.5%, #00FFA3 69%, #006B44 100%)",
          borderImageSlice: 1,
        }}
      >
        {/* Role */}
        <p className="text-[12px] sm:text-[14px] font-[400] uppercase tracking-[0.04em] font-arialrounded">
          TEAM LEADER
        </p>

        {/* Profile Image */}
        <img
          src={leader.image}
          alt={leader.name}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />

        {/* Username */}
        <h2 className="text-[14px] sm:text-[16px] font-[400] uppercase tracking-[0.08em] font-arialrounded">
          {leader.username}
        </h2>

        {/* Name & Age */}
        <div className="flex flex-row justify-between w-full text-white text-xs sm:text-sm mt-2 gap-2 sm:gap-0">
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.04em]">Name</span>
            <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">
              {leader.name}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.04em]">Age</span>
            <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">
              {leader.age}
            </span>
          </div>
        </div>

        {/* IGN */}
        <div className="flex flex-col items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.04em]">In-game username</span>
          <span className="text-[12px] sm:text-[14px] font-arialrounded">{leader.ign}</span>
        </div>

        {/* UID */}
        <div className="flex flex-col items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.04em]">In-game UID</span>
          <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">{leader.Uid}</span>
        </div>

        {/* Assemble UID */}
        <p className="text-[#00FFA3] text-[12px] sm:text-[14px] mt-2 flex items-center gap-2">
          <span className="uppercase text-[10px] sm:text-[12px] tracking-[0.02em]">
            Assemble UID:
          </span>
          <span className="text-[10px] sm:text-[12px]">{leader.assembleUid}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-700"
            title="Copy UID"
          >
            {copied ? (
              <Check className="w-[12px] h-[12px] text-green-400" />
            ) : (
              <Copy className="w-[12px] h-[12px] text-white" />
            )}
          </button>
        </p>
      </div>
    </div>

  );
};

const PlayerCard = ({ player, index, }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(player.assembleUid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // revert back after 1.5s
  };
  return (
    <div
      className="rounded-[8px] p-[2px] w-full max-w-[319px] "
      style={{
        background:
          "linear-gradient(180deg, #9DAF00 0%, #ECF78B 40.5%, #EEFF00 69%, #807A00 100%)",
      }}
    >
      <div className="bg-black rounded-[8px] w-full h-full flex flex-col items-center text-center p-4 gap-4">
        {/* Player Label */}
        <p className="text-[12px] sm:text-[14px] font-[400] uppercase tracking-[0.04em] font-arialrounded">
          {`Player ${index + 1}`}
        </p>

        {/* Profile Image */}
        <img
          src={player.image}
          alt={player.name}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />

        {/* Username */}
        <h2 className="text-[14px] sm:text-[16px] font-[400] uppercase tracking-[0.08em] font-batman">
          {player.username}
        </h2>

        {/* Name & Age */}
        <div className="flex justify-between w-full text-white text-xs sm:text-sm mt-2">
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.04em]">Name</span>
            <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">
              {player.name}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.04em]">Age</span>
            <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">
              {player.age}
            </span>
          </div>
        </div>

        {/* IGN */}
        <div className="flex flex-col items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.04em]">In-game username</span>
          <span className="text-[12px] sm:text-[14px] font-arialrounded">{player.ign}</span>
        </div>

        {/* UID */}
        <div className="flex flex-col items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.04em]">In-game UID</span>
          <span className="text-[12px] sm:text-[14px] uppercase font-arialrounded">{player.Uid}</span>
        </div>

        {/* Assemble UID */}
        <p className="text-[#00FFA3] text-[12px] sm:text-[14px] mt-2 flex items-center gap-2">
          <span className="uppercase text-[10px] sm:text-[12px] tracking-[0.02em]">Assemble UID:</span>
          <span className="text-[10px] sm:text-[12px]">{player.assembleUid}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-700"
            title="Copy UID"
          >
            {copied ? (
              <Check className="w-[12px] h-[12px] text-green-400" />
            ) : (
              <Copy className="w-[12px] h-[12px] text-white" />
            )}
          </button>
        </p>
      </div>
    </div>

  );
};

const EmptyPlayerCard = ({ index, onClick }) => {
  return (
    <div
      className="rounded-[8px] p-[2px] cursor-pointer hover:shadow-lg transition-all w-full h-full max-w-[319px] min-h-[380px]"
      style={{
        background:
          "linear-gradient(180deg, #9DAF00 0%, #ECF78B 40.5%, #EEFF00 69%, #807A00 100%)",
      }}
      onClick={onClick}
    >
      <div className="bg-black rounded-[8px] w-full h-full flex flex-col items-center text-center p-4 gap-4 min-h-[380px]">
        {/* Player Number */}
        <p className="text-[12px] sm:text-[14px] font-[400] uppercase tracking-[0.04em] font-arialrounded">
          {`Player ${index + 1}`}
        </p>

        {/* Default Avatar + Instruction Text */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-700 flex items-center justify-center">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <p className="text-gray-300 text-[12px] sm:text-[16px] mt-4 leading-snug sm:leading-tight font-sans px-2">
            Find player in global user of Assemble and send invitation to them
          </p>
        </div>

        {/* Add Player Button */}
        <button
          className="mt-auto bg-white hover:bg-green-600 text-black font-arialrounded px-4 sm:px-6 py-2 rounded flex items-center gap-2 text-sm sm:text-base"
          onClick={onClick}
        >
          Add Player
        </button>
      </div>
    </div>

  );
};

function useUsersData(game, activeButton) {

  const [teamMembers, setTeamMembers] = useState([]);
  const dispatch = useDispatch();
  const teamMembersId = useSelector((state) => state.team?.teamData?.teamMembers);
  const teamId = useSelector((state) => state.team?.teamData?._id);

  useEffect(() => {
    if (!teamMembersId || teamMembersId.length === 0) { setTeamMembers([]); return };

    const fetchMembers = async () => {
      try {
        const userResults = await Promise.all(
          teamMembersId.map((id) => dispatch(getUserData(id)).unwrap())
        );
        const gameResults = await Promise.all(
          teamMembersId.map((id) => dispatch(getGameData({ gameType: game, userId: id })).unwrap())
        );

        const results = userResults.map((id) => {
          let resData;
          for (let i = 0; i < gameResults.length; i++) {
            if (gameResults[i][game.toLowerCase()].userId == id._id) {
              resData = {
                ...id,
                gameData: gameResults[i][game.toLowerCase()]
              };
            }
          }
          return resData;
        });

        const formatted = results.map((res) => ({
          name: res.fullName,
          username: res.username,
          age: res.age || 0,
          assembleUid: res.assembleId,
          playerRole: (res.teamInfo.find((td) => td.teamId == teamId) || {})?.teamRole || "",
          ign: res.gameData?.inGameName || "not set by player",
          Uid: res.gameData?.gameId || "not set by player",
          image: res.avatarUrl || "https://placehold.co/600x400/222222/ffffff?text=PI"
        }));

        setTeamMembers(formatted);
      } catch (err) {
        // console.error("Failed to fetch team members:", err);
      }
    };

    fetchMembers();
  }, [teamMembersId, dispatch, teamId, game, activeButton]);
  return teamMembers;
}

function getLeaderData(game) {
  const [leaderData, setLeaderData] = useState({});
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team?.teamData?._id);
  const leaderId = useSelector((state) => state.team?.teamData?.teamLeader);

  useEffect(() => {
    if (!leaderId) { setLeaderData({}); return };

    const fetchData = async () => {
      try {
        const userResults = await dispatch(getUserData(leaderId)).unwrap()
        const gameResults = await dispatch(getGameData({ gameType: game, userId: leaderId })).unwrap()
        const res = {
          ...userResults,
          gameData: gameResults[game.toLowerCase()]
        }
        setLeaderData({
          name: res.fullName,
          age: res.age || 0,
          assembleUid: res.assembleId,
          playerRole: (res.teamInfo.find((td) => td.teamId == teamId) || {})?.teamRole || "",
          ign: res.gameData?.inGameName || "not set by player",
          Uid: res.gameData?.gameId || "not set by player",
          image: res.avatarUrl || "https://placehold.co/600x400/222222/ffffff?text=PI"
        });
      } catch (err) {
        // console.error("Failed to fetch team members:", err);
      }
    };
    fetchData();
  }, [dispatch, teamId, game]);
  return leaderData;
}

function TeamLounge() {

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [savedProfilePicture, setSavedProfilePicture] = useState(null);
  const [savedUsername, setSavedUsername] = useState(null);
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  // 0 = intro (vector part),
  // 1 = create squad form,
  // 2 = confirmation/next screen
  const [squadStep, setSquadStep] = useState(0);
  const [teamMember, setTeamMember] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchloading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([
    // {
    //   uid: "123456",
    //   name: "John Doe",
    //   avatar: "https://i.pravatar.cc/50",
    //   invited: false,
    //   age: 21,
    //   username: "johnny",
    //   assembleUid: "ASB-001",
    // },
  ]);
  const [activeButton, setActiveButton] = useState(null);
  const [formData, setFormData] = useState({
    teamName: "",
    tagline: "",
    description: "",
  });
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    logo: null,
    banner: null,
  });
  const [previewUrls, setPreviewUrls] = useState({
    logo: null,
    banner: null,
  });
  const [selectedSlot, setSelectedSlot] = useState(null);


  const dispatch = useDispatch()
  const data = useUsersData(gamesToSend[activeButton], activeButton)
  const ldata = getLeaderData(gamesToSend[activeButton])
  const userId = useSelector((state) => state.auth?.user?._id)
  const userdata = useSelector((state) => state.auth?.userData)
  const loading = useSelector((state) => state.team.loading)
  const teamData = useSelector((state) => state.team.teamData)
  const [isLeader, setIsLeader] = useState(false)
  const [logo, setLogo] = useState()
  const [banner, setBanner] = useState()
  const isloadingImage = useSelector((state) => state?.team?.loading)
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setSearchLoading(true);
      const res = await dispatch(searchUser(searchValue))
      if (res.type === "searchUser/fulfilled") {
        setSearchResults(res.payload);
      }
      setSearchLoading(false)
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const toggleInvite = (uid) => {
    setSearchResults((prev) =>
      prev.map((player) =>
        player._id === uid ? { ...player, invited: !player.invited } : player
      )
    );
  };

  const handleTeamInvite = async (userId) => {
    const teamId = teamData._id
    const res = await dispatch(sendTeamJoinReq({ userId, teamId }))
    if (res.type === "sendTeamJoinReq/fulfilled") {
      toast.success("Team invite sent successfully")
    } else {
      toast.error("Error sending team invite")
    }

  }

  const games = [
    "Battleground Mobile India",
    "Call of Duty Mobile",
    "Free Fire Max",
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (type, file) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrls((prev) => ({ ...prev, [type]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const logoBoxStyle = {
    width: "160px",
    height: "160px",
    gap: "10px",
    transform: "rotate(0deg)",
    opacity: 1,
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "white",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const bannerBoxStyle = {
    width: "1113px", // fill width if you want full screen, you can use "100%"
    height: "160px",
    transform: "rotate(0deg)",
    opacity: 1,
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  //db connection 

  const handleFileUpload = async (type, filei) => {
    if (type == "banner") {
      const file = filei
      const res1 = await dispatch(uploadTeamImage({ file }))
      if (res1.type === "uploadTeamImage/fulfilled") {
        setBanner(res1.payload.url)
      } else {
        toast.error("error uploading image")
      }
    }
    if (type == "logo") {
      const file = filei
      const res = await dispatch(uploadTeamImage({ file }))
      if (res.type === "uploadTeamImage/fulfilled") {
        setLogo(res.payload.url)
      } else {
        toast.error("error uploading image")
      }
    }

  }

  useEffect(() => {
    if (teamData && Object.keys(teamData).length > 0) {
      setSquadStep(2);
    } else {
      setSquadStep(0);
    }
  }, [teamData, activeButton]);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamId = userdata.teamInfo.map((g) => {
        if (g.teamForWhichGame == gamesToSend[activeButton]) {
          return g.teamId
        }
      })
      await dispatch(getTeam(teamId.filter(Boolean)[0]))
    }
    userdata?.teamInfo?.length > 0 && fetchTeam()

  }, [dispatch, activeButton])

  useEffect(() => {
    const fetchTeam = async () => {
      await dispatch(getUserData(userId))
    }
    fetchTeam()
  }, [dispatch, activeButton,])

  useEffect(() => {
    setIsLeader(teamData.teamLeader == userdata._id)
  }, [activeButton, dispatch, data, userdata])

  const handleCreateTeam = async () => {
    const teamData = { ...formData, teamForWhichGame: gamesToSend[activeButton], bannerUrl: banner, logoUrl: logo }
    const leaderId = userId
    const res = await dispatch(createTeam({ teamData, leaderId }))
    await dispatch(getUserData(userId))
    if (res.type === "createTeam/fulfilled") {
      setSquadStep(2)
    }
  }

  return (
    <div className="block w-full">
      <div className="ACMAIN relative h-screen bg-cover bg-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loungeBG})`,
            filter: "blur(20px)",
            opacity: "0.3",
          }}
        ></div>
        <style>{`
           .frosted-glass {
             background: rgba(0, 0, 0, 0.4);
             backdrop-filter: blur(20px);
             border: 1px solid rgba(255, 255, 255, 0.2);
           }
           .AC-head-text { font-size: 1.5rem; font-weight: bold; }
           .AC-text { font-size: 0.9rem; color: #E0E0E0; }
           .AC-span { color: #3b82f6; }
           .personal-info, .per-info-options { border-radius: 0.5rem; }
           input::-webkit-outer-spin-button,
           input::-webkit-inner-spin-button {
             -webkit-appearance: none;
             margin: 0;
           }
           input[type=number] {
             -moz-appearance: textfield;
           }
         `}</style>
        <div className="relative h-screen w-full text-white">
          {/* Notification Popup */}
          {showNotification && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-red-500 text-white px-6 py-3 rounded shadow-lg text-center animate-fadeIn font-arialrounded">
                {notification}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-35"></div>

          {/* Top Navigation */}
          <UpperNav
            name="Team Lounge"
            username={savedUsername}
            profilePicture={savedProfilePicture}
            onProfileClick={() =>
              setIsProfileCardVisible(!isProfileCardVisible)
            }
          />

          {/* Profile Card */}
          {isProfileCardVisible && (
            <ProfileCard
              username={savedUsername}
              profilePicture={savedProfilePicture}
            />
          )}

          <div className="flex  w-full" >
            {/* Sidebar on the left */}
            <div className="w-[60px] lg:w-[80px] text-white">
              <Sidebar />
            </div>

            {/* Main content on the right */}
            <div className="flex-1 flex flex-col p-4 lg:p-6 gap-3 lg:gap-5 overflow-y-auto">
              {/* Horizontal toggle bar */}
              <div className="absolute top-[75px] left-0 right-0 ml-[90px] mr-[40px] h-[56px] flex items-center justify-between border rounded-[12px] p-2 gap-4 shadow max-sm:mt-5 max-sm:h-[150px] max-sm:ml-16 max-sm:mr-5 z-10 " >
                <div className="flex rounded-[8px] w-full h-full gap-[8px] max-sm:flex-col">
                  {games.map((game, index) => {
                    const isActive = activeButton === index;
                    return (
                      <button
                        key={index}
                        className={`
              flex-1 h-full rounded-[8px] text-[14px] font-arialrounded transition-colors
              ${isActive
                            ? "bg-white text-black" // active / clicked
                            : "bg-black text-white hover:bg-white hover:text-black" // default + hover
                          }
            `}
                        onClick={() => setActiveButton(index)}
                      >
                        {game}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 0: Empty */}
          {squadStep === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                text-white rounded-lg z-20 flex flex-col md:flex-row gap-6 md:gap-4 
                items-center md:items-start max-w-[95%] md:max-w-none mt-24">

              {/* Left image */}
              <div className="rounded-lg w-full max-w-[280px] md:max-w-[320px] h-auto md:h-[308px] max-sm:hidden">
                <img
                  src={vector1}
                  alt="Vector 1"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right content */}
              <div className="flex flex-col gap-4 flex-1 justify-center items-center md:items-start ">
                <div className="w-full  rounded-lg flex flex-col gap-4 items-center md:items-start">
                  <div className="capitalize text-center md:text-left font-sans text-xl sm:text-2xl leading-tight">
                    Put together a team!
                  </div>
                  <div className="capitalize text-center md:text-left font-sans text-sm sm:text-lg leading-normal">
                    When you create a team, you can join squad tournaments! It's
                    a great way to connect with anyone who has an Assemble
                    account.
                  </div>
                </div>

                <div className="w-full max-w-[550px] flex flex-col gap-3  md:px-0">
                  <button
                    className={`px-4 py-2 rounded text-base sm:text-lg transition ${activeButton !== null
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    onClick={() => activeButton !== null && setSquadStep(1)}
                    disabled={activeButton === null}
                  >
                    Start a {activeButton !== null ? games[activeButton] : "game"} squad!
                  </button>
                </div>
              </div>
            </div>

          )}

          {/* STEP 1: Add Details */}
          {squadStep === 1 && (
            <div
              className="absolute top-[150px] left-[90px] right-[40px] 
               text-white p-6 rounded-lg z-20 
               max-sm:mt-28 max-sm:left-[58px] max-sm:right-[15px] 
               max-sm:max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar"
            >
              <div className="flex gap-4 mb-4">
                {/* Logo Box */}
                {banner && <div
                  className="cursor-pointer overflow-hidden shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center"
                  style={{
                    ...logoBoxStyle,
                    backgroundImage: `url(${previewUrls.logo || checkPattern})`, // use uploaded or default
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => logoInputRef.current.click()}
                >
                  {!previewUrls.logo && (
                    <>
                      <Plus className="w-8 h-8 text-black" />
                      <div className="text-center">
                        <div className="text-black font-arialrounded text-[16px]">
                          Add Logo Design
                        </div>
                        {/* <div className="text-[12px] text-gray-600 mt-1 font-arialrounded">
                          Logo size should be in 1 : 1 ratio or SVG, PNG, JPEG
                          Supported
                        </div> */}
                      </div>
                    </>
                  )}
                </div>}
                {/* Hidden input for logo */}
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange("logo", e.target.files[0]);
                      handleFileUpload("logo", e.target.files[0])
                    }
                  }}
                />

                {/* Banner Box */}
                <div
                  className="cursor-pointer overflow-hidden shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] flex-1 flex items-center justify-center"
                  style={{
                    ...bannerBoxStyle,
                    width: "100%",
                    backgroundImage: `url(${previewUrls.banner || checkPattern})`, // use uploaded or default
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => bannerInputRef.current.click()}
                >
                  {!previewUrls.banner && (
                    <div className="flex flex-col items-center text-center">
                      <Plus className="w-8 h-8 text-black" />
                      <div className="text-black font-arialrounded text-[16px] mt-1">
                        Add Banner Image
                      </div>
                      {/* <div className="text-[12px] text-gray-600 font-arialrounded mt-1">
                        Banner Size Should Be In 7.5 : 1 Ratio Or 1192px * 160px
                      </div> */}
                    </div>
                  )}
                </div>
                {/* Hidden input for banner */}
                <input
                  type="file"
                  accept="image/*"
                  ref={bannerInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange("banner", e.target.files[0]);
                      handleFileUpload("banner", e.target.files[0])
                    }
                  }}
                />
              </div>

              {/* Team Name & Tagline */}
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                {/* Team Name: fixed width on large, full width on small */}
                <div className="w-full lg:w-[360px] font-arialrounded">
                  <FloatingLabelInput
                    name="teamName"
                    label="Team Name"
                    value={formData.teamName}
                    onChange={handleChange}
                    containerClassName=""
                    error={
                      !formData.teamName.trim() && formData.teamName !== ""
                        ? "Required"
                        : ""
                    }
                    style={{
                      height: "56px",
                      borderRadius: "12px",
                      paddingTop: "7px",
                      paddingRight: "23px",
                      paddingBottom: "7px",
                      paddingLeft: "23px",
                    }}
                    inputClassName={`!shadow-none !bg-white !hover:bg-white !hover:text-black focus:outline-none w-full ${!formData.teamName.trim() && formData.teamName !== ""
                      ? "border-2 border-red-500"
                      : ""
                      }`}
                  />
                </div>

                {/* Tagline: fills remaining space */}
                <div className="w-full flex-1 font-arialrounded">
                  <FloatingLabelInput
                    name="tagline"
                    label="Tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    error={
                      !formData.tagline.trim() && formData.tagline !== ""
                        ? "Required"
                        : ""
                    }
                    style={{
                      height: "56px",
                      borderRadius: "12px",
                      paddingTop: "7px",
                      paddingRight: "23px",
                      paddingBottom: "7px",
                      paddingLeft: "23px",
                    }}
                    inputClassName={`!shadow-none !bg-white !hover:bg-white !hover:text-black focus:outline-none w-full ${!formData.tagline.trim() && formData.tagline !== ""
                      ? "border-2 border-red-500"
                      : ""
                      }`}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 w-full font-arialrounded">
                <FloatingLabelInput
                  name="description"
                  label="Description"
                  as="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  wordLimit={500}
                  style={{
                    height: "108px",
                    borderRadius: "12px",
                    paddingTop: "28px", // avoid label overlap
                    paddingRight: "23px",
                    paddingBottom: "7px",
                    paddingLeft: "23px",
                    opacity: 1,
                    lineHeight: "1.5",
                  }}
                  inputClassName="!shadow-none !bg-white !hover:bg-white !hover:text-black focus:outline-none w-full font-arialrounded"
                />
              </div>


              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-4  max-sm:items-stretch">
                <button
                  className="bg-black text-white font-arialrounded px-16 py-2 rounded text-sm max-sm:w-full max-sm:px-4 max-sm:py-3"
                  onClick={() => setSquadStep(0)}
                >
                  Cancel
                </button>

                {!isloadingImage && <button
                  className="bg-[#00FF90] hover:bg-green-600 text-black font-arialrounded rounded px-16 py-2 text-sm max-sm:w-full max-sm:px-4 max-sm:py-3"
                  onClick={() => {
                    if (
                      !formData.teamName.trim() ||
                      !formData.tagline.trim() ||
                      !formData.description.trim() ||
                      !previewUrls.logo ||
                      !previewUrls.banner
                    ) {
                      setNotification("All fields are required!");
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 1000);
                      return;
                    }
                    handleCreateTeam();
                  }}
                >
                  {loading ? <Loader color="black" /> : "Create A Squad"}
                </button>}
              </div>

            </div>
          )}

          {/* STEP 2: Confirmation */}
          {squadStep === 2 && (
            <div
              className="absolute z-5 left-[90px] right-[40px] overflow-auto max-sm:mt-36 max-sm:left-[58px] max-sm:right-[15px]  top-[150px]  max-h-[calc(100vh-160px)] max-sm:max-h-[calc(100vh-300px)]"
            // style={{ top: "150px", maxHeight: "calc(100vh - 300px)" }} // 150px from top, leave some extra margin
            >
              <div className="relative w-full bg-black/70 rounded-lg p-6 flex flex-col gap-6 text-white overflow-auto">
                {/* Banner */}
                (
                <div className="w-full h-[160px] rounded-lg overflow-hidden">
                  <img
                    src={teamData.bannerUrl || url.banner}
                    alt="Squad Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                )

                {/* Team Info */}
                <div className="flex justify-between items-center p-4 max-sm:p-0 rounded-md h-[60px]">
                  <div className="flex items-center gap-4">
                    (
                    <img
                      src={teamData.logoUrl || url.logo}
                      alt="Logo"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    )
                    <div>
                      <h2 className="text-[20px] font-sans max-sm:text-[15px]">Team Name</h2>
                      <p className="text-[32px] font-batman uppercase text-gray-300 max-sm:text-[20px]">
                        {teamData.teamName}
                      </p>
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="flex flex-col items-center">
                    <span className="text-[20px] max-sm:text-[15px] font-sans">Team Size</span>
                    <div>
                      <span className="text-[32px] max-sm:text-[20px] font-arialrounded">
                        0{teamData.numberOfMembers}
                      </span>
                      <span className="text-[20px] font-arialrounded max-sm:text-[15px]">/08</span>
                    </div>
                  </div>
                </div>

                {/* Tagline & Description */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[16px] font-sans font-normal">
                      Tagline
                    </h3>
                    <p className="text-[20px] font-arialrounded capitalize">
                      {teamData.tagline}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-sans">Description</h3>
                    <p className="text-gray-300 font-arialrounded">
                      {teamData.description}
                    </p>
                  </div>
                </div>

                {/* Players Grid */}
                <div className="flex flex-row gap-6 p-4 max-sm:flex-col max-sm:p-0 max-sm:items-center ">
                  <LeaderCard leader={ldata} />

                  {activeButton === 1 ?
                    [...Array(3)].map((_, index) => {
                      const player = data[index];
                      return player ? (
                        <PlayerCard key={index} player={player} index={index} />
                      ) : (
                        isLeader && <EmptyPlayerCard
                          key={index}
                          index={index}
                          onClick={() => {
                            setSelectedSlot(index);
                            setShowSearchModal(true);
                          }}
                        />
                      );
                    })
                    :
                    [...Array(3)].map((_, index) => {
                      const player = data[index];
                      return player ? (
                        <PlayerCard key={index} player={player} index={index} />
                      ) : (
                        isLeader && <EmptyPlayerCard
                          key={index}
                          index={index}
                          onClick={() => {
                            setSelectedSlot(index);
                            setShowSearchModal(true);
                          }}
                        />
                      );
                    })}
                </div>

                {showSearchModal && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
                    onClick={() => setShowSearchModal(false)} // click outside closes
                  >
                    <div
                      className="bg-black p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto max-sm:max-w-[85%]"
                      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
                    >
                      {/* Search Input with Clear Button */}
                      <div className="relative mb-4 font-arialrounded">
                        <input
                          type="text"
                          placeholder="Search player"
                          className="w-full p-2 rounded text-black pr-10"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-black font-bold text-xl"
                            onClick={() => setSearchValue("")} // clears the input
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Search Results */}
                      <div className="flex flex-col gap-2 ">
                        {searchResults.map((player) => (
                          <div
                            key={player.assembleId}
                            className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
                          >
                            {/* Left Section: Avatar + Info */}
                            <div className="flex items-center gap-3">
                              {/* Avatar */}
                              <img
                                src={player.avatarUrl || "https://placehold.co/600x400/222222/ffffff?text=PI"}
                                alt={player.fullName}
                                className="w-10 h-10 rounded-full object-cover"
                              />

                              {/* Names */}
                              <div className="flex max-sm:flex-col sm:flex-row items-start sm:items-center  w-full">
                                {/* Left Name Column */}
                                <div className="flex flex-col gap-1">
                                  <p className="text-gray-500 font-semibold text-xs uppercase">
                                    {player.assembleId}
                                  </p>
                                  <p className="text-black font-bebas text-lg sm:text-xl uppercase">
                                    {player.username || "Username not set"}
                                  </p>
                                </div>

                                {/* Vertical Line (only for desktop) */}
                                <div className=" hidden sm:block w-px bg-black h-11 mx-4"></div>

                                {/* Right Name Column */}
                                <div className="flex flex-col gap-1">
                                  <p className="text-gray-500 font-semibold text-xs uppercase hidden sm:block ">
                                    Name
                                  </p>
                                  <p className="text-black font-bebas text-lg sm:text-xl uppercase hidden sm:block ">
                                    {player.fullName}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Button */}
                            <div>
                              <button
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${player.invited
                                  ? "bg-red-500 text-white hover:bg-red-600"
                                  : "bg-green-400 text-black hover:bg-green-500"
                                  }`}
                                onClick={() => (toggleInvite(player._id), !player.invited && handleTeamInvite(player._id))}
                              >
                                {player.invited ? "Cancel" : "Send invitation"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div >
  );
}

export default TeamLounge;
