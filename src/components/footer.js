/* eslint-disable quotes */
class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <!-- Bagian Kiri -->
          <div class="footer-left">
            <div class="footer-logo">
              <span class="logo-icon">S</span>
              <span class="logo-text">SIPRAJA</span>
            </div>
            <p>Platform pelaporan kerusakan fasilitas umum yang ada di Kota Yogyakarta</p>
            <small>Sistem Pelaporan Kerusakan Jogjakarta</small>
          </div>
          
          <!-- Bagian Tengah -->
          <div class="footer-center">
            <h4>Information</h4>
            <ul>
              <li><a href="#/about">About Us</a></li>
              <li><a href="#/about">Contact Us</a></li>
            </ul>
          </div>
          
          <!-- Bagian Kanan -->
          <div class="footer-right">
            <h4>Information</h4>
            <ul>
              <li><i class="fas fa-map-marker-alt"></i> Klaten, Yogyakarta, Indonesia</li>
              <li><i class="fas fa-envelope"></i> contactsipraja@gmail.com</li>
              <li><i class="fas fa-phone"></i> (001) 2341 2342</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© All Rights Reserved</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
