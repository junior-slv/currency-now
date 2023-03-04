import { useEffect, useState, useMemo, useCallback } from "react";
import "./Currency.css";
import spin from '../../assets/spin.gif'
import currencyService from "../../services/currency";
import { CurrencyQuote } from "../../services/currency";

const AVAILABLE_CURRENCY = [
  {
    key: 'BRL',
    label: 'Real'
  },
  {
    key: 'USD',
    label: 'Dólar',
  },
  {
    key: 'EUR',
    label: 'Euro',
  },
  {
    key: 'BTC',
    label: 'Bitcoin',
  }
];

const Currency = () => {
  const [currencyFrom, setCurrencyFrom] = useState("BRL");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [currencyQuote, setCurrencyQuote] = useState<null | CurrencyQuote>(
    null
  );
  const [inputValue, setInputValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const current = parseInt(e.currentTarget.value);
    setInputValue(current);
  }, []);

  useEffect(() => {
    setLoading(true);
    currencyService
      .getLastQuote(currencyFrom, currencyTo)
      .then(data => {
        setCurrencyQuote(data)
      })
    
      .catch((err) => {
        console.error("Error" + err);
      }).finally(() => {
        setLoading(false);
      });
  }, [currencyFrom, currencyTo]);

  const convertedValue = useMemo<string>(() => {
    const parsedValue = parseFloat(currencyQuote?.high || '0');
    return (parsedValue * inputValue).toFixed(2);
  }, [currencyQuote, inputValue]);

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
              value={currencyFrom}
              onChange={(e) => { setCurrencyFrom(e.target.value); }}
            >
              {AVAILABLE_CURRENCY
                .filter(currency => currencyTo !== currency.key)
                .map(currency => (
                <option
                  key={currency.key}
                  value={currency.key}
                >
                  {currency.key} - {currency.label}
                </option>
              ))}
            </select>
            <input onChange={handleChange} type="text" placeholder="1" name="" id="" />
            <span>
            </span>
          </div>
          <div className="main-screen-bottom-right">
            <label htmlFor="cars"></label>
            <select
              value={currencyTo}
              onChange={(e) => { setCurrencyTo(e.target.value) }}
            >
              {AVAILABLE_CURRENCY
                .filter(currency => currencyFrom !== currency.key)
                .map(currency => (
                  <option
                    key={currency.key}
                    value={currency.key}
                  >
                    {currency.key} - {currency.label}
                  </option>
                  )
                )
              }
            </select>
            <input type="number" readOnly name="" id="" value={convertedValue} />

          </div>
        </div>
        <span>
          <span className={loading ? 'loading' : 'loading-none'}><img src={spin} alt="" /></span>
        </span>
      </div>
    </div>
  );
};

export default Currency;