import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white p-4 shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold">TASKS</h1>
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <FiUser size={20} />
          <span className="hidden sm:inline">{user?.name}</span>
        </div>

        {openDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg py-2 z-50">
            <button
              className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                handleLogout();
                navigate("/login");
              }}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
