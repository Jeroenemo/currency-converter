import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

const clearFields = () => {
  $('#currencyAmount').val("");
  $('.show-errors').val("");
};
const displayErrors = (error) => {
  $('.show-errors').text(`${error}`);
};
const displayCurrencyConversion = (exchangeRate, amount) => {
  const convertedAmount = (amount * exchangeRate.AED);
  $('.show-currency').text(`Conversion is ${convertedAmount}`);
};

$(document).ready(function() {
  $('#currencyRate').on('click', function() {
    let amount = $('#currencyAmount').val();
    clearFields();
    CurrencyService.getCurrency()
      .then(function(currencyResponse) {
        console.log(currencyResponse)
        if (currencyResponse instanceof Error) {
          throw Error(`ExchangeRate API error: ${currencyResponse.message}`);
        }
        const exchangeRate = currencyResponse.conversion_rates;
        displayCurrencyConversion(exchangeRate, amount);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});