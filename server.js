const axios = require('axios');

const convert = (date, baseCurrency, conversionCurrency, amount) => {
  return axios.get(`https://exchangeratesapi.io/api/${date}?base=${baseCurrency.toUpperCase()}&symbols=${conversionCurrency.toUpperCase()}`)
  .then((res) => {
    const rate = res.data.rates[conversionCurrency];
    const date = res.data.date;
    const base_currency = res.data.base_currency;
    if (amount <= 0) {
      throw new Error('amount not greater than 0')
    }
    else {
      return {
        "date": date,
        "base_currency": baseCurrency,
        "base_amount": amount,
        "conversion_currency": conversionCurrency,
        "conversion_amount":  Number((rate*amount).toFixed(2))
      }
    }
  })
  .catch((error) => {
    console.log('API error', error);
  })
}

convert('2017-06-4', 'USD', 'CAD', 100) //sample execution
.then((res) => {
  const jsonRes = JSON.stringify(res) //stringify js object so it's a JSON string
  console.log('Output:', jsonRes); //output return for diplay
  return jsonRes
})

module.exports = {convert}
