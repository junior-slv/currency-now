
import { useEffect, useState } from 'react'
import './Currency.css'
import axios from 'axios'


const Currency = () => {
  const [firstValue, setFirstValue] = useState("USD")
  const [secondValue, setSecondValue] = useState("BRL")
  const [current, setCurrent] = useState("")
  const [multiplier, setMultiplier] = useState("")
  const [finalCurrent, setFinalCurrent] = useState("")

  const US = "USDBRL"


  const api = `https://economia.awesomeapi.com.br/last/${firstValue}-${secondValue}`


  useEffect(() => {
    axios
      .get(api)
      .then((response) => setMultiplier(response.data))
      .catch((err) => {
        console.error("Error" + err);
        
      });
  }, []);

  //ADICIONAR A VARIAVEL HIGH NA MULTIPLICAÇÃO
  console.log(  Object.keys(multiplier).map )
  console.log(multiplier);
    
  return (

    


    <div>{JSON.stringify(multiplier)}</div>
  )
}

export default Currency
