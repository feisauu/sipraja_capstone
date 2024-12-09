import '../../components/navbar.js';
import '../../components/footer.js';
import ENDPOINT from '../globals/endpoint';

const renderUpdatePage = () => {
  // Pastikan navbar ada sebelum konten utama
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Ambil userId dari localStorage
  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('ID pengguna tidak ditemukan. Pastikan Anda sudah login.');
    return;
  }

  // Buat elemen wrapper untuk konten halaman
  const mainContent = document.createElement('main');
  mainContent.className = 'update-profile-wrapper';
  mainContent.innerHTML = `
    <section class="update-profile-container">
      <form id="update-profile-form" enctype="multipart/form-data" class="update-profile-form">
        <h1 class="update-profile-title">Update Profil</h1>

        <div class="update-profile-group">
          <label for="name" class="update-profile-label">Nama</label>
          <input type="text" id="name" class="update-profile-input" placeholder="Nama lengkap Anda" required>
        </div>

        <div class="update-profile-group">
          <label for="email" class="update-profile-label">Email</label>
          <input type="email" id="email" class="update-profile-input" placeholder="Email Anda" required>
        </div>

        <div class="update-profile-group">
          <label for="phone" class="update-profile-label">Nomor Telepon</label>
          <input type="tel" id="phone" class="update-profile-input" placeholder="Nomor telepon Anda" required>
        </div>

        <div class="update-profile-group">
          <label for="image" class="update-profile-label">Upload Foto Profil</label>
          <input type="file" id="image" class="update-profile-input" accept="image/*">
        </div>

        <button type="submit" class="update-profile-button">Update</button>
      </form>
    </section>
  `;
  document.body.appendChild(mainContent);

  // Event Listener untuk submit form
  const updateForm = document.getElementById('update-profile-form');
  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Ambil data dari form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const image = document.getElementById('image').files[0];

    // Buat FormData untuk mengirim data
    const formData = new FormData();
    formData.append('nama', name);
    formData.append('email', email);
    formData.append('telp', phone);
    if (image) {
      formData.append('image', image);
    }

    // Kirim request ke backend
    try {
      const response = await fetch(`${ENDPOINT.UPDATEPROFIL}/${userId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include', // Kirim cookie jika diperlukan
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profil berhasil diperbarui!');
        window.location.hash = '#/profile'; // Redirect ke halaman profil
      } else {
        console.error('Error Response:', result);
        alert(result.message || 'Gagal memperbarui profil.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Gagal memperbarui profil: ${error.message}`);
    }
  });

  // Tambahkan footer ke halaman
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default renderUpdatePage;
