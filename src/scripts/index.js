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
import renderForgetPasswordPage from './pages/forget.js';
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
import renderUpdatePage from './pages/update-profil.js';
import createDetailnyaPage from './pages/detailnya.js';
import createEditLaporanPage from './pages/edit-laporan.js';
import createDetailLaporanPage from './pages/detail-laporan.js';

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const authButtons = document.querySelector('.auth-buttons');

  if (hamburger && authButtons) {
    hamburger.addEventListener('click', () => {
      authButtons.classList.toggle('active');
    });
  }
  if (!window.location.hash || window.location.hash === '#/') {
    window.location.hash = '#/'; 
    renderHomePage();
  } else {
    handleHashChange();
  }

  window.addEventListener('hashchange', handleHashChange);

  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      renderLoginPage();
    });
  }

  const signupButton = document.getElementById('signupButton');
  if (signupButton) {
    signupButton.addEventListener('click', () => {
      renderRegisterPage();
    });
  }

  document.body.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'register-link') {
      event.preventDefault();
      renderRegisterPage();
    }

    if (event.target && event.target.id === 'login-link') {
      event.preventDefault();
      renderLoginPage(); 
    }
  });
});

const getLaporanIdFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  return params.get('id'); 
};

function handleHashChange() {
  const currentHash = window.location.hash;

  document.body.innerHTML = '';

  if (currentHash === '#/login') {
    renderLoginPage();
  } else if (currentHash === '#/register') {
    renderRegisterPage();
  } else if (currentHash === '#/forget') {
    renderForgetPasswordPage();
  } else if (currentHash.startsWith('#/konfirmasi')) {
    const id = currentHash.split('/').pop();
    if (id) {
      createKonfirmasi(id);
    } else {
      Swal.fire('Error', 'ID not found in the URL', 'error');
    }
  } else if (currentHash === '#/dashboard') {
    createDashboard();
  } else if (currentHash === '#/create-laporan') {
    createDetailLaporanPage();
  } else if (currentHash === '#/dashboard-admin') {
    createDashboardAdmin();
  } else if (currentHash === '#/laporan-admin') {
    createLaporanAdmin();
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
  } else if (currentHash.startsWith('#/detailnya')) {
    const laporanId = getLaporanIdFromUrl();
    if (laporanId) {
      createDetailnyaPage(laporanId); 
    } else {
      document.body.innerHTML = '<p>Error: ID laporan tidak ditemukan di URL.</p>';
    }
  }else if (currentHash.startsWith('#/edit-laporan')) {
    const laporanId = getLaporanIdFromUrl();
    if (laporanId && laporanId.trim() !== '') { 
      createEditLaporanPage(laporanId); 
    } else {
      document.body.innerHTML = '<p>Error: ID laporan tidak valid atau tidak ditemukan di URL.</p>';
    }
  } else if (currentHash === '#/updateprofile') {
    renderUpdatePage();
  } else {
    document.body.innerHTML = '<p>Error 404: Halaman tidak ditemukan.</p>';
  }
}

function renderHomePage() {
  fetch('index.html')
    .then((response) => {
      if (!response.ok) throw new Error('Gagal memuat halaman utama.');
      return response.text();
    })
    .then((html) => {
      document.body.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error loading index.html:', error);
      document.body.innerHTML = '<p>Error: Tidak dapat memuat halaman utama.</p>';
    });
}

window.addEventListener('hashchange', handleHashChange);
