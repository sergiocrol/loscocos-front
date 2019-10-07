'use strict';

import ParseUrl from '../../services/ParseUrl.js';
import FormatDate from '../../services/FormatDate.js';

const SearchEngine = {
    render: async () => {
        const view = `
        <div class="engine text-center">

            <div class="engine-wrapper">
                <div class="container text-center">

                    <form id="search" class="form-inline" action="">

                        <div class="form-group">
                            <div class="input-group date" data-date-format="dd/mm/yyyy">
                                <input id="checkin" type="text" class="form-control" placeholder="Check in" value="05/09/2019">
                                <div class="input-group-addon" >
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="input-group date" data-date-format="dd/mm/yyyy">
                                <input id="checkout" type="text" class="form-control" placeholder="Checkout" value="06/09/2019">
                                <div class="input-group-addon" >
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </div>
                            </div>
                        </div>


                        <div class="form-group select-inline">
                            <select class="form-control" placeholder="Adults" id="adults">
                                <option value="">Adults</option>
                                <option value="1">Adults: 1</option>
                                <option value="2">Adults: 2</option>
                                <option value="3">Adults: 3</option>
                                <option value="4">Adults: 4</option>
                                <option value="5">Adults: 5</option>
                                <option value="6">Adults: 6</option>
                                <option value="7">Adults: 7</option>
                                <option value="8">Adults: 8</option>
                                <option value="9">Adults: 9</option>
                            </select>
                        </div>
                        <div class="form-group select-inline">
                            <select class="form-control" placeholder="Children" id="children">
                                <option value="" >Children</option>
                                <option value="1">Children: 1</option>
                                <option value="2">Children: 2</option>
                                <option value="3">Children: 3</option>
                                <option value="4">Children: 4</option>
                                <option value="5">Children: 5</option>
                                <option value="6">Children: 6</option>
                                <option value="7">Children: 7</option>
                                <option value="8">Children: 8</option>
                                <option value="9">Children: 9</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <a id="modifyButton" class="btn btn-primary">Modify</a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        `;
        return view;
    },
    afterRender: async () => {
        //get the elements of the search box and set values based on url params
        const { adults, children, checkin, checkout } = ParseUrl.parseRequestURL();
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const adultsInput = document.getElementById('adults');
        const childrenInput = document.getElementById('children');

        checkinInput.value = FormatDate.applyFormat(checkin[1]);
        checkoutInput.value = FormatDate.applyFormat(checkout[1]);
        childrenInput[children[1]].selected = true;
        adultsInput[adults[1]].selected = true;

        // When we click on the button, get the new route and display the correct page (this happens in app.js)
        document.getElementById("modifyButton").addEventListener("click", async () => {
            const checkIn = FormatDate.removeFormat(checkinInput.value);
            const checkOut = FormatDate.removeFormat(checkoutInput.value);
            location.href = `#/rooms?adults=${adultsInput.value}&children=${childrenInput.value}&checkin=${checkIn}&checkout=${checkOut}`;
        })
    }
}

export default SearchEngine;