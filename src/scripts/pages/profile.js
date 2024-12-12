/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Swal from 'sweetalert2';
import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';

const createChangePasswordPage = () => {
// Navbar
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Section Page
  const profileSection = document.createElement('section-page');
  profileSection.setAttribute('title', 'Profile');
  document.body.appendChild(profileSection);

  // Profile Page
  const profilePage = document.createElement('div');
  profilePage.classList.add('profile-page');

  // Profile Container
  const profileContainer = document.createElement('div');
  profileContainer.classList.add('profile-container');
  
  // Profile Header
  const profileHeader = document.createElement('div');
  profileHeader.classList.add('profile-header');

  const profileImage = document.createElement('img');
  profileImage.src = '../images/profil.webp';
  profileImage.alt = 'Profile Picture';
  profileImage.classList.add('profile-picture');

  const profileName = document.createElement('h2');
  profileName.classList.add('profile-name');
  profileName.textContent = 'Kim Taehyung';

  profileHeader.appendChild(profileImage);
  profileHeader.appendChild(profileName);

  // Profile Menu
  const profileMenu = document.createElement('ul');
  profileMenu.classList.add('profile-menu');

  const menuItems = [
    { href: '#/profile', icon: 'fas fa-user', label: 'Profil', action: 'profile' },
    { href: '#/ubah-sandi', icon: 'fas fa-key', label: 'Ubah Kata Sandi', action: 'ubah-sandi' },
    { href: '#', icon: 'fa-solid fa-right-from-bracket', label: 'Keluar', action: 'logout' },
  ];
  
  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('menu-item');
  
    const link = document.createElement('a');
    link.href = item.href;
    link.classList.add('menu-link');
    link.dataset.action = item.action; // Tambahkan dataset.action
    link.innerHTML = `<i class="${item.icon}"></i>${item.label}`;
  
    listItem.appendChild(link);
    profileMenu.appendChild(listItem);
  });  

  profileContainer.appendChild(profileHeader);
  profileContainer.appendChild(profileMenu);

  // Profile Form
  const profileForm = document.createElement('form');
  profileForm.id = 'profile-form';

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Ubah Kata Sandi';
  profileForm.appendChild(formTitle);

  const formFields = [
    { label: 'Kata Sandi Sekarang', type: 'password', icon: 'fas fa-lock', placeholder: 'Masukkan kata sandi sekarang' },
    { label: 'Kata Sandi Baru', type: 'password', icon: 'fas fa-lock', placeholder: 'Masukkan kata sandi baru' },
    { label: 'Ulangi Kata Sandi Baru', type: 'password', icon: 'fas fa-lock', placeholder: 'Masukkan ulang kata sandi baru' },
  ];

  formFields.forEach((field) => {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const label = document.createElement('label');
    label.htmlFor = field.id;
    label.textContent = field.label;

    const inputIcon = document.createElement('div');
    inputIcon.classList.add('input-icon');

    const icon = document.createElement('i');
    icon.className = field.icon;

    const input = document.createElement('input');
    input.type = field.type;
    input.placeholder = field.placeholder; // Hanya menggunakan placeholder
    input.value = ''; // Pastikan value kosong
    input.required = true;

    inputIcon.appendChild(icon);
    inputIcon.appendChild(input);
    formGroup.appendChild(label);
    formGroup.appendChild(inputIcon);
    profileForm.appendChild(formGroup);
  });

  const saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.classList.add('btn', 'primary');
  saveButton.textContent = 'Simpan Perubahan';
  profileForm.appendChild(saveButton);

  // Gabungkan semua elemen ke dalam profile-page
  profilePage.append(profileContainer, profileForm);

  // Tambahkan elemen profile-page ke dalam DOM
  document.body.appendChild(profilePage);

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);

  // Event Listener untuk navigasi menu
  profileMenu.addEventListener('click', (event) => {
    const action = event.target.closest('a')?.dataset.action; // Dapatkan data-action
    if (!action) return;

    event.preventDefault(); // Hindari reload halaman

    if (action === 'profile') {
      window.location.hash = '#/profile'; // Tetap di halaman profil
    } else if (action === 'ubah-sandi') {
      window.location.hash = '#/ubah-sandi'; // Navigasi ke halaman ubah kata sandi
    } else if (action === 'logout') {
      // Tampilkan SweetAlert
      Swal.fire({
        title: 'Konfirmasi Keluar',
        text: 'Apakah Anda yakin ingin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.hash = '#/login'; // Arahkan ke halaman login
        }
      });
    }
  });
};

export default createChangePasswordPage;
