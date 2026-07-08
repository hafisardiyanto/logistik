<template>
  <div class="tab-content-wrapper">
    <!-- Form Detail Perusahaan -->
    <div class="card">
      <div class="card-header">
        <h5><i class="fa fa-building-o"></i> Detail Perusahaan</h5>
        <button class="btn-outline" @click="isEditing = !isEditing">
          <i class="fa fa-edit"></i> {{ isEditing ? 'Batal Edit' : 'Edit Data' }}
        </button>
      </div>
      <div class="card-body">
        <!-- Toast -->
        <div v-if="toast.show" :class="['toast-alert', `toast-${toast.type}`]">
          {{ toast.message }}
        </div>

        <form @submit.prevent="saveSettings">
          
          <div class="premium-form-grid">
            <label>Nama Perusahaan</label>
            <input type="text" class="form-control" v-model="form.nama_perusahaan" :disabled="!isEditing" placeholder="PT. Maju Berkah">
          </div>
          
          <div class="premium-form-grid">
            <label>Alamat Lengkap</label>
            <input type="text" class="form-control" v-model="form.alamat" :disabled="!isEditing" placeholder="Masukkan Alamat">
          </div>
          
          <div class="premium-form-grid">
            <label>Kota</label>
            <select class="form-control" v-model="form.kota" :disabled="!isEditing">
              <option value="">Pilih Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Semarang">Semarang</option>
              <option value="Medan">Medan</option>
            </select>
          </div>
          
          <div class="premium-form-grid">
            <label>Telephone</label>
            <input type="text" class="form-control" v-model="form.telephone" :disabled="!isEditing" placeholder="Masukkan Nomor Telepon">
          </div>
          
          <div class="premium-form-grid">
            <label>Handphone WA</label>
            <div class="input-group-premium">
              <span class="prefix">+62</span>
              <input type="text" class="form-control" v-model="form.hp_wa" :disabled="!isEditing" placeholder="8xxxxxxxxx">
            </div>
          </div>
          
          <div class="premium-form-grid">
            <label>Email Resmi</label>
            <input type="email" class="form-control" v-model="form.email" :disabled="!isEditing" placeholder="email@perusahaan.com">
          </div>
          
          <div class="premium-form-grid">
            <label>Website</label>
            <input type="text" class="form-control" v-model="form.website" :disabled="!isEditing" placeholder="www.perusahaan.com">
          </div>
          
          <hr class="premium-divider">

          <div class="premium-form-grid">
            <label>No Rekening</label>
            <input type="text" class="form-control" v-model="form.no_rekening" :disabled="!isEditing" placeholder="Masukkan No Rekening">
          </div>
          
          <div class="premium-form-grid">
            <label>Nama Pemilik Rekening</label>
            <input type="text" class="form-control" v-model="form.nama_rekening" :disabled="!isEditing" placeholder="Masukkan Nama Pemilik">
          </div>
          
          <div class="premium-form-grid">
            <label>Bank Rekening</label>
            <input type="text" class="form-control" v-model="form.bank_rekening" :disabled="!isEditing" placeholder="Masukkan Nama Bank">
          </div>
          
          <div class="premium-form-grid">
            <label>Token API Fonte (WA)</label>
            <div style="display: flex; gap: 12px; width: 100%;">
              <input type="text" class="form-control" v-model="form.token_fonte" :disabled="!isEditing" placeholder="Masukkan Token API Fonte">
              <button type="button" class="btn-outline" style="white-space: nowrap;" :disabled="!form.token_fonte">
                <i class="fa fa-paper-plane-o"></i> Test Kirim
              </button>
            </div>
          </div>

          <div class="premium-form-grid" v-if="isEditing" style="margin-top: 30px;">
            <label></label>
            <button type="submit" class="btn-primary" :disabled="saving">
              <i class="fa fa-save"></i> {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Upload Logo -->
    <div class="card">
      <div class="card-header">
        <h5><i class="fa fa-camera"></i> Logo Perusahaan</h5>
      </div>
      <div class="card-body">
        <div class="logo-upload-wrapper">
          <div class="logo-preview-box">
            <img v-if="logoUrl" :src="logoUrl" alt="Logo Perusahaan" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            <div v-else class="logo-placeholder">
              <i class="fa fa-image" style="font-size: 40px; color: #cbd5e1;"></i>
              <span style="font-size: 12px; color: #94a3b8; margin-top: 8px;">Belum ada logo</span>
            </div>
          </div>
          <div class="logo-instructions">
            <h6>Upload Logo Baru</h6>
            <ul>
              <li><i class="fa fa-check-circle"></i> Format yang didukung: <strong>JPG, PNG, WEBP</strong></li>
              <li><i class="fa fa-check-circle"></i> Rekomendasi dimensi: <strong>300x300 pixel</strong></li>
              <li><i class="fa fa-check-circle"></i> Maksimal ukuran file: <strong>2MB</strong></li>
            </ul>

            <!-- Tombol Pilih File -->
            <input type="file" ref="fileInput" accept="image/png,image/jpeg,image/webp" @change="handleFileSelect" style="display: none;">
            <div style="display: flex; gap: 10px; margin-top: 16px;">
              <button type="button" class="btn-outline" @click="$refs.fileInput.click()">
                <i class="fa fa-folder-open"></i> Pilih File
              </button>
              <button type="button" class="btn-primary" @click="uploadLogo" :disabled="!selectedFile || uploading">
                <i class="fa fa-cloud-upload"></i> {{ uploading ? 'Mengupload...' : 'Upload Logo' }}
              </button>
            </div>

            <!-- Preview nama file yang dipilih -->
            <p v-if="selectedFile" style="color: #059669; font-size: 13px; margin-top: 12px;">
              <i class="fa fa-file-image-o"></i> {{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(1) }} KB)
            </p>

            <!-- Toast upload -->
            <div v-if="uploadToast.show" :class="['toast-alert', `toast-${uploadToast.type}`]" style="margin-top: 12px;">
              {{ uploadToast.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isEditing = ref(false);
const saving = ref(false);
const toast = ref({ show: false, message: '', type: 'success' });

// === Logo Upload State ===
const logoUrl = ref('');
const selectedFile = ref(null);
const uploading = ref(false);
const uploadToast = ref({ show: false, message: '', type: 'success' });
const fileInput = ref(null);

const API_URL = "/api/app-settings";
const settingsMap = ref({});

const form = ref({
  nama_perusahaan: '',
  alamat: '',
  kota: '',
  telephone: '',
  hp_wa: '',
  email: '',
  website: '',
  no_rekening: '',
  nama_rekening: '',
  bank_rekening: '',
  token_fonte: ''
});

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3000);
}

