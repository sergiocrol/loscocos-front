'use strict';

import roomsApi from '../../api/api.js';

// Get info from localStorage and call to the API to get the correct room data
const Payment = {
  render: async () => {
    const { roomId, numberRooms, checkin, checkout, promo } = JSON.parse(localStorage.getItem('loscocos'));
    let room = await roomsApi.getOneRoom(roomId, numberRooms, checkin, checkout, promo);
    room = room.filteredRoom[0];

    const view = `  
      <div class="container-payment">
        <h2>Your reservation</h2>
        <div class="row center">
          <div class="col-md-8 main">
            <div name="selectedRoom" class="card clearfix pointer">
            <div class="room-image">
                <img src="${room.image}" width="100%" />
            </div>

            <div class="room-content">
                <h5 class="form-group">${room.name}</h5>
                <p class="form-group">${room.description}</p>

                <p class="form-group">Size: ${room.size}</p>

                <div class="room-info">
                    <div class="item">
                        <span class="inline-block">
                            <img src="images/icons/double-bed.svg" width="40">
                        </span>
                        <div>Beds: ${room.beds}</div>
                    </div>
                    <div class="item">People: ${room.people}</div>
                    <div class="item price text-right">
                        <span class="line-through ${room.totalPriceDiscount ? '' : 'display-none'}">${room.totalPrice}</span>
                        ${room.totalPriceDiscount ? room.totalPriceDiscount : room.totalPrice}
                    </div>
                  </div>
                </div>

                </div>   
                <a id="pay" class="btn btn-primary btn-group-justified">Pay</a>
          </div>
        </div>
      </div>
    `;

    return view;
  },
  afterRender: async () => {
    document.getElementById('pay').addEventListener('click', () => {
      localStorage.removeItem('loscocos');
      location.href = '#/rooms'
    })
  }
}

export default Payment;