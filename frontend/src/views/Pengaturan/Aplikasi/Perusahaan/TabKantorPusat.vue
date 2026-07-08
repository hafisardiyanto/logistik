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
            <img src="https://via.placeholder.com/120x120?text=Logo" alt="Logo Perusahaan" style="max-width: 100%; max-height: 100%;">
          </div>
          <div class="logo-instructions">
            <h6>Upload Logo Baru</h6>
            <ul>
              <li><i class="fa fa-check-circle"></i> Format yang didukung: <strong>JPG, PNG</strong></li>
              <li><i class="fa fa-check-circle"></i> Rekomendasi dimensi: <strong>300x300 pixel</strong></li>
              <li><i class="fa fa-check-circle"></i> Maksimal ukuran file: <strong>1MB</strong></li>
            </ul>
            <p style="color: #3b82f6; font-size: 13px; margin-top: 20px;">
              <i class="fa fa-info-circle"></i> Logo akan tersimpan secara otomatis setelah berhasil diunggah.
            </p>
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