function showUploadToast(message, type = "success") {
  uploadToast.value = { show: true, message, type };
  setTimeout(() => { uploadToast.value.show = false; }, 4000);
}

// === Logo Upload Functions ===

// Ketika user memilih file dari dialog
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi ukuran (maksimal 2MB)
  if (file.size > 2 * 1024 * 1024) {
    showUploadToast("Ukuran file terlalu besar. Maksimal 2MB.", "error");
    return;
  }

  selectedFile.value = file;

  // Langsung tampilkan preview lokal
  const reader = new FileReader();
  reader.onload = (e) => {
    logoUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Mengirim file ke server backend
const uploadLogo = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  try {
    const formData = new FormData();
    formData.append("logo", selectedFile.value);

    const res = await axios.post("/api/upload/logo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // Simpan URL logo ke AppSetting agar bisa dimuat kembali nanti
    logoUrl.value = res.data.url;

    // Simpan path logo ke database AppSetting
    if (settingsMap.value["logo_url"]) {
      await axios.put(`${API_URL}/bulk`, {
        settings: [{ id: settingsMap.value["logo_url"].id, value: res.data.url }]
      });
    } else {
      const settingRes = await axios.post(API_URL, {
        key: "logo_url",
        label: "LOGO URL",
        value: res.data.url,
        type: "text",
        group: "perusahaan_pusat"
      });
      settingsMap.value["logo_url"] = { id: settingRes.data.id, value: res.data.url };
    }

    showUploadToast("Logo berhasil diupload dan disimpan!");
    selectedFile.value = null;
  } catch (error) {
    const msg = error.response?.data?.message || "Gagal mengupload logo";
    showUploadToast(msg, "error");
  } finally {
    uploading.value = false;
  }
};

// Memuat URL logo yang tersimpan dari database
const loadLogo = () => {
  if (settingsMap.value["logo_url"] && settingsMap.value["logo_url"].value) {
    logoUrl.value = settingsMap.value["logo_url"].value;
  }
};

// === Existing Settings Functions ===

const loadSettings = async () => {
  try {
    const res = await axios.get(`${API_URL}?group=perusahaan_pusat`);
    const data = res.data;
    data.forEach(item => {
      settingsMap.value[item.key] = { id: item.id, value: item.value };
      if (form.value.hasOwnProperty(item.key)) {
        form.value[item.key] = item.value;
      }
    });
    // Setelah data setting dimuat, cek apakah ada logo tersimpan
    loadLogo();
  } catch (error) {
    console.error("Gagal mengambil data pengaturan", error);
  }
};

const saveSettings = async () => {
  saving.value = true;
  try {
    const existingUpdates = [];
    const newSettings = [];

    for (const [key, value] of Object.entries(form.value)) {
      if (settingsMap.value[key]) {
        existingUpdates.push({ id: settingsMap.value[key].id, value: String(value || '') });
      } else {
        newSettings.push({
          key,
          label: key.replace(/_/g, ' ').toUpperCase(),
          value: String(value || ''),
          type: "text",
          group: "perusahaan_pusat"
        });
      }
    }

    if (existingUpdates.length > 0) {
      await axios.put(`${API_URL}/bulk`, { settings: existingUpdates });
    }

    for (const s of newSettings) {
      const res = await axios.post(API_URL, s);
      settingsMap.value[s.key] = { id: res.data.id, value: s.value };
    }

    showToast("Data perusahaan berhasil disimpan!");
    isEditing.value = false;
  } catch (error) {
    showToast("Gagal menyimpan data", "error");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadSettings();
});
</script>

