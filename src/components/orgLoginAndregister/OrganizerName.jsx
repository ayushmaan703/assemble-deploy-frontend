import React, { useState } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';
import { z } from 'zod';

// Define Zod validation schema
const organizationSchema = z.object({
    organizationName: z.string().min(1, 'Organization name is required').min(2, 'Organization name must be at least 2 characters'),
});

export default function OrganizerName() {
    const [organizationName, setOrganizationName] = useState('');
    const [keepSecure, setKeepSecure] = useState(false);
    const [errors, setErrors] = useState({ organizationName: '' });
    const navigate = useNavigate();

    const viewportHeight = useViewportHeight();

    const getDynamicSpacing = (height) => {
        if (height < 600) return 2;
        if (height < 800) return 2;
        if (height < 1000) return 6;
        return 8;
    };

    const getDynamicPadding = (height) => {
        if (height < 600) return 'p-2';
        if (height < 800) return 'p-4';
        if (height < 1000) return 'p-6';
        return 'p-8';
    };

    const getDynamicGap = (height) => {
        if (height < 600) return 'gap-2';
        if (height < 800) return 'gap-4';
        if (height < 1000) return 'gap-6';
        return 'gap-8';
    };

    const getDynamicMargin = (height) => {
        if (height < 600) return 'mb-2';
        if (height < 800) return 'mb-4';
        if (height < 1000) return 'mb-6';
        return 'mb-8';
    };

    const dynamicSpacing = getDynamicSpacing(viewportHeight);
    const dynamicPadding = getDynamicPadding(viewportHeight);
    const dynamicGap = getDynamicGap(viewportHeight);
    const dynamicMargin = getDynamicMargin(viewportHeight);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = { organizationName: '' };

        if (!organizationName.trim()) {
            newErrors.organizationName = 'Organization name is required';
        } else if (organizationName.trim().length < 2) {
            newErrors.organizationName = 'Organization name must be at least 2 characters';
        }

        setErrors(newErrors);

        if (!newErrors.organizationName) {

            navigate("/OrganizerPasswordSetup");
        }
    };

    return (
        <div className="w-full min-h-screen h-auto flex flex-col lg:flex-row">
            {/* Left Panel */}
            <div className={`flex flex-col w-full lg:w-1/2 h-full min-h-screen relative ${dynamicGap} pt-4 lg:pt-8`}>
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="./rectangle.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0"></div>
                </div>

                <div className="relative h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className={`flex items-center justify-between w-full h-12 lg:h-14 px-6 lg:px-12 ${dynamicMargin}`}>
                        <img src={logo} alt="Logo" className="h-10 lg:h-14 w-10 lg:w-14 object-contain" />
                        <span className="text-3xl lg:text-4xl font-bebas text-BrandColor">ASSEMBLE</span>
                    </div>

                    {/* Hero Text */}
                    <div className={`flex flex-col w-full h-auto px-6 lg:px-12 pt-6 lg:pt-12 ${dynamicGap}`}>
                        <div className="flex flex-col lg:flex-row w-full max-w-full gap-2 lg:gap-5">
                            <h2 className="text-4xl lg:text-8xl font-normal font-bebas leading-[1] tracking-wide text-black">
                                CREATE,
                            </h2>
                            <h2 className="text-3xl lg:text-6xl font-normal font-bebas leading-[1] tracking-wider text-black pt-0 lg:pt-6">
                                CUSTOMIZE
                            </h2>
                        </div>

                        <div className="flex flex-col w-full max-w-full">
                            <h3 className="text-2xl lg:text-4xl font-bebas font-normal leading-[1.2] tracking-wide uppercase text-black">
                                esports tournament & scrims at one place
                            </h3>
                        </div>

                        <p className="text-base lg:text-xl font-sans font-normal leading-[1.2] tracking-wider text-black mt-2 lg:mt-4">
                            Kick off some awesome esports tournaments and scrimmages! Let's customize pages,
                            series, and a bunch of cool features. It's all about building connections between
                            players, organizers, staff, and the whole gaming community.
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className={`w-full h-64 ${dynamicGap} pt-8 lg:pt-10 ${dynamicMargin}`}>
                        <img
                            src="/Frame 139.png"
                            alt="Dashboard Preview"
                            className="w-full h-92  max-h-[300px] lg:max-h-[559px] object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className={`w-full lg:w-1/2 min-w-0 h-full min-h-screen flex flex-col px-6 lg:px-12 ${dynamicGap} pt-6 lg:pt-36`}>

                {/* Login Form */}
                <div className={`w-full h-auto flex flex-col ${dynamicGap}`}>
                    {/* Register Link */}
                    <span className={`flex flex-row w-auto gap-2 pb-4 transition-all duration-300 ease-in ${dynamicMargin}`}>
                        <img className="w-4 h-4 mt-1" src="/solar_user-bold.svg" alt="icon" />
                        <span className="font-sans font-normal text-sm lg:text-base leading-none tracking-wider text-black">
                            Already Have An Account,
                        </span>
                        <span className="font-sans font-normal text-sm lg:text-base leading-none tracking-wider text-[#0000FF] cursor-pointer"
                            onClick={() => navigate('/OrganizerLoginViaEmail')}>
                            Login Now
                        </span>
                    </span>

                    <div className='flex flex-row mb-4 justify-between'>
                        <div
                        onClick={() => navigate("/OrganizerRegisterViaEmail")}>
                            <img src="./orgVector.svg" alt="backimage" />
                        </div>
                        <div>
                            <img src="./Team logo.svg" alt="teamlogo" />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className={`flex flex-col w-full h-auto mb-1 ${dynamicGap}`}>
                        <div className={`flex flex-col w-full h-auto mb-2 gap-2`}>
                            <h2 className="w-full text-2xl lg:text-3xl font-arialrounded font-normal leading-none tracking-normal text-black">
                                Let's Get Started
                            </h2>
                            <p className="w-full text-lg lg:text-2xl font-arialrounded font-normal leading-none tracking-normal text-black">
                                Kindly Submit A Name That Embodies, Identity Of Your Organization.
                            </p>
                        </div>

                        {/* Organization Name Input */}
                        <div className={`flex flex-col w-full h-auto pb-4 ${dynamicGap}`}>
                            <div className="relative w-full h-12 lg:h-14 mb-4 font-arialrounded rounded-xl gap-2 bg-[#F2F2F2]">
                                <input
                                    type="text"
                                    id="organizationName"
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    placeholder=" "
                                    className={`peer w-full h-12 lg:h-14 px-4 lg:px-6 pt-5 lg:pt-6 pb-2 lg:pb-3 text-sm lg:text-base font-normal rounded-xl leading-none tracking-wider outline-none focus:outline-none focus:ring-0 ${errors.organizationName ? 'bg-red-100 text-red-700' : 'bg-[#F2F2F2] text-gray-800'
                                        }`}
                                />
                                <label
                                    htmlFor="organizationName"
                                    className={`absolute left-4 lg:left-6 font-arialrounded font-normal pointer-events-none transition-all duration-200 ease-in-out ${organizationName ? 'top-1 text-[10px] lg:text-xs' : 'top-3 lg:top-4 text-sm lg:text-base'
                                        } peer-focus:top-1 peer-focus:text-[10px] lg:peer-focus:text-xs ${errors.organizationName ? 'text-red-500' : 'text-[#737373]'
                                        }`}
                                >
                                    <div className='flex flex-row items-center gap-3'>
                                        Organization Name
                                    </div>
                                </label>
                                {errors.organizationName && (
                                    <p className="text-red-500 text-xs mt-1 pl-4 lg:pl-6">{errors.organizationName}</p>
                                )}
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleSubmit}
                                className={`group w-full h-12 lg:h-14 rounded-xl bg-white text-[#000000] hover:bg-black hover:text-white font-arialrounded font-normal text-lg lg:text-xl border-2 border-[#000000] leading-none tracking-wider transition-colors duration-200 ease-in ${dynamicGap}`}
                            >
                                <span className="inline-block group-hover:animate-trumble">Set Up Organization Logo </span>
                            </button>
                        </div>
                    </div>

                    {/* Supported Games Section */}
                    <div className="mt-2 lg:mt-1 space-y-2 lg:space-y-3">
                        <div className="w-full flex items-center justify-center">
                            <span className="font-sans font-semibold text-xl lg:text-xl leading-none tracking-wider text-black">
                                Tournament Supported Games
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <img src="./PUBG.svg" alt="PUBG" className="w-16 h-16 lg:w-20 lg:h-20" />
                            <img src="./Vector 2.svg" alt="Game" className="w-16 h-16 lg:w-20 lg:h-20" />
                            <img src="./Valorant3.svg" alt="Valorant" className="w-16 h-16 lg:w-20 lg:h-20" />
                            <img src="./Clash Of Clans.svg" alt="Clash of Clans" className="w-16 h-16 lg:w-20 lg:h-20" />
                            <img src="./Call of duty mobile.svg" alt="Call of Duty Mobile" className="w-16 h-16 lg:w-20 lg:h-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}