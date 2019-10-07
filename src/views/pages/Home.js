'use strict';

import SearchEngine from '../../views/components/SearchEngine.js';
import roomsApi from '../../api/api.js';
import ParseUrl from '../../services/ParseUrl.js';
import FormatDate from '../../services/FormatDate.js';

let roomList = [];

const rooms = async () => {
  const { adults, children, checkin, checkout, promo } = ParseUrl.parseRequestURL();
  roomList = await roomsApi.getRooms(checkin[1], checkout[1], adults[1], children[1], promo[1]);
  let rooms = '';

  roomList.rooms.forEach((room, i) => {
    return (
      rooms += `
      <div id="${i}" name="selectedRoom" class="card clearfix pointer">
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
      `
    )
  })

  return rooms;
}

const aside = {
  render: async (roomId) => {
    const { name, checkin, checkout, totalPrice, totalPriceDiscount } = roomList.rooms[roomId];
    const { adults, children } = ParseUrl.parseRequestURL();
    const checkIn = ParseUrl.parseRequestURL().checkin;
    const checkOut = ParseUrl.parseRequestURL().checkout;

    const view = `
    <div class="card">
      <h2>Reservation Summary</h2>
      <div class="clearfix">
          <h5 class="pull-left">${name}</h5>
          <div class="form-group pull-right">
              <select class="pull-right" id="rooms">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
              </select>
          </div>
      </div>

      <div class="clearfix">

          <div class="card-content">
              <p class="main">Check in</p>
              <p id="checkin-hour" class="base">From ${checkin}h</p>
          </div>

          <div class="card-content">
              <p class="main">Check out</p>
              <p id="checkout-hour" class="base">Before ${checkout}h</p>
          </div>

          <div class="card-content">
              <p class="main">Reservation date</p>
              <p class="base">From <strong><span id="checkin-summary">${FormatDate.applyFormat(checkIn[1])}</span></strong> to <strong id="checkout-summary">${FormatDate.applyFormat(checkOut[1])}</strong></p>
          </div>

          <div class="card-content">
              <p class="main">People</p>
              <p class="base" id="adults-summary">${adults[1]} Adults</p>
              <p class="base" id="children-summary">${children[1]} Children</p>
          </div>

          <div class="card-checkout clearfix">
              <div class="left pull-left">
                  <p class="main">Total</p>
                  <p class="base"><a href="#">Price details ></a></p>
              </div>
              <div class="right pull-right">
                  <span id="total-price-through" class="line-through ${totalPriceDiscount ? '' : 'display-none'}">${totalPrice}</span>
                  <span id="total-price" class="main">€${totalPriceDiscount ? totalPriceDiscount : totalPrice}</span>
              </div>
          </div>

          <a id="save" class="btn btn-primary btn-group-justified">
              Save
          </a>
        </div>
      </div>
    `;
    return view;
  },
  afterRender: async (roomId) => {
    const { name, checkin, checkout, totalPrice, totalPriceDiscount } = roomList.rooms[roomId];

    document.getElementById('rooms')[0].selected = true;
    document.querySelector('.pull-left').innerHTML = name;
    document.getElementById('checkin-hour').innerHTML = `From ${checkin}h`;
    document.getElementById('checkout-hour').innerHTML = `Before ${checkout}h`;
    document.getElementById('total-price').innerHTML = `€${totalPriceDiscount ? totalPriceDiscount : totalPrice}`;
    document.getElementById('total-price-through').innerHTML = totalPrice;
  }
}

const Home = {
  render: async () => {
    const roomList = await rooms();
    const searchBox = await SearchEngine.render();
    const asideBox = await aside.render(0);
    const view = `
      ${searchBox}
        <div class="container rar-summary">
        <div class="row">
            <div class="col-md-8 main">
                <h2>Rooms & Rates</h2>
                <p class="subtitle">Plan your perfect stay at our hotel</p>
                <img src="images/cocos/wizard_1.png" width="480" class="wizard" />
            </div>
            <div class="col-md-4 sidebar-header"></div>
        </div>
        <div class="row">
            <div class="col-md-8 main">
    
            ${roomList}

            </div>
            <div class="col-md-4 sidebar">

            ${asideBox}

            </div>
        </div>
      </div>
      `;

    return view;
  },
  afterRender: async () => {
    await SearchEngine.afterRender();
    const { checkin, checkout, promo } = ParseUrl.parseRequestURL();
    let roomId = 0;
    let numberRooms = 1;

    document.querySelectorAll('div[name="selectedRoom"]').forEach(el => {
      el.addEventListener('click', (event) => {
        roomId = event.currentTarget.id;
        aside.afterRender(roomId);
      })
    })

    document.getElementById('rooms').addEventListener('change', (event) => {
      numberRooms = event.target.value;
      const price = roomList.rooms[roomId].totalPriceDiscount ? roomList.rooms[roomId].totalPriceDiscount : roomList.rooms[roomId].totalPrice;
      document.getElementById('total-price').innerHTML = `€${price * numberRooms}`;
      document.getElementById('total-price-through').innerHTML = `€${roomList.rooms[roomId].totalPrice * numberRooms}`;
    })

    document.getElementById('save').addEventListener('click', () => {
      localStorage.setItem('loscocos', JSON.stringify({ 'roomId': roomList.rooms[roomId].id, 'numberRooms': numberRooms, 'checkin': checkin[1], 'checkout': checkout[1], 'promo': promo[1] }));
      location.href = '#/payment'
    })
  }
}

export default Home;