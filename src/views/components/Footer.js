'use strict';

const Footer = {
  render: async () => {
    const view = `  
      <footer class="footer">
        <span class="ico ico-logo"></span>
        <span class="ico ico-social"></span>
        <div class="text-left col-left">
            <ul class="inline-block">
                <li>
                    <a href="#">Terms & Conditions</a>
                </li>
                <li>
                    <a href="#">Privacy Policy</a>
                </li>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Partners</a>
                </li>
            </ul>
        </div>
        <div class="text-right col-right">
            <ul class="inline-block">
                <li class="link">
                    <a href="#">reservations@loscocosbungalows.com</a>
                </li>
                <li class="link">
                    <a href="#">Tlf: +34 987 675 432</a>
                </li>
            </ul>
        </div>
      </footer>
    `;

    return view;
  },
  afterRender: async () => { }
}

export default Footer;