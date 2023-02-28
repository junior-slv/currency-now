
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
  const [current, setCurrent] = useState(0)
  const [finalCurrent, setFinalCurrent] = useState(0)
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(null)
  const [multiplier, setMultiplier] = useState(0)

  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`

  const idref = useRef(null);
  let multi:any;



  useEffect(() => {
    axios
      .get(api)
      .then((response) => setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote))
      .catch((err) => {
        console.error("Error" + err);
      });
      let multi:any = currencyQuote?.high
      multi = parseFloat(multi)
  }, []);


  const handleChange = (event: any) =>{
    setCurrent(parseInt(event.target.value))
  }
  const handleFinal = () =>{

    console.log(firstValue);
    console.log(secondValue);
    setFinalCurrent(current*multi)

  }

  return (
    <div className="container">
        <div className="main-screen_ df">
          <div className="main-screen-top df">
            <h2>Currency converter</h2>

          </div>
          <div className="main-screen-middle df">
            <label htmlFor="">Insert a value</label>
            <input  onClick={handleChange} type="number" name="" id=""  />
            <input  onClick={handleFinal} type="button" value="ENVIAR" />
          </div>
          <div className="main-screen-bottom">
            <div className="main-screen-bottom-left">
              
              <label htmlFor="currency">Choose a currency:</label>
                <select id="currency" name="currency">
                  <option >BRL - Real</option> s
                  <option >USD - Dolar</option>
                  <option >EUR - Euro</option>
                </select>
            <span>
              <i className='bx bx-right-arrow-alt'></i>
            </span>
            </div>
            <div className="main-screen-bottom-right">
              <label htmlFor="cars">Choose a currency:</label>
                <select id="cars" name="cars">
                  <option onClick={() => setSecondValue("BRL")}>BRL - Real</option>
                  <option onClick={() => setSecondValue("USD")}>USD - Dolar</option>
                  <option onClick={() => setSecondValue("EUR")}>EUR - Euro</option>
                </select>

            </div>

          </div>
          <span><p>Final value: {finalCurrent.toFixed(2)}</p></span>
        </div>

    </div>
  )
}

export default Currency
