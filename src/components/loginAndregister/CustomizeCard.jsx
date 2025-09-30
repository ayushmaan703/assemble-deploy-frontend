import React, { useState, useEffect } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';

export default function CustomizeCard() {
    const [isLogin, setIsLogin] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    const viewportHeight = useViewportHeight();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Spacing mapping for vertical gaps
    const getDynamicSpacing = (height) => {
        if (height < 600) return "space-y-2";
        if (height < 800) return "space-y-4";
        if (height < 1000) return "space-y-6";
        return "space-y-8";
    };
    const dynamicSpacing = getDynamicSpacing(viewportHeight);

    const images = [
        './Login Image 01.png',
        './Login Image 02.png',
        './Login Image 03.png',
        './Login Image 04.png',
        './Login Image 05.png',
        './Login Image 06.png',
        './Login Image 07.png',
        './Login Image 08.png',
        './Login Image 09.png',
        './Login Image 10.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setFade(true);
            }, 100);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Mobile Banner */}
            <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh] z-10 overflow-hidden">
                <img
                    src="./valorantda.svg"
                    alt="Banner"
                    className="w-full h-full object-cover relative -translate-y-7"
                />
            </div>

            {/* Left Panel (scrollable) */}
            <div
                className="w-full lg:w-1/2 h-full bg-white flex flex-col 
        pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5 
        overflow-y-auto no-scrollbar"
            >
                {/* Header */}
                <div className="w-full">
                    <div className="flex items-center justify-between mb-3 lg:mb-5">
                        <img src={logo} alt="Logo" className="h-10 lg:h-12 w-10 lg:w-12 object-contain" />
                        <span className="text-xl lg:text-3xl font-bebas text-BrandColor">ASSEMBLE</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center w-full h-10 lg:h-12">
                        <div className="flex rounded-full py-1 px-2 gap-2 w-full h-full bg-[#F2F2F2]">
                            <button
                                onClick={() => navigate("/")}
                                className={`w-full h-full rounded-full px-3 lg:px-6 text-[12px] lg:text-[16px] ${isLogin ? "bg-white text-black" : "text-black"}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`w-full h-full rounded-full px-3 lg:px-6 text-[12px] lg:text-[16px] ${!isLogin ? "bg-black text-white" : "bg-black text-white"}`}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full flex-1 flex flex-col">
                    <div className="flex flex-col items-center mb-3 lg:mb-4">
                        <div className="flex w-full items-center justify-between mb-2">
                            <img
                                className="w-9 h-9 lg:w-12 lg:h-12 p-2 cursor-pointer"
                                src="./Vector.svg"
                                alt="Back"
                                onClick={() => navigate(-1)}
                            />
                            <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">
                                Customize Your Esports Card
                            </h2>
                        </div>
                        <p className="text-center text-[#999999] font-arialrounded text-[10px] lg:text-base">
                            "To view your esports card and customize it, add details of your favorite games and IDs."
                        </p>
                    </div>

                    <div className={`flex flex-col flex-1 pt-4 lg:justify-center ${dynamicSpacing}`}>
                        {/* Cards */}
                        <div className="flex w-full justify-center md:justify-between gap-4">
                            {/* Mobile scroll */}
                            <div className="flex md:hidden overflow-x-auto gap-4 no-scrollbar w-full px-2">
                                {["Card1.svg", "Card2.svg", "Card3.svg"].map((card, i) => (
                                    <img
                                        key={i}
                                        className="h-48 sm:h-56 rounded-xl flex-shrink-0 transition-transform duration-300 hover:scale-105"
                                        src={card}
                                        alt={`Card ${i}`}
                                    />
                                ))}
                            </div>

                            {/* Desktop row */}
                            <div className="hidden md:flex w-full justify-between gap-4">
                                {["Card1.svg", "Card2.svg", "Card3.svg"].map((card, i) => (
                                    <img
                                        key={i}
                                        className="h-56 transition-transform duration-300 hover:scale-110"
                                        src={card}
                                        alt={`Card ${i}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div
                            className={`flex flex-col sm:flex-row gap-3 w-full mt-auto pb-3 ${isHovering ? "translate-y-4" : ""}`}
                        >
                            <button
                                onClick={() => navigate("/homepage")}
                                className="bg-white border-2 border-black text-black h-10 lg:h-auto lg:py-2 rounded font-arialrounded text-[12px] lg:text-[20px] w-full"
                            >
                                Skip For Now
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/Personalinfo");
                                }}
                                className="bg-[#4D4D4D] text-white hover:bg-black h-10 lg:h-auto lg:py-2 rounded font-arialrounded text-[12px] lg:text-[20px] w-full"
                            >
                                Add Gaming Details
                            </button>
                        </div>
                    </div>

                    {/* Supported Games */}
                    <div className="mt-4">
                        <div className="w-full flex items-center justify-center mb-2">
                            <span className="font-sans font-semibold text-[10px] lg:text-[20px] text-black">
                                Tournament Supported Games
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
                            {["PUBG.svg", "Vector 2.svg", "Valorant3.svg", "Clash Of Clans.svg", "Call of duty mobile.svg"].map((game, i) => (
                                <img key={i} src={`./${game}`} alt={game} className="w-10 h-10 lg:w-20 lg:h-20" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="hidden lg:block lg:w-1/2 h-full bg-gray-800 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={images[currentIndex]}
                        alt={`Character ${currentIndex + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
            </div>
        </div>
    );
}
