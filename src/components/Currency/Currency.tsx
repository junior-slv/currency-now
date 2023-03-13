import { useEffect, useState, useMemo, useCallback } from "react";
import "./Currency.css";
import currencyService from "../../services/currency";
import { CurrencyQuote } from "../../services/currency";
import {
  Container,
  CircularProgress,
  Input,
  Select,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import { AVAILABLE_CURRENCY } from "../../constants/available";

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
      .then((data) => {
        setCurrencyQuote(data);
      })

      .catch((err) => {
        console.error("Error" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currencyFrom, currencyTo]);

  const convertedValue = useMemo<string>(() => {
    const parsedValue = parseFloat(currencyQuote?.high || "0");
    return (parsedValue * inputValue).toFixed(2);
  }, [currencyQuote, inputValue]);

  return (
    <Container
      maxW="100vw"
      height="100vh"
      bg="gray.900"
      color="#262626"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxW="md" bg="whiteAlpha.800" padding="15" boxShadow='dark-lg' p='6' rounded='md'>
        <div className="main-screen-top">
          <Text fontSize="32px">Currency converter</Text>
          <i className='bx bx-dollar'></i>    
        </div>

        <div className="main-screen-bottom">
          <div className="main-screen-bottom-left">
            <Select
              bg="white"
              color="black"
              value={currencyFrom}
              onChange={(e) => {
                setCurrencyFrom(e.target.value);
              }}
            >
              {AVAILABLE_CURRENCY.filter(
                (currency) => currencyTo !== currency.key
              ).map((currency) => (
                <option key={currency.key} value={currency.key}>
                  {currency.key} - {currency.label}
                </option>
              ))}
            </Select>
            <Input
              onChange={handleChange}
              type="number"
              placeholder="1"
              bg="white"
              color="black"
            />
          </div>
          <div className="main-screen-middle">
            <p>
              <i className="bx bx-right-arrow-alt"></i>
            </p>
          </div>
          <div className="main-screen-bottom-right">
            <label htmlFor="cars"></label>
            <Select
              bg="white"
              color="black"
              value={currencyTo}
              onChange={(e) => {
                setCurrencyTo(e.target.value);
              }}
            >
              {AVAILABLE_CURRENCY.filter(
                (currency) => currencyFrom !== currency.key
              ).map((currency) => (
                <option key={currency.key} value={currency.key}>
                  {currency.key} - {currency.label}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              readOnly
              bg="white"
              color="black"
              value={convertedValue}
            />
          </div>
        </div>
        <span>
          <span className={loading ? "loading" : "loading-none"}>
            <CircularProgress isIndeterminate color="green.300" />
          </span>
        </span>
      </Box>
    </Container>
  );
};

export default Currency;
