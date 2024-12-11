/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const createArsipAdmin = () => {
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
  <h2 class="h2">Arsip</h2>
      <div class="filter-input-admin">
        <input type="text" placeholder="Cari Laporan">
      </div>
      <div class="filter-date-admin">
        <input type="date">
        <span>To</span>
        <input type="date">
      </div>
      <button class="filter-btn-admin">Cari</button>
    `;

  // Table Section
  const tableSection = document.createElement('section');
  tableSection.className = 'table-admin';
  tableSection.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Kategori</th>
          <th>Lokasi</th>
          <th>Tanggal</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="arsipTableBody">
        <!-- Data rows will be appended here -->
      </tbody>
    </table>
  `;

  // Function to Fetch and Populate Data
  const tableContainer = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      Swal.fire('Error', 'Token not found or expired. Please log in again.', 'error');
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT.GETLAPORAN}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debugging log

        const archivedLaporan = (data.message || []).filter((laporan) => laporan.isArchived);
        console.log('Filtered Archived Reports:', archivedLaporan); // Debugging log

        populateTable(archivedLaporan);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch archived reports.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch archived reports.', 'error');
    }
  };

  // Function to Populate Table
  const populateTable = (arsip) => {
    const tableBody = document.getElementById('arsipTableBody');
    tableBody.innerHTML = ''; // Clear existing data

    if (arsip.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="7">Tidak ada data yang tersedia.</td>';
      tableBody.appendChild(row);
      return;
    }

    arsip.forEach((laporan, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${laporan.judul}</strong><br><small>${laporan.nama}</small></td>
        <td><span class="status ${laporan.status.toLowerCase()}">${laporan.status}</span></td>
        <td>${laporan.kategori}</td>
        <td>${laporan.lokasi}</td>
        <td>${laporan.tanggal}</td>
        <td class="action-icons">
          <button class="icon delete-btn" onclick="deleteLaporan('${laporan._id || ''}')"><i class="fas fa-trash-alt"></i></button>
          <button class="icon unarchive-btn" onclick="unarchiveLaporan('${laporan._id || ''}')"><i class="fas fa-folder-open"></i></button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  };

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

  mainContent.append(header, filterSection, tableSection, sidebarFilters, pagination);
  container.append(sidebar, mainContent);
  document.body.appendChild(container);

  // Fetch data after DOM setup
  tableContainer();
};

// Fungsi untuk menangani Unarchive
window.unarchiveLaporan = async (id) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Anda ingin membatalkan arsip laporan ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, batalkan arsip!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          Swal.fire('Error', 'Token tidak ditemukan atau sudah kedaluwarsa. Silakan login kembali.', 'error');
          return;
        }

        // Kirim permintaan ke API untuk mengubah status arsip
        const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/unarchive/${id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          Swal.fire('Berhasil!', 'Laporan telah dibatalkan dari arsip.', 'success').then(() => {
            // Redirect ke halaman laporan-admin
            window.location.hash = '#/laporan-admin';
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal membatalkan arsip laporan.');
        }
      } catch (error) {
        console.error('Error saat membatalkan arsip:', error);
        Swal.fire('Error', 'Gagal membatalkan arsip laporan.', 'error');
      }
    }
  });
};

// Tombol Unarchive
const populateTable = (arsip) => {
  const tableBody = document.getElementById('arsipTableBody');
  tableBody.innerHTML = '';

  if (arsip.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="7">Tidak ada data yang tersedia</td>';
    tableBody.appendChild(row);
    return;
  }

  arsip.forEach((laporan, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${laporan.judul}</strong><br><small>${laporan.nama}</small></td>
      <td><span class="status ${laporan.status.toLowerCase()}">${laporan.status}</span></td>
      <td>${laporan.kategori}</td>
      <td>${laporan.lokasi}</td>
      <td>${laporan.tanggal}</td>
      <td class="action-icons">
        <button class="icon delete-btn" onclick="deleteLaporan('${laporan._id || ''}')"><i class="fas fa-trash-alt"></i></button>
        <button class="icon unarchive-btn" onclick="unarchiveLaporan('${laporan._id || ''}')"><i class="fas fa-folder-open"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

export default createArsipAdmin;
