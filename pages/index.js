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
  const [userEmails, setUserEmails] = useState ([])
  const [stocks, setStocks] = useState([])
  const [funds, setFunds] = useState([])

  useEffect(() => {
    fetchUser()
    fetchStock()
    fetchFund()
  }, []);

  const fetchUser = async () => {
    var emails = []
    let { data: users, error } = await supabase
    .from('user')
    .select('*')

    if(!error) {
      setUser(users)
      for (let i = 0; i < users.length; i++) {
        emails.push(users[i].Email)
      }
      setUserEmails(emails)
      console.log(emails)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchStock = async () => {
    let { data: stocks, error } = await supabase
    .from('stock')
    .select('Ticker')

    if(!error) {
      setStocks(stocks)
      console.log(stocks)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchFund = async () => {
    let { data: funds, error } = await supabase
    .from('fund')
    .select('FundTicker')

    if(!error) {
      setFunds(funds)
    } else {
      // there is an error
      console.log(error)
    }
  }

  return (
      <div>
          {
            user ? (
              <Home user={user} supabase={supabase} users={users} setUser={setUser} stocks={stocks} funds={funds} userEmails={userEmails} setUserEmails={setUserEmails} path="/"/>
            ) : (
              <Login supabase={supabase} Auth={Auth} user={user} path="/"/>
            )
          }
      </div>
  )
}