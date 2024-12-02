/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';

const createDetailLaporanPage = () => {
  // Buat elemen navbar
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Buat elemen formulir laporan
  const detailLaporanSection = document.createElement('section');
  detailLaporanSection.className = 'detail-laporan';
  detailLaporanSection.innerHTML = `
    <h1>Formulir Laporan</h1>
    <form>
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
      <textarea id="deskripsi" name="deskripsi" placeholder="Masukkan Deskripsi Masalah" rows="5" required></textarea>

      <label for="foto">Foto Pendukung</label>
      <div class="file-upload">
        <input type="file" id="foto" name="foto" accept="image/*">
      </div>

      <button type="submit" class="submit-button">Buat Laporan</button>
    </form>
  `;
  document.body.appendChild(detailLaporanSection);

  // Buat elemen footer
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDetailLaporanPage;
