/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Swal from 'sweetalert2';
import CONFIG from '../globals/config';
import ENDPOINT from '../globals/endpoint';

const createDashboardAdmin = async () => {
  document.body.className = 'admin-page';

  // Create main container
  const containerAdmin = document.createElement('div');
  containerAdmin.className = 'container-admin';

  // Create sidebar
  const sidebarAdmin = document.createElement('aside');
  sidebarAdmin.className = 'sidebar-admin';

  const logoAdmin = document.createElement('div');
  logoAdmin.className = 'logo-admin';
  logoAdmin.textContent = 'ADMIN SIPRAJA';

  const menu = document.createElement('nav');
  menu.className = 'menu';

  const menuSection1 = createMenuSection('Menu', [
    {
      href: '#/dashboard-admin', icon: 'fa-home', text: 'Dashboard', active: true,
    },
    { href: '#/laporan-admin', icon: 'fa-file-alt', text: 'Laporan' },
    { href: '#/arsip-admin', icon: 'fa-archive', text: 'Arsip Laporan' },
  ]);

  const menuSection2 = createMenuSection('Akun', [
    { href: '#/profil-admin', icon: 'fa-user', text: 'Profil' },
    {
      href: '#', icon: 'fa-sign-out-alt', text: 'Keluar', action: logout,
    },
  ]);

  menu.append(menuSection1, menuSection2);
  sidebarAdmin.append(logoAdmin, menu);

  // Create main content
  const contentAdmin = document.createElement('main');
  contentAdmin.className = 'content-admin';

  const headerAdmin = document.createElement('div');
  headerAdmin.className = 'header-admin';
  headerAdmin.innerHTML = `
    <div class="user-info-admin">
      <i class="fas fa-bell bell-icon"></i>
      <span class="user-name"> Admin</span>
    </div>
  `;

  // Add loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  contentAdmin.append(loadingIndicator);

  // Append all to container
  containerAdmin.append(sidebarAdmin, contentAdmin);

  // Append container to body
  document.body.appendChild(containerAdmin);

  // Fetch report data
  const reportData = await fetchReportData();

  // Remove loading indicator
  loadingIndicator.remove();

  const dashboardAdmin = createDashboardSection(reportData);
  contentAdmin.append(headerAdmin, dashboardAdmin);
};

// Helper function to create menu sections
function createMenuSection(title, links) {
  const section = document.createElement('div');
  section.className = 'menu-section-admin';

  const sectionTitle = document.createElement('span');
  sectionTitle.textContent = title;

  const linkElements = links.map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    if (link.active) anchor.className = 'active';
    anchor.innerHTML = `<i class="fas ${link.icon}"></i>${link.text}`;
    if (link.action) anchor.addEventListener('click', link.action);
    return anchor;
  });

  section.append(sectionTitle, ...linkElements);
  return section;
}

// Helper function to create dashboard section
function createDashboardSection(reportData) {
  const section = document.createElement('section');
  section.className = 'dashboard-admin';

  section.innerHTML = `
    <h2>Status Laporan</h2>
    <div class="status-cards-admin">
      ${createCardHTML('Semua', reportData.totalLaporan, 'fa-layer-group', '')}
      ${createCardHTML('Selesai', reportData.selesai, 'fa-check-circle', 'green-card')}
      ${createCardHTML('Diproses', reportData.diproses, 'fa-spinner', 'yellow-card')}
      ${createCardHTML('Belum Diproses', reportData.belumDiproses, 'fa-times-circle', 'gray-card')}
    </div>
    <h2>Waktu Laporan</h2>
    <div class="time-cards-admin">
      ${createCardHTML('Semua', reportData.totalLaporan, 'fa-calendar', '')}
      ${createCardHTML('Hari Ini', reportData.hariIni, 'fa-calendar-day', 'blue-card')}
      ${createCardHTML('Bulan Ini', reportData.bulanIni, 'fa-calendar-alt', 'orange-card')}
      ${createCardHTML('Tahun Ini', reportData.tahunIni, 'fa-calendar-week', 'purple-card')}
    </div>
  `;
  return section;
}

// Helper function to create card HTML
function createCardHTML(title, count, icon, cardClass) {
  return `
    <div class="card-admin ${cardClass}">
      <div class="icon-wrapper-admin">
        <i class="fas ${icon}"></i>
      </div>
      <div class="card-content-admin">
        <p>${title}</p>
        <h3>${count}</h3>
      </div>
    </div>
  `;
}

// Fetch report data from API
const fetchReportData = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('User is not authenticated!');
    return {
      totalLaporan: 0,
      selesai: 0,
      diproses: 0,
      belumDiproses: 0,
      hariIni: 0,
      bulanIni: 0,
      tahunIni: 0,
    };
  }

  try {
    console.log('Fetching data with token:', authToken); // Debug log

    const response = await fetch(ENDPOINT.GETLAPORAN, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    const laporan = data.message || [];

    // Count total reports and categorize them based on their status
    const totalLaporan = laporan.length;
    const selesai = laporan.filter((report) => report.status === 'selesai').length;
    const diproses = laporan.filter((report) => report.status === 'di proses').length;
    const belumDiproses = laporan.filter((report) => report.status === 'belum di proses').length;

    // Date-based categorizations
    const today = new Date();
    const hariIni = laporan.filter((report) => new Date(report.tanggal).toDateString() === today.toDateString()).length;
    const bulanIni = laporan.filter((report) => {
      const reportDate = new Date(report.tanggal);
      return reportDate.getMonth() === today.getMonth() && reportDate.getFullYear() === today.getFullYear();
    }).length;
    const tahunIni = laporan.filter((report) => {
      const reportDate = new Date(report.tanggal);
      return reportDate.getFullYear() === today.getFullYear();
    }).length;

    return {
      totalLaporan,
      selesai,
      diproses,
      belumDiproses,
      hariIni,
      bulanIni,
      tahunIni,
    };
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data laporan:', error);
    return {
      totalLaporan: 0,
      selesai: 0,
      diproses: 0,
      belumDiproses: 0,
      hariIni: 0,
      bulanIni: 0,
      tahunIni: 0,
    };
  }
};

// Logout action
function logout(event) {
  event.preventDefault();

  Swal.fire({
    title: 'Konfirmasi Keluar',
    text: 'Apakah Anda yakin ingin keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Keluar',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Token tidak ditemukan, silakan login ulang.');
        }

        // Kirim permintaan logout ke server
        const response = await fetch('https://backend-sipraja.vercel.app/api/v1/user/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Hapus data dari localStorage
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');

          // Clean up admin-specific styles and scripts
          document.body.className = '';
          document.body.innerHTML = '';

          // Arahkan ke halaman login
          setTimeout(() => {
            window.location.hash = '#/login';
          }, 1000);

          Swal.fire('Berhasil', 'Anda telah berhasil logout.', 'success');
        } else {
          throw new Error(data.message || 'Gagal logout. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Error during logout:', error.message);
        Swal.fire('Error', error.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Dibatalkan', 'Anda tetap login.', 'info');
    }
  });
}

export default createDashboardAdmin;
