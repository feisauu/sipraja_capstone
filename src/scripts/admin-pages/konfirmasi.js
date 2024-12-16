/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import Swal from 'sweetalert2';

const createKonfirmasi = async (id) => {
  if (!id) {
    Swal.fire('Error', 'ID is required to fetch the data', 'error');
    return;
  }

  // Clear existing content (if any)
  const existingContainer = document.querySelector('.container-admin');
  if (existingContainer) {
    existingContainer.remove();
  }

  // Check if Konfirmasi already exists
  const existingConfirmationContainer = document.querySelector('.container-confirmation');
  if (existingConfirmationContainer) {
    existingConfirmationContainer.remove();
  }

  document.body.className = 'admin-page';

  // Create container
  const containerAdmin = document.createElement('div');
  containerAdmin.className = 'container-admin';

  // Sidebar
  const sidebarAdmin = document.createElement('aside');
  sidebarAdmin.className = 'sidebar-admin';

  const logoAdmin = document.createElement('div');
  logoAdmin.className = 'logo-admin';
  logoAdmin.textContent = 'ADMIN SIPRAJA';

  const menu = document.createElement('nav');
  menu.className = 'menu';

  menu.innerHTML = `
    <div class="menu-section-admin">
        <span>Menu</span>
        <a href="#/dashboard-admin" class="${window.location.hash === '#/dashboard-admin' ? 'active' : ''}">
          <i class="fas fa-home"></i>Dashboard
        </a>
        <a href="#/laporan-admin" class="${window.location.hash === '#/laporan-admin' ? 'active' : ''}">
          <i class="fas fa-file-alt"></i>Laporan
        </a>
        <a href="#/arsip-admin" class="${window.location.hash === '#/arsip-admin' ? 'active' : ''}">
          <i class="fas fa-archive"></i>Arsip Laporan
        </a>
      </div>
      <div class="menu-section-admin">
        <span>Akun</span>
        <a href="#/profil-admin" class="${window.location.hash === '#/profil-admin' ? 'active' : ''}">
          <i class="fas fa-user"></i>Profil
        </a>
        <a href="#" id="logoutLink">
          <i class="fas fa-sign-out-alt"></i>Keluar
        </a>
      </div>
  `;

  sidebarAdmin.append(logoAdmin, menu);

  // Main Content
  const mainContent = document.createElement('main');
  mainContent.className = 'content-admin';

  const headerAdmin = document.createElement('div');
  headerAdmin.className = 'header-admin';
  const userInfoAdmin = document.createElement('div');
  userInfoAdmin.className = 'user-info-admin';
  const bellIcon = document.createElement('i');
  bellIcon.className = 'fas fa-bell bell-icon';
  const userName = document.createElement('span');
  userName.className = 'user-name';
  userName.textContent = 'Admin';
  userInfoAdmin.append(bellIcon, userName);
  headerAdmin.append(userInfoAdmin);

  // Show loading indicator
  const loading = document.createElement('div');
  loading.className = 'loading-indicator';
  loading.textContent = 'Loading...';
  mainContent.append(loading);

  containerAdmin.append(sidebarAdmin, mainContent);
  document.body.appendChild(containerAdmin);

  // Add the event listener for logout
  document.getElementById('logoutLink').addEventListener('click', async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken'); // Mendapatkan token dari localStorage

    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('https://backend-sipraja.vercel.app/api/v1/user/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Gagal logout, silakan coba lagi.');
          }

          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');

          Swal.fire({
            title: 'Berhasil Logout',
            text: 'Anda telah keluar dari aplikasi.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            // Clean up admin-specific styles and scripts
            document.body.className = '';
            document.body.innerHTML = '';
            // Redirect to the login page
            window.location.hash = '#/login';
          }, 2000);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  });

  // Fetch Data from API
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    Swal.fire('Error', 'Token not found or expired. Please log in again.', 'error');
    return;
  }

  try {
    const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    console.log(data); // Log data to check the structure

    if (response.ok) {
      // Check and access the nested 'laporan' object
      const laporan = data.laporan;
      if (!laporan) {
        throw new Error('Laporan tidak ditemukan.');
      }

      // Remove loading indicator
      loading.remove();

      // Generate and append report details using the fetched data
      const containerConfirmation = document.createElement('div');
      containerConfirmation.className = 'container-confirmation';

      const confirmationLeftSection = document.createElement('div');
      confirmationLeftSection.className = 'confirmation-left-section';
      const confirmationTitle = document.createElement('h1');
      confirmationTitle.textContent = 'Konfirmasi Laporan';

      // Form generation from API data
      confirmationLeftSection.append(
        confirmationTitle,
        createFormGroup('Status', laporan.status || 'Tidak tersedia', 'text', true),
        createFormGroup('Nama Pelapor', laporan.nama || 'Tidak tersedia', 'text', true),
        createFormGroup('Tanggal Laporan', laporan.tanggal || 'Tidak tersedia', 'text', true),
        createFormGroup('Judul Laporan', laporan.judul || 'Tidak tersedia', 'text', true),
        createFormGroup('Lokasi', laporan.lokasi || 'Tidak tersedia', 'text', true),
        createFormGroup('Kategori Laporan', laporan.kategori || 'Tidak tersedia', 'text', true),
        createTextArea('Deskripsi Masalah', laporan.description || 'Tidak tersedia'),
      );

      const confirmationRightSection = document.createElement('div');
      confirmationRightSection.className = 'confirmation-right-section';

      const continueButton = document.createElement('a');
      continueButton.className = 'confirmation-btn';
      continueButton.href = '#';
      continueButton.innerHTML = '<i class="fas fa-paper-plane"></i> Teruskan ke Instansi';

      document.body.appendChild(continueButton);

      continueButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Show SweetAlert
        Swal.fire({
          title: 'Berhasil!',
          text: 'Laporan berhasil dikirimkan ke instansi.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });

      // Handling supporting images (if any)
      if (Array.isArray(laporan.gambar_pendukung) && laporan.gambar_pendukung.length > 0) {
        const photosContainer = document.createElement('div');
        photosContainer.className = 'photos';
        laporan.gambar_pendukung.forEach((src) => {
          const img = document.createElement('img');
          img.alt = 'Supporting photo';
          img.src = src;
          photosContainer.appendChild(img);
        });
        confirmationRightSection.append(continueButton, photosContainer);
      } else {
        const noPhotosMessage = document.createElement('p');
        noPhotosMessage.textContent = 'Tidak ada foto yang tersedia.';
        confirmationRightSection.append(continueButton, noPhotosMessage);
      }

      containerConfirmation.append(confirmationLeftSection, confirmationRightSection);
      mainContent.append(containerConfirmation);
    } else {
      throw new Error(data.message || 'Gagal mengambil data laporan.');
    }
  } catch (error) {
    loading.remove();
    Swal.fire('Error', error.message, 'error');
  }
};

// Helper function to create form groups
const createFormGroup = (labelText, value, type = 'text', readonly = false, extraClass = '') => {
  const formGroup = document.createElement('div');
  formGroup.className = 'confirmation-form-group';

  const label = document.createElement('label');
  label.textContent = labelText;

  const input = document.createElement(type === 'select' ? 'select' : 'input');
  if (type !== 'select') {
    input.type = type;
  }

  if (readonly) input.setAttribute('readonly', 'readonly');
  if (extraClass) input.className = extraClass;
  input.value = value;

  if (type === 'select') {
    const option = document.createElement('option');
    option.textContent = value;
    input.appendChild(option);
  }

  formGroup.append(label, input);
  return formGroup;
};

// Helper function to create textarea
const createTextArea = (labelText, value) => {
  const formGroup = document.createElement('div');
  formGroup.className = 'confirmation-form-group';

  const label = document.createElement('label');
  label.textContent = labelText;

  const textarea = document.createElement('textarea');
  textarea.rows = 5;
  textarea.readOnly = true;
  textarea.textContent = value;

  formGroup.append(label, textarea);
  return formGroup;
};

export default createKonfirmasi;
