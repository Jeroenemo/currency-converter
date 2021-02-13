export default class CurrencyService {
  static getCurrency(base, target) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${base}/${target}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}