
![Logo](https://raw.githubusercontent.com/junior-slv/currency-now/master/src/assets/img.png)


# Currency converter

The project is a currency exchange converter that utilizes TypeScript and React. With a dynamic and responsive interface, users can convert different types of currencies.

## Deploy

To run this app on your device use:

```bash
  npm install
  npm start
```


## Functionalities

- Convert values ​​in real time
- Returns selected currency (updated every 30 seconds)
- Realtime Quotes API with 150+ currencies!



## Demonstration

![Demo](https://raw.githubusercontent.com/junior-slv/currency-now/master/src/assets/image.png)


## Learnings

API manipulation using Axios, deepening knowledge of react hooks and component implementation using Chakra UI


## Api get example

```javascript
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
}
```


## Stack

**Front-end:** TypeScript, React, Chakra UI



## Autor

- [@junior-slv](https://www.github.com/junior-slv)
- [@willianrod](https://www.github.com/willianrod)

## License

Fell free to implement and use this project.

