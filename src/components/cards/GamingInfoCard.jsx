import React from "react";

const InfoItem = ({ label, value }) => (
  <div>
    <div className="text-[8px] font-['Source_Sans_Pro'] font-normal uppercase tracking-[.04em] text-gray-300">
      {label}
    </div>
    <div
      className="w-full font-['Alte_Haas_Grotesk'] font-bold text-xs leading-none tracking-[.04em] uppercase mt-1"
      style={{ height: "15px" }}
    >
      {value}
    </div>
  </div>
);

const GamingInfoCard = ({
  username,
  skillLevel,
  gamingPlatform,
  gamingServer,
  favouriteGames = [],
  socialMedia = [],
  onEdit,
}) => {
  return (
    <div className="relative w-full mt-5 rounded-xl h-fit overflow-hidden shadow-md">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: "url('/Nextpage.png')" }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full bg-black/60 backdrop-blur-xl p-5 text-white rounded-xl">
        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Gaming Information</h1>

        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <InfoItem label="Username" value={username} />
          <InfoItem label="Skill Level" value={skillLevel} />
          <InfoItem label="Gaming Platform" value={gamingPlatform} />
          <InfoItem label="Gaming Server" value={gamingServer} />

          {/* Favourite Games - takes full width on medium screens */}
          <div className="md:col-span-2">
            <div className="text-xs text-gray-300 uppercase mb-1">Favourite Games</div>
            <div className="flex flex-wrap gap-2 font-medium">
              {favouriteGames.length > 0 ? (
                favouriteGames.map((game, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {game.toUpperCase()}
                  </span>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>

          {/* Connected Social Media - takes full width on medium screens */}
          <div className="md:col-span-2">
            <div className="text-xs text-gray-300 uppercase mb-1">Connected Social Media</div>
            <div className="flex flex-wrap gap-2 font-medium">
              {socialMedia.length > 0 ? (
                socialMedia.map((platform, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {platform.toUpperCase()}
                  </span>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingInfoCard;