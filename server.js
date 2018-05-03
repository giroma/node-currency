const axios = require('axios');

const currencyApi = (date, baseCurrency, conversionCurrency) => {
  return axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency}&symbols=${conversionCurrency}`)
  .then((res) => {
    return res.data.rates[conversionCurrency];
  })
  .catch((error) => {
    console.log(error);
  })
}
const convert = (date, baseCurrency, conversionCurrency, amount) => {
  return currencyApi(date, baseCurrency, conversionCurrency)
  .then((rate) => {
    return {
      "date": date,
      "base_currency": baseCurrency,
      "base_amount": amount,
      "conversion_currency": conversionCurrency,
      "conversion_amount": rate*amount
    }
  })
}

convert('2017-01-12', 'USD', 'CAD', 100)
.then((res) => {
  res = JSON.stringify(res)
  console.log(typeof res);
  console.log(JSON.parse(res).date);
})
// currencyApi('2017-01-12', 'USD', 'CAD')
