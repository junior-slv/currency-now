import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Currency.css";
import axios from "axios";

type CurrencyQuote = {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  high: number;
  low: number;
  varBid: string;
  pctChange: string;
  timestamp: string;
  create_dat: string;
};

const Currency = () => {
  const [firstValue, setFirstValue] = useState("BRL");
  const [secondValue, setSecondValue] = useState("USD");
  const [current, setCurrent] = useState(0);
  const [finalCurrent, setFinalCurrent] = useState(0);
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(
    null
  );
  const [multiplier, setMultiplier] = useState(0);

  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`;

  useEffect(() => {
    axios
      .get(api)
      .then((response) =>
        setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote)
      )
      .catch((err) => {
        console.error("Error" + err);
      });
  }, []);

  let multi: any = currencyQuote?.high;
  multi = parseFloat(multi);
  const handleChange = (event: any) => {
    setCurrent(parseInt(event.target.value));
    console.log(current);
  };

  const handleFinal = () => {
    axios
      .get(api)
      .then((response) =>
        setCurrencyQuote(Object.values(response.data)[0] as CurrencyQuote)
      )
      .catch((err) => {
        console.error("Error" + err);
      });
    if(firstValue === secondValue){
      setFinalCurrent(current)
    }else{
    let multi: any = currencyQuote?.high;
    multi = parseFloat(multi);

    setMultiplier(parseFloat(multi));
    setFinalCurrent(current * multiplier);

    console.log(typeof finalCurrent);
    console.log(typeof current);
    console.log(typeof multi);
    console.log(finalCurrent);
    console.log(firstValue);
    console.log(secondValue);
  }
  };

  return (
    <div className="container">
      <div className="main-screen_ df">
        <div className="main-screen-top df">
          <h2>Currency converter</h2>
        </div>
        <div className="main-screen-middle df">
          <label htmlFor="">Insert a value</label>
          <input onChange={handleChange} type="number" name="" id="" />
          <input onClick={handleFinal} type="button" value="ENVIAR" />
        </div>
        <div className="main-screen-bottom">
          <div className="main-screen-bottom-left">
            <label htmlFor="currency">Choose a currency:</label>
            <select
              value={firstValue}
              onChange={(event) => setFirstValue(event.target.value)}
            >
              <option value="BRL">BRL - Real</option>
              <option value="USD">USD - Dolar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
            <span>
              <i className="bx bx-right-arrow-alt"></i>
            </span>
          </div>
          <div className="main-screen-bottom-right">
            <label htmlFor="cars">Choose a currency:</label>
            <select
              value={secondValue}
              onChange={(event) => setSecondValue(event.target.value)}
            >
              <option value="BRL">BRL - Real</option>
              <option value="USD">USD - Dolar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
        <span>
          <p>Final value: {finalCurrent.toFixed(2)}</p>
        </span>
      </div>
    </div>
  );
};

export default Currency;
