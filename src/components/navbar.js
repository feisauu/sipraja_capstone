/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
          <nav>
            <div class="navbar-left">
              <div class="logo">
                <i class="fas fa-square"></i>
                <span>SIPRAJA</span>
              </div>
            </div>
            <ul class="navbar-menu">
              <li><a href="#/dashboard">Home</a></li>
              <li><a href="#/laporan">Laporan</a></li>
              <li><a href="#/about">About</a></li>
            </ul>
            <div class="navbar-right">
              <i class="fas fa-bell" id="notification-bell"></i>
              <div class="user">
                <img src="../images/profil.webp" alt="User Profile">
                <span>Kim Taehyung</span>
              </div>
            </div>
          </nav>
      </header>
      `;

    // Event listener untuk ikon bel
    const bellIcon = this.querySelector('#notification-bell');
    bellIcon.addEventListener('click', this.showNotificationDetails);
  }

  // Fungsi untuk menampilkan halaman detail notifikasi
  showNotificationDetails() {
    window.location.hash = '#/notifikasi';

    handleHashChange();
  }
}

customElements.define('navbar-component', Navbar);
