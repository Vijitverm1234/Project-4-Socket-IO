import assets, { imagesDummyData } from "../assests/assets";

const RightSidebar = ({ selectedUser }) => {
  return (
    selectedUser && (
      <div className="bg-[#8185B2]/10 text-white w-full h-full relative overflow-y-auto">
        <div className="p-10 flex flex-col items-center gap-4 text-center">
          {/* Profile Picture */}
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />

          {/* Name + Online Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <h1 className="text-2xl font-semibold">
              {(selectedUser?.fullName || "Unknown User").split(" ")[0]}
            </h1>
          </div>

          {/* Bio */}
          <p className="max-w-md text-sm text-gray-200">
            {selectedUser?.bio || "No bio available."}
          </p>
          <button
  className="
    mx-auto
    bg-gradient-to-r from-purple-500 to-violet-600
    text-white text-sm font-medium
    py-2 px-10 rounded-full cursor-pointer
    shadow-md shadow-purple-500/20
    hover:scale-105 hover:shadow-purple-600/30
    active:scale-95
    transition-all duration-200
  "
>
  Log out
</button>

        </div>
        <hr className="border-[#ffffff] my-4" />
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-2 opacity-80">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded "
              >
                <img src={url} className="h-full rounded-md" alt="" />
              </div>
            ))}
          </div>
        </div>
 

      </div>
    )
  );
};

export default RightSidebar;
