import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameDetails, setGameDetails] = useState({});
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tagLineID, setTagLineID] = useState("");
  const navigate = useNavigate();

  const gameAPIEndpoints = {
    "Battleground Mobile India": "bgmi",
    "Call of Duty Mobile": "codm",
    "Valorant PC": "valorant",
    "FreeFire Mobile": "freefire",
    "Asphalt 9": "asphalt",
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setShowGameOptions(false);
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [game]: prevDetails[game] || "",
    }));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [selectedGame]: value,
    }));
  };

  const handleInputChange2 = (e) => {
    setTagLineID(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedGame || !gameDetails[selectedGame]) {
      setErrorMessage("Please select a game and enter your ID.");
      return;
    }

    const gameIDone = gameDetails[selectedGame];
    const endpoint = gameAPIEndpoints[selectedGame];

    if (!endpoint) {
      setErrorMessage("Invalid game selection.");
      return;
    }

    try {
      let requestBody = {};
      if (endpoint === "valorant") {
        // Special API call for Valorant
        requestBody = {
          gameID: {
            riotId: gameIDone,
            tagline: tagLineID,
          },
        };
      } else {
        // API request for other games
        requestBody = {
          gameID: gameIDone, // Fix: Ensure correct key format
        };
      }

      const response = await axios.post(
        `/api/v1/users/games/${endpoint}`,
        requestBody
      );

      if (response.status === 201 && response.data.success) {
        navigate("/browse");
      } else {
        setErrorMessage(response.data.message || "Submission failed.");
      }
    } catch (error) {
      // console.error("Error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="main relative">
      <div className="navbar absolute top-0 left-0 p-4">
        <div className="assemble text-white text-2xl font-bold">ASSEMBLE</div>
        <div className="GUI text-white text-lg">GAMEZONE UNITED INDIA</div>
      </div>

      <div
        className="back absolute w-full text-2xl text-white mt-2 text-end cursor-pointer"
        // onClick={() => console.log("Back button clicked")}
      >
        Back &lt;
      </div>

      <div className="black h-screen w-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="black h-[90%] w-[50%] flex-col mt-9 border-slate-400 border-2 flex justify-center items-center rounded-2xl bg-[#ffffff] bg-opacity-15 backdrop-blur-md">
          <div className="up flex flex-col items-center justify-center space-y-6">
            <div className="t1 text-3xl tracking-widest">GAMING PROFILE</div>
            <div className="t2 text-3xl text-white">GHOSTRIDER69</div>
          </div>

          <div className="down h-[50%] mt-5 w-[90%] flex border-2 rounded-xl border-black">
            <div className="left w-[40%] flex flex-col rounded-r-xl h-full border-r-2 border-black relative">
              <div className="selector1 px-16 bg-[#ffffff] h-12 tracking-wide font-[arial] flex text-xs items-center border-b-2 border-black">
                SELECTED GAMES
              </div>

              {showGameOptions && (
                <div className="game-options absolute top-12 left-0 flex-col gap-28 ml-80 bg-white border border-black rounded-lg shadow-lg w-full z-10">
                  {Object.keys(gameAPIEndpoints).map((game, index) => (
                    <div
                      key={index}
                      className="game-item h-10 hover:bg-gray-300 rounded-lg flex justify-center items-center border-b border-gray-200 cursor-pointer"
                      onClick={() => handleGameClick(game)}
                    >
                      {game.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}

              {Object.keys(gameAPIEndpoints).map((game, index) => (
                <div
                  key={index}
                  className="game-item h-12 hover:bg-black hover:text-white flex justify-center items-center border-b-2 border-black text-xs cursor-pointer"
                  onClick={() => handleGameClick(game)}
                >
                  {game.toUpperCase()}
                </div>
              ))}
            </div>

            {selectedGame && (
              <div className="game-details flex flex-col justify-center items-center w-[60%]">
                <img
                  src={`/${gameAPIEndpoints[selectedGame]}.svg`}
                  alt={`Image for ${selectedGame}`}
                  className="rounded-xl mt-5 h-48 w-auto"
                />
                {selectedGame === "Valorant PC" && (
                  <input
                    type="text"
                    value={tagLineID}
                    onChange={handleInputChange2}
                    placeholder={` Tagline ID`}
                    className="mt-3 h-10 w-72 text-center border border-black rounded-md"
                  />
                )}
                <input
                  type="text"
                  value={gameDetails[selectedGame] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${selectedGame} ID`}
                  className="mt-2 h-10 w-72 text-center border border-black rounded-md"
                />
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="text-red-500 mt-3">{errorMessage}</div>
          )}

          <div className="submit text-white h-10 py-1 rounded-lg bg-[#000000] w-[90%] text-center mt-7">
            <button type="button" onClick={handleSubmit}>
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
