'use strict';

import SearchEngine from '../../views/components/SearchEngine.js';
import getRooms from '../../api/api.js';
import ParseUrl from '../../services/ParseUrl.js';
import FormatDate from '../../services/FormatDate.js';

let roomList = [];

const searchEngineInfo = () => {
  return ParseUrl.parseRequestURL();
}

const rooms = async () => {
  const { adults, children, checkin, checkout } = ParseUrl.parseRequestURL();
  roomList = await getRooms(checkin[1], checkout[1], adults[1], children[1]);
  console.log(roomList)
  let rooms = '';

  roomList.rooms.forEach((room, i) => {
    return (
      rooms += `
      <div id="${i}" name="selectedRoom" class="card clearfix pointer">
        <div class="room-image">
            <img src="images/cocos/room_1.png" width="100%" />
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
                    <span class="line-through">${room.totalPrice}</span>
                    ${room.totalPrice}
            </div>
          </div>
        </div>

      </div>     
      `
    )
  })

  return rooms;
}

const aside = async () => {
  // check/save in localStorage
  //const { checkin, checkout }
  console.log(roomList);
  console.log(roomList.rooms[event.currentTarget.id])
}

const Home = {
  render: async () => {
    const roomList = await rooms();
    const searchBox = await SearchEngine.render();
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
    
                <div class="card">
                    <h2>Reservation Summary</h2>
                    <div class="clearfix">
                        <h5 class="pull-left">Mini Dreamy Room</h5>
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
                            <p class="base">From 15.00h</p>
                        </div>
    
                        <div class="card-content">
                            <p class="main">Check out</p>
                            <p class="base">Before 12.00h</p>
                        </div>
    
                        <div class="card-content">
                            <p class="main">Reservation date</p>
                            <p class="base">From <strong><span id="checkin-summary">4/7/2018</span></strong> to <strong id="checkout-summary">15/7/2018</strong></p>
                        </div>
    
                        <div class="card-content">
                            <p class="main">People</p>
                            <p class="base" id="adults-summary">2 Adults</p>
                            <p class="base" id="children-summary">2 Children</p>
                        </div>
    
                        <div class="card-checkout clearfix">
                            <div class="left pull-left">
                                <p class="main">Total</p>
                                <p class="base"><a href="#">Price details ></a></p>
                            </div>
                            <div class="right pull-right">
                                <p class="main">€350</p>
                            </div>
                        </div>
    
                        <a href="#" class="btn btn-primary btn-group-justified">
                            Save
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    `;

    return view;
  },
  afterRender: async () => {
    await SearchEngine.afterRender();

    document.querySelectorAll('div[name="selectedRoom"]').forEach(el => {
      el.addEventListener('click', (event) => {
        //call aside function
        aside(event);
      })
    })
  }
}

export default Home;