<template>
  <div class="aplikasi-container">
    <div class="page-title">
      <h1>Pengaturan Umum</h1>
      <div class="page-breadcrumb">Home > Pengaturan Aplikasi</div>
    </div>

    <div class="dashboard-grid">
      
      <!-- Card 1: Setting Aplikasi -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Aplikasi</h2>
            <p>Pengaturan terkait dengan standar bisnis proses dan parameter umum</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/aplikasi/pengaturanumum" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Pengaturan Umum Aplikasi</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/aplikasi/jenislayanan" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Jenis Layanan Logistik</span><span class="aplikasi-badge badge-wajib">Wajib</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/aplikasi/kopsurat" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Kop Surat / Header</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 2: Setting Umum -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-pink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Umum</h2>
            <p>Pengaturan terkait dengan seputar satuan, waktu dan lainnya</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/umum/jenissatuan" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Jenis Satuan</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/umum/tipecontainer" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Tipe Container</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/umum/komoditas" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Komoditas</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/umum/jenisbbm" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Jenis BBM</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          
          <RouterLink to="/pengaturan/umum/tahapanpenawaran" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Tahapan Penawaran</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 3: Setting Lokasi -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Lokasi</h2>
            <p>Pengaturan terkait dengan seputar satuan, wilayah dan lainnya</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/lokasi/negara" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Negara, Provinsi, Kota, Kec.</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          
          <RouterLink to="/pengaturan/lokasi/trayek" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Trayek / Rute</span><span class="aplikasi-badge badge-wajib">Wajib</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/lokasi/spbu" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>SPBU (BBM)</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
         
          <RouterLink to="/pengaturan/lokasi/gatelocation" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Gate Location</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 4: Setting Operasional -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-yellow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Operasional</h2>
            <p>Pengaturan terkait dengan standar bisnis proses dan parameter umum</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/operasional/kelompokbiaya" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Kelompok Biaya Operasional</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/operasional/jenisbiaya" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Jenis Biaya Tambahan</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/operasional/standarbiaya" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Standar Biaya Per Rute Trayek</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/operasional/servicetime" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Service Time</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/operasional/windowreceive" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Window Receive Time (WRT)</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/operasional/alasanbatal" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Alasan Pembatalan JO</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 5: Inventori -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-blue-alt">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Inventori</h2>
            <p>Pengaturan terkait dengan master Kategori Barang dan Item</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/inventori/brand" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Brand</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/tipebin" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Tipe Bin/Storage</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/kategori" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Kategori</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/masteritem" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Master Item</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/warehouse" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Warehouse</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/binlocation" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Bin Location</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/inventori/loadingdock" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Loading Dock</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 6: Setting Kendaraan -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-pink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Kendaraan</h2>
            <p>Pengaturan terkait dengan Tipe dan Varian/Model Kendaraan</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/kendaraan/pabrikan" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Pabrikan / Manufaktur</span><span class="aplikasi-badge badge-wajib">Wajib</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/kendaraan/tipe" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Tipe Kendaraan</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/kendaraan/equipment" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Kelengkapan Kendaraan / Equipment</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/kendaraan/body" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Body Kendaraan</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/kendaraan/axel" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Axel / Poros Ban</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
          <RouterLink to="/pengaturan/kendaraan/varian" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Varian / Model</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

      <!-- Card 7: Setting Keuangan -->
      <div class="aplikasi-card">
        <div class="aplikasi-header">
          <div class="aplikasi-icon icon-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <div class="aplikasi-title">
            <h2>Setting Keuangan</h2>
            <p>Pengaturan terkait parameter dan master keuangan</p>
          </div>
        </div>
        <div class="aplikasi-menu">
          <RouterLink to="/pengaturan/keuangan/masterpajak" class="aplikasi-menu-item">
            <div class="aplikasi-left"><span>Master Pajak</span></div>
            <div class="aplikasi-arrow">›</div>
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

</script>
<style scoped src="../../assets/css/aplikasi.css"></style>
