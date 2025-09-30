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

export default function ChangePasswordViaPhone() {
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({ phone: '' });
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        const newErrors = { password: '', confirmPassword: '' };

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.trim().length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        // Only navigate if there are no errors
        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        if (!hasErrors) {

            navigate("/sucChangePasswordViaPhone");
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
                        onClick={() => navigate("/OrganizerLoginViaEmail")}
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
                            Change Password
                        </h2>
                        <p className="text-sm lg:text-base font-arialrounded font-normal leading-normal tracking-[0.02em] text-[#999999]">
                            Your Password Will Be Updated Once You Perform This Action.
                        </p>
                    </div>

                    {/* Phone input with country code */}
                    <div className={`flex flex-col w-full h-auto ${dynamicGap}`}>
                        {/* OTP Section */}
                        <form className={`flex flex-col gap-2 lg:gap-3 flex-1 pt-4 lg:justify-center space-y-${dynamicSpacing}`} onSubmit={handleSubmit}>
                            {/* Password Input */}
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`peer w-full h-12 px-4 pt-5 pb-2 rounded-xl outline-none ${errors.password ? 'bg-red-100 text-red-700 border border-red-500' : 'bg-[#F2F2F2] text-black'
                                        }`}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute font-arialrounded font-normal text-base left-4 transition-all duration-200 ${password ? 'top-1 text-xs' : 'top-3 text-base'
                                        } peer-focus:top-1 peer-focus:text-xs ${errors.password ? 'text-red-500' : 'text-[#737373]'
                                        }`}
                                >
                                    New Password
                                </label>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1 pl-4">{errors.password}</p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="text-sm flex flex-col gap-2">
                                <div className="flex gap-2 items-center text-black">
                                    <img className='w-4 h-4' src="./blackVector.svg" alt="" />
                                    <span className="font-arialrounded font-normal text-black text-sm leading-none tracking-[0.12em]">Password is at least 8 characters long</span>
                                </div>
                                <div className="flex gap-2 items-center text-black">
                                    <img className='w-4 h-4' src="./blackVector.svg" alt="" />
                                    <span className="font-arialrounded font-normal text-black text-sm leading-none tracking-[0.12em]">Must be okay strength or better</span>
                                </div>
                                <div className="flex gap-2 items-center text-[#808080]">
                                    <img className='w-4 h-4' src="./grayVector.svg" alt="" />
                                    <span className="font-sans font-semiboldfont-arialrounded font-normal text-sm leading-none tracking-[0.12em]">Password includes two of the following: letters, number or symbol</span>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`peer w-full h-12 px-4 pt-5 pb-2 rounded-xl outline-none ${errors.confirmPassword ? 'bg-red-100 text-red-700 border border-red-500' : 'bg-[#F2F2F2] text-black'
                                        }`}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute font-arialrounded font-normal text-base left-4 transition-all duration-200 ${confirmPassword ? 'top-1 text-xs' : 'top-3 text-base'
                                        } peer-focus:top-1 peer-focus:text-xs ${errors.confirmPassword ? 'text-red-500' : 'text-[#737373]'
                                        }`}
                                >
                                    Confirm Password
                                </label>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1 pl-4">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Save Button */}
                            <div className="mt-auto pb-3">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 rounded-xl font-arialrounded font-normal text-xl lg:text-xl w-full"
                                >
                                    Save Your Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}