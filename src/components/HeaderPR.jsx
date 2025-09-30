import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderPR = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Update the header structure and styling */}
      {/* Added bg-black class for background color */}
      <div className="w-full flex justify-between items-center px-6 py-4 text-white bg-black">
        {/* Add the logo image */}
        <div className="flex items-center">
            <img src="/logo.png" alt="Assemble Logo" className="h-10 mr-2" /> {/* Added img tag */}
        </div>
        {/* Apply the specified styles to the button and add the SVG */}
        <button
          className="text-2xl font-semibold capitalize flex items-center" // Added flex and items-center for alignment
          style={{ // Inline styles for font family, line height, and letter spacing
            font:'sourceSans',
            lineHeight: '1.5', // 150%
            letterSpacing: '0.96px',
            fontSize: '24px',
          }}
          onClick={() => navigate('/')}
        >
          Back To Login
          {/* Add the vector.svg image after the text */}
          <img src="src\assets\Vector.svg" alt="Back Arrow" className="ml-5 h-5" /> {/* Added img tag for SVG */}
        </button>
      </div>
    </>
  );
};

export default HeaderPR;
