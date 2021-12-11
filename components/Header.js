import React from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

export default function Header() {
  return (
    <div className="bg-white text-black flex justify-between items-center h-12">
      <div className="header__search bg-white text-black flex items-center h-10 p-2.5">
        <div className="header__searchContainer bg-white text-black flex items-center w-full h-5 border-1 border-black rounded">
          <a href="/" className="p-6">Trading Simulation</a>
          <SearchOutlined />
          <input placeholder="Search" type="text" className="w-80 border-0 ml-5 mr-5 focus:outline-none"/>
        </div>
      </div>
      <div className="header__menuItems flex flex-row space-x-4 justify-between p-8">
        <a href="/Home" className="flex hover:font-bold">Home</a>
        <a href="/" className="flex hover:font-bold">PortFolio</a>
        <a href="/" className="flex hover:font-bold">Account</a>
      </div>
    </div>
  )
}
