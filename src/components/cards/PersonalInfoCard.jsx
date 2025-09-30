import React, { useState } from "react";

// Helper component to avoid repeating code for each info item
// Helper component to avoid repeating code for each info item
// Helper component to avoid repeating code for each info item
const InfoItem = ({ label, value }) => (
  <div>
    {/* The label div remains the same */}
    <div className="text-[8px] font-['Source_Sans_Pro'] font-normal uppercase tracking-[.04em] text-gray-300">
      {label}
    </div>
    
    {/* The value div is now styled as requested */}
    <div
      className="w-full font-['Alte_Haas_Grotesk'] font-bold text-xs leading-none tracking-[.04em] uppercase mt-1"
      style={{ height: '15px' }}
    >
      {value}
    </div>
  </div>
);

const PersonalInfoCard = ({
  username,
  fullname,
  gender,
  age,
  phoneNumber,
  tagline,
  state,
  address,
  country,
  pincode,
  onEdit,
}) => {
  return (
    <div className="relative w-full mt-5 rounded-xl h-fit overflow-hidden shadow-md">
      {/* Blurred background */}
      <div className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: "url('/Nextpage.png')" }} // Using your original background
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full bg-black/60 backdrop-blur-xl p-5 text-white rounded-xl">
      <div className="absolute top-[90px] left-[19px] flex items-center justify-center bg-black w-[130px] h-[20px] mx-2 rounded-[4px] py-[4px] px-[20px] text-white text-[10px] whitespace-nowrap z-10">
  Change Theme & Design
</div>




        {/* Header */}
        <div className="flex justify-center mb-4">
           <div
             className="
               bg-white text-black
               w-fit px-8 py-2
               flex items-center justify-center
               font-bebas text-xl font-normal capitalize leading-none tracking-wider
               [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)]
               [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]
             "
           >
             Personal Information
           </div>
        </div>
        
        {/* Edit Button - Repositioned to top right */}
        

        {/* Description */}
        

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5">
          {/* Left image panel */}
          {/* Left image panel with slider controls */}
{/* Left image panel with slider controls */}
{/* Left image panel with slider controls */}
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
        {/* SVG for '<' vector - now taller and bolder */}
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
        {/* SVG for '>' vector - now taller and bolder */}
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </button>
</div>
         <h2 className="text-center font-['BatmanForeverAlternate'] font-normal text-base uppercase leading-none tracking-[.08em] mb-6">
  {username}
</h2>

          {/* Right info block */}
          <div className="grid grid-cols-6 gap-y-5 gap-x-4 text-sm mb-5">
    {/* Name: Spans all 6 columns to take the full line */}
    <div className="col-span-6">
        <InfoItem label="NAME" value={fullname} />
    </div>

    {/* Age & Phone Number: Each spans 3 columns to take up half the line */}
    <div className="col-span-3">
        <InfoItem label="AGE" value={`${age} YEARS`} />
    </div>
    <div className="col-span-3">
        <InfoItem label="PHONE NUMBER" value={phoneNumber} />
    </div>

    {/* State, Country & Pincode: Each spans 2 columns to take up one-third of the line */}
    <div className="col-span-2">
        <InfoItem label="STATE" value={state} />
    </div>
    <div className="col-span-2">
        <InfoItem label="COUNTRY" value={country} />
    </div>
    <div className="col-span-2">
        <InfoItem label="PINCODE" value={pincode} />
    </div>
    <div className="col-span-6">
        <InfoItem label="TAGLINE" value={tagline} />
    </div>
    <div className="col-span-6">
        <InfoItem label="Address" value={address} />
    </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;