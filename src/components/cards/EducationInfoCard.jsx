import React from "react";

// Helper component to avoid repeating code for each info item
const InfoItem = ({ label, value }) => (
  <div>
    {/* The label div styling from PersonalInfoCard */}
    <div className="text-[8px] font-['Source_Sans_Pro'] font-normal uppercase tracking-[.04em] text-gray-300">
      {label}
    </div>
    
    {/* The value div styling from PersonalInfoCard */}
    <div
      className="w-full font-['Alte_Haas_Grotesk'] font-bold text-xs leading-none tracking-[.04em] uppercase mt-1"
      style={{ height: '15px' }}
    >
      {value}
    </div>
  </div>
);

const EducationInfoCard = ({
  username,
  highestEducation,
  course,
  startingYear,
  institutionName,
  endingYear,
  state,
  eduPinCode,
  onEdit,
  // --- ADDED: Props for the image slider to match PersonalInfoCard ---
  svgNames,
  currentSvgIndex,
  onPrev,
  onNext,
}) => {
  return (
    // Main container - Styling remains unchanged
    <div className="relative w-full mt-5 rounded-xl h-fit overflow-hidden shadow-md">
      {/* Blurred background - Unchanged */}
      <div className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: "url('/Nextpage.png')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content - Unchanged */}
      <div className="relative z-10 w-full h-full bg-black/60 backdrop-blur-xl p-5 text-white rounded-xl">
        
        {/* --- ADDED: "Change Theme & Design" button from PersonalInfoCard --- */}
        <div className="absolute top-[90px] left-[19px] flex items-center justify-center bg-black w-[130px] h-[20px] mx-2 my-0 rounded-[4px] py-[4px] px-[20px] text-white text-[10px] whitespace-nowrap z-10">
          Change Theme & Design
        </div>

        {/* Header - Unchanged */}
        <div className="flex justify-center mb-4">
           <div
             className="
               bg-white text-black
               w-fir px-8 py-2
               flex items-center justify-center
               font-bebas text-xl font-normal capitalize leading-none tracking-wider
               [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]
               [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]
             "
           >
             Education Information
           </div>
        </div>
        
        {/* --- REMOVED: The extra description paragraph --- */}

        {/* Content Area - Layout updated to match PersonalInfoCard */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5">

          {/* --- UPDATED: Image panel with slider controls from PersonalInfoCard --- */}
          <div className="relative w-[268px] h-[138px] bg-black/30 rounded-tl-xl rounded-tr-xl bg-cover bg-center"
              style={{ backgroundImage: "url('BLUE.png')" }}
          >
              {/* Left Arrow Button */}
              <button
                  className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center"
                  style={{
                      width: '20px',
                      height: '24px',
                      padding: '8px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '4px'
                  }}
              >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11L1 6L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                  className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center"
                  style={{
                      width: '20px',
                      height: '24px',
                      padding: '8px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '4px'
                  }}
              >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </button>
          </div>

          {/* Username h2 - Styled to match PersonalInfoCard */}
          <h2 className="text-center font-['BatmanForeverAlternate'] font-normal text-base uppercase leading-none tracking-[.08em] mb-6">
            {username}
          </h2>

          {/* Right info block - Grid layout remains the same */}
          <div className="grid grid-cols-6 gap-y-5 gap-x-4 text-sm mb-5">
            {/* Highest Education: Full Width */}
            <div className="col-span-6">
                <InfoItem label="Highest Education" value={highestEducation} />
            </div>
            {/* Institute Name: Full Width */}
            <div className="col-span-6">
                <InfoItem label="Institute Name" value={institutionName} />
            </div>
            {/* Course, Starting Year, Ending Year: 3 Columns */}
            <div className="col-span-2">
                <InfoItem label="Course" value={course} />
            </div>
            <div className="col-span-2">
                <InfoItem label="Starting Year" value={startingYear} />
            </div>
            <div className="col-span-2">
                <InfoItem label="Ending Year" value={endingYear} />
            </div>
            {/* State & Pincode: 2 Columns */}
            <div className="col-span-3">
                <InfoItem label="State" value={state} />
            </div>
            <div className="col-span-3">
                <InfoItem label="Pincode" value={eduPinCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfoCard;