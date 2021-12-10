import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'

export default function IndexPage() {
  const { user } = Auth.useUser()
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 900) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 900) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    // bg-gray-700 min-h-screen min-w-screen
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
        <div className="container mx-auto max-w-2xl justify-center items-center p-4">
          <div className="container mx-auto px-4 justify-start flex flex-col">
            <div id="spacer" className="h-12"/>
            <h1 className="text-black text-2xl font-black">Trading Simulation</h1>
					  {/* This is the Login UI Component from SupabaseUI */}
            <div className="bg-white rounded-lg py-4">
            <Auth
              supabaseClient={supabase}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
            </div>
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
  )
}