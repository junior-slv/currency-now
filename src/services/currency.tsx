import axios from "axios";
export type CurrencyQuote = {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  timestamp: string;
  create_dat: string;
};

const instance = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/'
});

const currencyService = {
  getLastQuote: async (currencyTo: any, currencyFrom: any) => {
    const  response  = await instance.get(`/last/${currencyTo}-${currencyFrom}`);
    return Object.values(response.data)[0] as CurrencyQuote;
  },
}

export default currencyService;