/* eslint-disable no-alert */
import ENDPOINT from '../globals/endpoint';

const renderLoginPage = () => {
  document.body.innerHTML = `
    <main>
      <section class="welcome-section">
        <h1>Selamat datang!</h1>
        <p class="subtitle">Ayo, mulai laporkan kerusakan!</p>
      </section>

      <section class="login-container">
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" placeholder="kimtaehyung@gmail.com" required>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" placeholder="*******" required>
            </div>
          </div>
          <div class="form-footer">
            <a href="#" class="forgot-password">Lupa password?</a>
          </div>
          <button type="submit" class="btn primary">Masuk</button>
          <p class="register-link">Belum punya akun? <a href="#/register" id="register-link">Daftar disini</a></p>
        </form>
      </section>
    </main>
  `;

  // Tambahkan event listener untuk form login
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil data dari form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(ENDPOINT.LOGIN, {
        method: 'POST',
        credentials: 'include', // Mengirimkan cookie dengan permintaan
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Debug respons mentah
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Cek tipe konten respons
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json(); // Parse JSON jika tipe konten benar
        console.log('Parsed JSON:', result);

        if (response.ok) {
          console.log('Login berhasil.');

          // Simpan token dan ID pengguna ke localStorage
          if (result.token) {
            localStorage.setItem('authToken', result.token);
            console.log('Token disimpan di localStorage:', result.token);
          } else {
            console.error('Token tidak ditemukan dalam respons.');
          }

          if (result.userId) {
            localStorage.setItem('userId', result.userId);
            console.log('User ID disimpan di localStorage:', result.userId);
          } else {
            console.error('User ID tidak ditemukan dalam respons.');
          }

          // Cek role pengguna dari data respons
          if (result.role === 'admin') {
            window.location.hash = '#/dashboard-admin';
          } else if (result.role === 'user') {
            window.location.hash = '#/dashboard';
          } else {
            alert('Role pengguna tidak dikenali.');
          }
        } else {
          alert(result.message || 'Email atau kata sandi salah.');
        }
      } else {
        console.error('Unexpected response type:', contentType);
        const textResponse = await response.text(); // Baca sebagai teks
        console.error('HTML Response:', textResponse);
        alert('Server mengembalikan respons yang tidak valid.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Error detail: ${error.message}`);
    }
  });

  // Navigasi ke halaman register
  const registerLink = document.getElementById('register-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/register';
  });
};

export default renderLoginPage;
