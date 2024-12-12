/* eslint-disable no-alert */
import Swal from 'sweetalert2';
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
        <h1>Login</h1>
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" placeholder="Masukkan email" required>
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
          <button type="submit" class="btn primary" id="login-button">Masuk</button>
          <p class="register-link">Belum punya akun? <a href="#/register" id="register-link">Daftar disini</a></p>
        </form>
      </section>
    </main>
  `;

  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-button');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Indikator loading
    loginButton.textContent = 'Memproses...';
    loginButton.disabled = true;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(ENDPOINT.LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        Swal.fire({
          title: 'Login Gagal',
          text: errorResult.message || 'Email atau kata sandi salah.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        loginButton.textContent = 'Masuk';
        loginButton.disabled = false;
        return;
      }

      const result = await response.json();
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }
      if (result.userId) {
        localStorage.setItem('userId', result.userId);
      }

      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Anda akan diarahkan ke halaman dashboard.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (result.role === 'admin') {
          window.location.hash = '#/dashboard-admin';
        } else {
          window.location.hash = '#/dashboard';
        }

        document.body.classList.remove('swal2-shown');
        document.body.style.overflow = '';
      });
    } catch (error) {
      Swal.fire({
        title: 'Terjadi Kesalahan',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      loginButton.textContent = 'Masuk';
      loginButton.disabled = false;
    }
  });

  const registerLink = document.getElementById('register-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/register';
  });
};

export default renderLoginPage;
