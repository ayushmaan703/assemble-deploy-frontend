import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth_slices/AuthSlice.js"

const ProfileMenu = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.auth?.userData)
  const handleLogout = async () => {
    const res = await dispatch(logoutUser())
    if (res.type === "auth/logoutUser/fulfilled") {
      window.location.href = "/";
    }
  };

  return (
    <div className="profileMenu w-56 h-auto bg-black p-4 rounded-2xl relative flex flex-col">
      {/* Profile Photo Section */}
      <div className="profilePhoto h-24 w-full rounded-lg overflow-hidden bg-gray-700 mb-3">
        <img
          src={data.avatarUrl}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info Section */}
      <div className="flex-grow">
        {/* Username */}
        <h1 className="text-center text-xl text-green-400 font-bold">
          {data.username}
        </h1>

        {/* User Details */}
        <div className="text-center text-white mt-3 space-y-3">
          <div>
            <p className="text-xs uppercase text-gray-400">Name</p>
            <p className="text-base font-bold">{data.fullName}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">Age</p>
            <p className="text-base font-bold">{data.age} years</p>
          </div>

          {/* <div>
            <p className="text-xs uppercase text-gray-400">Badge</p>
            <p className="text-base font-bold text-green-400 cursor-pointer hover:text-green-300">
              Choose Your Badge
            </p>
          </div> */}
        </div>
      </div>

      {/* Logout Button - Positioned relative to the main container */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center justify-center gap-1 font-bold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
