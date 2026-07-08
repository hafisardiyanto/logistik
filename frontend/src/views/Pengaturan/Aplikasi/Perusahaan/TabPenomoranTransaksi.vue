<template>
  <div class="tab-content-wrapper">
    <div class="card">
      <div class="card-header">
        <h5><i class="fa fa-list-alt"></i> Penomoran Transaksi Otomatis</h5>
      </div>
      <div class="card-body">
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">
          Tentukan awalan (prefix) yang akan digunakan sistem saat men-generate nomor dokumen secara otomatis.
        </p>

        <div v-if="toast.show" :class="['toast-alert', `toast-${toast.type}`]">
          {{ toast.message }}
        </div>

        <form @submit.prevent="saveSettings">
          
          <div class="premium-form-grid">
            <label>Prefix Delivery Order (DO)</label>
            <div>
              <input type="text" class="form-control" v-model="form.prefix_do" placeholder="Contoh: DO-">
              <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">Hasil akhir: DO-20231015001</div>
            </div>
          </div>
          
          <div class="premium-form-grid">
            <label>Prefix Job Order (JO)</label>
            <div>
              <input type="text" class="form-control" v-model="form.prefix_jo" placeholder="Contoh: JO-">
              <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">Hasil akhir: JO-20231015001</div>
            </div>
          </div>
          
          <div class="premium-form-grid">
            <label>Prefix Invoice</label>
            <div>
              <input type="text" class="form-control" v-model="form.prefix_invoice" placeholder="Contoh: INV-">
              <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">Hasil akhir: INV-20231015001</div>
            </div>
          </div>
          
          <div class="premium-form-grid">
            <label>Prefix Quotation</label>
            <div>
              <input type="text" class="form-control" v-model="form.prefix_quotation" placeholder="Contoh: QUO-">
              <div style="font-size: 13px; color: #94a3b8; margin-top: 6px;">Hasil akhir: QUO-20231015001</div>
            </div>
          </div>

          <hr class="premium-divider">

          <div class="premium-form-grid">
            <label></label>
            <button type="submit" class="btn-primary" :disabled="saving">
              <i class="fa fa-save"></i> {{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const saving = ref(false);
const toast = ref({ show: false, message: '', type: 'success' });

const API_URL = "http://localhost:3000/api/app-settings";
const settingsMap = ref({});

const form = ref({
  prefix_do: 'DO-',
  prefix_jo: 'JO-',
  prefix_invoice: 'INV-',
  prefix_quotation: 'QUO-'
});

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3000);
}

const loadSettings = async () => {
  try {
    const res = await axios.get(`${API_URL}?group=penomoran_transaksi`);
    const data = res.data;
    data.forEach(item => {
      settingsMap.value[item.key] = { id: item.id, value: item.value };
      if (form.value.hasOwnProperty(item.key)) {
        form.value[item.key] = item.value;
      }
    });
  } catch (error) {
    console.error("Gagal mengambil pengaturan penomoran", error);
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
          group: "penomoran_transaksi"
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

    showToast("Pengaturan penomoran berhasil disimpan!");
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
