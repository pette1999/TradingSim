import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Greeting from "../components/Greeting";

export default function Home({ user }) {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 800) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <div className="min-h-screen max-h-full min-w-screen">
      <Header />
      {
        isDesktop && (
          <div className="flex flex-row justify-between min-w-fit">
            <span className="text-black font-black flex items-center">
              <h1>Welcome to Trading Simulation</h1>
            </span>
            <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover w-3/5"/>
          </div>
        )
      }
      <button
        className="text-pink-300 font-semibold"
        onClick={async () => {
          const { error } = await supabase.auth.signOut()
          if (error) console.log('Error logging out:', error.message)
        }}
      >
        Logout
      </button>
    </div>
  )
}