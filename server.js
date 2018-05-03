const axios = require('axios');

const currencyApi = (date, baseCurrency, conversionCurrency) => {
  axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency}&symbols=${conversionCurrency}`)
  .then((res) => {
    console.log(res.data.rates[conversionCurrency]);
  })
  .catch((error) => {
    console.log(error);
  })
}

currencyApi('2017-01-12', 'USD', 'CAD')
