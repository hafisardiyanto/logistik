
<template>
  <div class="kendaraan-container">
    <div class="kendaraan-card">
      <div class="setting-header">
        <div class="setting-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff0a7a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
        <div class="setting-title">
          <h2>Setting Kendaraan</h2>
          <p>Pengaturan terkait dengan Tipe dan Varian/Model Kendaraan</p>
        </div>
      </div>

      <div class="kendaraan-menu">
        <RouterLink to="/pengaturan/kendaraan/pabrikan" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Pabrikan / Manufaktur</span>
            <span class="kendaraan-badge">Wajib</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>

        <RouterLink to="/pengaturan/kendaraan/tipe" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Tipe Kendaraan</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>

        <RouterLink to="/pengaturan/kendaraan/equipment" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Kelengkapan Kendaraan / Equipment</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>

        <RouterLink to="/pengaturan/kendaraan/body" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Body Kendaraan</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>

        <RouterLink to="/pengaturan/kendaraan/axel" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Axel / Poros Ban</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>

        <RouterLink to="/pengaturan/kendaraan/varian" class="kendaraan-menu-item menu-item">
          <div class="kendaraan-left">
            <span>Varian / Model</span>
          </div>
          <div class="kendaraan-arrow">›</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>   
<style scoped src="../../../assets/css/kendaraan.css"></style>
