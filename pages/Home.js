import React, { useEffect, useState } from "react";
import Ticker from 'react-ticker'
import Header from "../components/header";

export default function Home() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 850) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 850) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <div>
      <Header />
      <div className="pb-2">
        <Ticker>
          {({ index }) => (
              <h1>This is the Headline of element #{index}!</h1>
          )}
        </Ticker>
      </div>
      
      <div className="min-h-screen max-h-full min-w-screen flex flex-row justify-center">
        <div className="container mx-auto max-w-2xl justify-center items-center flex flex-col p-6">
          <div className="container mx-auto justify-start flex flex-col">
            <h1 className="text-black text-2xl font-black">Welcome to Trading Simulation</h1>
          </div>
        </div>
        {
          isDesktop && (
            <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover md:w-1/2 xl:w-3/5"/>
          )
        }
      </div>
      <a href="../">Back</a>
    </div>
  )
}