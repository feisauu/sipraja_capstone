/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import createDetailLaporanPage from './detail-laporan.js'; // Import fungsi halaman detail

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

  const createLaporanCard = (image, title, date, location, category, description) => {
    const card = document.createElement('div');
    card.className = 'laporan-card';
    card.innerHTML = `
      <div class="laporan-card-left">
        <img src="${image}" alt="Foto Laporan">
      </div>
      <div class="laporan-card-right">
        <h4>${title}</h4>
        <p>${date}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${location}</p>
        <h5>Kategori Laporan</h5>
        <p class="kategori">
          <span class="kategori-icon"></span> ${category}
        </p>
        <p class="deskripsi">${description}</p>
      </div>
      <div class="arrow-container" id="arrow-to-detail-laporan">
        <div class="arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    `;
    return card;
  };

  // Tambahkan laporan contoh
  const laporan1 = createLaporanCard(
    '../../images/laporan-satu.png',
    'Kerusakan Jalan',
    '19 November 2024',
    'Kalasan, Sleman',
    'Laporan Selesai',
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
  );

  const laporan2 = createLaporanCard(
    '../../images/laporan-satu.png',
    'Kerusakan Jalan',
    '19 November 2024',
    'Kalasan, Sleman',
    'Laporan Diproses',
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
  );

  const laporan3 = createLaporanCard(
    '../../images/laporan-satu.png',
    'Kerusakan Jalan',
    '19 November 2024',
    'Kalasan, Sleman',
    'Belum Diproses',
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
  );

  mainContent.appendChild(laporan1);
  mainContent.appendChild(laporan2);
  mainContent.appendChild(laporan3);

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
