/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const createKonfirmasi = () => {
  document.body.className = 'admin-page';

  // Container
  const container = document.createElement('div');
  container.className = 'container-admin';

  // Sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar-admin';

  const logo = document.createElement('div');
  logo.className = 'logo-admin';
  logo.textContent = 'ADMIN SIPRAJA';

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

  sidebar.append(logo, menu);

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

  // Confirmation Section
  const containerConfirmation = document.createElement('div');
  containerConfirmation.className = 'container-confirmation';

  const confirmationLeftSection = document.createElement('div');
  confirmationLeftSection.className = 'confirmation-left-section';
  const confirmationTitle = document.createElement('h1');
  confirmationTitle.textContent = 'Konfirmasi Laporan';

  const formGroup1 = createFormGroup('Status', 'Belum Selesai', 'select');
  const formGroup2 = createFormGroup('Nama Pelapor', 'Kim Taehyung', 'text', true);
  const formGroup3 = createFormGroup('Tanggal Laporan', '29 Oktober 2024', 'text', true);
  const formGroup4 = createFormGroup('Judul Laporan', 'Laporan Jalan Rusak', 'text', true);
  const formGroup5 = createFormGroup('Lokasi', 'Kalasan, Sleman', 'text', true, 'map');
  const formGroup6 = createFormGroup('Kategori Laporan', 'Jalan', 'text', true);
  const formGroup7 = createTextArea('Deskripsi Masalah', 'Lorem ipsum dolor sit amet...');

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

  const photosContainer = document.createElement('div');
  photosContainer.className = 'photos';
  const photos = [
    'https://storage.googleapis.com/a1aa/image/4fIvAY2fCJjJFED7PKfYnaOiEe3EEsht9F55491nEm0xfeo9E.jpg',
    'https://storage.googleapis.com/a1aa/image/PfxFUWDxthX3JaydyspzOtgzWhimZb3gFtZOeaxmBzr23j2TA.jpg',
    'https://storage.googleapis.com/a1aa/image/DQbO7eFkKtyNbC3aKoNlCMrbwebfwzXRRudAgjWtP4t0vHtnA.jpg',
    'https://storage.googleapis.com/a1aa/image/gaHHirDDrU5DEBfzjkKRywOsHQQZEzjvektpUw0gqjO43j2TA.jpg',
  ];

  photos.forEach((src) => {
    const img = document.createElement('img');
    img.alt = 'Supporting photo';
    img.src = src;
    photosContainer.appendChild(img);
  });

  confirmationRightSection.append(continueButton, photosContainer);

  containerConfirmation.append(confirmationLeftSection, confirmationRightSection);

  // Append all sections to the main content
  mainContent.append(headerAdmin, containerConfirmation);

  // Append sidebar and main content to the container
  containerAdmin.append(sidebarAdmin, mainContent);

  // Append the container to the body
  document.body.appendChild(containerAdmin);
};

// Helper function to create form groups
const createFormGroup = (labelText, value, type = 'text', readonly = false, extraClass = '') => {
  const formGroup = document.createElement('div');
  formGroup.className = 'confirmation-form-group';

  const label = document.createElement('label');
  label.textContent = labelText;

  const input = document.createElement(type === 'select' ? 'select' : 'input');
  input.type = type;
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

// Call the function to generate the page
export default createKonfirmasi;
