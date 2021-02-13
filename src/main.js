import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

const appendCurrencyKeys = () => {
  const countryKeys = {AED:"UAE Dirham",AFN:"Afghan Afghani",ALL:"Albanian Lek",AMD:"Armenian Dram",ANG:"Netherlands Antillian Guilder",AOA:"Angolan Kwanza",ARS:"Argentine Peso",AUD:"Australian Dollar",AWG:"Aruban Florin",AZN:"Azerbaijani Manat",BAM:"Bosnia and Herzegovina Mark",BBD:"Barbados Dollar",BDT:"Bangladeshi Taka",BGN:"Bulgarian Lev",BHD:"Bahraini Dinar",BIF:"Burundian Franc",BMD:"Bermudian Dollar",BND:"Brunei Dollar",BOB:"Bolivian Boliviano",BRL:"Brazilian Real",BSD:"Bahamian Dollar",BTN:"Bhutanese Ngultrum",BWP:"Botswana Pula",BYN:"Belarusian Ruble",BZD:"Belize Dollar",CAD:"Canadian Dollar",CDF:"Congolese Franc",CHF:"Swiss Franc",CLP:"Chilean Peso",CNY:"Chinese Renminbi",COP:"Colombian Peso",CRC:"Costa Rican Colon",CUC:"Cuban Convertible Peso",CUP:"Cuban Peso",CVE:"Cape Verdean Escudo",CZK:"Czech Koruna",DJF:"Djiboutian Franc",DKK:"Danish Krone",DOP:"Dominican Peso",DZD:"Algerian Dinar",EGP:"Egyptian Pound",ERN:"Eritrean Nakfa",ETB:"Ethiopian Birr",EUR:"Euro",FJD:"Fiji Dollar",FKP:"Falkland Islands Pound",FOK:"Faroese Króna",GBP:"Pound Sterling",GEL:"Georgian Lari",GGP:"Guernsey Pound",GHS:"Ghanaian Cedi",GIP:"Gibraltar Pound",GMD:"Gambian Dalasi",GNF:"Guinean Franc",GTQ:"Guatemalan Quetzal",GYD:"Guyanese Dollar",HKD:"Hong Kong Dollar",HNL:"Honduran Lempira",HRK:"Croatian Kuna",HTG:"Haitian Gourde",HUF:"Hungarian Forint",IDR:"Indonesian Rupiah",ILS:"Israeli New Shekel",IMP:"Manx Pound",INR:"Indian Rupee",IQD:"Iraqi Dinar",IRR:"Iranian Rial",ISK:"Icelandic Króna",JMD:"Jamaican Dollar",JOD:"Jordanian Dinar",JPY:"Japanese Yen",KES:"Kenyan Shilling",KGS:"Kyrgyzstani Som",KHR:"Cambodian Riel",KID:"Kiribati Dollar",KMF:"Comorian Franc",KRW:"South Korean Won",KWD:"Kuwaiti Dinar",KYD:"Cayman Islands",KZT:"Kazakhstani Tenge",LAK:"Lao Kip",LBP:"Lebanese Pound",LKR:"Sri Lanka Rupee",LRD:"Liberian Dollar",LSL:"Lesotho Loti",LYD:"Libyan Dinar",MAD:"Moroccan Dirham",MDL:"Moldovan Leu",MGA:"Malagasy Ariary",MKD:"Macedonian Denar",MMK:"Burmese Kyat",MNT:"Mongolian Tögrög",MOP:"Macanese Pataca",MRU:"Mauritanian Ouguiya",MUR:"Mauritian Rupee",MVR:"Maldivian Rufiyaa",MWK:"Malawian Kwacha",MXN:"Mexican Peso",MYR:"Malaysian Ringgit",MZN:"Mozambican Metical",NAD:"Namibian Dollar",NGN:"Nigerian Naira",NIO:"Nicaraguan Córdoba",NOK:"Norwegian Krone",NPR:"Nepalese Rupee",NZD:"New Zealand Dollar",OMR:"Omani Rial",PAB:"Panamanian Balboa",PEN:"Peruvian Sol",PGK:"Papua New Guinean Kina",PHP:"Philippine Peso",PKR:"Pakistani Rupee",PLN:"Polish Złoty",PYG:"Paraguayan Guaraní",QAR:"Qatari Riyal",RON:"Romanian Leu",RSD:"Serbian Dinar",RUB:"Russian Ruble",RWF:"Rwandan Franc",SAR:"Saudi Riyal",SBD:"Solomon Islands Dollar",SCR:"Seychellois Rupee",SDG:"Sudanese Pound",SEK:"Swedish Krona",SGD:"Singapore Dollar",SHP:"Saint Helena Pound",SLL:"Sierra Leonean Leone",SOS:"Somali Shilling",SRD:"Surinamese Dollar",SSP:"South Sudanese Pound",STN:"São Tomé and Príncipe Dobra",SYP:"Syrian Pound",SZL:"Eswatini Lilangeni",THB:"Thai Baht",TJS:"Tajikistani Somoni",TMT:"Turkmenistan Manat",TND:"Tunisian Dinar",TOP:"Tongan Paʻanga",TRY:"Turkish Lira",TTD:"Trinidad and Tobago Dollar",TVD:"Tuvaluan Dollar",TWD:"New Taiwan Dollar",TZS:"Tanzanian Shilling",UAH:"Ukrainian Hryvnia",UGX:"Ugandan Shilling",USD:"United States Dollar",UYU:"Uruguayan Peso",UZS:"Uzbekistani So'm",VES:"Venezuelan Bolívar Soberano",VND:"Vietnamese Đồng",VUV:"Vanuatu Vatu",WST:"Samoan Tālā",XAF:"Central African CFA Franc",XCD:"East Caribbean Dollar",XDR:"Special Drawing Rights",XOF:"West African CFA franc",XPF:"CFP Franc",YER:"Yemeni Rial",ZAR:"South African Rand",ZMW:"Zambian Kwacha"};
  $.each(countryKeys, function(key, value) {
    $('#fromCurrencyType, #toCurrencyType').append($('<option>', {value : key }).text(value));
  });
};
const displayCurrency = (amount, currencyResponse) => {
  const convertedAmount = (amount * currencyResponse.conversion_rate);
  $('.show-currency').text(`${amount.toFixed(2)} ${currencyResponse.base_code} = ${convertedAmount.toFixed(2)} ${currencyResponse.target_code}`);
};
const displayFlag = (baseCountryCode, targetCountryCode) => {
  $('.show-currency').prepend(`<img src='https://www.countryflags.io/${baseCountryCode}/shiny/64.png'>`);
  $('.show-currency').append(`<img src='https://www.countryflags.io/${targetCountryCode}/shiny/64.png'>`);
};
const clearFields = () => {
  $('#currencyAmount').val("");
  $('.show-flag').empty();
  $('.show-errors').val("");
};
const displayErrors = (error) => {
  $('.show-errors').text(`${error}`);
};
$(document).ready(function() {
  appendCurrencyKeys();
  $('#convert').on('click', function() {
    const input = $('#currencyAmount').val();
    if (input  === '') {
      alert("Please enter a monetary value to convert");
      return false;
    }
    let amount = parseFloat($('#currencyAmount').val());
    let fromCurrency = $('#fromCurrencyType').val();
    let toCurrency = $('#toCurrencyType').val();
    clearFields();
    CurrencyService.getCurrency(fromCurrency, toCurrency)
      .then(function(currencyResponse) {
        if (currencyResponse instanceof Error) {
          throw Error(`ExchangeRate API error: ${currencyResponse.message}`);
        }
        const baseCountryCode = currencyResponse.base_code.slice(0,2);
        const targetCountryCode = currencyResponse.target_code.slice(0,2);
        displayCurrency(amount, currencyResponse);
        displayFlag(baseCountryCode, targetCountryCode);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});