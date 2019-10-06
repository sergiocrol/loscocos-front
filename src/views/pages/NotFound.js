'use strict';

const NotFound = {
  render: async () => {
    const view = `  
      <h1>NotFound</h1>
    `;

    return view;
  },
  afterRender: async () => {

  }
}

export default NotFound;