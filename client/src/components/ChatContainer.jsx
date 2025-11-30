import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assests/assets";
import { formatMessTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, []);
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      <div className="flex items-center gap-3  py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white items-center gap-2">
          Martin PS <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
        </p>
        <img
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
          onClick={() => setSelectedUser(null)}
        />
        <img src={assets.help_icon} className="max-md:hidden max-w-5" alt="" />
      </div>
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId === "680f50e4f10f3cd2382ecf9"
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd2382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                className="w-7 rounded-full"
                alt=""
              />
            </div>
            <p className="text-gray-500 text-xs">
              {formatMessTime(msg.createdAt)}
            </p>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 bg-black/10 backdrop-blur-xl border-t border-white/10">

  {/* Input Box */}
  <div className="flex-1 flex items-center bg-white/10 px-4 py-2 rounded-full 
      shadow-md hover:shadow-lg transition-all duration-200">

    <input
      type="text"
      placeholder="Type a message..."
      className="flex-1 bg-transparent text-sm text-white 
      placeholder-white/50 outline-none"
    />

    {/* File Upload */}
    <input type="file" id="image" accept="image/png, image/jpeg" hidden />

    <label htmlFor="image" className="cursor-pointer">
      <img
        src={assets.gallery_icon}
        className="w-6 opacity-80 hover:opacity-100 transition"
        alt="gallery"
      />
    </label>
  </div>

  {/* Send Button */}
  <button>
    <img
      src={assets.send_button}
      className="w-8 hover:scale-110 transition-transform"
      alt="send"
    />
  </button>

</div>

      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
