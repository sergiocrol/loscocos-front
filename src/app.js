'use strict';

import Footer from './views/components/Footer.js';
import Navbar from './views/components/Navbar.js';

import Home from './views/pages/Home.js';
import NotFound from './views/pages/NotFound.js';
import Payment from './views/pages/Payment.js';
import Promo from './views/pages/Promo.js';
import Redirect from './views/pages/Redirect.js';

import ParseUrl from './services/ParseUrl.js';

const routes = {
  '/': Redirect,
  '/rooms': Redirect,
  '/rooms?adults=x&children=x&checkin=in&checkout=out': Home,
  '/rooms?adults=x&children=x&checkin=in&checkout=out&promo_code=promo': Promo,
  '/payment': Payment
}

const router = async () => {

  const navbar = null || document.getElementById('navbar_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  navbar.innerHTML = await Navbar.render();
  await Navbar.afterRender();
  footer.innerHTML = await Footer.render();
  await Footer.afterRender();

  const request = ParseUrl.parseRequestURL();

  const parsedURL = (request.resource ? '/' + request.resource : '/') +
    (request.adults[0] === 'adults' && request.adults[1] ? '?' + request.adults[0] + '=x' : '') +
    (request.children[0] === 'children' && request.children[1] ? '&' + request.children[0] + '=x' : '') +
    (request.checkin[0] === 'checkin' && request.checkin[1] ? '&' + request.checkin[0] + '=in' : '') +
    (request.checkout[0] === 'checkout' && request.checkout[1] ? '&' + request.checkout[0] + '=out' : '') +
    (request.promo[0] === 'promo_code' && request.promo[1] ? '&' + request.promo[0] + '=promo' : '')

  console.log(parsedURL)
  const page = routes[parsedURL] ? routes[parsedURL] : NotFound;
  content.innerHTML = await page.render();
  await page.afterRender();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);