import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Currency.css";
import axios from "axios";
import spin from '../../assets/spin.gif'
import currencyService from "../../services/currency";
import { CurrencyQuote } from "../../services/currency";

let fromvalue:any, tovalue:any;

const Currency = () => {
  // const [currencyFrom, setCurrencyFrom] = useState("BRL");
  // const [currencyTo, setCurrencyTo] = useState("USD");
  const [finalCurrent, setFinalCurrent] = useState(Number);
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(
    null
  );
  const [loading, setLoading] = useState(false)  
  const [multiplier, setMultiplier] = useState(0);


  useEffect(() => {
    setLoading(true);
    currencyService
      .getLastQuote(fromvalue, tovalue)
      .then(data => setCurrencyQuote(data))
      .catch((err) => {
        console.error("Error" + err);
      });
      let multi:any = currencyQuote?.high
      multi = parseFloat(multi)
      setLoading(false);
  }, []);

  let multi: any = currencyQuote?.high;
  multi = parseFloat(multi);

  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const current = parseInt(e.currentTarget.value)
    setFinalCurrent(current*multi)
  }
  const toValueChange = (e: any) => {
     let tovalue = e.target.value;
    currencyService
    .getLastQuote(fromvalue, tovalue)
    .then(data => setCurrencyQuote(data))
    .catch((err) => {
      console.error("Error" + err);
    });
    if (Number.isNaN(finalCurrent)){
      setFinalCurrent(0)
    }else{
    let multi:any = currencyQuote?.high
    multi = parseFloat(multi)
      console.log(fromvalue);
      console.log(tovalue);
      
    }
  }
  const fromValueChange = (e: any) => {
    let fromvalue = e.target.value;
    // setCurrencyFrom(fromto)
    currencyService
    .getLastQuote(fromvalue, tovalue)
    .then(data => setCurrencyQuote(data))
    .catch((err) => {
      console.error("Error" + err);
    });
    if (Number.isNaN(finalCurrent)){
      setFinalCurrent(0)
    }else{
    let multi:any = currencyQuote?.high
    multi = parseFloat(multi)
      console.log(fromvalue);
      console.log(tovalue);
      
    }

  }
  
  return (
    <div className="container">
      <div className="main-screen_ df">
        <div className="main-screen-top df">
          <h2>Currency converter</h2>
        </div>
        <div className="main-screen-middle df">
        </div>
        <div className="main-screen-bottom">
          <div className="main-screen-bottom-left">
            <label htmlFor="currency"></label>
            <select
              value={fromvalue}
              onChange={fromValueChange}
            >
              <option value="BRL">BRL - Real</option>
              <option value="USD">USD - Dolar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
            <input onChange={handleChange} type="text" placeholder="1" name="" id="" />

            <span>
            </span>
          </div>
          <div className="main-screen-bottom-right">
            <label htmlFor="cars"></label>
            <select
              value={tovalue}
              onChange={toValueChange}
            >
              <option value="BRL">BRL - Real</option>
              <option value="USD">USD - Dolar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
            <input onChange={handleChange} type="number" placeholder="1" name="" id="" />

          </div>
        </div>
        <span>
          <p>Final value: {finalCurrent}</p>
          <span className={loading ? 'loading' : 'loading-none'}><img src={spin} alt="" /></span>
        </span>
      </div>
    </div>
  );
};

export default Currency;
