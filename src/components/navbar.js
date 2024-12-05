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
              <div class="user" id="user-profile">
                <img src="../images/profil.webp" alt="User Profile" id="user-avatar">
                <span id="user-name">Loading...</span>
              </div>
            </div>
          </nav>
      </header>
      `;

    // Event listener untuk ikon bel
    const bellIcon = this.querySelector('#notification-bell');
    bellIcon.addEventListener('click', this.showNotificationDetails.bind(this));

    // Event listener untuk profil
    const profileLink = this.querySelector('#user-profile');
    profileLink.addEventListener('click', this.showProfile.bind(this));

    // Panggil fungsi untuk memuat data pengguna
    this.loadUserData();
  }

  // Fungsi untuk menampilkan halaman detail notifikasi
  showNotificationDetails() {
    window.location.hash = '#/notifikasi';
  }

  // Fungsi untuk navigasi ke profil
  showProfile() {
    window.location.hash = '#/profile';
  }

  // Fungsi untuk memuat data pengguna dari API
  async loadUserData() {
    const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
    const authToken = localStorage.getItem('authToken'); // Ambil token dari localStorage

    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }

    try {
      const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`, // Kirim token dalam header Authorization
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const data = await response.json();

      // Perbarui avatar dan nama pengguna
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
