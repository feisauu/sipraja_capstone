class DevCard extends HTMLElement {
  constructor() {
    super();

    // Buat Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // HTML untuk card
    shadow.innerHTML = `
        <style>
          .dev-card {
            display: flex;
            padding-bottom: 20px;
            border-radius: 10px;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 250px;
            margin: 0 10px;
            animation: slideInUp 1s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

          .dev-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
        }

          .dev-card img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            padding: 20px;
        }

          .dev-card h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }

          .dev-card p {
            font-size: 1rem;
            color: #333;
        }
        </style>

        <div class="dev-card">
          <img src="" alt="Developer Profile">
          <h3></h3>
          <p></p>
        </div>
      `;
  }

  // Lifecycle method: Called when element is added to DOM
  connectedCallback() {
    this.shadowRoot.querySelector("img").src = this.getAttribute("image");
    this.shadowRoot.querySelector("h3").textContent = this.getAttribute("name");
    this.shadowRoot.querySelector("p").textContent = this.getAttribute("role");
  }
}

// Register custom element
customElements.define("dev-card", DevCard);
