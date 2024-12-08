/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import '../components/hamburger-button.js';
import '../components/navbar';
import '../components/hero-section.js';
import '../components/footer.js';
import '../components/header.js';
import '../styles/style.css';
import renderLoginPage from './pages/login.js';
import renderRegisterPage from './pages/register.js';
import createDashboard from './pages/dashboard.js';
import createDashboardAdmin from './admin-pages/dashboard-admin.js';
import createLaporanAdmin from './admin-pages/laporan-admin.js';
import createArsipAdmin from './admin-pages/arsip-admin.js';
import createProfilAdmin from './admin-pages/profil-admin.js';
import createKonfirmasi from './admin-pages/konfirmasi.js';
import createLaporanPage from './pages/laporan.js';
import createAboutPage from './pages/about.js';
import createNotificationPage from './pages/detail-notif.js';
import createProfilePage from './pages/profile.js';
import createChangePasswordPage from './pages/ubah-sandi.js';

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const authButtons = document.querySelector('.auth-buttons');

  // Toggle 'active' class on click
  hamburger.addEventListener('click', () => {
    authButtons.classList.toggle('active');
  });
});

// Tambahkan event listener untuk tombol login
document.getElementById('loginButton').addEventListener('click', () => {
  renderLoginPage();
});

// Tambahkan event listener untuk tombol register
document.getElementById('signupButton').addEventListener('click', () => {
  renderRegisterPage();
});

document.body.addEventListener('click', (event) => {
  if (event.target && event.target.id === 'register-link') {
    event.preventDefault(); // Hindari reload halaman
    renderRegisterPage(); // Render halaman login
  }
});

document.body.addEventListener('click', (event) => {
  if (event.target && event.target.id === 'login-link') {
    event.preventDefault(); // Hindari reload halaman
    renderLoginPage(); // Render halaman login
  }
});

// Tunggu hingga halaman sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Jika tidak ada hash, arahkan ke halaman utama
  if (!window.location.hash || window.location.hash === '#/') {
    window.location.hash = '#/'; // Arahkan ke halaman utama
    renderHomePage(); // Render halaman utama
  } else {
    handleHashChange(); // Jalankan fungsi untuk menangani hash saat ini
  }

  // Pasang event listener untuk mendeteksi perubahan hash
  window.addEventListener('hashchange', handleHashChange);
});

// Fungsi untuk menangani perubahan hash
function handleHashChange() {
  const currentHash = window.location.hash;

  // Bersihkan konten sebelumnya
  document.body.innerHTML = '';

  // Menangani berbagai halaman berdasarkan hash
  if (currentHash === '#/login') {
    renderLoginPage();
  } else if (currentHash === '#/register') {
    renderRegisterPage();
  } else if (currentHash === '#/dashboard') {
    createDashboard();
  } else if (currentHash === '#/dashboard-admin') {
    createDashboardAdmin();
  } else if (currentHash === '#/laporan-admin') {
    createLaporanAdmin();
  } else if (currentHash === '#/konfirmasi') {
    createKonfirmasi();
  } else if (currentHash === '#/arsip-admin') {
    createArsipAdmin();
  } else if (currentHash === '#/profil-admin') {
    createProfilAdmin();
  } else if (currentHash === '#/about') {
    createAboutPage();
  } else if (currentHash === '#/laporan') {
    createLaporanPage();
  } else if (currentHash === '#/notifikasi') {
    createNotificationPage();
  } else if (currentHash === '#/profile') {
    createProfilePage();
  } else if (currentHash === '#/ubah-sandi') {
  // Pastikan halaman ubah kata sandi di-render dengan benar
    createChangePasswordPage();
  } else {
    renderHomePage();
  }
}

function renderHomePage() {
  fetch('index.html') // Memuat file index.html
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
    })
    .catch((error) => console.error('Error loading index.html:', error));
}

window.addEventListener('hashchange', handleHashChange);

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/konfirmasi') {
    // Tampilkan halaman konfirmasi
    createKonfirmasi(); // Fungsi untuk merender halaman konfirmasi
  }
window.addEventListener('hashchange', handleHashChange);
