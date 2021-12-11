import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Header from "../components/header";

export default function IndexPage() {
  const { user } = Auth.useUser()
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
    //bg-gray-700 min-h-screen min-w-screen
    <div>
      <a href="/Home" className="flex hover:font-bold">Home</a>
      <div className="min-h-screen max-h-full min-w-screen flex flex-row justify-center">
        {
          isDesktop && (
            <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover md:w-1/2 xl:w-3/5"/>
          )
        }
        
        {/* 
          * Check if user is logged in or not. 
          * If not, display the login UI
          * If logged in, display the app 
          * & pass the user in as props
          */
        !user ? (
          <div className="container mx-auto max-w-2xl justify-center items-center flex flex-col p-6">
            <div className="container mx-auto justify-start flex flex-col">
              <h1 className="text-black text-2xl font-black">Welcome to Trading Simulation</h1>
              {/* This is the Login UI Component from SupabaseUI */}
              <Auth
                supabaseClient={supabase}
                socialLayout="horizontal"
                socialButtonSize="xlarge"
              />
            </div>
          </div>
        ) : (
          <div className="container mx-auto max-w-prose px-4">
            <GratitudeApp user={user} />
            <div id="spacer" className="h-12"/>
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
        )}
      </div>
    </div>
  )
}