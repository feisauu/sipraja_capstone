class SectionPage extends HTMLElement {
  constructor() {
    super();

    // Buat Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // HTML untuk card
    shadow.innerHTML = `
          <style>
            .section {
            padding: 40px 40px;
            }

          .section h2 {
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 1rem;
            font-size: 2rem;
            padding-bottom: 20px;
            margin-bottom: 40px; 
            border-bottom: 1px solid #ddd; 
            color: #1f2937; 
            }

            slot {
            color: #666;
            line-height: 1.8;
            text-align: justify;
            }
          </style>

        <section class="section">
          <h2> </h2>
            <div class="content">
              <slot></slot>
            </div>
        </section>
        `;
  }

  // Lifecycle method: Called when element is added to DOM
  connectedCallback() {
    this.shadowRoot.querySelector('h2').textContent = this.getAttribute('title');
  }
}

// Register custom element
customElements.define('section-page', SectionPage);
