import Swal from 'sweetalert2';
import '../../components/navbar.js';
import '../../components/footer.js';
import ENDPOINT from '../globals/endpoint';

const createDetailLaporanPage = async () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const detailLaporanSection = document.createElement('section');
  detailLaporanSection.className = 'detail-laporan';
  detailLaporanSection.innerHTML = `
    <h1 class="form-title">Formulir Laporan</h1>
    <form id="form-laporan" class="form-container">
      <div class="form-group">
        <label for="userId">User ID</label>
        <input type="text" id="userId" name="userId" readonly>
      </div>

      <div class="form-group">
        <label for="nama">Nama Pelapor</label>
        <input type="text" id="nama" name="nama" readonly>
      </div>

      <div class="form-group">
        <label for="tanggal">Tanggal Laporan</label>
        <input type="date" id="tanggal" name="tanggal" required>
      </div>

      <div class="form-group">
        <label for="judul">Judul Laporan</label>
        <input type="text" id="judul" name="judul" placeholder="Masukkan Judul Laporan" required>
      </div>

      <div class="form-group">
        <label for="kategori">Kategori Laporan</label>
        <select id="kategori" name="kategori" required>
          <option value="" disabled selected>Pilih Kategori</option>
          <option value="Jembatan">Jembatan</option>
          <option value="Jalan">Jalan</option>
          <option value="Lalu Lintas">Lalu Lintas</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div class="form-group">
        <label for="lokasi">Lokasi</label>
        <input type="text" id="lokasi" name="lokasi" placeholder="Masukkan Lokasi" required>
      </div>

      <div class="form-group">
        <label for="deskripsi">Deskripsi Masalah</label>
        <textarea id="deskripsi" name="description" placeholder="Masukkan Deskripsi Masalah" rows="5" required></textarea>
      </div>

      <div class="form-group">
        <label for="foto">Foto Pendukung</label>
        <div class="file-upload">
          <label for="foto" class="file-upload-label" style="color: white">Klik di sini untuk upload foto</label>
          <input type="file" id="foto" name="gambar_pendukung" accept="image/*" multiple>
          <span class="file-upload-info">Pilih beberapa foto pendukung (opsional).</span>
          <div id="preview-container" class="preview-container"></div>
        </div>
      </div>

      <button type="submit" class="submit-button">Buat Laporan</button>
    </form>
  `;
  document.body.appendChild(detailLaporanSection);

  // Fetch user data
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
        const userIdInput = document.getElementById('userId');
        const namaPelaporInput = document.getElementById('nama');

        userIdInput.value = userId || 'ID tidak tersedia';
        namaPelaporInput.value = data.nama || 'Nama tidak tersedia';
      } else {
        console.error('Failed to fetch profile data:', data.message);
        Swal.fire('Error', data.message || 'Gagal mengambil data profil', 'error');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Swal.fire('Error', 'Gagal mengambil data pengguna', 'error');
    }
  };

  await fetchUserData();

  const fotoInput = document.getElementById('foto');
  const previewContainer = document.getElementById('preview-container');

  fotoInput.addEventListener('change', () => {
    previewContainer.innerHTML = ''; 
    const files = Array.from(fotoInput.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('preview-image');
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  const form = document.getElementById('form-laporan');
  const submitButton = form.querySelector('.submit-button');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    if (submitButton.disabled) return; 
    submitButton.disabled = true;

    const formData = new FormData(form);
    console.log([...formData]);

    try {
      const response = await fetch(ENDPOINT.CREATELAPORAN, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      Swal.fire({
        title: 'Berhasil!',
        text: 'Laporan berhasil dibuat!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        document.body.classList.remove('swal2-shown');
        document.body.style.overflow = '';
        window.location.href = '#/laporan';
      });
    } catch (error) {
      console.error('Error:', error.message);

      Swal.fire({
        title: 'Gagal!',
        text: `Gagal membuat laporan: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      submitButton.disabled = false;
    }
  });

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDetailLaporanPage;
