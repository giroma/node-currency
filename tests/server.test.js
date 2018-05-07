const expect = require('expect');
const nock = require('nock');

const {convert} = require('../server');//import server.js function
const mockData = require('./mockData');

describe('Unit test cases', () => {
  beforeEach(() => {
    nock('https://exchangeratesapi.io') //nock creates a mock api return
      .get(`/api/${mockData.one.date}?base=${mockData.one.base_currency}&symbols=${mockData.one.conversion_currency}`)
      .reply(200, {"base":mockData.one.base_currency,"date":mockData.one.date,"rates":{"CAD":0.9785}}) //reply with a hardcoded api return in the format of the real api
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.two.date}?base=${mockData.two.base_currency}&symbols=${mockData.two.conversion_currency}`)
      .reply(200, {"base":mockData.two.base_currency,"date":mockData.two.date,"rates":{"SEK":13.4819}})
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.three.date}?base=${mockData.three.base_currency}&symbols=${mockData.three.conversion_currency}`)
      .reply(200, {"base":mockData.three.base_currency,"date":mockData.three.date,"rates":{"PLN":4.402}})
    nock('https://exchangeratesapi.io')
      .get(`/api/${mockData.four.date}?base=${mockData.four.base_currency}&symbols=${mockData.four.conversion_currency}`)
      .reply(200, {"base":mockData.four.base_currency,"date":mockData.four.date,"rates":{"TRY":0.2754}})
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
        expect(typeof res).toBe('object')
        expect(res.date).toBe(mockData.one.date);
        expect(res.base_currency).toBe(mockData.one.base_currency);
        expect(res.conversion_currency).toBe(mockData.one.conversion_currency);
        expect(res.base_amount).toBe(mockData.one.base_amount);
        expect(res.conversion_amount).toBe(mockData.one.conversion_amount);
        done()
      })
  })
  it('Convert() should return correct JSON, test 2', (done) => {
    convert(mockData.two.date,
            mockData.two.base_currency,
            mockData.two.conversion_currency,
            mockData.two.base_amount)
      .then((res) => {
        expect(typeof res).toBe('object')
        expect(res.date).toBe(mockData.two.date);
        expect(res.base_currency).toBe(mockData.two.base_currency);
        expect(res.conversion_currency).toBe(mockData.two.conversion_currency);
        expect(res.base_amount).toBe(mockData.two.base_amount);
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
        expect(typeof res).toBe('object')
        expect(res.date).toBe(mockData.three.date);
        expect(res.base_currency).toBe(mockData.three.base_currency);
        expect(res.conversion_currency).toBe(mockData.three.conversion_currency);
        expect(res.base_amount).toBe(mockData.three.base_amount);
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
        expect(typeof res).toBe('object')
        expect(res.date).toBe(mockData.four.date);
        expect(res.base_currency).toBe(mockData.four.base_currency);
        expect(res.conversion_currency).toBe(mockData.four.conversion_currency);
        expect(res.base_amount).toBe(mockData.four.base_amount);
        expect(res.conversion_amount).toBe(mockData.four.conversion_amount);
        done()
      })
  })
  it('Convert() should return undefined if amount = 0', (done) => {
    convert(mockData.four.date,
            mockData.four.base_currency,
            mockData.four.conversion_currency,
            0)
      .then((res) => {
        expect(typeof res).toBe('undefined')
        done()
      })
  })
  it('Convert() should return undefined if amount is negative', (done) => {
    convert(mockData.four.date,
            mockData.four.base_currency,
            mockData.four.conversion_currency,
            -1 )
      .then((res) => {
        expect(typeof res).toBe('undefined')
        done()
      })
  })
})
