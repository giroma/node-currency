const expect = require('expect');

const {convert} = require('../server');

describe('Integration test', () => {
  it('Should return correct JSON after API hit, test 1', (done) => {
    const testData = {
      "date": "2011-06-03",
      "base_currency": "USD",
      "base_amount": 100,
      "conversion_currency": "CAD",
      "conversion_amount": 97.85
    }
    convert(
      testData.date,
      testData.base_currency,
      testData.conversion_currency,
      testData.base_amount )
      .then((res) => {
        expect(res.date).toBe(testData.date);
        expect(res.base_currency).toBe(testData.base_currency);
        expect(res.base_amount).toBe(testData.base_amount);
        expect(res.conversion_currency).toBe(testData.conversion_currency);
        expect(res.conversion_amount).toBe(testData.conversion_amount);
        done();
      })
  })
})
