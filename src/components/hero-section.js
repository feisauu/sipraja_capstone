class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="hero-content">
          <h1>Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyaman <span class="highlight">Kota Bersama</span>!</h1>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
          <button class="cta-btn">Get Started</button>
        </div>
        <div class="hero-image">
          <img src="../images/image1.png" alt="People reporting issues">
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);
