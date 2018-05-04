const expect = require('expect');
const nock = require('nock');

const {convert} = require('../server');//import server.js function
const mockData = require('./mockData');

describe('Unit test case 1', () => {
  beforeEach(() => {
    nock('https://exchangeratesapi.io') //nock creates a mock api return
      .get(`/api/${mockData.one.date}?base=${mockData.one.base_currency}&symbols=${mockData.one.conversion_currency}`)
      .reply(200, {"base":mockData.one.base_currency,"date":mockData.one.date,"rates":{"CAD":0.9785}})
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.two.date}?base=${mockData.two.base_currency}&symbols=${mockData.two.conversion_currency}`)
      .reply(200, {"base":mockData.two.base_currency,"date":mockData.two.date,"rates":{"SEK":13.4819}})
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.three.date}?base=${mockData.three.base_currency}&symbols=${mockData.three.conversion_currency}`)
      .reply(200, {"base":mockData.three.base_currency,"date":mockData.three.date,"rates":{"PLN":4.402}})
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.four.date}?base=${mockData.four.base_currency}&symbols=${mockData.four.conversion_currency}`)
      .reply(200, {"base":mockData.four.base_currency,"date":mockData.four.date,"rates":{"TRY":0.2754}})
  })
  it('Convert() should return correct JSON, test 1', (done) => {
    convert(mockData.one.date,
            mockData.one.base_currency,
            mockData.one.conversion_currency,
            mockData.one.base_amount )
      .then((res) => {
        expect(res.conversion_amount).toBe(mockData.one.conversion_amount);
        done()
      })
  })
  it('Convert() should return correct JSON, test 2', (done) => {
    convert(mockData.two.date,
            mockData.two.base_currency,
            mockData.two.conversion_currency,
            mockData.two.base_amount )
      .then((res) => {
        expect(res.conversion_amount).toBe(mockData.two.conversion_amount);
        done()
      })
  })
  it('Convert() should return correct JSON, test 3', (done) => {
    convert(mockData.three.date,
            mockData.three.base_currency,
            mockData.three.conversion_currency,
            mockData.three.base_amount )
      .then((res) => {
        expect(res.conversion_amount).toBe(mockData.three.conversion_amount);
        done()
      })
  })
  it('Convert() should return correct JSON, test 4', (done) => {
    convert(mockData.four.date,
            mockData.four.base_currency,
            mockData.four.conversion_currency,
            mockData.four.base_amount )
      .then((res) => {
        expect(res.conversion_amount).toBe(mockData.four.conversion_amount);
        done()
      })
  })
})
