'use strict';

const baseURL = 'http://localhost:4000/';

const getRooms = async (checkin, checkout, adults, children) => {
  try {
    const result = await fetch(baseURL + `rooms?adults=${adults}&children=${children}&checkin=${checkin}&checkout=${checkout}`);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export default getRooms;