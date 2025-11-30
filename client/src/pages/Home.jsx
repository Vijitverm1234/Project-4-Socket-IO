import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-screen sm:px-[12%] sm:py-[4%] bg-[url('/bgImage.svg') bg-contain]">
      <div
        className={`backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl overflow-hidden h-full grid relative 
        ${selectedUser ? "grid-cols-3" : "grid-cols-2"} 
        max-sm:grid-cols-1`}
      >
 
        <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      
        {selectedUser && (
          <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};

export default Home;
