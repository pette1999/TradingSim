import React, { useEffect, useState } from "react"
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Home from "../components/Home"
import Login from "../components/Login"
import { useAuth } from "../utils/auth"
import stocks from '../pages/stocks'
import { Switch, Route, Link} from 'react-router-dom'


export default function IndexPage() {
  const { user } = Auth.useUser()
  // const { user, view, signOut } = useAuth();
  const [users, setUser] = useState ([])
  const [stocks, setStocks] = useState([])
  const [funds, setFunds] = useState([])

  useEffect(() => {
    fetchUser()
    fetchStock()
    fetchFund()
  }, []);

  const fetchUser = async () => {
    let { data: users, error } = await supabase
    .from('user')
    .select('UserName,Password,PortfolioID,Email,Profile_pic')

    if(!error) {
      setUser(users)
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].Email)
      }
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchStock = async () => {
    var stockList = []
    let { data: stocks, error } = await supabase
    .from('stock')
    .select('Ticker')

    if(!error) {
      setStocks(stocks)
      for (let i = 0; i < stocks.length; i++) {
        stockList.push(stocks[i].Ticker)
      }
    } else {
      // there is an error
      console.log(error)
    }

    console.log(stockList)
  }

  const fetchFund = async () => {
    let { data: funds, error } = await supabase
    .from('fund')
    .select('FundTicker')

    if(!error) {
      setFunds(funds)
      for (let i = 0; i < funds.length; i++) {
        console.log(funds[i].FundTicker)
      }
    } else {
      // there is an error
      console.log(error)
    }
  }

  return (
      <div>
          {
            user ? (
              <Home user={user} supabase={supabase} users={users} stocks={stocks} funds={funds} path="/"/>
            ) : (
              <Login supabase={supabase} Auth={Auth} user={user} path="/"/>
            )
          }
      </div>
  )
}