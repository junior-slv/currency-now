
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [finalCurrent, setFinalCurrent] = useState(0)
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(null)

  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`

  const idref = useRef(null);



  useEffect(() => {
    axios
      .get(api)
      .then((response) => setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote))
      .catch((err) => {
        console.error("Error" + err);
        
      });
      //ESTUDAR SOBRE USE REF 
  }, []);
  let multiplier:any = currencyQuote?.high
  multiplier = parseFloat(multiplier)

  return (
    <div className="container">
        <div className="main-screen">
          <div className="main-screen-top">
            <h2>Conversor de moeda</h2>
            <p>Insert value:</p>
            <input type="text" name="" id="" />
          </div>
          <div className="main-screen-bottom">
            <div className="main-screen-bottom-left">
              <label htmlFor="cars">Choose a currency:</label>
                <select  onChange={() => { setFirstValue("");
                }} id="cars" name="cars">
                  <option ref={idref} id="brl">BRL - Real</option>
                  <option id="usd">USD - Dolar</option>
                  <option id="eur">EUR - Euro</option>
                </select>
            </div>
            <div className="main-screen-bottom-right">
              <label htmlFor="cars">Choose a currency:</label>
                <select id="cars" name="cars">
                  <option value="brl">BRL - Real</option>
                  <option value="usd">USD - Dolar</option>
                  <option value="eur">EUR - Euro</option>
                </select>
              <p>Final value: {finalCurrent}</p>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Currency
