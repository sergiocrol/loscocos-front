'use strict';

const Redirect = {
  render: async () => {
    location.href = `#/rooms?adults=1&children=1&checkin=22052019&checkout=23052019`;
  },
  afterRender: async () => { }
}

export default Redirect;