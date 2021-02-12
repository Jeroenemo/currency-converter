import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

$(document).ready(function() {
  $('#currencyRate').on('click', function() {
    let amount = $('#currency').val();
    CurrencyService.getCurrency()
      .then(function(currencyResponse) {
        if (currencyResponse instanceof Error) {
          throw Error(`ExchangeRate API error: ${currencyResponse.message}`)
        }
        const exchangeRate = currencyResponse.conversion_rates;
        displayCurrencyConversion(exchangeRate, amount)
      })
      .catch(function(error) {
        displayErrors(error.message)
      })
  })
})