const axios = require('axios');

const currencyApi = (date, baseCurrency, conversionCurrency) => {
  return axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency}&symbols=${conversionCurrency}`)
  .then((res) => {
    return res.data.rates[conversionCurrency];
  })
  .catch((error) => {
    console.log('api error', error);
  })
}
const convert = (date, baseCurrency, conversionCurrency, amount) => {
  return currencyApi(date, baseCurrency, conversionCurrency)
  .then((rate) => { //recieve the rate from the api and construct a json response
    return {
      "date": date,
      "base_currency": baseCurrency,
      "base_amount": amount,
      "conversion_currency": conversionCurrency,
      "conversion_amount":  Number((rate*amount).toFixed(2))
    }
  })
}

convert('2017-01-12', 'USD', 'CAD', 100)
.then((res) => {
  const jsonRes = JSON.stringify(res) //stringify js object so it's a JSON string
  console.log('output', jsonRes); //output return for diplay
  return jsonRes
})

module.exports = {convert}
