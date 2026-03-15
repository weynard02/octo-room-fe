import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  LogIn,
  BookCheck,
  LogOutIcon,
} from "lucide-react";

const menuItems = [
  { icon: LogIn, label: "Login", path: "/" },
  { icon: LayoutDashboard, label: "Home Page", path: "/dashboard" },
  { icon: BookCheck, label: "My Booking", path: "/my-booking" },
];

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    navigation.navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0 ${
          collapsed ? "w-[72px]" : "w-[240px]"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 border-b border-gray-100 ${
            collapsed ? "p-6 px-4 justify-center" : "p-6 px-5 justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-[10px]">
              <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-red-800 rounded-md flex items-center justify-center text-sm text-white font-bold">
                OR
              </div>
              <span className="text-red-700 text-[15px] font-semibold tracking-[0.02em]">
                OctoRoom
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-none border-none cursor-pointer text-gray-400 p-1 flex items-center justify-center transition-colors duration-200 hover:text-red-600 shrink-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col gap-[2px]">
          {menuItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                title={collapsed ? label : ""}
                className={`no-underline border-l-2 cursor-pointer flex items-center gap-3 w-full transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "bg-red-50 border-red-600 text-red-600"
                    : "bg-none border-transparent text-gray-600 hover:bg-gray-50 hover:text-red-600"
                } ${
                  collapsed
                    ? "py-[11px] justify-center"
                    : "py-[11px] px-5 justify-start"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={isActive ? 2 : 1.6}
                  className="shrink-0"
                />
                {!collapsed && (
                  <span
                    className={`text-[13px] tracking-[0.01em] ${
                      isActive ? "font-medium" : "font-normal"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Settings */}
        <div className="mt-auto border-t border-gray-100">
          <div
            className={`flex items-center p-4 ${
              collapsed ? "justify-center" : "px-5 justify-between"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <div className="w-[30px] h-[30px] rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 text-[12px] shrink-0 font-medium">
                JD
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-gray-800 text-[12px] font-medium leading-none">
                    Jane Doe
                  </span>
                  <span className="text-gray-500 text-[10px] mt-1 leading-none">
                    Admin
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                title="Logout"
                onClick={handleLogout}
              >
                <LogOutIcon size={18} strokeWidth={1.6} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};
