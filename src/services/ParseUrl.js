'use strict';

const ParseUrl = {
  parseRequestURL: () => {

    let url = location.hash.slice(1).toLowerCase() || '/';

    let splittedUrl = url.split(/[\/?&]+/)

    let request = {
      resource: null,
      adults: null,
      children: null,
      checkin: null,
      checkout: null,
      promo: null
    }
    request.resource = splittedUrl[1]
    request.adults = splittedUrl[2] !== undefined && splittedUrl[2].split('=');
    request.children = splittedUrl[3] !== undefined && splittedUrl[3].split('=');
    request.checkin = splittedUrl[4] !== undefined && splittedUrl[4].split('=');
    request.checkout = splittedUrl[5] !== undefined && splittedUrl[5].split('=');
    request.promo = splittedUrl[6] !== undefined && splittedUrl[6].split('=');

    return request;
  },
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ParseUrl;