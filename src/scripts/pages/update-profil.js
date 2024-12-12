import '../../components/navbar.js';
import '../../components/footer.js';
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const renderUpdatePage = async () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('authToken');

  if (!userId || !authToken) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'ID pengguna atau token tidak ditemukan. Silakan login ulang.',
    });
    return;
  }

  console.log('User ID:', userId);

  const mainContent = document.createElement('main');
  mainContent.className = 'update-profile-wrapper';
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';
  loadingContainer.innerHTML = `
    <div class="loading">
      <p>Loading data profil...</p>
    </div>
  `;
  mainContent.appendChild(loadingContainer);
  document.body.appendChild(mainContent);

  try {
    const response = await fetch(`${ENDPOINT.GETPROFIL}/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data pengguna tidak ditemukan.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengambil data profil.');
    }

    const profileData = await response.json();
    loadingContainer.remove();

    mainContent.innerHTML = `
      <section class="update-profile-container">
        <form id="update-profile-form" enctype="multipart/form-data" class="update-profile-form">
          <h1 class="update-profile-title">Update Profil</h1>
          <div class="update-profile-group">
            <label for="name">Nama</label>
            <input type="text" id="name" value="${profileData.nama || ''}" required>
          </div>
          <div class="update-profile-group">
            <label for="email">Email</label>
            <input type="email" id="email" value="${profileData.email || ''}" required>
          </div>
          <div class="update-profile-group">
            <label for="phone">Nomor Telepon</label>
            <input type="tel" id="phone" value="${profileData.telp || ''}" required>
          </div>
          <div class="update-profile-group">
            <label for="image" class="update-profile-label">Upload Foto Profil</label>
            <div class="image-preview">
              <img id="image-preview" src="${profileData.image || '../images/default-avatar.png'}" alt="Preview Foto" />
              <label for="image">Pilih Gambar</label>
              <input type="file" id="image" accept="image/*" />
            </div>
          </div>
          <button type="submit" class="update-profile-button">Update</button>
        </form>
      </section>
    `;

    document.getElementById('image').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const preview = document.getElementById('image-preview');
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    const updateForm = document.getElementById('update-profile-form');
    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('nama', document.getElementById('name').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('telp', document.getElementById('phone').value);
      const image = document.getElementById('image').files[0];
      if (image) formData.append('image', image);

      try {
        const response = await fetch(`${ENDPOINT.UPDATEPROFIL}/${userId}`, {
          method: 'PUT',
          body: formData,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal memperbarui profil.');
        }

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Profil berhasil diperbarui!',
        }).then(() => {
          window.location.hash = '#/profile';
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: error.message,
        });
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    loadingContainer.remove();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
    });
  }

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default renderUpdatePage;
