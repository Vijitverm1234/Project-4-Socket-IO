import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-screen sm:px-[12%] sm:py-[4%] bg-[url('/bgImage.svg')] bg-cover bg-center bg-no-repeat">
      
      <div
        className={`h-full w-full rounded-2xl overflow-hidden relative
          backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.45)] 
          transition-all duration-300 ease-in-out 
          grid 
          ${
            selectedUser
              ? "grid-cols-[1fr_2fr_1fr] max-md:grid-cols-[1fr_2fr]"
              : "grid-cols-[1fr_2fr] max-md:grid-cols-1"
          }`}
      >

        {/* Left Sidebar */}
        <SideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        {/* ChatContainer (bigger center column) */}
        <ChatContainer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        {/* Right Sidebar only when user is selected */}
        {selectedUser && (
          <RightSidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
