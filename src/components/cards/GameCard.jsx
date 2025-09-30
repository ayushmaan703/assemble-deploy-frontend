import React from "react";
import { useDispatch } from "react-redux";
import { addBgmiGameData } from "../../redux/features/gaming_slices/bgmiSlice";
import { addCodmGame } from "../../redux/features/gaming_slices/codmSlice";
import { addValorantGameData } from "../../redux/features/gaming_slices/valorantSlice";
import { addFreefireGameData } from "../../redux/features/gaming_slices/freefireSlice";
import toast from "react-hot-toast";
const GameCard = ({
  username,
  id,
  rank,
  level,
  image,
  gameId,
  onDelete,
  onEdit,
  gameName,
  csRank
}) => {

  const dispatch = useDispatch();

  const handleVerifyNow = async () => {
    if (gameId === "bgmi") {
      const gameData = {
        gameId: id, // Should be a number, not a string like "bgmi"
        level: level,
        rank: rank,
        inGameName: username,
        region: "Asia",
        kdRatio: 0.0,
        ratingPoints: 0,
        totalMatches: 0,
        winCount: 0,
        totalKills: 0,
      };
      await dispatch(addBgmiGameData(gameData));
      toast.success("BGMI game data added successfully!");
    }
    if (gameId === "codm") {
      const codmGameData = {
        gameId: id,
        level: level,
        rank: rank,
        inGameName: username,
        kdRatio: 0.0,
        totalScore: 0,
        totalMatches: 0,
        winCount: 0,
        totalKills: 0,
      };
      await dispatch(addCodmGame(codmGameData));
      toast.success("CODM game data added successfully!");
    }
    if (gameId === "valorant") {
      const valorantGameData = {
        riotId: id,
        level: level,
        inGameName: username,
        competitiveTier: rank,
        totalMatches: 0,
        winCount: 0,
        totalKills: 0,
      };
      await dispatch(addValorantGameData(valorantGameData));
      toast.success("Valorant game data added successfully!");
    }

    if (gameId === "freefire") {
      const freefireGameData = {
        gameId: id,
        level: level,
        inGameName: username,
        rank: rank,
        csRank: csRank,
        kdRatio: 0.0,
        totalMatches: 150,
        winCount: 60,
        totalKills: 320,
      };
      await dispatch(addFreefireGameData(freefireGameData));
      toast.success("FreeFire game data added successfully!");
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl mt-5 font-sans">
      {/* Blurred background */}
      <div className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-lg"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full bg-black/0 backdrop-blur-xl p-3 text-white flex flex-col sm:flex-row gap-4 rounded-xl">

        {/* Left Image */}
        <div
          className="left w-full sm:w-48 h-40 sm:h-auto rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Content */}
        <div className="content w-full flex flex-col gap-3">

          {/* Title + Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold leading-tight">
              {gameName || "Gaming Information"}
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                className="bg-red-600 rounded-xl text-white px-3 py-1 text-xs flex-1 sm:flex-none"
                onClick={() => onDelete(gameId)}
              >
                Delete game
              </button>
              <button
                className="bg-black text-white px-3 py-1 text-xs border border-white rounded-xl flex-1 sm:flex-none"
                onClick={() => onEdit(gameId)}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-snug">
            Don't forget to add your gaming details to your profile! Include your
            skill level, preferred gaming platforms, servers, and games you love.
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-5 text-sm">
            <div>
              <div className="uppercase text-xs text-gray-300">In Game Username</div>
              <div className="font-medium break-all">{username}</div>
            </div>

            <div>
              <div className="uppercase text-xs text-gray-300">ID</div>
              <div className="font-medium">{id}</div>
            </div>

            <div>
              <div className="uppercase text-xs text-gray-300">Overall Rank</div>
              <div className="font-medium">{rank}</div>
            </div>

            <div>
              <div className="uppercase text-xs text-gray-300">Level</div>
              <div className="font-medium">{level}</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="px-4 py-2 rounded-xl text-black text-sm font-medium bg-[#33FF33] w-full sm:w-auto"
            onClick={handleVerifyNow}
          >
            Submit
          </button>
        </div>
      </div>
    </div>


  );
};

export default GameCard;
