/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import ENDPOINT from '../globals/endpoint'; // Assuming you have the ENDPOINTs imported
// eslint-disable-next-line no-unused-vars
import CONFIG from '../globals/config';

const createLaporanAdmin = () => {
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

  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.innerHTML = `
    <div class="menu-section-admin">
        <span>Menu</span>
        <a href="#/dashboard-admin" class="active"><i class="fas fa-home"></i>Dashboard</a>
        <a href="#/laporan-admin"><i class="fas fa-file-alt"></i>Laporan</a>
        <a href="#/arsip-admin"><i class="fas fa-archive"></i>Arsip Laporan</a>
      </div>
      <div class="menu-section-admin">
        <span>Akun</span>
        <a href="#/profil-admin"><i class="fas fa-user"></i>Profil</a>
        <a href="#"><i class="fas fa-sign-out-alt"></i>Keluar</a>
      </div>
  `;
  sidebar.append(logo, menu);

  // Main Content
  const mainContent = document.createElement('main');
  mainContent.className = 'content-admin';

  const header = document.createElement('div');
  header.className = 'header-admin';
  header.innerHTML = `
    <div class="user-info-admin">
      <i class="fas fa-bell bell-icon"></i>
      <span class="user-name">Admin</span>
    </div>
  `;

  // Filter Section
  const filterSection = document.createElement('section');
  filterSection.className = 'filters-admin';
  filterSection.innerHTML = `
    <h2 class="h2">Laporan</h2>
      <section class="filters-admin">
        <div class="filter-input-admin">
          <input type="text" id="searchInput" placeholder="Cari Laporan">
        </div>
        <div class="filter-date-admin">
          <input type="date" id="startDate">
          <span>To</span>
          <input type="date" id="endDate">
        </div>
        <button class="filter-btn-admin" id="filterBtn">Cari</button>
      </section>
  `;

  // Table Section
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container-admin';
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Status</th>
          <th>Kategori</th>
          <th>Lokasi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="laporanTableBody">
        <!-- Reports will be populated here dynamically -->
      </tbody>
    </table>
  `;

  // Sidebar Filters
  const sidebarFilters = document.createElement('div');
  sidebarFilters.className = 'filters-sidebar-admin';
  sidebarFilters.innerHTML = `
    <h3>Status Laporan</h3>
    <form>
      <label><input type="radio" name="status" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="status" value="selesai"><span>Selesai</span></label>
      <label><input type="radio" name="status" value="diproses"><span>Diproses</span></label>
      <label><input type="radio" name="status" value="belum_diproses"><span>Belum Diproses</span></label>
    </form>
    <h3>Kategori Laporan</h3>
    <form>
      <label><input type="radio" name="kategori" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="kategori" value="jalan"><span>Jalan</span></label>
      <label><input type="radio" name="kategori" value="jembatan"><span>Jembatan</span></label>
      <label><input type="radio" name="kategori" value="lalu_lintas"><span>Lalu Lintas</span></label>
    </form>
  `;

  // Pagination
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.innerHTML = `
    <button class="page-btn">«</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <button class="page-btn">»</button>
  `;

  mainContent.append(header, filterSection, tableContainer, sidebarFilters, pagination);
  container.append(sidebar, mainContent);
  document.body.appendChild(container);

  // Fetch Laporan data and display in table
  const fetchLaporanData = async (filters = {}) => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
  
    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }
  
    try {
      // Build query string from filters
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
      // Check if the response is an object with the 'message' key containing an array
      const laporanData = Array.isArray(data.message) ? data.message : [];
  
      if (laporanData.length === 0) {
        console.error('No laporan data found.');
        return;
      }
  
      const laporanTableBody = document.getElementById('laporanTableBody');
      laporanTableBody.innerHTML = ''; // Clear existing data
      laporanData.forEach((laporan) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <a href="#/konfirmasi">
              <strong>${laporan.judul}</strong><br>
              <small>${laporan.nama}</small>
            </a>
          </td>
          <td><span class="status ${laporan.status.toLowerCase()}">${laporan.status}</span></td>
          <td>${laporan.kategori}</td>
          <td>${laporan.lokasi}</td>
          <td>
            <button class="icon"><i class="fas fa-link"></i></button>
            <button class="icon"><i class="fas fa-trash-alt" onclick="deleteLaporan(${laporan._id})"></i></button>
            <button class="archive" onclick="archiveLaporan(${laporan._id})"><i class="fas fa-folder-plus"></i> Arsip</button>
          </td>
        `;
        laporanTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching laporan data:', error);
    }
  };  
  
  // Handle filter button click
  const filterButton = document.getElementById('filterBtn');
  filterButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const kategori = document.querySelector('input[name="kategori"]:checked').value;

    // Send filters to the API
    const filters = {
      search: searchInput,
      start_date: startDate,
      end_date: endDate,
      status: status !== 'semua' ? status : '',
      kategori: kategori !== 'semua' ? kategori : '',
    };

    fetchLaporanData(filters);
  });

  // Initialize with all laporan data
  fetchLaporanData();

};

// Handle delete Laporan
const deleteLaporan = async (id) => {
  try {
    await fetch(`${ENDPOINT.GETLAPORAN}${id}`, {
      method: 'DELETE',
    });
    alert('Laporan deleted successfully');
    createLaporanAdmin(); // Refresh the page
  } catch (error) {
    console.error('Error deleting laporan:', error);
  }
};

// Handle archiving Laporan
const archiveLaporan = async (id) => {
  try {
    await fetch(`${ENDPOINT.GETLAPORAN}archive/${id}`, {
      method: 'PUT',
    });
    alert('Laporan archived successfully');
    createLaporanAdmin(); // Refresh the page
  } catch (error) {
    console.error('Error archiving laporan:', error);
  }
};

export default createLaporanAdmin;
