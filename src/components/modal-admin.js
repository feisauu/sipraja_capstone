/* eslint-disable no-unused-vars */
class ModalComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Menggunakan Shadow DOM
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          transition: opacity 0.3s ease-in-out;
        }

        #modal.show {
          display: block;
          opacity: 1;
        }

        .modal-content {
          margin: 10% auto;
          padding: 20px;
          background: white;
          width: 40%;
          max-width: 500px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.4s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        h2 {
          margin-bottom: 20px;
          font-size: 1.8rem;
          color: #333;
        }

        #statusSelect {
          width: 80%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          background: #f9f9f9;
          color: #333;
          transition: border-color 0.3s ease;
          z-index: 2000;
        }

        #statusSelect:focus {
          border-color: #007bff;
          outline: none;
        }

        .modal-button {
          margin-top: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .modal-button#updateButton {
          background: #28a745;
          color: #fff;
        }

        .modal-button#updateButton:hover {
          background: #218838;
          transform: scale(1.05);
        }

        .modal-button#closeModal {
          background: #dc3545;
          color: #fff;
        }

        .modal-button#closeModal:hover {
          background: #c82333;
          transform: scale(1.05);
        }
      </style>
      <div id="modal">
        <div class="modal-content">
          <h2>Edit Status</h2>
          <select id="statusSelect">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <br /><br />
          <button id="updateButton" class="modal-button">Update</button>
          <button id="closeModal" class="modal-button">Close</button>
        </div>
      </div>
    `;

    // Menambahkan event listener setelah render selesai
    const updateButton = this.shadowRoot.querySelector('#updateButton');
    const closeButton = this.shadowRoot.querySelector('#closeModal');
    const modal = this.shadowRoot.querySelector('#modal');
    const modalContent = this.shadowRoot.querySelector('.modal-content');

    if (updateButton) {
      updateButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah event bubbling
        this.updateStatus();
      });
    } else {
      console.error('Update button not found in modal.');
    }

    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah event bubbling
        this.close();
      });
    } else {
      console.error('Close button not found in modal.');
    }

    // Menambahkan event listener untuk menutup modal ketika klik di luar modal
    modal.addEventListener('click', (event) => {
      if (event.target === modal) { // Pastikan klik di luar konten modal
        this.close();
      }
    });

    // Mencegah penutupan modal saat klik di dalam konten modal
    modalContent.addEventListener('click', (event) => {
      event.stopPropagation(); // Mencegah event bubbling
    });
  }

  // Fungsi untuk membuka modal
  open() {
    const modal = this.shadowRoot.querySelector('#modal');
    if (modal) {
      modal.classList.add('show'); // Menambahkan kelas 'show' untuk menampilkan modal
    } else {
      console.error('Modal not found in shadow DOM.');
    }
  }

  // Fungsi untuk menutup modal
  close() {
    const modal = this.shadowRoot.querySelector('#modal');
    if (modal) {
      modal.classList.remove('show');
    } else {
      console.error('Modal not found in shadow DOM.');
    }
  }

  // Fungsi untuk mengupdate status (misalnya mengirim data ke server)
  updateStatus() {
    const status = this.shadowRoot.querySelector('#statusSelect').value;
    console.log('Status updated to:', status);
    this.close();
  }
}
customElements.define('modal-component', ModalComponent);
