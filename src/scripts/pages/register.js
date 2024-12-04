import ENDPOINT from '../globals/endpoint';

const renderRegisterPage = () => {
  document.body.innerHTML = `
       <main>
    <section class="register-container">
      <form id="register-form">
        <h1>Daftar Akun</h1>

        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" placeholder="Kim Taehyung" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="kimtaehyung@gmail.com" required>
        </div>

        <div class="form-group">
          <label for="password">Kata Sandi</label>
          <input type="password" id="password" placeholder="*******" required>
        </div>

        <div class="form-group">
          <label for="confirm-password">Konfirmasi Kata Sandi</label>
          <input type="password" id="confirm-password" placeholder="*******" required>
        </div>

        <div class="form-group">
          <label for="phone">Nomor Telepon</label>
          <input type="tel" id="phone" placeholder="0812345678901" required>
        </div>

        <button type="submit" class="btn primary">Daftar</button>
        <p class="login-link">Sudah punya akun? <a href="#" id="login-link">Masuk disini</a></p>
      </form>
    </section>
  </main>
    `;

  // Validasi Input
  const validateInput = (name, email, password, confirmPassword, phone) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phonePattern = /^[0-9]+$/;

    if (!name || !email || !password || !confirmPassword || !phone) {
      return 'Semua field harus diisi.';
    }

    if (!emailPattern.test(email)) {
      return 'Format email tidak valid. Gunakan domain @gmail.com.';
    }

    if (password.length < 8) {
      return 'Password harus terdiri dari minimal 8 karakter.';
    }

    if (password !== confirmPassword) {
      return 'Password dan konfirmasi password tidak sesuai.';
    }

    if (!phonePattern.test(phone)) {
      return 'Nomor telepon hanya boleh mengandung angka.';
    }

    return null;
  };

  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validasi input
    const validationError = validateInput(name, email, password, confirmPassword, phone);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const response = await fetch(ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nama: name,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          telp: phone,
        }),
      });
    
      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);
    
      if (!response.ok) {
        const errorData = JSON.parse(textResponse);
        console.error('Error Details:', errorData);
        alert(errorData.message || 'Registrasi gagal.');
        return;
      }
    
      const jsonResponse = JSON.parse(textResponse);
      alert(jsonResponse.message || 'Registrasi berhasil!');
      window.location.hash = '#/login';
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Registrasi gagal: ${error.message}`);
    }
      });

};

export default renderRegisterPage;
