'use strict';

import SearchEngine from '../../views/components/SearchEngine.js';

const Promo = {
  render: async () => {
    const searchBox = await SearchEngine.render();
    const view = `  
      ${searchBox}
      <p>Promo</p>
    `;

    return view;
  },
  afterRender: async () => {
    await SearchEngine.afterRender();
  }
}

export default Promo;