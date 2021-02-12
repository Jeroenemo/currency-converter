export default class FlagService {
  static getFlag(code) {
    return fetch (`https://www.countryflags.io/${code}/flat/64.png`, {mode: 'no-cors'})
      .then(function(response) {
        if(!response.ok) {
          throw Error(response.status);
        }
        return response
      })
      .catch(function(error) {
        return Error(error);
      })
  }
}