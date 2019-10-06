'use strict';

const Navbar = {
  render: async () => {
    const view = `
      <nav class="navbar navbar-fixed-top text-center">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand visible-xs-block" href="index.html">
                    <img src="images/cocos/logo_mobile.png" alt="LosCocos" height="36">
                </a>
            </div>

            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Rooms</a></li>
                    <li><a href="#">Restaurant</a></li>

                    <li class="hidden-xs">
                        <a href="index.html">
                            <img src="images/cocos/logo.png" alt="LosCocos" height="36">
                        </a>
                    </li>

                    <li><a href="#">Weddings</a></li>
                    <li><a href="#">Membership</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </div>
      </nav>
    `;
    return view;
  },
  afterRender: async () => { }
}

export default Navbar;