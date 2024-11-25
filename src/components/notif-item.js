class NotifItem extends HTMLElement {
  constructor() {
    super();

    // Buat Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // HTML dan CSS untuk komponen
    shadow.innerHTML = `
        <style>
          .notif-item {
            border-bottom: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .notif-item:hover {
            transform: scale(1.01);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
          }
  
          .notif-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          }
  
          .status {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            font-weight: bold;
          }
  
          .status.green {
            color: #22c55e; /* Hijau */
          }
  
          .status.orange {
            color: #f59e0b; /* Oranye */
          }
  
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
          }
  
          .dot.green {
            background-color: #22c55e; /* Hijau */
          }
  
          .dot.orange {
            background-color: #f59e0b; /* Oranye */
          }
  
          .time {
            font-size: 12px;
            color: #6b7280; /* Abu-abu */
          }
  
          .description {
            font-size: 14px;
            color: #374151; /* Abu-abu gelap */
            line-height: 1.5;
          }
        </style>
  
        <div class="notif-item">
          <div class="notif-header">
            <span class="status">
              <span class="dot"></span>
              <span class="status-text"></span>
            </span>
            <span class="time"></span>
          </div>
          <div class="description"></div>
        </div>
      `;
  }

  connectedCallback() {
    // Ambil atribut dari elemen
    const status = this.getAttribute('status') || 'Laporan';
    const time = this.getAttribute('time') || 'Waktu tidak tersedia';
    const description = this.innerHTML.trim();

    // Tentukan warna berdasarkan status
    const statusClass = status === 'Laporan Selesai' ? 'green' : 'orange';

    // Isi konten dalam komponen
    this.shadowRoot.querySelector('.dot').classList.add(statusClass);
    this.shadowRoot.querySelector('.status').classList.add(statusClass);
    this.shadowRoot.querySelector('.status-text').textContent = status;
    this.shadowRoot.querySelector('.time').textContent = time;
    this.shadowRoot.querySelector('.description').textContent = description;
  }
}

// Daftarkan custom element
customElements.define('notif-item', NotifItem);
