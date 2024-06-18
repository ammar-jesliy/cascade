import option from "../../assets/Options.svg";
import CreateTaskModal from "./CreateTaskModal";
import menu from "../../assets/ham-menu.svg";
import { useRef, useState, useEffect } from "react";
import Delete from "../../assets/Delete.svg";
import { deleteGroup } from "../../lib/appwrite/api";
import { useLocation, useNavigate } from "react-router-dom";

const TopBar = ({ groups, openModal, groupId, onClose, toggleSidebar }) => {
  const activeGroup = groups.find((group) => group.$id === groupId);
  const { pathname } = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      deleteGroup(groupId);
      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[100px] fixed left-0 lg:left-[320px] right-0 bg-bg shadow flex justify-between items-center px-6 z-20">
      <button className="w-7 lg:hidden" onClick={toggleSidebar}>
        <img src={menu} alt="menu" />
      </button>
      <p className="text-primary font-bold text-[16px] max-w-[50%] whitespace-nowrap overflow-hidden md:text-[28px]">
        {activeGroup && activeGroup.title}
      </p>
      {pathname === "/app" ? (
        ""
      ) : (
        <div className="flex items-center gap-5 md:gap-8">
          <button
            className="flex gap-1 flex-nowrap text-[20px] font-semibold text-white bg-accent1 py-1 px-4 aspect-square sm:aspect-auto sm:py-3 sm:px-6 rounded-full opacity-80 hover:opacity-100 transition"
            onClick={() =>
              openModal(<CreateTaskModal groupId={groupId} onClose={onClose} />)
            }
          >
            <span>+</span>
            <span className="sm:block hidden">Create New Task</span>
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl hover:bg-grey1 transition"
          >
            <img src={option} alt="more" />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full items-center right-2 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
            >
              <button
                className="flex justify-between w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleDeleteGroup(activeGroup.$id)}
              >
                <p className="text-red-600 font-semibold">Delete Group</p>
                <img src={Delete} alt="delete" className="w-5 self-center" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopBar;
