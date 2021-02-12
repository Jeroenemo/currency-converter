import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';
const appendCurrencyKeys = (exchangeRate) => {
  $.each(exchangeRate, function(key, value) {
    $('#currencyType').append($('<option></option>').attr('value', value).text(key));
  })
}
const clearFields = () => {
  $('#currencyAmount').val("");
  $('.show-errors').val("");
};
const displayErrors = (error) => {
  $('.show-errors').text(`${error}`);
};
const displayCurrencyConversion = (currency, amount) => {
  const convertedAmount = (amount * currency);
  $('.show-currency').text(`Conversion is ${convertedAmount}`);
};

$(document).ready(function() {
  CurrencyService.getCurrency()
    .then(function(currencyResponse) {
      if (currencyResponse instanceof Error) {
        throw Error(`ExchangeRate API error: ${currencyResponse.message}`);
      }
      const exchangeRate = currencyResponse.conversion_rates;
      appendCurrencyKeys(exchangeRate);
  
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
    $('#currencyRate').on('click', function() {
      let amount = $('#currencyAmount').val();
      let currency = parseFloat($('#currencyType').val());
      console.log(currency)
      displayCurrencyConversion(currency, amount);
      clearFields();
  });
});