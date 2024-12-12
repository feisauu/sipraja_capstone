/* eslint-disable import/order */
/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import ENDPOINT from '../globals/endpoint';
import Swal from 'sweetalert2';

const createDetailLaporanPage = () => {
  // Buat elemen navbar
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Buat elemen formulir laporan
  const detailLaporanSection = document.createElement('section');
  detailLaporanSection.className = 'detail-laporan';
  detailLaporanSection.innerHTML = `
    <h1>Formulir Laporan</h1>
    <form id="form-laporan">
      <label for="nama">Nama Pelapor</label>
      <input type="text" id="nama" name="nama" placeholder="Masukkan Nama Anda" required>

      <label for="tanggal">Tanggal Laporan</label>
      <input type="date" id="tanggal" name="tanggal" required>

      <label for="judul">Judul Laporan</label>
      <input type="text" id="judul" name="judul" placeholder="Masukkan Judul Laporan" required>

      <label for="kategori">Kategori Laporan</label>
      <input type="text" id="kategori" name="kategori" placeholder="Masukkan Kategori Laporan" required>

      <label for="lokasi">Lokasi</label>
      <input type="text" id="lokasi" name="lokasi" placeholder="Masukkan Lokasi" required>

      <label for="deskripsi">Deskripsi Masalah</label>
      <textarea id="deskripsi" name="description" placeholder="Masukkan Deskripsi Masalah" rows="5" required></textarea>

      <label for="foto">Foto Pendukung</label>
      <div class="file-upload">
        <input type="file" id="foto" name="gambar_pendukung" accept="image/*">
      </div>

      <button type="submit" class="submit-button">Buat Laporan</button>
    </form>
  `;
  document.body.appendChild(detailLaporanSection);

  // Event listener untuk form submission
  const form = document.getElementById('form-laporan');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submitButton = document.querySelector('.submit-button');

    // Tambahkan class untuk animasi loading
    submitButton.disabled = true;
    submitButton.innerText = 'Mengirim...';

    try {
      const response = await fetch(ENDPOINT.CREATELAPORAN, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = JSON.parse(textResponse);
      console.log('Parsed Response:', result);

      Swal.fire({
        title: 'Berhasil!',
        text: 'Laporan berhasil dibuat!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        document.body.classList.remove('swal2-shown');
        document.body.style.overflow = '';
        window.location.href = '#/dashboard';
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
      // Kembalikan tombol ke state awal
      submitButton.disabled = false;
      submitButton.innerText = 'Buat Laporan';
    }
  });

  // Buat elemen footer
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDetailLaporanPage;
