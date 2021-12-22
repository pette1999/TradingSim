import React, { useEffect, useState } from "react"
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TableData from "../components/TableData"
import Img from 'react-cloudinary-lazy-image'

export default function account() {
  const [userInfo, setUserInfo] = useState ([])
  const [userPortfolioInfo, setUserPortfolioInfo] = useState([])
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [filter, setFilter] = useState(false)
  const [countPortfolio, setCountPortfolio] = useState(0)
  const { user } = Auth.useUser()
  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
      pink: {
        main: '#F472B6',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    user && fetchUser(user.email)
    setShowPortfolio(false)
    setFilter(false)
    setCountPortfolio(0)
  }, []);

  const fetchUser = async (email) => {
    let { data: userInfo, error } = await supabase
    .from('user')
    .select('*')
    .eq('Email',email)

    if(!error) {
      setUserInfo(userInfo)
      console.log(userInfo[0].Profile_pic)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchUserPortfolioInfo = async (id) => {
    let { data: userPortfolioInfo, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('PortfolioID',id)

    if(!error) {
      setUserPortfolioInfo(userPortfolioInfo)
      console.log(userPortfolioInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchPortfolioCount = async (id) => {
    let { data: countPortfolio, error } = await supabase
    .from('portfolio')
    .select('Ticker',{ Count: 'exact'})
    .eq('PortfolioID',id)

    if(!error) {
      setCountPortfolio(countPortfolio.length)
      console.log(countPortfolio.length)
    } else {
      // there is an error
      console.log(error)
    }
  }

  let handleOnClick = () => {
    setShowPortfolio(true)
    setFilter(false)
    userInfo[0] != null && fetchUserPortfolioInfo(userInfo[0].PortfolioID)
    userInfo[0] != null && fetchPortfolioCount(userInfo[0].PortfolioID)
  }

  let handleFilter = () => {
    setFilter(true)
    setShowPortfolio(true)
  }

  return (
    <div className="min-h-screen max-h-full min-w-screen">
      {/* header */}
      <div className="bg-white text-black flex justify-between items-center h-12">
        <div className="bg-white text-black flex items-center h-10 w-full h-5 border-1 border-black rounded p-2.5">
          <a href="/" className="p-5">YOLO Life</a>
        </div>
        <div className="flex flex-row space-x-4 justify-between p-8">
          <a href="/stocks" className="flex hover:font-bold">Stocks</a>
          <a href="/account" className="flex hover:font-bold">Account</a>
        </div>
      </div>
      <Stack direction="column" spacing={2} className="items-center pt-20">
        {
          userInfo[0] != null && (
            <>
            <div className="relative w-36 h-36">
              <Img
                cloudName={'petercloud'}
                imageName={userInfo[0].Profile_pic}
                fluid={{
                  maxWidth: 150,
                  maxheight: 150  
                }}
                style={{
                  width: '9.375em',
                  height: '9.375em',
                }}
                propTypes={{onload}}
                urlParams="c_scale,h_150,r_150,q_100"
                loading="lazy"
                alt={'profilepic'}  
              />
              <div className="absolute w-full h-full ease-in duration-300 hover:bg-black-rgba"></div>
              <div class="button"><a> BUTTON </a></div>
            </div>
            <h1>Hi! {userInfo[0].UserName}</h1>
            <ThemeProvider theme={theme}>
              <Button variant="outlined" size="small" color="pink" onClick={handleOnClick}>Show Portfolio</Button>
              <Button variant="outlined" size="small" color="error" onClick={async () => {
                const { error } = await supabase.auth.signOut()
                if (error) console.log('Error logging out:', error.message)
              }}><a href="/">Log Out</a></Button>
            </ThemeProvider>
            {
              showPortfolio && userPortfolioInfo[0] != null && (
                <div className='p-10'>
                  <div className="flex flex-row justify-between">
                    <h1 className='text-xl pb-2.5 font-medium'>Fund Portfolio</h1>
                    <h1>{countPortfolio} Investments Total</h1>
                  </div>
                  <TableData fundPortfolioInfo={userPortfolioInfo} setFundPortfolioInfo={setUserPortfolioInfo}/>
                </div>
              )
            }
            {
              showPortfolio && userPortfolioInfo.length == 0 && (
                <p>Your Portfolio is Empty, YOLO your trades!</p>
              )
            }
            </>
          )
        }
      </Stack>
    </div>
  )
}