/* eslint-disable class-methods-use-this */
class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav>
          <div class="navbar-left">
            <div class="logo">
              <span class="logo-icon">S</span>
              <span class="logo-text">SIPRAJA</span>
            </div>
          </div>
          <div class="hamburger-navbar" id="hamburger-navbar">
            <i class="fas fa-bars"></i>
          </div>
          <ul class="navbar-menu" id="navbarMenu">
            <li><a href="#/dashboard">Home</a></li>
            <li><a href="#/laporan">Laporan</a></li>
            <li><a href="#/laporan-user">Laporan Kamu</a></li>
            <li><a href="#/about">About</a></li>
          </ul>
          <div class="navbar-right">
            <i class="fas fa-bell" id="notification-bell"></i>
            <div class="notification-wrap" id="notificationWrap">
              <div class="notification-menu">
                <div class="notification-item">
                  <span class="notif-badge selesai">● Laporan Selesai</span>
                  <span class="notif-time">2 hari yang lalu</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..</p>
                </div>
                <div class="notification-item">
                  <span class="notif-badge diproses">● Laporan Diproses</span>
                  <span class="notif-time">2 hari yang lalu</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..</p>
                </div>
                <div class="notification-item">
                  <span class="notif-badge selesai">● Laporan Selesai</span>
                  <span class="notif-time">2 hari yang lalu</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..</p>
                </div>
                <div class="notif-footer">
                  <a href="#/notifikasi">Lihat semua notifikasi →</a>
                </div>
              </div>
            </div>
            <div class="user" id="user-profile">
              <img src="../images/profil.webp" alt="User Profile" id="user-avatar">
              <span id="user-name">Loading...</span>
              <div class="sub-menu-wrap" id="subMenu">
                <div class="sub-menu">
                  <div class="sub-menu-list">
                    <ul>
                      <li><a href="#/profile"><i class="fas fa-user"></i> Profile</a></li>
                      <li><a href="#/login"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;

    const subMenu = this.querySelector('#subMenu');
    const userProfile = this.querySelector('#user-profile');

    // Event listener untuk toggle menu
    userProfile.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah perilaku default (jika ada)
      subMenu.classList.toggle('open-menu');
    });

    // Event listener untuk navigasi pada menu
    const menuItems = subMenu.querySelectorAll('a');
    menuItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        const { target } = event;
        const href = target.getAttribute('href');
        if (href) {
          window.location.hash = href; // Navigasi ke halaman yang sesuai
          subMenu.classList.remove('open-menu'); // Menutup menu setelah klik
        }
      });
    });

    const bellIcon = this.querySelector('#notification-bell');
    const notificationWrap = this.querySelector('#notificationWrap');

    // Event listener untuk toggle notifikasi
    bellIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      notificationWrap.classList.toggle('open-menu');
    });

    // Menutup dropdown notif saat klik di luar
    document.addEventListener('click', (event) => {
      if (
        !notificationWrap.contains(event.target)
        && !bellIcon.contains(event.target)
      ) {
        notificationWrap.classList.remove('open-menu');
      }
    });

    // Menutup submenu user saat klik di luar
    document.addEventListener('click', (event) => {
      if (
        !subMenu.contains(event.target)
        && !userProfile.contains(event.target)
      ) {
        subMenu.classList.remove('open-menu');
      }
    });

    // Event listener untuk hamburger button
    const hamburgerButton = this.querySelector('#hamburger-navbar');
    const navbarMenu = this.querySelector('#navbarMenu');
    hamburgerButton.addEventListener('click', () => {
      navbarMenu.classList.toggle('open-menu');
    });

    this.loadUserData();
  }

  showNotificationDetails() {
    window.location.hash = '#/notifikasi';
  }

  async loadUserData() {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }

    try {
      const response = await fetch(
        `https://backend-sipraja.vercel.app/api/v1/user/${userId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const data = await response.json();

      const userAvatar = this.querySelector('#user-avatar');
      const userName = this.querySelector('#user-name');

      userAvatar.src = data.image || '../images/profil.webp';
      userName.textContent = data.nama || 'Nama tidak tersedia';
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}

customElements.define('navbar-component', Navbar);
