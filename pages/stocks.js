import Stack from '@mui/material/Stack';
import Header from '../components/Header'
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { supabase } from '../utils/supabaseClient'

export default function stocks({}) {
  // const params = useParams()
  const [users, setUser] = useState ([])
  const [stocks, setStocks] = useState([])
  const [funds, setFunds] = useState([])
  const[result, setResult] = useState(false)
  const [stockInfo, setStockIndo] = useState([])
  const [fundInfo, setFundInfo] = useState([])

  useEffect(() => {
    fetchUser()
    fetchStock()
    fetchFund()
  }, []);

  const fetchUser = async () => {
    let { data: users, error } = await supabase
    .from('user')
    .select('UserName,Password,PortfolioID,Email')

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
    .select('FundName')

    if(!error) {
      setFunds(funds)
      for (let i = 0; i < funds.length; i++) {
        console.log(funds[i].FundName)
      }
    } else {
      // there is an error
      console.log(error)
    }
  }

  let submitForm = (e) => {
    e.preventDefault()
    setTerm(e.target.value)
    var temp_stock = 0
    var temp_fund = 0
    stocks.map(g => {
      if(g.Ticker.toString().toLowerCase() == e.target.value.toString().toLowerCase()) {
        temp_stock += 1
        console.log("It's a stock")
      }
    })
    funds.map(f => {
      if(f.FundName.toString().toLowerCase() == e.target.value.toString().toLowerCase()) {
        temp_fund += 1
        console.log("It's a fund")
      }
    })

    temp_fund > 0 && fetchFundInfo(e.target.value)
    if (temp_stock > 0) {
      fetchStockInfo(e.target.value)
    }
  }

  const fetchStockInfo = async (term) => {
    let { data: stockInfo, error } = await supabase
    .from('stock')
    .select('Ticker,Company_Name,Market_Cap,Price,Volume')
    .eq('Ticker',term)

    if(!error) {
      setStockIndo(stockInfo)
      console.log(stockInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchFundInfo = async (term) => {
    let { data: fundInfo, error } = await supabase
    .from('fund')
    .select('FundName,FundType,PortfolioID,FundSize')
    .eq('FundName',term)

    if(!error) {
      setFundInfo(fundInfo)
      console.log(fundInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen max-h-full min-w-screen">
      <Header stocks={stocks} funds={funds}/>
      <div className="flex flex-row justify-between min-w-fit items-center">
        <Stack direction="column" spacing={1}>
          <span>COIN</span>
          <span>Company Name: Coinbase</span>
          <span>Market Cap: 82.499</span>
          <span>Volumn: 7146163</span>
          <span>$315</span>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="success">Buy</Button>
            <Button variant="outlined" color="error">Sell</Button>
          </Stack>
        </Stack>
      </div>
    </div>
  )
}