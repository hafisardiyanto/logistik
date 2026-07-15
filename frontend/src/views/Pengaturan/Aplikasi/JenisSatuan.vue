<template>
  <div class="aplikasi-jenissatuan-page">
    <div class="page-header">
      <h1>Jenis Satuan</h1>
      <div class="breadcrumb">
        <RouterLink to="/" title="/">Home</RouterLink> &gt; <RouterLink to="/pengaturan/aplikasi" title="/pengaturan/aplikasi">Pengaturan Aplikasi</RouterLink> &gt; <span>Jenis Satuan</span>
      </div>
    </div>

    <div class="table-card">
      <div class="toolbar">
        <input type="file" ref="fileInput" accept=".csv" style="display: none" @change="handleImportFile" />
        <button class="btn-outline" @click="triggerFileInput" v-if="hasPermission('Jenis Satuan (Aplikasi)', 'canCreate')">
          Import CSV
        </button>
        <button class="btn-success" @click="exportCSV" v-if="hasPermission('Jenis Satuan (Aplikasi)', 'canRead')">
          Export CSV
        </button>
        <button class="btn-primary" @click="openModal()" v-if="hasPermission('Jenis Satuan (Aplikasi)', 'canCreate')">
          + Tambah Satuan
        </button>
      </div>

      <div class="filters">
        <div class="filter-left">
          <span>Menampilkan</span>
          <select v-model="perPage" class="form-control" @change="currentPage = 1">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
        <div class="filter-right">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Masukkan Nama Satuan Lalu Tekan Enter" @keyup.enter="currentPage = 1" />
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Nama Satuan</th>
            <th>Default</th>
            <th style="width: 100px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="3" style="text-align: center; padding: 20px;">Data tidak ditemukan</td>
          </tr>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.nama }}</td>
            <td>
              <span v-if="item.default" class="badge-default">Default</span>
            </td>
            <td style="text-align: right;">
              <button class="btn-icon text-primary" @click="openModal(item)" title="Edit" v-if="hasPermission('Jenis Satuan (Aplikasi)', 'canUpdate')">
                ✎
              </button>
              <button class="btn-icon text-danger" @click="deleteItem(item.id)" title="Hapus" v-if="hasPermission('Jenis Satuan (Aplikasi)', 'canDelete')">
                🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <span>Menampilkan {{ paginatedData.length }} data dari total {{ filteredData.length }} data</span>
        <div class="page-numbers">
          <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
          
          <button v-for="page in totalPages" :key="page" class="btn-page" :class="{ active: currentPage === page }" @click="currentPage = page">
            {{ page }}
          </button>
          
          <button class="btn-page" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next</button>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div class="modal-backdrop" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ form.id ? 'Edit' : 'Tambah' }} Satuan</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama Satuan</label>
            <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: PCS / KG / BOX" style="width: 100%; box-sizing: border-box;" />
          </div>
          <div class="checkbox-wrap">
            <input type="checkbox" id="default-check" v-model="form.default" />
            <label for="default-check" style="margin: 0; cursor: pointer;">Jadikan Default</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-outline" @click="closeModal">Batal</button>
          <button class="btn-primary" @click="saveData">{{ form.id ? 'Simpan Data' : 'Tambah Data' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, computed, onMounted, inject } from 'vue';
const hasPermission = inject('hasPermission', () => true);
import axios from 'axios';

const listData = ref([]);
const showModal = ref(false);
const fileInput = ref(null);

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const form = ref({
  id: null,
  nama: '',
  default: false
});

const fetchData = async () => {
  try {
    const res = await axios.get('/api/jenis-satuan');
    if (res.data.success) {
      listData.value = res.data.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const filteredData = computed(() => {
  if (!searchQuery.value) return listData.value;
  const q = searchQuery.value.toLowerCase();
  return listData.value.filter(item => item.nama.toLowerCase().includes(q));
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage.value);
});

const openModal = (item = null) => {
  if (item) {
    form.value = { ...item };
  } else {
    form.value = { id: null, nama: '', default: false };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveData = async () => {
  if (!form.value.nama) {
    alert("Nama Satuan wajib diisi");
    return;
  }
  try {
    let res;
    if (form.value.id) {
      res = await axios.put(`/api/jenis-satuan/${form.value.id}`, form.value);
    } else {
      res = await axios.post('/api/jenis-satuan', form.value);
    }
    if (res.data.success) {
      alert("Data berhasil disimpan");
      closeModal();
      fetchData();
    }
  } catch (error) {
    alert(error.response?.data?.message || "Terjadi kesalahan");
  }
};

const deleteItem = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
  try {
    const res = await axios.delete(`/api/jenis-satuan/${id}`);
    if (res.data.success) {
      fetchData();
    }
  } catch (error) {
    alert("Gagal menghapus data");
  }
};

// Export CSV Logic
const exportCSV = () => {
  if (listData.value.length === 0) {
    alert("Tidak ada data untuk diexport");
    return;
  }
  
  const headers = ['ID', 'Nama Satuan', 'Default'];
  const rows = listData.value.map(item => [
    item.id,
    `"${item.nama}"`,
    item.default ? 'Ya' : 'Tidak'
  ]);
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'jenis_satuan_export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Import CSV Logic
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleImportFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = e.target.result;
    const lines = text.split('\n');
    const importData = [];
    
    // Skip header assuming format: Nama Satuan, Default
    // For simplicity, we just look for comma separated values
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const cols = line.split(',');
      if (cols.length >= 2) {
        // If exported from this system, index 1 is nama, 2 is default.
        // But let's accept a simple format: "Nama Satuan", "Default (true/false or Ya/Tidak)"
        // Let's assume the user uses the exported format: ID, Nama, Default
        let nama = cols[1]?.replace(/"/g, '')?.trim();
        let isDefault = cols[2]?.toLowerCase()?.includes('ya') || cols[2]?.toLowerCase()?.includes('true');
        
        if (!nama && cols.length === 2) { // Fallback to simpler format
            nama = cols[0]?.replace(/"/g, '')?.trim();
            isDefault = cols[1]?.toLowerCase()?.includes('ya') || cols[1]?.toLowerCase()?.includes('true');
        }

        if (nama) {
          importData.push({ nama, default: isDefault });
        }
      }
    }

    if (importData.length > 0) {
      try {
        const res = await axios.post('/api/jenis-satuan/bulk', importData);
        if (res.data.success) {
          alert(res.data.message);
          fetchData();
        }
      } catch (error) {
        alert("Gagal melakukan import data");
      }
    } else {
      alert("Format CSV tidak valid atau kosong.");
    }
    // reset input
    fileInput.value.value = '';
  };
  reader.readAsText(file);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped src="../../../assets/css/aplikasi-jenissatuan.css"></style>
