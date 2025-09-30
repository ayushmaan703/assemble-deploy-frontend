import React, { useState, useRef, useEffect } from "react";

const dropdownGameOptions = [
  {
    id: "bgmi",
    name: "Battleground Mobile India",
    image: "/images/BGMI.png",
    description: "Multiplayer battle royale game.",
  },
  {
    id: "freefire",
    name: "Freefire Max",
    image: "/images/FREEFIRE.png",
    description: "Fast-paced shooter game.",
  },
  {
    id: "codm",
    name: "Call of Duty Mobile",
    image: "/images/CODM.png",
    description: "Mobile version of the iconic FPS.",
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "/images/Valorant.png",
    description: "Tactical team-based shooter.",
  },
];

const CustomGameDropdown = ({ selectedGames = [], setSelectedGames }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleGameSelection = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter((id) => id !== gameId));
    } else {
      setSelectedGames([...selectedGames, gameId]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const latestGameId = selectedGames[selectedGames.length - 1];
  const latestGameName =
    dropdownGameOptions.find((g) => g.id === latestGameId)?.name ||
    "Select Games";

  return (
    <div
      className="relative w-full font-arialrounded text-gray-500"
      ref={dropdownRef}
    >
      <div
        className="bg-white rounded-xl px-5 py-3 shadow-md cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className=" ">{latestGameName}</div>
      </div>

      {open && (
        <div className="absolute bg-white rounded-xl mt-2 z-10 p-3 shadow-lg w-full max-h-60 overflow-y-auto">
          {dropdownGameOptions.map((game) => {
            const isSelected = selectedGames.includes(game.id);
            return (
              <label
                key={game.id}
                className={`flex items-center mt-2 gap-3 py-2 px-3 rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                onClick={() => toggleGameSelection(game.id)}
              >
                {/* Custom checkbox square */}
                <span
                  className={`
                     w-5 h-5 border-2 rounded-sm flex items-center justify-center ${
                       isSelected
                         ? "bg-black border-black"
                         : "bg-white border-black"
                     }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-medium">{game.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomGameDropdown;
