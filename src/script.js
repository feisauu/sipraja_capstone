import './components/navbar.js';
import './components/footer.js';
import './components/section-page.js';
import './components/notif-item.js';
import './components/dev-card.js';

document.addEventListener("DOMContentLoaded", function () {
    // Event listener untuk tombol login di halaman login
    document.querySelector('.btn.primary').addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah form submit default

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (email === '' || password === '') {
            alert('Harap isi email dan kata sandi Anda.');
        } else {
            alert(`Login berhasil! Selamat datang, ${email}`);
            // Tambahkan logika lain, seperti redirect ke halaman berikutnya
        }
    });

    // Event listener untuk link "Daftar disini"
    document.querySelector('.register-link a').addEventListener('click', function (event) {
        event.preventDefault();
        alert('Fitur pendaftaran akan tersedia segera.');
    });

    // Event listener untuk link "Lupa password?"
    document.querySelector('.forgot-password').addEventListener('click', function (event) {
        event.preventDefault();
        alert('Fitur lupa password akan tersedia segera.');
    });
});
