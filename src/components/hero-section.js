/* eslint-disable no-plusplus */
class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="hero-content">
          <h1 id="hero-text">
            Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyamanan <span class="highlight">Kota Bersama</span>
          </h1>
          <p>"Bantu kami memperbaiki kota dengan melaporkan kerusakan yang ada."</p>
          <button class="cta-btn" onclick="window.location.href='#/login'">Mulai</button>
        </div>
        <div class="hero-image">
          <img src="../images/image1.png" alt="People reporting issues">
        </div>
      </section>
    `;
    this.typeEffect();
  }

  typeEffect() {
    const element = this.querySelector('#hero-text');
    const text = 'Lapor <span class="highlight">Kerusakan</span>, Jaga Kenyamanan <span class="highlight">Kota Bersama!</span>';
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
  }
}

customElements.define('hero-section', HeroSection);
