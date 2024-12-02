/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */

const createDashboardAdmin = () => {
  document.body.className = 'admin-page';

  // Create main container
  const containerAdmin = document.createElement('div');
  containerAdmin.className = 'container-admin';

  // Create sidebar
  const sidebarAdmin = document.createElement('aside');
  sidebarAdmin.className = 'sidebar-admin';

  const logoAdmin = document.createElement('div');
  logoAdmin.className = 'logo-admin';
  logoAdmin.textContent = 'ADMIN SIPRAJA';

  const menu = document.createElement('nav');
  menu.className = 'menu';

  const menuSection1 = createMenuSection('Menu', [
    {
      href: '#/dashboard-admin', icon: 'fa-home', text: 'Dashboard', active: true,
    },
    { href: '#/laporan-admin', icon: 'fa-file-alt', text: 'Laporan' },
    { href: '#/arsip-admin', icon: 'fa-archive', text: 'Arsip Laporan' },
  ]);

  const menuSection2 = createMenuSection('Akun', [
    { href: '#/profil-admin', icon: 'fa-user', text: 'Profil' },
    { href: '#', icon: 'fa-sign-out-alt', text: 'Keluar' },
  ]);

  menu.append(menuSection1, menuSection2);
  sidebarAdmin.append(logoAdmin, menu);

  // Create main content
  const contentAdmin = document.createElement('main');
  contentAdmin.className = 'content-admin';

  const headerAdmin = document.createElement('div');
  headerAdmin.className = 'header-admin';
  headerAdmin.innerHTML = `
    <div class="user-info-admin">
      <i class="fas fa-bell bell-icon"></i>
      <span class="user-name">Admin</span>
    </div>
  `;

  const dashboardAdmin = createDashboardSection();
  contentAdmin.append(headerAdmin, dashboardAdmin);

  // Append all to container
  containerAdmin.append(sidebarAdmin, contentAdmin);

  // Append container to body
  document.body.appendChild(containerAdmin);
};
// Helper function to create menu sections
function createMenuSection(title, links) {
  const section = document.createElement('div');
  section.className = 'menu-section-admin';

  const sectionTitle = document.createElement('span');
  sectionTitle.textContent = title;

  const linkElements = links.map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    if (link.active) anchor.className = 'active';
    anchor.innerHTML = `<i class="fas ${link.icon}"></i>${link.text}`;
    return anchor;
  });

  section.append(sectionTitle, ...linkElements);
  return section;
}

// Helper function to create dashboard section
function createDashboardSection() {
  const section = document.createElement('section');
  section.className = 'dashboard-admin';

  section.innerHTML = `
    <h2>Status Laporan</h2>
    <div class="status-cards-admin">
      ${createCardHTML('Semua', '45', 'fa-layer-group', '')}
      ${createCardHTML('Selesai', '10', 'fa-check-circle', 'green-card')}
      ${createCardHTML('Diproses', '20', 'fa-spinner', 'yellow-card')}
      ${createCardHTML('Belum Diproses', '15', 'fa-times-circle', 'gray-card')}
    </div>
    <h2>Waktu Laporan</h2>
    <div class="time-cards-admin">
      ${createCardHTML('Semua', '45', 'fa-calendar', '')}
      ${createCardHTML('Hari Ini', '10', 'fa-calendar-day', 'blue-card')}
      ${createCardHTML('Minggu Ini', '20', 'fa-calendar-week', 'orange-card')}
      ${createCardHTML('Bulan Ini', '15', 'fa-calendar-alt', 'purple-card')}
    </div>
  `;
  return section;
}

// Helper function to create card HTML
function createCardHTML(title, count, icon, cardClass) {
  return `
    <div class="card-admin ${cardClass}">
      <div class="icon-wrapper-admin">
        <i class="fas ${icon}"></i>
      </div>
      <div class="card-content-admin">
        <p>${title}</p>
        <h3>${count}</h3>
      </div>
    </div>
  `;
}
export default createDashboardAdmin;
