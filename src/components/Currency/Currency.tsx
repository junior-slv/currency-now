
import { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [current, setCurrent] = useState(0)
  const [finalCurrent, setFinalCurrent] = useState(0)
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(null)
  const [multiplier, setMultiplier] = useState(0)

  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`

  const idref = useRef(null);




  useEffect(() => {
    axios
      .get(api)
      .then((response) => setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote))
      .catch((err) => {
        console.error("Error" + err);
      });
      let multi:any = currencyQuote?.high
      multi = parseFloat(multi)
      setMultiplier(multi)  
  }, []);

  const handleChange = () =>{
    console.log(current)
  }


  return (
    <div className="container">
        <div className="main-screen_ df">
          <div className="main-screen-top df">
            <h2>Currency converter</h2>

          </div>
          <div className="main-screen-middle df">
            <label htmlFor="">Insert a value</label>
            <input  onClick={() => handleChange} type="number" name="" id=""  />
            <input  type="button" value="ENVIAR" />
          </div>
          <div className="main-screen-bottom">
            <div className="main-screen-bottom-left">
              <label htmlFor="cars">Choose a currency:</label>
                <select id="cars" name="cars">
                  <option ref={idref} id="brl">BRL - Real</option>
                  <option id="usd">USD - Dolar</option>
                  <option id="eur">EUR - Euro</option>
                </select>
                <i className='bx bx-right-arrow-alt'></i>
            </div>
            <div className="main-screen-bottom-right">
              <label htmlFor="cars">Choose a currency:</label>
                <select id="cars" name="cars">
                  <option value="brl">BRL - Real</option>
                  <option value="usd">USD - Dolar</option>
                  <option value="eur">EUR - Euro</option>
                </select>

            </div>

          </div>
          <span><p>Final value: {finalCurrent}</p></span>
        </div>

    </div>
  )
}

export default Currency
