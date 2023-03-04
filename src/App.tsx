import './App.css';
import Currency from './components/Currency/Currency';
import { ChakraProvider } from '@chakra-ui/react'
function App() {

  return (
    <ChakraProvider>
      <Currency/>
      </ChakraProvider>
  );
}

export default App;
