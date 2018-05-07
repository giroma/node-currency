const axios = require('axios');

const convert = (date, baseCurrency, conversionCurrency, amount) => {
  return axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency}&symbols=${conversionCurrency}`)
  .then((res) => {
    const rate = res.data.rates[conversionCurrency];
    return {
      "date": date,
      "base_currency": baseCurrency,
      "base_amount": amount,
      "conversion_currency": conversionCurrency,
      "conversion_amount":  Number((rate*amount).toFixed(2))
    }
  })
  .catch((error) => {
    console.log('api error', error);
  })
}

convert('2017-01-12', 'USD', 'CAD', 100) //run with hard coded data
.then((res) => {
  const jsonRes = JSON.stringify(res) //stringify js object so it's a JSON string
  console.log('output', jsonRes); //output return for diplay
  return jsonRes
})

module.exports = {convert}
