import  { useState } from "react";
import assets, { userDummyData } from "../assests/assets";
import { useNavigate } from "react-router-dom";

const SideBar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`h-full p-5 rounded-r-xl overflow-y-auto
      bg-[#8185B2]/10 backdrop-blur-xl text-white 
      scrollbar-thin scrollbar-thumb-violet-700/50 scrollbar-track-transparent 
      transition-all duration-300
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      {/* Header */}
      <div className="pb-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img src={assets.logo} alt="logo" className="w-36 opacity-90" />

          {/* Menu Toggle */}
          <div className="relative">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-5 cursor-pointer hover:opacity-100 opacity-80 transition"
              onClick={() => setMenuOpen((prev) => !prev)}
            />

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute top-8 right-0 w-40 z-20 p-4 rounded-md
                bg-[#1b1631]/90 backdrop-blur-xl 
                border border-white/10 shadow-xl animate-fadeIn">
                <p
                  className="cursor-pointer text-sm py-1 hover:text-violet-400 transition"
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-gray-700" />
                <p className="cursor-pointer text-sm py-1 hover:text-red-400 transition">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-[#1b1631]/70 backdrop-blur-lg mt-4 rounded-full
          flex items-center px-4 py-2 shadow-md hover:shadow-lg transition-all">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 mr-3 opacity-70"
          />
          <input
            type="text"
            className="bg-transparent text-white text-sm flex-1
            placeholder-white/50 focus:placeholder-white/30 outline-none"
            placeholder="Search user..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col gap-1">
        {userDummyData.map((user, index) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-3 p-3 pl-4 rounded-xl cursor-pointer 
              transition-all duration-200
              ${
                selectedUser?.id === user.id
                  ? "bg-[#221c43]/90 border border-violet-500/50 shadow-lg scale-[1.02]"
                  : "hover:bg-[#2d2558]/70 hover:scale-[1.01]"
              }`}
          >
            {/* Profile Pic */}
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-[40px] h-[40px] rounded-full object-cover border border-white/10"
            />

            {/* User Details */}
            <div className="flex flex-col">
              <p className="font-medium">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-green-400 text-xs">● Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">● Offline</span>
              )}
            </div>

            {/* Notification Bubble */}
            {index > 2 && (
              <p className="absolute top-2 right-4 text-xs h-5 w-5 flex justify-center items-center 
                rounded-full bg-violet-600/60 text-white font-medium shadow-md">
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
