/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// about.js

import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';
import '../../components/dev-card.js';

const createAboutPage = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const aboutSection = document.createElement('section-page');
  aboutSection.setAttribute('title', 'Apa itu SIPRAJA?🧐');
  aboutSection.innerHTML = `
    <p>
    Yogyakarta, sebagai kota wisata dan pusat pendidikan yang memiliki kerentanan tinggi terhadap bencana alam seperti gempa bumi, sering kali menghadapi berbagai tantangan dalam menjaga dan memelihara infrastruktur publik. Salah satu tantangan utamanya adalah keterbatasan sumber daya yang tersedia serta lambatnya proses pelaporan kerusakan oleh masyarakat, yang menyebabkan penanganan masalah menjadi tidak efektif dan cenderung memakan waktu lebih lama. Akibatnya, kerusakan fasilitas umum seperti jalan, jembatan, dan infrastruktur vital lainnya sering kali tidak segera tertangani, yang berpotensi membahayakan keselamatan masyarakat serta menghambat aktivitas sehari-hari.
    <br>
    <br>Untuk mengatasi hal ini, platform pelaporan berbasis web SIPRAJA dirancang sebagai solusi efektif yang memungkinkan masyarakat untuk melaporkan kerusakan fasilitas umum dengan cepat, mudah, dan akurat. Dengan adanya platform ini, setiap laporan yang diajukan dapat segera ditindaklanjuti oleh pihak terkait, sehingga proses perbaikan dapat dilakukan lebih efisien.
    <br>
    <br>SIPRAJA adalah singkatan dari Sistem Informasi Pelaporan Kerusakan Infrastruktur Daerah Jogja. Aplikasi ini dirancang untuk mempermudah masyarakat dalam melaporkan kerusakan infrastruktur yang ada di daerah Jogja. Dengan menggunakan sistem ini, masyarakat dapat dengan cepat melaporkan berbagai jenis kerusakan, seperti jalan berlubang, jembatan rusak, dan fasilitas umum lainnya, yang kemudian dapat dikelola oleh pihak berwenang untuk segera ditindaklanjuti. Aplikasi ini menyediakan platform yang efisien dan mudah digunakan oleh warga dan pemerintah daerah untuk berkomunikasi dan memperbaiki kondisi infrastruktur secara lebih terorganisir.
    </p>
  `;
  document.body.appendChild(aboutSection);

  const section = document.createElement('section-page');
  section.setAttribute('title', 'Tujuan dan Manfaat🎯');
  section.innerHTML = `
  <p>
<br><h2>🎯 Tujuan:</h2>
<li>Mempermudah masyarakat untuk melaporkan kerusakan infrastruktur.</li>
<li>Menyediakan sistem yang efisien untuk pengelolaan laporan kerusakan oleh pemerintah daerah.</li>
<li>Mengoptimalkan respons terhadap kerusakan infrastruktur yang ada di daerah Jogja.</li><br>
<br><h2>💡 Manfaat</h2>
<li>Meningkatkan Keterlibatan Masyarakat: Masyarakat dapat lebih aktif melaporkan kerusakan yang ditemukan.</li>
<li>Efisiensi Pengelolaan Laporan: Admin dapat mengelola dan menindaklanjuti laporan dengan lebih cepat dan terstruktur.</li>
<li>Peningkatan Kualitas Infrastruktur: Dengan adanya laporan yang mudah diakses, perbaikan infrastruktur dapat dilakukan lebih tepat waktu.</li>
    </p>
  `;
  document.body.appendChild(section);

  const about = document.createElement('section');
  about.className = 'about';
  about.innerHTML = `
    <div class="container">
      <div class="about-text">
        <h3>Tentang Kami</h3>
        <p>
          Di <strong>SIPRAJA</strong>, kami menyediakan sarana bagi masyarakat Yogyakarta untuk melaporkan segala bentuk kerusakan pada fasilitas umum seperti jalan berlubang, lampu penerangan jalan yang mati, kerusakan taman, dan lainnya.
        </p>
        <p>
          Dengan melibatkan masyarakat, kami bertujuan untuk mempercepat perbaikan infrastruktur kota dan menciptakan Yogyakarta yang lebih nyaman, aman, dan layak huni. 
          Kami bekerja sama dengan <strong>Dinas Pekerjaan Umum Yogyakarta</strong> untuk menjaga keberlangsungan infrastruktur kota.
        </p>
      </div>

      <div class="about-map">
        <h3>Lokasi Kami</h3>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.9286416230725!2d110.38876667471252!3d-7.800427292123149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5790f07cf09b%3A0x8132a30c009a85b7!2sUniversitas%20Gadjah%20Mada!5e0!3m2!1sid!2sid!4v1699212345678!5m2!1sid!2sid" 
          width="100%" 
          height="300" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  `;
  document.body.appendChild(about);

  const developersSection = document.createElement('section-page');
  developersSection.setAttribute('title', 'Developers');
  const developerCards = document.createElement('div');
  developerCards.className = 'developer-cards';

  const devCard1 = document.createElement('dev-card');
  devCard1.setAttribute('image', '../images/profil.webp');
  devCard1.setAttribute('name', 'Fatiha Shafiyatun Nuha');
  devCard1.setAttribute('role', 'Bagian project 1');

  const devCard2 = document.createElement('dev-card');
  devCard2.setAttribute('image', '../images/fei.jpeg');
  devCard2.setAttribute('name', 'Feis Aulia Fatchuriani');
  devCard2.setAttribute('role', 'Front-End Web Dev');

  const devCard3 = document.createElement('dev-card');
  devCard3.setAttribute('image', '../images/monica.png');
  devCard3.setAttribute('name', 'Monica Oktaviani');
  devCard3.setAttribute('role', 'Front-End Web Dev');

  const devCard4 = document.createElement('dev-card');
  devCard4.setAttribute('image', '../images/profil.webp');
  devCard4.setAttribute('name', 'Almira Putri Wibowo');
  devCard4.setAttribute('role', 'Bagian project 4');

  developerCards.appendChild(devCard1);
  developerCards.appendChild(devCard2);
  developerCards.appendChild(devCard3);
  developerCards.appendChild(devCard4);

  developersSection.appendChild(developerCards);
  document.body.appendChild(developersSection);

  // Create and append the footer
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createAboutPage;
