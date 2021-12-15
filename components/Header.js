import React from "react";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Ticker from 'react-ticker'

export default function Header() {
  return (
    <div className="flex flex-col justify-between min-w-fit">
      <div className="bg-white text-black flex justify-between items-center h-12">
        <div className="bg-white text-black flex items-center h-10 w-full h-5 border-1 border-black rounded p-2.5">
          <p className="p-5">Trading Simulation</p>
          <SearchOutlined />
          <input placeholder="Search" type="text" className="w-80 border-0 ml-5 mr-5 focus:outline-none"/>
        </div>
        <div className="flex flex-row space-x-4 justify-between p-8">
          <a href="/" className="flex hover:font-bold">Home</a>
          <a href="/" className="flex hover:font-bold">PortFolio</a>
          <a href="/" className="flex hover:font-bold">Account</a>
        </div>
      </div>
      <div>
        <Ticker>
          {({ index }) => (
            <h1>This is the Headline of element #{index}!</h1>
          )}
        </Ticker>
      </div>
    </div>
  )
}
