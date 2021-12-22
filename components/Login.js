import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Login({ supabase, Auth, user}) {
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
      <div className="flex flex-col justify-between min-w-fit">
        <div className="bg-white text-black flex justify-between items-center h-12">
          <div className="bg-white text-black flex items-center h-10 w-full h-5 border-1 border-black rounded p-2.5">
            <p className="p-5">Yolo Life</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        { 
          isDesktop && (
            <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover md:w-1/2 xl:w-3/5"/>
          )
        }
        <div className="container mx-auto max-w-2xl justify-center items-center flex flex-col p-6 md:w-1/3 xl:w-2/5">
          <div className="container mx-auto justify-start flex flex-col">
            <h1 className="text-black text-2xl font-black">Welcome to Yolo Life</h1>
            {/* This is the Login UI Component from SupabaseUI */}
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"/>
          </div>
        </div>
      </div>
    </div>
  )
}