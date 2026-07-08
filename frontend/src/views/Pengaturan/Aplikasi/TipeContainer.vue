<template>
  <div class="aplikasi-tipecontainer-page">
    <div class="page-header">
      <h1>Tipe Container</h1>
      <div class="breadcrumb">
        <span>Home</span> &gt; <span>Pengaturan Aplikasi</span> &gt; <span>Tipe Container</span>
      </div>
    </div>

    <div class="table-card">
      <div class="toolbar">
        <input type="file" ref="fileInput" accept=".csv" style="display: none" @change="handleImportFile" />
        <button class="btn-outline" @click="triggerFileInput">
          Import CSV
        </button>
        <button class="btn-success" @click="exportCSV">
          Export CSV
        </button>
        <button class="btn-primary" @click="openModal()">
          + Tambah Data
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
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Masukkan Nama Tipe Lalu Tekan Enter" @keyup.enter="currentPage = 1" />
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Nama Tipe Container</th>
            <th>Ukuran (Feet)</th>
            <th style="width: 100px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="3" style="text-align: center; padding: 20px;">Data tidak ditemukan</td>
          </tr>
          <tr v-for="item in paginatedData" :key="item.id">
            <td style="color: #2563eb;">{{ item.nama }}</td>
            <td>{{ item.ukuran }}</td>
            <td style="text-align: right;">
              <button class="btn-icon text-primary" @click="openModal(item)" title="Edit">
                ✎
              </button>
              <button class="btn-icon text-danger" @click="deleteItem(item.id)" title="Hapus">
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
          <h3>{{ form.id ? 'Edit' : 'Tambah' }} Tipe Container</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama Tipe Container <span class="text-danger">*</span></label>
            <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: 20ft Standard" style="width: 100%; box-sizing: border-box;" />
          </div>
          <div class="form-group">
            <label>Ukuran (Feet)</label>
            <input type="text" v-model="form.ukuran" class="form-control" placeholder="20, 40, etc." style="width: 100%; box-sizing: border-box;" />
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
import { ref, computed, onMounted } from 'vue';
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
  ukuran: ''
});

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/tipe-container');
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
    form.value = { id: null, nama: '', ukuran: '' };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveData = async () => {
  if (!form.value.nama) {
    alert("Nama Tipe Container wajib diisi");
    return;
  }
  try {
    let res;
    if (form.value.id) {
      res = await axios.put(`http://localhost:3000/api/tipe-container/${form.value.id}`, form.value);
    } else {
      res = await axios.post('http://localhost:3000/api/tipe-container', form.value);
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
    const res = await axios.delete(`http://localhost:3000/api/tipe-container/${id}`);
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
  
  const headers = ['ID', 'Nama Tipe Container', 'Ukuran (Feet)'];
  const rows = listData.value.map(item => [
    item.id,
    `"${item.nama}"`,
    `"${item.ukuran}"`
  ]);
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'tipe_container_export.csv');
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
    
    // Skip header assuming format: Nama Tipe Container, Ukuran (Feet)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const cols = line.split(',');
      if (cols.length >= 2) {
        // If exported from this system, index 1 is nama, 2 is ukuran.
        let nama = cols[1]?.replace(/"/g, '')?.trim();
        let ukuran = cols[2]?.replace(/"/g, '')?.trim();
        
        if (!nama && cols.length === 2) { // Fallback to simpler format
            nama = cols[0]?.replace(/"/g, '')?.trim();
            ukuran = cols[1]?.replace(/"/g, '')?.trim();
        }

        if (nama) {
          importData.push({ nama, ukuran });
        }
      }
    }

    if (importData.length > 0) {
      try {
        const res = await axios.post('http://localhost:3000/api/tipe-container/bulk', importData);
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

<style scoped src="../../../assets/css/aplikasi-tipecontainer.css"></style>
