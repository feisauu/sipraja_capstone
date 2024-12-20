/* eslint-disable no-plusplus */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/hero-section.js';
import '../../components/footer.js';

const createDashboard = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const hero = document.createElement('section');
  hero.classList.add('hero');
  hero.id = 'home';
  hero.innerHTML = `
    <div class="hero-content">
      <h1 id="hero-text">
        Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyamanan <span class="highlight">Kota Bersama</span>!
      </h1>
      <p>"Bantu kami memperbaiki kota dengan melaporkan kerusakan yang ada."</p>
      <button class="cta-btn" onclick="window.location.href='#/laporan'">Mulai</button>
    </div>
    <div class="hero-image">
      <img src="../images/image1.png" alt="People reporting issues">
    </div>
  `;

  document.body.appendChild(hero);

  const element = document.querySelector('#hero-text');
  const text = 'Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyamanan <span class="highlight">Kota Bersama</span>!';
  element.innerHTML = '';
  let index = 0;
  let isTag = false;
  let currentText = '';

  function type() {
    if (index < text.length) {
      const currentChar = text[index];
      if (currentChar === '<') {
        isTag = true;
      }

      if (isTag) {
        currentText += currentChar;
      } else {
        currentText += currentChar;
      }

      if (currentChar === '>') {
        isTag = false;
      }

      element.innerHTML = `${currentText}<span class="cursor">|</span>`;
      index++;
      setTimeout(type, 50);
    } else {
      element.querySelector('.cursor').remove();
      setTimeout(() => {
        index = 0;
        currentText = '';
        element.innerHTML = '';
        type();
      }, 2000);
    }
  }

  type();

  const features = document.createElement('section');
  features.className = 'features scroll-element';
  features.innerHTML = `
    <h2>Fitur <span class="highlight-features">Unggulan</span> Kami</h2>
    <div class="feature-cards">
      <div class="card purple scroll-element">
        <i class="fas fa-chart-line"></i>
        <h3>Pantau Progres</h3>
            <p>Lihat status perbaikan secara berkala melalui fitur ini. Anda dapat memantau setiap langkah dalam proses perbaikan untuk memastikan masalah segera ditangani.</p>
      </div>
      <div class="card yellow scroll-element">
        <i class="fas fa-bolt"></i>
        <h3>Laporkan Cepat</h3>
            <p>Lapor kerusakan dengan cepat dan mudah hanya dengan beberapa langkah sederhana. Fitur ini dirancang untuk mempermudah masyarakat dalam melaporkan kejadian dengan lebih efisien.</p>
      </div>
      <div class="card purple scroll-element">
        <i class="fas fa-hands-helping"></i>
        <h3>Dukung Perbaikan</h3>
            <p>Bersama-sama kita dapat menciptakan fasilitas yang lebih baik. Dukung setiap perbaikan yang dilakukan untuk menjaga kenyamanan dan keamanan lingkungan kita.</p>
      </div>
    </div>
  `;
  document.body.appendChild(features);

  const solutions = document.createElement('section');
  solutions.className = 'solutions scroll-element';
  solutions.innerHTML = `
    <div class="solutions-content">
      <div class="solutions-image scroll-element">
        <img src="../images/image2.png" alt="Illustration of reporting">
      </div>
      <div class="solutions-text scroll-element">
        <h3>Solusi <span class="highlight">Praktis!</span></h3>
        <ul>
          <li>
            <span class="number">1</span>
            <div>
              <strong>Laporan Kerusakan</strong> Isi formulir dengan detail lokasi dan jenis kerusakan untuk memudahkan petugas dalam menangani laporan Anda.
            </div>
          </li>
          <li>
            <span class="number">2</span>
            <div>
              <strong>Unggah Foto</strong> Perjelas laporan Anda dengan mengunggah foto kerusakan untuk memberikan informasi yang lebih akurat kepada tim kami.
            </div>
          </li>
          <li>
            <span class="number">3</span>
            <div>
              <strong>Pantau Status Laporan</strong> Pantau status perbaikan laporan Anda secara berkala untuk mengetahui progres perbaikan yang sedang dilakukan.
            </div>
          </li>
          <li>
            <span class="number">4</span>
            <div>
              <strong>Aksi Cepat dari Tim Kami</strong> Laporan Anda akan segera ditindaklanjuti oleh tim kami bersama dinas terkait untuk perbaikan yang cepat dan efisien.
            </div>
          </li>
        </ul>
      </div>
    </div>
  `;
  document.body.appendChild(solutions);

  const reportNow = document.createElement('section');
  reportNow.className = 'report-now';
  reportNow.innerHTML = `
    <div class="report-container">
      <div class="report-content">
        <h3>Lapor Sekarang</h3>
        <p>Bantu kami menjaga Yogyakarta tetap aman dan nyaman. Mari laporkan setiap kerusakan fasilitas umum yang Anda temui, agar perbaikan dapat dilakukan lebih cepat. Dengan melaporkan segera, Anda turut membantu menciptakan lingkungan yang lebih baik untuk kita semua.</p>
        <button class="report-btn" onclick="window.location.href='#/laporan'">Laporkan Sekarang</button>
      </div>
      <div class="report-image">
        <img src="../images/image3.png" alt="Ilustrasi Laporan" />
      </div>
    </div>
  `;
  document.body.appendChild(reportNow);

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

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDashboard;
