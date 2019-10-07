'use strict';

// Just in case of using the REST API locally, use this baseURL -> 'http://localhost:4000/';
const baseURL = 'https://loscocosapi.herokuapp.com/';

const roomsApi = {
  getRooms: async (checkin, checkout, adults, children, promo) => {
    try {
      const promoCode = promo !== undefined ? `&promo_code=${promo}` : '';
      const result = await fetch(baseURL + `rooms?adults=${adults}&children=${children}&checkin=${checkin}&checkout=${checkout}` + promoCode);
      return result.json();
    } catch (error) {
      console.log(error);
    }
  },
  getOneRoom: async (roomId, numberRooms, checkin, checkout, promo) => {
    try {
      const result = await fetch(baseURL + `room?id=${roomId}&numberRooms=${numberRooms}&checkin=${checkin}&checkout=${checkout}&promo_code=${promo}`);
      return result.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default roomsApi;