
import { useEffect, useState } from 'react'
import './Currency.css'
import axios from 'axios'

type CurrencyQuote = {
  ask: string,
  bid: string,
  code: string,
  codein: string,
  high: number,
  low: number,
  varBid: string,
  pctChange: string,
  timestamp: string,
  create_dat: string
  
}

const Currency = () => {
  const [firstValue, setFirstValue] = useState("USD")
  const [secondValue, setSecondValue] = useState("BRL")
  const [current, setCurrent] = useState(0.0)
  const [multiplier, setMultiplier] = useState(0)
  const [finalCurrent, setFinalCurrent] = useState(0)
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(null)


  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`


  useEffect(() => {
    axios
      .get(api)
      .then((response) => setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote))
      .catch((err) => {
        console.error("Error" + err);
        
      });
  }, []);
    
  return (

    
    <div>
      {currencyQuote?.high}
    </div>

 
  )
}

export default Currency
