import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Ticker from 'react-ticker'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Link, animateScroll as scroll } from "react-scroll";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Img from 'react-cloudinary-lazy-image'

export default function Home({ user, supabase, users, setUser, stocks, funds, userEmails, setUserEmails}) {
  const [isDesktop, setDesktop] = useState(false);
  const [error, setError] = useState(null)

  const CustomButtonRoot = styled('span')`
    background-color: #F8A8D4;
    width: 10em;
    padding: 15px 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;
    transition: all 200ms ease;
    cursor: pointer;
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
    border: none;
    text-align:center;

    &:hover {
      background-color: #F472B6;
    }

    &.${buttonUnstyledClasses.active} {
      background-color: #F472B6;
    }

    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
    }
  `;

  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    if (userEmails.length > 0) {
      showEmails()
      console.log("ADDED A NEW EMAIL!")
    }
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
  },[]);

  const showEmails = async () => {
    if(userEmails.includes(user.email)) {
      // email already in table
      console.log('Email already in the database.')
    } else {
      // email not in table, it's a new created user
      console.log("This is a new user")

      let new_UserID = users.length+1
      let new_UserName = user.email.substring(0,user.email.indexOf('@'))
      let new_Passowrd = ""
      let new_Portfolio = users.length+101
      let Profile_pic = String("profile" + (getRandomInt(20)+1))
      
      const { data, error } = await supabase
      .from('user')
      .insert([
        {
          UserID: new_UserID,
          UserName: new_UserName,
          Password: new_Passowrd,
          PortfolioID: new_Portfolio,
          Email: user.email,
          Profile_pic: Profile_pic
        },
      ])

      if (error) {
        console.log(error)
        setError(error)
      } else {
        setUser([...users, {'UserID': new_UserID, 'UserName': new_UserName, 'Password':new_Passowrd, 'PortfolioID':new_Portfolio, 'Email':user.email, 'Profile_pic':Profile_pic}])
        console.log("a new user just added!")
      }
    }
  }

  const addUser = async () => {
    // check if the user email already in the users table
    if(userEmails.includes(user.email)) {
      // email already in table, skip adding the user process
      console.log('Email already in the database.')
    } else {
      // email not in table, it's a new created user
      console.log("This is a new user")
    }

    let new_UserID = users.length+1
    let new_UserName = user.email.substring(0,user.email.indexOf('@'))
    let new_Passowrd = ""
    let new_Portfolio = users.length+101
    let Profile_pic = "https://bit.ly/326o4el"
    
    const { data, error } = await supabase
    .from('user')
    .insert([
      {
        UserID: new_UserID,
        UserName: new_UserName,
        Password: new_Passowrd,
        PortfolioID: new_Portfolio,
        Email: user.email,
        Profile_pic: Profile_pic
      },
    ])

    if (error) {
      console.log(error)
      setError(error)
    } else {
      setUser([...users, {'UserID': new_UserID, 'UserName': new_UserName, 'Password':new_Passowrd, 'PortfolioID':new_Portfolio, 'Email':user.email, 'Profile_pic':Profile_pic}])
      console.log("a new user just added!")
    }
  }

  /* Something went wrong while fetching data */
  if (error) {
    return <p>{error}</p>
  }


  return (
    <div className="min-h-screen max-h-full min-w-screen">
      <div className="flex flex-col justify-between min-w-fit">
        <div className="bg-white text-black flex justify-between items-center h-12">
          <div className="bg-white text-black flex items-center h-10 w-ful border-1 border-black rounded p-2.5">
            <button onClick={showEmails}><a href="/" className="p-5">YOLO Life</a></button>
          </div>
          <div className="flex flex-row space-x-4 justify-between p-8">
            <button onClick={showEmails}><a href="/stocks" className="flex hover:font-bold">Stocks</a></button>
            <button onClick={showEmails}><a href="/account" className="flex hover:font-bold">Account</a></button>
          </div>
        </div>
        {/* <Ticker>
          {({ index }) => (
            <h1>This is the Headline of element #{index}!</h1>
          )}
        </Ticker> */}
      </div>
      {
        isDesktop && (
          <span>
            <div className="flex flex-row justify-between min-w-fit">
              <Stack className="text-black font-black text-2xl p-8 self-center" spacing={2} direction="column">
                <h1>Hello, <span className="text-pink-300 text-4xl">{user.email.substring(0,user.email.indexOf('@'))}</span><br></br>Welcome to YOLO Life!<br></br>A place where<br></br> You place YOLO trades with 0 risks ;)</h1>
                <CustomButton variant="contained" onClick={showEmails}><Link to="tickers" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Get Start</Link></CustomButton>
              </Stack>
              {/* <img src='https://wallpaper.dog/large/5574447.jpg' className=" object-cover w-3/5"/> */}
              <div className=" object-cover w-3/5">
                <Img
                  cloudName={'petercloud'}
                  imageName={'home1'}
                  fluid={{
                    maxWidth: 2048,
                    maxheight: 2048  
                  }}
                  // style={{
                  //   width: '9.375em',
                  //   height: '9.375em',
                  // }}
                  propTypes={{onload}}
                  urlParams="q_100"
                  loading="lazy"
                  alt={'profilepic'}  
                />
              </div>
            </div>
            <div className="px-20 pt-20 pb-40" id="tickers">
              <h1 className="text-5xl p-20 font-bold">Available tickers for the Game: </h1>
              <h2 className="text-4xl px-20 font-medium">Stocks: </h2>
              <div className="container mx-auto pl-20 pr-10 text-3xl pt-10 pb-10">
                {stocks?.map(g => ' ' + g.Ticker).toString()}
              </div>
              <h2 className="text-4xl px-20 font-medium">Funds: </h2>
              <div className="container mx-auto pl-20 pr-10 text-3xl pt-10 pb-20">
                {funds?.map(g => ' ' + g.FundTicker).toString()}
              </div>
              <span className="px-20">
                <CustomButton variant="contained"><Link to="game" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Continue</Link></CustomButton>
              </span>
            </div>
            <div className="flex flex-row justify-between min-w-fit items-center">
              <Stack className="pr-20 pt-20 pb-40" spacing={2} direction="column" id="game">
                <h1 className="text-4xl p-20 font-bold">The Game</h1>
                <Stack spacing={3} direction="column" className="pl-20">
                  <Stack spacing={2} direction="row">
                    <SearchOutlinedIcon fontSize="large" />
                    <p className="flex hover:font-bold">Search Stock Tickers</p>
                  </Stack>
                  <Stack spacing={2} direction="row">
                    <InfoOutlinedIcon fontSize="large" />
                    <p className="flex hover:font-bold">Get Stock Info</p>
                  </Stack>
                  <Stack spacing={2} direction="row">
                    <AttachMoneyOutlinedIcon fontSize="large" />
                    <p className="flex hover:font-bold">place your YOLO trade!</p>
                  </Stack>
                </Stack>
              </Stack>
              {/* <img src='https://banner2.cleanpng.com/20180212/rfw/kisspng-piggy-bank-illustration-pink-piggy-piggy-bank-5a823aca26ccb7.5680311315184841701589.jpg' className=" object-cover"/> */}
              <div className=" object-cover w-3/5">
                <Img
                  cloudName={'petercloud'}
                  imageName={'home2'}
                  fluid={{
                    maxWidth: 2048,
                    maxheight: 2048  
                  }}
                  // style={{
                  //   width: '9.375em',
                  //   height: '9.375em',
                  // }}
                  propTypes={{onload}}
                  urlParams="q_100"
                  loading="lazy"
                  alt={'profilepic'}  
                />
              </div>
            </div>
          </span>
        )
      }
    </div>
  )
}