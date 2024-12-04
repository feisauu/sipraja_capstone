import '../../components/navbar.js';
import '../../components/footer.js';
import createDetailLaporanPage from './detail-laporan.js'; // Import fungsi halaman detail
import ENDPOINT from '../globals/endpoint';

// Fetch data laporan dari API
const fetchLaporan = async () => {
  try {
    const response = await fetch(ENDPOINT.GETLAPORAN, {
      method: 'GET',
      credentials: 'include', // Kirim cookie lintas domain
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal memuat laporan.');
    }

    const data = await response.json();
    console.log('Laporan diterima:', data);
    return data.message || []; // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error('Fetch Laporan Error:', error.message);
    return [];
  }
};

// Fungsi untuk membuat kartu laporan berdasarkan data dari fetch
const createLaporanCard = (laporan) => {
  const card = document.createElement('div');
  card.className = 'laporan-card';
  card.innerHTML = `
    <div class="laporan-card-left">
      <img src="${laporan.gambar_pendukung?.[0] || '../../images/default-image.png'}" alt="Foto Laporan">
    </div>
    <div class="laporan-card-right">
      <h4>${laporan.judul}</h4>
      <p>${laporan.kategori}</p>
      <p>${laporan.tanggal}</p>
      <p><i class="fas fa-map-marker-alt"></i> ${laporan.lokasi}</p>
      <p class="kategori">
        <span class="kategori-icon"></span> ${laporan.status}
      </p>
      <p class="deskripsi">${laporan.description || 'Deskripsi tidak tersedia'}</p>
    </div>
    <div class="arrow-container" id="arrow-to-detail-laporan">
      <div class="arrow">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  `;
  return card;
};

// Fungsi utama untuk membuat halaman laporan
const createLaporanPage = () => {
  // Membuat elemen navbar
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Membuat elemen fitur bar (search bar dan tombol laporan baru)
  const featuresBar = document.createElement('div');
  featuresBar.className = 'features-bar';
  featuresBar.innerHTML = `
    <div class="search-bar">
      <input type="text" placeholder="Cari Laporan...">
      <button><i class="fas fa-search"></i> Cari</button>
    </div>
    <div class="create-report">
      <a href="#" id="create-laporan-button">
        <button><i class="fas fa-plus"></i> Buat Laporan</button>
      </a>
    </div>
  `;
  document.body.appendChild(featuresBar);

  // Membuat container utama
  const container = document.createElement('div');
  container.className = 'container';

  // Membuat sidebar kiri (Status Laporan dan Kategori)
  const sidebars = document.createElement('div');
  sidebars.className = 'sidebars';

  const statusSidebar = document.createElement('div');
  statusSidebar.className = 'sidebar';
  statusSidebar.innerHTML = `
    <h3>Status Laporan</h3>
    <form>
      <label>
        <input type="radio" name="status" value="semua" checked>
        <span>Semua</span>
      </label>
      <label>
        <input type="radio" name="status" value="selesai">
        <span>Selesai</span>
      </label>
      <label>
        <input type="radio" name="status" value="diproses">
        <span>Diproses</span>
      </label>
      <label>
        <input type="radio" name="status" value="belum_diproses">
        <span>Belum Diproses</span>
      </label>
    </form>
  `;

  const kategoriSidebar = document.createElement('div');
  kategoriSidebar.className = 'sidebar';
  kategoriSidebar.innerHTML = `
    <h3>Kategori Laporan</h3>
    <form>
      <label>
        <input type="radio" name="kategori" value="semua" checked>
        <span>Semua</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="jalan">
        <span>Jalan</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="jembatan">
        <span>Jembatan</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="lalu_lintas">
        <span>Lalu Lintas</span>
      </label>
    </form>
  `;

  sidebars.appendChild(statusSidebar);
  sidebars.appendChild(kategoriSidebar);

  // Membuat elemen utama untuk laporan
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  // Tambahkan pesan loading
  mainContent.innerHTML = '<p>Loading laporan...</p>';

  // Fetch data laporan dan tambahkan ke halaman
  fetchLaporan().then((laporanData) => {
    mainContent.innerHTML = ''; // Kosongkan setelah data tersedia
    if (laporanData.length === 0) {
      mainContent.innerHTML = '<p>Tidak ada laporan tersedia.</p>';
    } else {
      laporanData.forEach((laporan) => {
        const card = createLaporanCard(laporan);
        mainContent.appendChild(card);
      });
    }
  }).catch((error) => {
    mainContent.innerHTML = '<p>Gagal memuat laporan. Silakan coba lagi nanti.</p>';
    console.error(error);
  });

  // Gabungkan elemen sidebar dan konten utama ke dalam container
  container.appendChild(sidebars);
  container.appendChild(mainContent);
  document.body.appendChild(container);

  // Membuat elemen footer
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);

  // Menambahkan event listener untuk tombol "Buat Laporan"
  const createReportButton = document.getElementById('create-laporan-button');
  createReportButton.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah navigasi default ke URL
    document.body.innerHTML = ''; // Bersihkan halaman
    createDetailLaporanPage(); // Panggil fungsi untuk merender halaman detail laporan
  });
};

export default createLaporanPage;
