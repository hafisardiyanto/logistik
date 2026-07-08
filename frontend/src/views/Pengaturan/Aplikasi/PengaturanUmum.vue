<template>
  <div class="pengaturan-umum-page">
    <div class="page-header">
      <h1>Pengaturan Umum Aplikasi</h1>
      <p>Kelola pengaturan dasar aplikasi logistik</p>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="settings-card loading-state">
      Memuat pengaturan...
    </div>

    <!-- Settings Form -->
    <div v-else class="settings-card">
      <h2 class="card-title">Informasi Umum Aplikasi</h2>

      <div class="form-group">
        <label class="form-label">Nama Perusahaan</label>
        <input type="text" class="form-input" v-model="form.nama_perusahaan" placeholder="Masukkan nama perusahaan" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kode Perusahaan</label>
          <input type="text" class="form-input" v-model="form.kode_perusahaan" placeholder="Contoh: LOG-001" />
        </div>
        <div class="form-group">
          <label class="form-label">NPWP</label>
          <input type="text" class="form-input" v-model="form.npwp" placeholder="XX.XXX.XXX.X-XXX.XXX" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat</label>
        <textarea class="form-textarea" v-model="form.alamat" placeholder="Masukkan alamat lengkap perusahaan"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kota</label>
          <input type="text" class="form-input" v-model="form.kota" placeholder="Masukkan kota" />
        </div>
        <div class="form-group">
          <label class="form-label">Kode Pos</label>
          <input type="text" class="form-input" v-model="form.kode_pos" placeholder="Masukkan kode pos" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">No. Telepon</label>
          <input type="text" class="form-input" v-model="form.telepon" placeholder="021-XXXXXXX" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" v-model="form.email" placeholder="info@perusahaan.com" />
        </div>
      </div>

      <hr class="form-separator" />

      <h2 class="card-title">Pengaturan Operasional</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Mata Uang Default</label>
          <select class="form-select" v-model="form.mata_uang">
            <option value="IDR">IDR - Rupiah Indonesia</option>
            <option value="USD">USD - US Dollar</option>
            <option value="SGD">SGD - Singapore Dollar</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Format Tanggal</label>
          <select class="form-select" v-model="form.format_tanggal">
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Zona Waktu</label>
          <select class="form-select" v-model="form.zona_waktu">
            <option value="Asia/Jakarta">WIB (Asia/Jakarta)</option>
            <option value="Asia/Makassar">WITA (Asia/Makassar)</option>
            <option value="Asia/Jayapura">WIT (Asia/Jayapura)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Prefix Nomor DO</label>
          <input type="text" class="form-input" v-model="form.prefix_do" placeholder="Contoh: DO-" />
          <div class="form-hint">Prefix akan ditambahkan di depan nomor Delivery Order</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Prefix Nomor JO</label>
          <input type="text" class="form-input" v-model="form.prefix_jo" placeholder="Contoh: JO-" />
          <div class="form-hint">Prefix akan ditambahkan di depan nomor Job Order</div>
        </div>
        <div class="form-group">
          <label class="form-label">Prefix Nomor Invoice</label>
          <input type="text" class="form-input" v-model="form.prefix_invoice" placeholder="Contoh: INV-" />
          <div class="form-hint">Prefix akan ditambahkan di depan nomor Invoice</div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button class="btn btn-secondary" @click="resetForm" :disabled="saving">Reset</button>
        <button class="btn btn-primary" @click="saveSettings" :disabled="saving">
          {{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


const API_URL = "http://localhost:3000/api/app-settings";

const loading = ref(true);
const saving = ref(false);
const settingsMap = ref({}); // key -> { id, value }

const toast = ref({ show: false, message: "", type: "success" });

const defaultForm = {
  nama_perusahaan: "",
  kode_perusahaan: "",
  npwp: "",
  alamat: "",
  kota: "",
  kode_pos: "",
  telepon: "",
  email: "",
  mata_uang: "IDR",
  format_tanggal: "DD/MM/YYYY",
  zona_waktu: "Asia/Jakarta",
  prefix_do: "DO-",
  prefix_jo: "JO-",
  prefix_invoice: "INV-",
};

const fieldLabels = {
  nama_perusahaan: "Nama Perusahaan",
  kode_perusahaan: "Kode Perusahaan",
  npwp: "NPWP",
  alamat: "Alamat",
  kota: "Kota",
  kode_pos: "Kode Pos",
  telepon: "No. Telepon",
  email: "Email",
  mata_uang: "Mata Uang Default",
  format_tanggal: "Format Tanggal",
  zona_waktu: "Zona Waktu",
  prefix_do: "Prefix Nomor DO",
  prefix_jo: "Prefix Nomor JO",
  prefix_invoice: "Prefix Nomor Invoice",
};

const form = ref({ ...defaultForm });

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3000);
}

async function fetchSettings() {
  loading.value = true;
  try {
    const res = await fetch(`${API_URL}?group=pengaturan_umum`);
    const data = await res.json();
    
    // Map existing settings to form
    data.forEach(item => {
      settingsMap.value[item.key] = { id: item.id, value: item.value };
      if (form.value.hasOwnProperty(item.key)) {
        form.value[item.key] = item.value;
      }
    });
  } catch (error) {
    showToast("Gagal memuat pengaturan", "error");
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  try {
    const existingUpdates = [];
    const newSettings = [];

    for (const [key, value] of Object.entries(form.value)) {
      if (settingsMap.value[key]) {
        existingUpdates.push({ id: settingsMap.value[key].id, value: String(value) });
      } else {
        newSettings.push({
          key,
          label: fieldLabels[key] || key,
          value: String(value),
          type: "text",
          group: "pengaturan_umum"
        });
      }
    }

    // Bulk update existing settings
    if (existingUpdates.length > 0) {
      await fetch(`${API_URL}/bulk`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: existingUpdates })
      });
    }

    // Create new settings
    for (const s of newSettings) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s)
      });
      const created = await res.json();
      settingsMap.value[s.key] = { id: created.id, value: s.value };
    }

    showToast("Pengaturan berhasil disimpan!");
  } catch (error) {
    showToast("Gagal menyimpan pengaturan", "error");
  } finally {
    saving.value = false;
  }
}

function resetForm() {
  // Reset to last saved values or defaults
  for (const [key] of Object.entries(form.value)) {
    if (settingsMap.value[key]) {
      form.value[key] = settingsMap.value[key].value;
    } else {
      form.value[key] = defaultForm[key];
    }
  }
  showToast("Form telah direset");
}

onMounted(() => {
  fetchSettings();
});
</script>
<style scoped src="../../../assets/css/aplikasi-pengaturanumum.css"></style>
