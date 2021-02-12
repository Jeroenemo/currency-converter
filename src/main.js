import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

const appendCurrencyKeys = () => {
  const countryKeys = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","LYD","SSP","SYP","VES","YER","ZMW"];
  countryKeys.forEach(key =>
    $('#fromCurrencyType, #toCurrencyType').append($('<option></option>').attr('value', key).text(key)));
};
const displayCurrencyConversion = (amount, conversionRate) => {
  const convertedAmount = (amount * conversionRate);
  $('.show-currency').text(`Conversion is ${convertedAmount}`);
};
const clearFields = () => {
  $('#currencyAmount').val("");
  $('.show-errors').val("");
};
const displayErrors = (error) => {
  $('.show-errors').text(`${error}`);
};

$(document).ready(function() {
  appendCurrencyKeys();
  $('#currencyRate').on('click', function() {
    let amount = parseFloat($('#currencyAmount').val());
    console.log(typeof amount)
    let fromCurrency = $('#fromCurrencyType').val();
    let toCurrency = $('#toCurrencyType').val();
    clearFields();
    CurrencyService.getCurrency(fromCurrency, toCurrency)
      .then(function(currencyResponse) {
        if (currencyResponse instanceof Error) {
          throw Error(`ExchangeRate API error: ${currencyResponse.message}`);
        }
        const conversionRate = currencyResponse.conversion_rate;
        console.log(typeof conversionRate)
        displayCurrencyConversion(amount, conversionRate);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});