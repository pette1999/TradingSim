import Stack from '@mui/material/Stack';
import Header from '../components/Header'
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Box from '@mui/material/Box';
import TableData from '../components/TableData'

var temp_stock = 0
var temp_fund = 0

export default function stocks({}) {
  // const params = useParams()
  const { user } = Auth.useUser()
  const [userInfo, setUserInfo] = useState ([])
  const [stocks, setStocks] = useState([])
  const [funds, setFunds] = useState([])
  const[result, setResult] = useState(false)
  const [stockInfo, setStockInfo] = useState([])
  const [fundInfo, setFundInfo] = useState([])
  const [term, setTerm] = useState("")
  const [fundPortfolioInfo, setFundPortfolioInfo] = useState([])
  const [showFundPortfolio, setShowFundPortfolio] = useState(false)
  const [userPortfolioInfo, setUserPortfolioInfo] = useState([])
  const [showBuy, setShowBuy] = useState(false)
  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 0.5,
    width: 'auto',
    height: 'auto',
  };


  useEffect(() => {
    fetchStock()
    fetchFund()
    user && fetchUserInfo(user.email)
    setShowFundPortfolio(false)
    setShowBuy(false)
  }, []);

  const fetchUserInfo = async (email) => {
    let { data: userInfo, error } = await supabase
    .from('user')
    .select('*')
    .eq('Email',email)

    if(!error) {
      setUserInfo(userInfo)
      for (let i = 0; i < userInfo.length; i++) {
        console.log(userInfo[i].Email)
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
        console.log(funds[i].FundName)
      }
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

  const updatePortfolio = async (id, ticker, quantity, n) => {
    let { data: userPortfolioInfo, error } = await supabase
    .from('portfolio')
    .update({ Quantity: quantity+n })
    .match({ PortfolioID: id, Ticker: ticker})

    if(!error) {
      userInfo[0] != null && fetchUserPortfolioInfo(id)
      if (n>0) {
        alert("1 " + ticker + " share purchased!")
      } else {
        alert("1 share of " + ticker + " sold!")
      }
    } else {
      // there is an error
      console.log(error)
    }
  }

  const insertPortfolio = async (id,ticker,companyname,aveprice,longterm) => {
    let { data: userPortfolioInfo, error } = await supabase
    .from('portfolio')
    .insert([
      { PortfolioID:id, Ticker:ticker, CompanyName:companyname, Quantity:1, AvePrice:aveprice, Long_term_holding:longterm }
    ])

    if(!error) {
      userInfo[0] != null && fetchUserPortfolioInfo(id)
      alert("1 " + ticker + " share added to the portfolio!")
    } else {
      // there is an error
      console.log(error)
    }
  }

  const deletePortfolio = async (id,ticker) => {
    let { data: userPortfolioInfo, error } = await supabase
    .from('portfolio')
    .delete()
    .match({ PortfolioID: id,  Ticker: ticker})

    if(!error) {
      userInfo[0] != null && fetchUserPortfolioInfo(id)
      alert(ticker + " is now removed from your portfolio since you don't have any more shares.")
    } else {
      // there is an error
      console.log(error)
    }
  }

  const handleTradeButton = () => {
    setShowBuy(true)
    stockInfo[0] != null && console.log(stockInfo[0].Ticker)
    userInfo[0] != null && fetchUserPortfolioInfo(userInfo[0].PortfolioID)
    fundInfo[0] != null && console.log(fundInfo[0].FundTicker)
  }

  const handleStockClickBUY = () => {
    // check if ticker already exists in the portfolio database
    var t;
    userPortfolioInfo.map(g => {
      if(g.Ticker.toString().toLowerCase() == stockInfo[0].Ticker.toString().toLowerCase()) {
        temp_stock += 1
        t=g;
        console.log("t: ")
        console.log(t)
      }
    })
    if(temp_stock > 0) {
      // The ticker exists
      updatePortfolio(userInfo[0].PortfolioID,t.Ticker,t.Quantity,1)
      console.log("One more share purchased!")
    } else {
      // ticker does NOT exist
      insertPortfolio(userInfo[0].PortfolioID,stockInfo[0].Ticker,stockInfo[0].Company_Name,stockInfo[0].Price,true)
      console.log("New ticker added to the portfolio!")
    }
  }

  const handleFundClickBUY = () => {
    var t;
    userPortfolioInfo.map(g => {
      if(g.Ticker.toString().toLowerCase() == fundInfo[0].FundTicker.toString().toLowerCase()) {
        temp_fund += 1
        t=g;
        console.log("t: ")
        console.log(t)
      }
    })
    if(temp_fund > 0) {
      // The ticker exists
      updatePortfolio(userInfo[0].PortfolioID,t.Ticker,t.Quantity,1)
      console.log("One more share purchased!")
    } else {
      // ticker does NOT exist
      insertPortfolio(userInfo[0].PortfolioID,fundInfo[0].FundTicker,fundInfo[0].FundName,fundInfo[0].fund_price,true)
      console.log("New ticker added to the portfolio!")
    }
  }

  const handleStockClickSELL = () => {
    // check if ticker already exists in the portfolio database
    var t;
    userPortfolioInfo.map(g => {
      if(g.Ticker.toString().toLowerCase() == stockInfo[0].Ticker.toString().toLowerCase()) {
        temp_stock += 1
        t=g;
        console.log("t: ")
        console.log(t)
      }
    })
    if(temp_stock > 0) {
      // The ticker exists
      // if the share count is 1
      if(t.Quantity > 1) {
        // if the share count is > 1
        updatePortfolio(userInfo[0].PortfolioID,t.Ticker,t.Quantity,-1)
      } else {
        // if the share count is 1, then we need to delete the row
        deletePortfolio(userInfo[0].PortfolioID, stockInfo[0].Ticker)
      }
    } else {
      // ticker does NOT exist
      alert("ERROR! You don't have this ticker in your portfolio!")
    }
  }

  const handleFundClickSELL = () => {
    var t;
    userPortfolioInfo.map(g => {
      if(g.Ticker.toString().toLowerCase() == fundInfo[0].FundTicker.toString().toLowerCase()) {
        temp_fund += 1
        t=g;
        console.log("t: ")
        console.log(t)
      }
    })
    if(temp_fund > 0) {
      // The ticker exists
      // if the share count is 1
      if(t.Quantity > 1) {
        // if the share count is > 1
        updatePortfolio(userInfo[0].PortfolioID,t.Ticker,t.Quantity,-1)
      } else {
        // if the share count is 1, then we need to delete the row
        deletePortfolio(userInfo[0].PortfolioID, fundInfo[0].FundTicker)
      }
    } else {
      // ticker does NOT exist
      alert("ERROR! You don't have this ticker in your portfolio!")
    }
  }

  const handleFundPortfolio = () => {
    setShowFundPortfolio(true)
    setFundPortfolioInfo(fundPortfolioInfo)
  }

  return (
    <div className="min-h-screen max-h-full min-w-screen">
      <Header stocks={stocks} funds={funds} term={term} setTerm={setTerm} stockInfo={stockInfo} fundInfo={fundInfo} setStockInfo={setStockInfo} setFundInfo={setFundInfo} fundPortfolioInfo={fundPortfolioInfo} setFundPortfolioInfo={setFundPortfolioInfo} showBuy={showBuy} setShowBuy={setShowBuy}/>
      {
        term != "" ? (
          <div className="flex flex-row justify-between min-w-fit items-center px-10 pt-5">
            <Stack direction="column" spacing={1}>
              {
                stockInfo[0] != null && (
                  <>
                  <span>Ticker: {stockInfo[0].Ticker}</span>
                  <span>Price: ${stockInfo[0].Price}</span>
                  <span>Company Name: {stockInfo[0].Company_Name}</span>
                  <span>Market Cap: ${stockInfo[0].Market_Cap} Billions</span>
                  <span>Volumn: {stockInfo[0].Volume}</span>
                  {
                    showBuy ? (
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="success" onClick={handleStockClickBUY}>Buy</Button>
                        <Button variant="outlined" color="error" onClick={handleStockClickSELL}>Sell</Button>
                      </Stack>
                    ) : (
                      <Button variant="outlined" onClick={handleTradeButton}>Trade!</Button>
                    )
                  }
                  </>
                )
              }
              {
                fundInfo[0] != null && (
                  <>
                  <span>Fund Ticker: {fundInfo[0].FundTicker}</span>
                  <span>Price: ${fundInfo[0].fund_price}</span>
                  <span>Fund Name: {fundInfo[0].FundName}</span>
                  <span>Fund Type: {fundInfo[0].FundType}</span>
                  <span>Fund Size: {fundInfo[0].FundSize}</span>
                  <Stack direction="column" spacing={0.5}>
                    <Button variant="outlined" onClick={handleFundPortfolio}>Show Fund Portfolio</Button>
                    {
                      showBuy ? (
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" color="success" onClick={handleFundClickBUY}>Buy</Button>
                          <Button variant="outlined" color="error" onClick={handleFundClickSELL}>Sell</Button>
                        </Stack>
                      ) : (
                        <Button variant="outlined" onClick={handleTradeButton}>Trade!</Button>
                      )
                    }
                  </Stack>
                  </>
                )
              }
            </Stack>
          </div>
        ) : (
          <>
          <div className='pt-20'>
            <h1 className='w-auto text-center text-gray-500 text-lg'>Please Enter a Search Ticker above ;)</h1>
          </div>
          <div className="px-20 pt-5 pb-40">
            <h1 className="text-xl px-20 pb-2.5 font-medium">Available tickers for the Game: </h1>
            <h2 className="text-xl px-20 font-medium">Stocks: </h2>
            <div className="container mx-auto pl-20 pr-10 text-lg pt-2.5 pb-2.5">
              {stocks.map(g => ' ' + g.Ticker).toString()}
            </div>
            <h2 className="text-xl px-20 font-medium">Funds: </h2>
            <div className="container mx-auto pl-20 pr-10 text-lg pt-2.5 pb-20">
              {funds.map(g => ' ' + g.FundTicker).toString()}
            </div>
          </div>
          </>
        )
      }
      {
        fundPortfolioInfo[0] != null && showFundPortfolio && (
          <div className='p-10'>
            <h1 className='text-xl pb-2.5 font-medium'>Fund Portfolio</h1>
            <TableData fundPortfolioInfo={fundPortfolioInfo} setFundPortfolioInfo={setFundPortfolioInfo}/>
          </div>
        )
      }
      {
        fundInfo[0] != null && fundPortfolioInfo.length == 0 && (
          <div className='p-10'>
            <Box sx={{ ...commonStyles, borderColor: 'error.main', borderRadius: 2}} className='self-center'>
              <h1 className='text-xl font-medium text-center'>Portfolio fetching ERROR! Please Click on the search bar and press ENTER on the keyboard again!</h1>
            </Box>
          </div>
        )
      }
    </div>
  )
}