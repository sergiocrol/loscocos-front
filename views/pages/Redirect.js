'use strict';

const Redirect = {
  render: async () => {
    const day = new Date().getDate() <= 9 ? '0' + new Date().getDate() : new Date().getDate();
    const dayTwo = new Date().getDate() + 1 <= 9 ? '0' + (new Date().getDate() + 1) : new Date().getDate() + 1;
    const month = new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const today = day + '' + month + '' + year;
    const tomorrow = dayTwo + '' + month + '' + year;
    location.href = `#/rooms?adults=1&children=1&checkin=${today}&checkout=${tomorrow}`;
  },
  afterRender: async () => { }
}

export default Redirect;