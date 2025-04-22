"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dashboard from "../../../public/assets/dashboard.svg";
import profile from "../../../public/assets/profile.svg";
import batch from "../../../public/assets/batch.svg";
import resolution from "../../../public/assets/resolution.svg";
import note from "../../../public/assets/note.svg";
import appeal from "../../../public/assets/appeal.svg";
import summary from "../../../public/assets/task-square.svg";
import Image from "next/image";

type MenuItem = {
  icon: React.ReactNode;
  name: string;
  path: string;
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      icon: <Image src={dashboard} alt="dashboard" width={20} height={20} />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <Image src={appeal} alt="appeal" width={20} height={20}  />,
      name: "Appeal Letter",
      path: "/appeals",
    },
    {
      icon: <Image src={note} alt="calendar" width={20} height={20} />,
      name: "Calendar",
      path: "/calendar",
    },
    {
      icon: <Image src={batch} alt="batch" width={20} height={20} />,
      name: "Batch",
      path: "/batch",
    },
    {
      icon: <Image src={resolution} alt="resolution" width={20} height={20} />,
      name: "Resolution",
      path: "/resolution",
    },
    {
      icon: <Image src={profile} alt="profile" width={20} height={20} />,
      name: "Profile",
      path: "/profile",
    },
    {
      icon: <Image src={summary} alt="summary" width={20} height={20} />,
      name: "Summary",
      path: "/summary",
    },
  ];

  // Check if a menu item is active
  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <div
      className={`h-[82vh] fixed top-0 left-0 z-50 bg-[#2C4E6C] text-white ${
        isCollapsed ? "w-20" : "w-64"
      } rounded-xl transition-all duration-300 overflow-y-auto relative`}
    >
      <div className="flex flex-col">
        <div
          className={`p-4 flex items-center ${
            isCollapsed ? "justify-center" : "justify-end"
          }`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 flex items-center text-center cursor-pointer justify-center rounded-full bg-white text-[#4ED6BE] font-bold"
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>
        <nav className="flex-1">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 mx-2 mb-2 rounded-lg hover:bg-[#FFFFFF33] ${
                    isActive(item.path) ? "bg-[#FFFFFF33]" : ""
                  } ${isCollapsed ? "justify-center" : "justify-start"}`}
                >
                  <span className={`${isCollapsed ? "mr-0" : "mr-3"}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
