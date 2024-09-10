import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import HoverBar from "./HoverBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const RightHeader = () => {
  const auth = useSelector((state) => state.auth);
  
  return (
    <div className="flex items-center gap-4">
      <div
        className="relative before:absolute before:w-1 before:h-1 before:bg-red-600 before:rounded-full
       before:right-0 before:p-1 cursor-pointer "
      >
        <FaRegBell className="text-gray-600 hover:text-gray-900" size={22} />
      </div>
      {auth.user ? (
        <div className="flex items-center gap-2 relative group">
          <img
            className="rounded-full w-10"
            src={auth.user.image}
            alt="user_image"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm dark:text-white">
              {auth.user.email}
            </span>
          </div>
          <div>
            <IoIosArrowDown
              className="text-gray-700 dark:text-white"
              size={24}
            />
          </div>
          <HoverBar />
        </div>
      ) : (
        <Link to="/login" className="flex items-center gap-2 relative group ">
          <button
            className="bg-[#da821b] clear-start p-2 rounded-lg text-white font-semibold
        cursor-pointer hover:bg-orange-600"
          >
            Sign In/ Sign up
          </button>
        </Link>
      )}
    </div>
  );
};

export default RightHeader;
