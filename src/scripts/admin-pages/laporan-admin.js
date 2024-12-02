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
          <input type="text" placeholder="Cari Laporan">
        </div>
        <div class="filter-date-admin">
          <input type="date">
          <span>To</span>
          <input type="date">
        </div>
        <button class="filter-btn-admin">Cari</button>
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
      <tbody>
        <tr>
          <td>
  <a href="#/konfirmasi">
    <strong>Judul Laporan</strong><br>
    <small>Nama Pelapor</small>
  </a>
</td>

          <td><span class="status selesai">Selesai</span></td>
          <td>Jalan</td>
          <td>Yogyakarta</td>
          <td>
            <button class="icon"><i class="fas fa-link"></i></button>
            <button class="icon"><i class="fas fa-trash-alt"></i></button>
            <button class="archive"><i class="fas fa-folder-plus"></i> Arsip</button>
          </td>
        </tr>
        <tr>
          <td><strong>Lana Steiner</strong><br><small>email@gmail.com</small></td>
          <td><span class="status diproses">Diproses</span></td>
          <td>Jembatan</td>
          <td>Jakarta</td>
          <td>
            <button class="icon"><i class="fas fa-link"></i></button>
            <button class="icon"><i class="fas fa-trash-alt"></i></button>
            <button class="archive"><i class="fas fa-folder-plus"></i> Arsip</button>
          </td>
        </tr>
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
};

export default createLaporanAdmin;
