/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Swal from 'sweetalert2';
import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';

const createProfilePage = () => {
  // Navbar
  console.log('Current Local Storage (userId):', localStorage.getItem('userId')); // Debugging userId dari localStorage

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
  profileName.textContent = 'Loading...'; 

  profileHeader.appendChild(profileImage);
  profileHeader.appendChild(profileName);

  const profileMenu = document.createElement('ul');
  profileMenu.classList.add('profile-menu');

  const menuItems = [
    { href: '#/profile', icon: 'fas fa-user', label: 'Ubah Profil', action: 'profile' },
    { href: '#/ubah-sandi', icon: 'fas fa-key', label: 'Ubah Kata Sandi', action: 'ubah-sandi' },
    { href: '#', icon: 'fa-solid fa-right-from-bracket', label: 'Keluar', action: 'logout' },
  ];

  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('menu-item');

    const link = document.createElement('a');
    link.href = item.href;
    link.classList.add('menu-link');
    link.dataset.action = item.action; 
    link.innerHTML = `<i class="${item.icon}"></i>${item.label}`;

    listItem.appendChild(link);
    profileMenu.appendChild(listItem);
  });

  profileContainer.appendChild(profileHeader);
  profileContainer.appendChild(profileMenu);

  const profileForm = document.createElement('form');
  profileForm.id = 'profile-form';

  profilePage.append(profileContainer, profileForm);

  document.body.appendChild(profilePage);

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);

  const fetchUserData = async () => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken'); 
  
    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      Swal.fire('Error', 'Token atau User ID tidak ditemukan, silakan login ulang', 'error');
      return;
    }
  
    try {
      const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        profileName.textContent = data.nama || 'Nama tidak tersedia';
        profileImage.src = data.image || '../images/profil.webp';
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Informasi User';
        profileForm.appendChild(formTitle);
        const formFields = [
          { id: 'nama', label: 'Nama', type: 'text', value: data.nama || '-' },
          { id: 'email', label: 'Email', type: 'email', value: data.email || '-' },
          { id: 'telepon', label: 'Nomor Telepon', type: 'tel', value: data.telp || '-' },
        ];
  
        formFields.forEach((field) => {
          const formGroup = document.createElement('div');
          formGroup.classList.add('form-group');
  
          const label = document.createElement('label');
          label.htmlFor = field.id;
          label.textContent = field.label;
  
          const input = document.createElement('input');
          input.type = field.type;
          input.id = field.id;
          input.value = field.value;
          input.readOnly = true;
  
          formGroup.appendChild(label);
          formGroup.appendChild(input);
          profileForm.appendChild(formGroup);
        });
      } else {
        console.error('Failed to fetch profile data:', data.message);
        Swal.fire('Error', data.message || 'Gagal mengambil data profil', 'error');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Swal.fire('Error', 'Gagal mengambil data pengguna', 'error');
    }
  };
  
  fetchUserData();
  
  profileMenu.addEventListener('click', async (event) => {
    const action = event.target.closest('a')?.dataset.action;
    if (!action) return;
  
    event.preventDefault();
  
    if (action === 'profile') {
      window.location.hash = '#/updateprofile';
    } else if (action === 'ubah-sandi') {
      window.location.hash = '#/ubah-sandi';
    } else if (action === 'logout') {
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
              // Arahkan ke halaman login
              window.location.hash = '#/login';
              Swal.fire('Berhasil', 'Anda telah berhasil logout.', 'success');
            } else {
              throw new Error(data.message || 'Gagal logout. Silakan coba lagi.');
            }
          } catch (error) {
            console.error('Error during logout:', error.message);
            Swal.fire('Error', error.message, 'error');
          }
        }
      });
    }
  });
};

export default createProfilePage;
