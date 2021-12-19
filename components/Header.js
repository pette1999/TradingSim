import React, { useEffect, useState } from "react"
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { supabase } from '../utils/supabaseClient'
import { BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import stocks from '../pages/stocks'
import TableData from "./TableData";

var temp_stock = 0
var temp_fund = 0

export default function Header({ stocks, funds, term, stockInfo, fundInfo, setStockInfo, setFundInfo, setTerm, fundPortfolioInfo, setFundPortfolioInfo, showBuy, setShowBuy}) {
  // const [term, setTerm] = useState("")
  const [showComponent, setComponent] = useState(false)
  // const [stockInfoH, setStockInfo] = useState(stockInfo)
  // const [fundInfoH, setFundInfo] = useState(fundInfo)

  let handleChange = (e) => {
    setTerm(e.target.value.toUpperCase())
    temp_stock = 0
    temp_fund = 0
    stocks.map(g => {
      if(g.Ticker.toString().toLowerCase() == e.target.value.toString().toLowerCase()) {
        temp_stock += 1
        console.log("It's a stock")
      }
    })
    funds.map(f => {
      if(f.FundTicker.toString().toLowerCase() == e.target.value.toString().toLowerCase()) {
        temp_fund += 1
        console.log("It's a fund")
        console.log("fund: " + temp_fund)
      }
    })
    e.preventDefault()
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    setShowBuy(false)

    if (temp_stock > 0) {
      fetchStockInfo(term)
      setFundInfo([])
      setFundPortfolioInfo([])
      temp_fund = 0
      console.log("fetching stock...")
    } else if (temp_fund > 0) {
      fetchFundInfo(term)
      setStockInfo([])
      temp_stock = 0
      console.log("fetching fund...")
      console.log("fund info lengtrh: " + fundInfo.length)

      if (fundInfo[0] != null) {
        fetchFundPortfioInfo(fundInfo[0].PortfolioID)
        console.log("fetching fund portfolio...")
      }
    }
  }

  const fetchStockInfo = async (term) => {
    let { data: stockInfo, error } = await supabase
    .from('stock')
    .select('Ticker,Company_Name,Market_Cap,Price,Volume')
    .eq('Ticker',term)

    if(!error) {
      setStockInfo(stockInfo)
      console.log(stockInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

  const fetchFundInfo = async (term) => {
    let { data: fundInfo, error } = await supabase
    .from('fund')
    .select('*')
    .eq('FundTicker',term)

    if(!error) {
      setFundInfo(fundInfo)
      console.log(fundInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

 const fetchFundPortfioInfo = async (term) => {
    let { data: fundPortfolioInfo, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('PortfolioID',term)

    if(!error) {
      setFundPortfolioInfo(fundPortfolioInfo)
      console.log(fundPortfolioInfo)
    } else {
      // there is an error
      console.log(error)
    }
  }

  return (
    <div className="bg-white text-black flex justify-between items-center h-12">
      <div className="bg-white text-black flex items-center h-10 w-full h-5 border-1 border-black rounded p-2.5">
        <a href="/" className="p-5">YOLO Life</a>
        <SearchOutlined />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search" 
            type="text" 
            className="w-80 border-0 ml-5 mr-5 focus:outline-none"
            value={term}
            onChange={handleChange}
          />
          <input type="submit" value="" />
        </form>
      </div>
      <div className="flex flex-row space-x-4 justify-between p-8">
        <a href="/stocks" className="flex hover:font-bold">Stocks</a>
        <a href="/account" className="flex hover:font-bold">Account</a>
      </div>
    </div>
  )
}
