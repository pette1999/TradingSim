import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Header from "../components/header";


export default function IndexPage() {
  const { user } = Auth.useUser()
  const [isDesktop, setDesktop] = useState(false)
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 800) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    if(user) {
      setLogin(true)
    } else {
      setLogin(false)
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
    <div>
      {
        user ? (
         <div className="min-h-screen max-h-full min-w-screen">
            {console.log(user.email)}
            <Header />
            {
              isDesktop && (
                <span>
                  <div className="flex flex-row justify-between min-w-fit">
                    <span className="text-black font-black flex items-center">
                      <h1>Hello, <span className='text-pink-300'>{user.email}</span> <br></br>Welcome to Trading Simulation!</h1>
                    </span>
                    <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover w-3/5"/>
                  </div>
                  <button
                    className="text-pink-300 font-semibold"
                    onClick={async () => {
                      const { error } = await supabase.auth.signOut()
                      if (error) console.log('Error logging out:', error.message)
                      setLogin(false)
                    }}
                  >
                    Logout
                  </button>
                </span>
              )
            }
          </div>
        ) : (
          <div className="min-h-screen max-h-full min-w-screen">
            {user & (
              <Header/>
            )}
            <div className="flex flex-row justify-center">
              {console.log("hello")}
              { 
                isDesktop && (
                  <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover md:w-1/2 xl:w-3/5"/>
                )
              }
              <div className="container mx-auto max-w-2xl justify-center items-center flex flex-col p-6 md:w-1/3 xl:w-2/5">
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
            </div>
          </div>
        )
      }
    </div>
  )
}