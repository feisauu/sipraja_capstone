/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';
import '../../components/notif-item.js';

const createNotificationPage = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const notifSection = document.createElement('section-page');
  notifSection.setAttribute('title', 'Notifikasi');

  const notifItem1 = document.createElement('notif-item');
  notifItem1.setAttribute('status', 'Laporan Selesai');
  notifItem1.setAttribute('time', '2 hari yang lalu');
  notifItem1.innerHTML = `
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab ad
    consequuntur quos vel culpa? Rerum, impedit voluptates alias provident
    magni officia nobis natus tempora harum facere accusamus amet nemo
    aliquid enim explicabo sunt dicta, minus sed. Maxime porro quisquam
    quasi!
  `;

  const notifItem2 = document.createElement('notif-item');
  notifItem2.setAttribute('status', 'Laporan Diproses');
  notifItem2.setAttribute('time', '2 hari yang lalu');
  notifItem2.innerHTML = `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
    accusantium nisi inventore ullam natus est nam, impedit nemo ipsam qui
    beatae cupiditate enim ipsa illo doloribus molestiae ea cum consectetur
    quos perspiciatis quisquam dolore libero. Ab quos ullam saepe
    consequatur!
  `;

  const notifItem3 = document.createElement('notif-item');
  notifItem3.setAttribute('status', 'Laporan Selesai');
  notifItem3.setAttribute('time', '2 hari yang lalu');
  notifItem3.innerHTML = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tempora
    natus explicabo. Atque omnis id ab nostrum modi itaque minima deleniti
    quo molestiae rem alias, voluptas dicta ratione vel nulla molestias
    quibusdam, unde veritatis enim iste praesentium fuga recusandae!
    Incidunt!
  `;

  notifSection.appendChild(notifItem1);
  notifSection.appendChild(notifItem2);
  notifSection.appendChild(notifItem3);

  document.body.appendChild(notifSection);

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createNotificationPage;
