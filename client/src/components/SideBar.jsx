import React, { useState } from "react";
import assets, { userDummyData } from "../assests/assets";
import { useNavigate } from "react-router-dom";

const SideBar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-[#4b3f6b] scrollbar-track-transparent text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img src={assets.logo} alt="logo" className="max-w-40" />

          {/* Menu */}
          <div className="relative py-2">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="absolute top-full right-0 z-20 w-32 p-4 rounded-md bg-[#282142] border border-gray-600 text-gray-100 shadow-lg">
                <p
                  className="cursor-pointer text-sm hover:text-violet-400"
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p className="cursor-pointer text-sm hover:text-red-400">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#282142] mt-3 rounded-full flex items-center px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 mr-3 opacity-70"
          />
          <input
            type="text"
            className="bg-transparent text-white text-sm placeholder-[#b3b3b3] flex-1 focus:placeholder-[#9f9f9f]"
            placeholder="Search user..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            onClick={() => setSelectedUser(user)}
            key={user.id}
            className={`relative flex items-center gap-3 p-3 pl-4 rounded-lg cursor-pointer transition-all duration-200 max-sm:text-sm
              ${
                selectedUser?.id === user.id
                  ? "bg-[#1d1836] border border-violet-500 shadow-md"
                  : "hover:bg-[#2f2855]"
              }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-[38px] h-[38px] rounded-full object-cover border border-violet-500/30"
            />

            <div className="flex flex-col leading-5">
              <p className="text-white font-medium">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-green-400 text-xs">● Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">● Offline</span>
              )}
            </div>

            {index > 2 && (
              <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50 text-white font-semibold">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
