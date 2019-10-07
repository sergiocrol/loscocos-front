'use strict';

const NotFound = {
  render: async () => {
    const view = `  
      <h1>404 - Not Found :(</h1>
    `;

    return view;
  },
  afterRender: async () => {

  }
}

export default NotFound;