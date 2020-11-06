import fetchIntercept from 'fetch-intercept';
import CONSTANTS from "./constants";
import store from './store.js'

export default fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    console.log("request");
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    console.log("request error");
    return Promise.reject(error);
  },

  response: async function (response) {
    // Modify the reponse object
    if(response.status === CONSTANTS.HTTP_STATUS.HTTP_STATUS_UNAUTHORIZED) {
      await store.dispatch('logout');
      window.location = 'http://localhost:8080/login';
    }
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    console.log("response error");
    return Promise.reject(error);
  }
});