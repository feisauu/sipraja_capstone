class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="hero-content">
          <h1>Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyaman <span class="highlight">Kota Bersama</span>!</h1>
          <p>"Bantu kami memperbaiki kota dengan melaporkan kerusakan yang ada."</p>
          <button class="cta-btn" onclick="window.location.href='#/login'">Get Started</button>
        </div>
        <div class="hero-image">
          <img src="../images/image1.png" alt="People reporting issues">
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);
