import React, { useEffect, useState } from "react"
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { supabase } from '../utils/supabaseClient'
import { BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import stocks from '../pages/stocks'

export default function Header({ stocks, funds }) {
  const [term, setTerm] = useState("")
  const [stockInfo, setStockIndo] = useState([])
  const [fundInfo, setFundInfo] = useState([])

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
    <div className="bg-white text-black flex justify-between items-center h-12">
      <div className="bg-white text-black flex items-center h-10 w-full h-5 border-1 border-black rounded p-2.5">
        <a href="/" className="p-5">YOLO Life</a>
        <SearchOutlined />
        <form>
          <input
            placeholder="Search" 
            type="text" 
            className="w-80 border-0 ml-5 mr-5 focus:outline-none"
            value={term}
            onChange={submitForm}
          />
        </form>
      </div>
      <div className="flex flex-row space-x-4 justify-between p-8">
        <a href="/stocks" className="flex hover:font-bold">Stocks</a>
        <a href="/" className="flex hover:font-bold">PortFolio</a>
        <a href="/" className="flex hover:font-bold">Account</a>
      </div>
    </div>
  )
}
