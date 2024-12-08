/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const createKonfirmasi = async () => {
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
      <a href="#/dashboard-admin" class="active"><i class="fas fa-home"></i>Dashboard</a>
      <a href="#/laporan-admin"><i class="fas fa-file-alt"></i>Laporan</a>
      <a href="#/arsip-admin"><i class="fas fa-archive"></i>Arsip Laporan</a>
    </div>
    <div class="menu-section-admin">
      <span>Akun</span>
      <a href="#/profil-admin"><i class="fas fa-user"></i>Profil</a>
      <a href="#"><i class="fas fa-sign-out-alt"></i>Keluar</a>
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
  loading.textContent = 'Loading... Please wait.';
  mainContent.append(loading);

  // Fetch Data from API
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    Swal.fire('Error', 'Token not found or expired. Please log in again.', 'error');
    return;
  }

  try {
    const response = await fetch(`${ENDPOINT.GETLAPORAN}`, {
      method: 'GET',
      credentials: 'include', // Kirim cookie lintas domain
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Remove loading indicator
      loading.remove();

      // Check if Konfirmasi already exists to avoid duplication
      const existingConfirmationContainer = document.querySelector('.container-confirmation');
      if (!existingConfirmationContainer) {
        // Generate and append report details
        const containerConfirmation = document.createElement('div');
        containerConfirmation.className = 'container-confirmation';

        const confirmationLeftSection = document.createElement('div');
        confirmationLeftSection.className = 'confirmation-left-section';
        const confirmationTitle = document.createElement('h1');
        confirmationTitle.textContent = 'Konfirmasi Laporan';

        // Create Form Groups using API data
        const formGroup1 = createFormGroup('Status', data.status, 'select');
        const formGroup2 = createFormGroup('Nama Pelapor', data.nama, 'text', true);
        const formGroup3 = createFormGroup('Tanggal Laporan', data.tanggal, 'text', true);
        const formGroup4 = createFormGroup('Judul Laporan', data.judul, 'text', true);
        const formGroup5 = createFormGroup('Lokasi', data.lokasi, 'text', true, 'map');
        const formGroup6 = createFormGroup('Kategori Laporan', data.kategori, 'text', true);
        const formGroup7 = createTextArea('Deskripsi Masalah', data.deskripsi);

        confirmationLeftSection.append(
          confirmationTitle,
          formGroup1,
          formGroup2,
          formGroup3,
          formGroup4,
          formGroup5,
          formGroup6,
          formGroup7,
        );

        const confirmationRightSection = document.createElement('div');
        confirmationRightSection.className = 'confirmation-right-section';

        const continueButton = document.createElement('a');
        continueButton.className = 'confirmation-btn';
        continueButton.href = '#';
        continueButton.innerHTML = '<i class="fas fa-paper-plane"></i> Teruskan ke Instansi';

        // Check if gambar_pendukung exists and is an array before looping
        if (Array.isArray(data.gambar_pendukung) && data.gambar_pendukung.length > 0) {
          const photosContainer = document.createElement('div');
          photosContainer.className = 'photos';
          data.gambar_pendukung.forEach((src) => {
            const img = document.createElement('img');
            img.alt = 'Supporting photo';
            img.src = src;
            photosContainer.appendChild(img);
          });

          confirmationRightSection.append(continueButton, photosContainer);
        } else {
          // If no images, display a message
          const noPhotosMessage = document.createElement('p');
          noPhotosMessage.textContent = 'Tidak ada foto yang tersedia.';
          confirmationRightSection.append(continueButton, noPhotosMessage);
        }

        containerConfirmation.append(confirmationLeftSection, confirmationRightSection);

        mainContent.append(headerAdmin, containerConfirmation);

        containerAdmin.append(sidebarAdmin, mainContent);
        document.body.appendChild(containerAdmin);
      }
    } else {
      throw new Error(data.message || 'Gagal mengambil data laporan.');
    }
  } catch (error) {
    // Remove loading indicator
    loading.remove();
    console.error('Error fetching data:', error.message);
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

// Export function
export default createKonfirmasi;
