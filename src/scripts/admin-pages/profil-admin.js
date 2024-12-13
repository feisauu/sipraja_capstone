/* eslint-disable no-undef */
import Swal from 'sweetalert2';

const createProfilAdmin = () => {
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

  // Membuat menu sidebar
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

  sidebar.append(logo, menu);
  document.body.appendChild(sidebar);

  // Menambahkan event listener untuk hashchange
  window.addEventListener('hashchange', () => {
  // Ambil semua tautan di menu
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach((link) => {
    // Hapus kelas 'active' dari semua tautan
      link.classList.remove('active');

      // Tambahkan kelas 'active' pada tautan yang sesuai dengan hash URL saat ini
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
      }
    });
  });

  // Event listener untuk logout
  document.getElementById('logoutLink').addEventListener('click', async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem('authToken');

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

  // Create content-admin
  const contentAdmin = document.createElement('main');
  contentAdmin.classList.add('content-admin');
  container.appendChild(contentAdmin); // Append contentAdmin to container

  // Create header-admin
  const headerAdmin = document.createElement('div');
  headerAdmin.classList.add('header-admin');
  contentAdmin.appendChild(headerAdmin);

  const userInfoAdmin = document.createElement('div');
  userInfoAdmin.classList.add('user-info-admin');
  headerAdmin.appendChild(userInfoAdmin);

  const bellIcon = document.createElement('i');
  bellIcon.classList.add('fas', 'fa-bell', 'bell-icon');
  userInfoAdmin.appendChild(bellIcon);

  const userName = document.createElement('span');
  userName.classList.add('user-name');
  userName.textContent = 'Admin';
  userInfoAdmin.appendChild(userName);

  // Profile Page Section
  const profileTitle = document.createElement('h2');
  profileTitle.classList.add('h2');
  profileTitle.textContent = 'Profil';
  contentAdmin.appendChild(profileTitle);

  const profilePageAdmin = document.createElement('div');
  profilePageAdmin.classList.add('profile-page-admin');
  contentAdmin.appendChild(profilePageAdmin);

  const profileContainerAdmin = document.createElement('div');
  profileContainerAdmin.classList.add('profile-container-admin');
  profilePageAdmin.appendChild(profileContainerAdmin);

  const profileHeaderAdmin = document.createElement('div');
  profileHeaderAdmin.classList.add('profile-header-admin');
  profileContainerAdmin.appendChild(profileHeaderAdmin);

  const profilePictureAdmin = document.createElement('img');
  profilePictureAdmin.src = '../images/profil.webp';
  profilePictureAdmin.alt = 'Profile Picture';
  profilePictureAdmin.classList.add('profile-picture-admin');
  profileHeaderAdmin.appendChild(profilePictureAdmin);

  const profileNameAdmin = document.createElement('h2');
  profileNameAdmin.classList.add('profile-name-admin');
  profileNameAdmin.textContent = 'Admin';
  profileHeaderAdmin.appendChild(profileNameAdmin);

  // Profile Form
  const profileFormAdmin = document.createElement('form');
  profileFormAdmin.id = 'profile-form-admin';
  profilePageAdmin.appendChild(profileFormAdmin);

  const formTitle = document.createElement('h3');
  formTitle.textContent = 'Edit Profil';
  profileFormAdmin.appendChild(formTitle);

  const formGroup1 = document.createElement('div');
  formGroup1.classList.add('form-group-admin');
  profileFormAdmin.appendChild(formGroup1);

  const label1 = document.createElement('label');
  label1.setAttribute('for', 'nama');
  label1.textContent = 'Nama';
  formGroup1.appendChild(label1);

  const input1 = document.createElement('input');
  input1.type = 'text';
  input1.id = 'nama';
  input1.value = 'Admin';
  input1.required = true;
  formGroup1.appendChild(input1);

  const formGroup2 = document.createElement('div');
  formGroup2.classList.add('form-group-admin');
  profileFormAdmin.appendChild(formGroup2);

  const label2 = document.createElement('label');
  label2.setAttribute('for', 'telepon');
  label2.textContent = 'Kata Sandi';
  formGroup2.appendChild(label2);

  const input2 = document.createElement('input');
  input2.type = 'tel';
  input2.id = 'telepon';
  input2.value = '******';
  input2.required = true;
  formGroup2.appendChild(input2);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'primary-admin');
  submitButton.textContent = 'Simpan Perubahan';
  profileFormAdmin.appendChild(submitButton);

  // Append container to the body
  document.body.appendChild(container);
};

export default createProfilAdmin;
