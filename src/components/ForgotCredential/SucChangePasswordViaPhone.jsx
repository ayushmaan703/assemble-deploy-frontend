import React, { useState } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from "react-router-dom";

// Simple validation function for phone number
const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';
    if (phone.length < 10) return 'Phone number must be at least 10 digits';
    if (!/^[0-9]+$/.test(phone)) return 'Phone number must contain only digits';
    return '';
};

export default function SucChangePasswordViaPhone() {
    const [errors, setErrors] = useState({ phone: '' });
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const navigate = useNavigate();

    // Update viewport height on resize
    React.useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const handleContinue = (e) => {
        e.preventDefault();

        // Validate phone number
        const phoneError = validatePhone(phone);

        if (phoneError) {
            setErrors({ phone: phoneError });
        } else {
            setErrors({ phone: '' });

            // Proceed with OTP verification logic
        }
    };

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

            navigate("/OrganizerLoginViaPhoneOTP");
        }
    };

    return (
        <div className="w-full min-h-screen h-auto flex items-center justify-center relative overflow-hidden">
            {/* Background with confetti pattern */}
            <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 relative">
                    {/* Confetti dots bgImage */}
                    <img src="Mesh gradient 1.png" alt="bgImage" />
                </div>
            </div>

            {/* Header with logo and back button */}
            <div className={`absolute top-0 left-0 right-0 flex bg-black items-center justify-between w-full h-12 lg:h-16 px-6 lg:px-12 ${dynamicMargin} z-10`}>
                <div className="flex items-center gap-3">
                    <div className="h-8 lg:h-12 w-8 lg:w-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <img src={logo} alt="Logo" className="h-10 lg:h-14 w-10 lg:w-14 object-contain" />
                    </div>
                    <span className="text-2xl lg:text-3xl font-agency font-bold leading-none tracking-wider text-white">ASSEMBLE</span>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                    <span className="text-2xl lg:text-2xl tracking-wider leading-normal font-sans font-semibold text-white">Back To Login</span>
                    <img
                        src="icon-park-solid_back.svg"
                        alt="icon-back"
                        onClick={() => navigate("/OrganizerLoginViaPhone")}
                        className="cursor-pointer"
                    />
                </div>
            </div>

            {/* Main forgot password card */}
            <div className={`relative z-10 w-full max-w-md mx-4 mt-10 bg-white rounded-2xl shadow-2xl ${dynamicPadding}`}>
                <div className={`flex flex-col w-full h-auto p-3 ${dynamicGap}`}>
                    {/* Title */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl lg:text-3xl font-arialrounded font-normal leading-none tracking-normal text-black mb-2">
                            Password Successfully Changed!!
                        </h2>
                        <p className="text-sm lg:text-base font-arialrounded font-normal leading-normal tracking-[0.02em] text-[#999999]">
                            Your Password Have Been Changed. Now You Can Login Using Your Updated Password .
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="mt-auto pb-3">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 rounded-xl font-arialrounded font-normal text-xl lg:text-xl w-full"
                        >
                            Go To Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}