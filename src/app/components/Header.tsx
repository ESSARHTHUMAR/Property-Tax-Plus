import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/logo.svg";
import more from "../../../public/assets/more.svg";
import bell from "../../../public/assets/bell.svg";
import account from "../../../public/assets/account.svg";
import workspace from "../../../public/assets/workspace.svg";
import search from "../../../public/assets/search.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-2.5 mb-5 relative">
      <div className="flex justify-between">
        <Link href="/"><Image src={logo} alt="Property Tax Plus" /></Link>
        <div className="flex flex-row-reverse justify-center items-center">
          <Image className="cursor-pointer" src={more} alt="more" />
          <div className="border-[1.5px] mx-5 border-[#C4C7CC] h-full" />
          <Image className="cursor-pointer" src={bell} alt="bell" />
          <div className="border-[1.5px] mx-5 border-[#C4C7CC] h-full" />
          <div className="flex gap-2">
            <Image className="cursor-pointer" src={workspace} alt="workspace" />
            <Image className="cursor-pointer" src={account} alt="account" />
          </div>
          <div className="relative mr-6 w-[30em]">
            <input
              type="text"
              className="w-full border-1 border-[#EDEFF2] rounded-md py-2 pl-9 px-3.5"
              placeholder="Search"
            />
            <Image src={search} alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="flex mr-2 items-center justify-center gap-2">
            <p className="text-[#2C4E6C] font-semibold text-xs">Client Workspace:</p>
            <select className="border-1 border-[#EDEFF2] rounded-md text-[#2C4E6C] text-sm py-2 px-3">
              <option value="Client" className="text-xs">Client</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
