/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
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
          <th>No</th>
          <th>Nama</th>
          <th>Status</th>
          <th>Kategori</th>
          <th>Lokasi</th>
          <th>Tanggal</th>
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
    <button class="page-btn" id="prevPageBtn">«</button>
    <button class="page-btn active" id="page1Btn">1</button>
    <button class="page-btn" id="page2Btn">2</button>
    <button class="page-btn" id="page3Btn">3</button>
    <button class="page-btn" id="nextPageBtn">»</button>
  `;

  mainContent.append(header, filterSection, tableContainer, sidebarFilters, pagination);
  container.append(sidebar, mainContent);
  document.body.appendChild(container);

  let currentPage = 1;
  const reportsPerPage = 10;

  // Fetch Laporan data and display in table
  const fetchLaporanData = async (filters = {}, page = 1) => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }

    try {
      // Add pagination to the filters
      filters.page = page;
      filters.limit = reportsPerPage;

      const response = await fetch(`${ENDPOINT.GETLAPORAN}?${new URLSearchParams(filters).toString()}`, {
        method: 'GET',
        credentials: 'include', // Send cookies for cross-domain requests
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memuat laporan.');
      }

      const data = await response.json();
      const laporanData = Array.isArray(data.message) ? data.message : [];
      const totalReports = data.total || 0;

      if (laporanData.length === 0) {
        console.error('No laporan data found.');
        return;
      }

      const laporanTableBody = document.getElementById('laporanTableBody');
      laporanTableBody.innerHTML = ''; // Clear existing data

      laporanData.forEach((laporan, index) => {
        const row = document.createElement('tr');
        row.id = `laporan-${laporan._id}`;
        row.innerHTML = `
  <td>${(currentPage - 1) * reportsPerPage + index + 1}</td>
  <td><a onclick="window.location.href='#/konfirmasi'">
      <strong>${laporan.judul}</strong><br>
      <small>${laporan.nama}</small>
    </a>
  </td>
  <td><span class="status ${laporan.status.toLowerCase()}" id="status-${laporan._id}">${laporan.status}</span></td>
  <td>${laporan.kategori}</td>
  <td>${laporan.lokasi}</td>
  <td>${laporan.tanggal}</td>
  <td class="action-icons">
    <button class="icon edit-btn" onclick="showEditForm('${laporan._id}', '${laporan.status}')">
      <i class="fas fa-edit"></i> 
    </button>
    <button class="icon delete-btn" onclick="deleteLaporan('${laporan._id}')">
      <i class="fas fa-trash-alt"></i> 
    </button>
    <button class="archive-btn" onclick="archiveLaporan('${laporan._id}')">
      <i class="fas fa-folder-plus"></i> 
    </button>
  </td>
`;
        laporanTableBody.appendChild(row);
      });

      // Handle pagination
      const totalPages = Math.ceil(totalReports / reportsPerPage);
      updatePagination(totalPages, page);
    } catch (error) {
      console.error('Error fetching laporan data:', error);
    }
  };

  // Handle pagination
  const updatePagination = (totalPages, currentPage) => {
    // Disable/enable pagination buttons based on currentPage
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;

    // Update page buttons dynamically
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.getElementById(`page${i}Btn`);
      if (pageBtn) {
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
      }
    }
  };

  // Handle page change
  document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchLaporanData({}, currentPage);
    }
  });

  document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    fetchLaporanData({}, currentPage);
  });

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

    fetchLaporanData(filters, currentPage);
  });

  // Initialize with all laporan data
  fetchLaporanData({}, currentPage);
};

// Menampilkan form untuk mengedit status laporan
window.showEditForm = (id, currentStatus) => {
  const statusCell = document.getElementById(`status-${id}`);
  if (!statusCell) {
    console.warn(`Element dengan ID status-${id} tidak ditemukan.`);
    return;
  }

  // Membuat elemen form secara dinamis
  const form = document.createElement('form');
  form.id = `editForm-${id}`;

  const select = document.createElement('select');
  select.id = `statusSelect-${id}`;

  // Menentukan opsi status
  const options = [
    { value: 'belum diproses', label: 'Belum Diproses' },
    { value: 'diproses', label: 'Diproses' },
    { value: 'selesai', label: 'Selesai' },
  ];

  // Menambahkan options ke dalam select
  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    if (currentStatus === option.value) {
      optionElement.selected = true;
    }
    select.appendChild(optionElement);
  });

  // Menambahkan tombol update ke dalam form
  const updateButton = document.createElement('button');
  updateButton.type = 'button';
  updateButton.textContent = 'Update';
  updateButton.onclick = () => updateStatus(id); // Pastikan id dikirim ke fungsi updateStatus

  // Menambahkan elemen ke dalam form
  form.appendChild(select);
  form.appendChild(updateButton);

  // Menampilkan form di dalam statusCell
  statusCell.innerHTML = ''; // Menghapus konten sebelumnya
  statusCell.appendChild(form);
};

// Mengupdate status laporan
window.updateStatus = async (id) => {
  const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
  const authToken = localStorage.getItem('authToken'); // Ambil token dari localStorage
  const newStatus = document.getElementById(`statusSelect-${id}`).value;

  if (!userId || !authToken) {
    console.error('User ID atau Auth Token tidak ditemukan di localStorage');
    Swal.fire('Error', 'Token atau User ID tidak ditemukan, silakan login ulang', 'error');
    return;
  }

  try {
    const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/${id}`, { // Pastikan 'id' menggunakan huruf kecil
      method: 'PUT', // Seharusnya menggunakan PUT untuk memperbarui data
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`, // Kirim token dalam header Authorization
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }), // Kirim status baru dalam body
    });

    if (response.ok) {
      alert('Status laporan berhasil diperbarui.');
      fetchLaporanData(); // Refresh data laporan
    } else {
      const errorData = await response.json();
      console.error('Error response from API:', errorData);
      alert(`Gagal memperbarui status: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error updating status:', error);
    alert(`Terjadi kesalahan: ${error.message}`);
  }
};

// Handle delete Laporan
window.deleteLaporan = async (id) => {
  try {
    // Fetch the authToken from localStorage
    const authToken = localStorage.getItem('authToken');

    // Check if the authToken exists, if not, throw an error
    if (!authToken) {
      throw new Error('Authentication token is missing.');
    }

    // Make sure the URL for deleting is correct
    const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Laporan deleted successfully');
      createLaporanAdmin(); // Re-fetch and update the list of reports
    } else {
      const responseText = await response.text();
      console.error('Error response:', responseText);
      alert(`Failed to delete laporan: ${responseText}`);
    }
  } catch (error) {
    console.error('Error deleting laporan:', error);
    alert(`Error deleting laporan: ${error.message}`);
  }
};

// Handle archiving Laporan
const archiveLaporan = async (id) => {
  try {
    await fetch(`${ENDPOINT.GETLAPORAN}archive/${id}`, {
      method: 'POST',
    });
    alert('Laporan archived successfully');
    createLaporanAdmin(); // Refresh the page
  } catch (error) {
    console.error('Error archiving laporan:', error);
  }
};

export default createLaporanAdmin;
