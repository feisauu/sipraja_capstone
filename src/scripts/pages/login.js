/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const renderLoginPage = () => {
  document.body.className = '';
  document.body.innerHTML = '';

  document.body.style.overflow = 'auto';

  const main = document.createElement('main');
  const welcomeSection = document.createElement('section');
  welcomeSection.className = 'welcome-section';
  welcomeSection.innerHTML = `
    <h1>Selamat datang!</h1>
    <p class="subtitle">Ayo, mulai laporkan kerusakan!</p>
  `;

  const loginContainer = document.createElement('section');
  loginContainer.className = 'login-container';
  loginContainer.innerHTML = `
    <form id="login-form">
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
        <a href="#/forget-password" id="forgot-password-link" class="forgot-password">Lupa kata sandi?</a>
      </div>
      <button type="submit" class="btn primary" id="login-button">Masuk</button><button type="button" id="cancel-button" class="cancel">Kembali</button>
      <p class="register-link">Belum punya akun? <a href="#/register" id="register-link">Daftar disini</a></p>
    </form>
  `;

  // Append sections to main
  main.append(welcomeSection, loginContainer);
  document.body.appendChild(main);

  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-button');
  
  document.getElementById('cancel-button').addEventListener('click', () => {
    window.location.hash = renderHomePage();
  });
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable button and show loading state
    loginButton.disabled = true;
    loginButton.textContent = 'Memproses...';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(ENDPOINT.LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Login gagal.');
      }

      const result = await response.json();
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('role', result.role);

      Swal.fire({
        title: 'Berhasil!',
        text: 'Anda berhasil login. Mengarahkan ke dashboard...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (result.role === 'admin') {
          window.location.hash = '#/dashboard-admin';
        } else if (result.role === 'user') {
          window.location.hash = '#/dashboard';
        } else {
          Swal.fire('Error', 'Role pengguna tidak dikenali.', 'error');
        }
      });
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      // Re-enable button and reset text
      loginButton.disabled = false;
      loginButton.textContent = 'Masuk';
    }
  });

  const registerLink = document.getElementById('register-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/register';
  });

  const forgotPasswordLink = document.getElementById('forgot-password-link');
  forgotPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/lupa-sandi';
  });
};

function renderHomePage() {
  fetch('index.html')
    .then((response) => {
      if (!response.ok) throw new Error('Gagal memuat halaman utama.');
      return response.text();
    })
    .then((html) => {
      document.body.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error loading index.html:', error);
      document.body.innerHTML = '<p>Error: Tidak dapat memuat halaman utama.</p>';
    });
}
export default renderLoginPage;
