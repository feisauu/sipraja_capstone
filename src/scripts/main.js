// eslint-disable-next-line import/extensions
import createLaporanPage from './pages/laporan.js';
// eslint-disable-next-line import/extensions
import createDetailLaporanPage from './pages/detail-laporan.js';

// Fungsi routing sederhana
const router = () => {
  const path = window.location.hash; // Ambil hash dari URL
  document.body.innerHTML = ''; // Bersihkan halaman

  if (path === '#detail-laporan') {
    createDetailLaporanPage();
  } else {
    createLaporanPage(); // Default ke halaman laporan
  }
};

// Jalankan router saat pertama kali halaman dimuat
window.addEventListener('load', router);
// Jalankan router setiap kali hash berubah
window.addEventListener('hashchange', router);
