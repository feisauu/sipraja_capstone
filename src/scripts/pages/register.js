const renderRegisterPage = () => {
  document.body.innerHTML = `
       <main>
    <section class="register-container">
      <form id="register-form">
        <h1>Daftar Akun</h1>

        <!-- Upload Foto Profil -->
        <div class="form-group profile-upload">
          <label for="profile-picture">Foto Profil</label>
          <input type="file" id="profile-picture" accept="image/*" required>
          <small>Unggah foto profil Anda</small>
        </div>

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
  const profilePictureInput = document.getElementById('profile-picture');
  profilePictureInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validFormats.includes(file.type)) {
        alert('Format file tidak didukung. Upload ulang dengan format .jpg, .jpeg, atau .png.');
        // eslint-disable-next-line no-param-reassign
        event.target.value = ''; // Reset input file
      }
    }
  });

  // Validasi saat formulir disubmit
  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Ambil data dari input
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phone = document.getElementById('phone').value.trim();



    // Validasi format email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert('Format email tidak valid. Email harus menggunakan domain @gmail.com.');
      return; // Hentikan proses submit
    }

    // Validasi panjang password
    if (password.length < 8) {
      alert('Password harus terdiri dari minimal 8 karakter.');
      return; // Hentikan proses submit
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak sesuai.');
      return; // Hentikan proses submit
    }

    // Validasi nomor telepon hanya angka
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
      alert('Nomor telepon hanya boleh mengandung angka.');
      return; // Hentikan proses submit
    }

    // Jika semua validasi lolos
    alert('Registrasi berhasil!');
  });

  // Navigasi ke halaman login
  const registerLink = document.getElementById('login-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/login'; // Kembali ke halaman login
  });
};

export default renderRegisterPage;
