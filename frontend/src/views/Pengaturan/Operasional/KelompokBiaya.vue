<template>
  <div class="operasional-kelompokbiaya-page">
    <div class="page-header" v-if="!showForm">
      <h1>Kelompok Biaya Operasional</h1>
      <p class="breadcrumb">Home &gt; Pengaturan Aplikasi &gt; Kelompok Biaya Operasional</p>
    </div>
    
    <div class="page-header" v-if="showForm">
      <h1>{{ isEdit ? 'Edit Kelompok Biaya' : 'Tambah Kelompok Biaya' }}</h1>
      <p class="breadcrumb">Home &gt; Pengaturan Aplikasi &gt; Kelompok Biaya Operasional &gt; {{ isEdit ? 'Edit' : 'Tambah' }} Kelompok Biaya</p>
    </div>

    <div class="card-container" v-if="!showForm">
      <div class="card-header flex justify-between align-center">
        <h2>Master Biaya</h2>
        <button class="btn btn-primary" @click="openAddForm()" v-if="hasPermission('Kelompok Biaya', 'canCreate')">
          <i class="fas fa-plus"></i> Tambah Jenis Biaya
        </button>
      </div>

      <div class="table-controls flex justify-between">
        <div class="entries-select">
          Menampilkan 
          <select v-model="perPage">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="Search:" />
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Kode <i class="fas fa-sort"></i></th>
              <th>Nama <i class="fas fa-sort"></i></th>
              <th>Std Biaya <i class="fas fa-sort"></i></th>
              <th>Kelompok Akun <i class="fas fa-sort"></i></th>
              <th>Keterangan <i class="fas fa-sort"></i></th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="parent in filteredData" :key="parent.id">
              <tr class="parent-row">
                <td class="font-bold text-primary">{{ parent.kode }}</td>
                <td class="font-bold text-primary uppercase">{{ parent.nama }}</td>
                <td>{{ formatRupiah(parent.stdBiaya) }}</td>
                <td>{{ parent.kodeAkun || '-' }}</td>
                <td>{{ parent.keterangan || '-' }}</td>
                <td class="action-buttons text-right">
                  <button class="btn-icon text-primary" @click="openEditForm(parent)" v-if="hasPermission('Kelompok Biaya', 'canUpdate')"><i class="far fa-edit"></i></button>
                  <button class="btn-icon text-danger" @click="deleteData(parent.id)"><i class="far fa-trash-alt"></i></button>
                </td>
              </tr>
              <tr v-for="child in parent.children" :key="child.id" class="child-row">
                <td class="indent-1 text-bold">{{ child.kode }}</td>
                <td class="text-gray">{{ child.nama }}</td>
                <td>{{ formatRupiah(child.stdBiaya) }}</td>
                <td>{{ child.kodeAkun || '-' }}</td>
                <td>{{ child.keterangan || '-' }}</td>
                <td class="action-buttons text-right">
                  <button class="btn-icon text-primary" @click="openEditForm(child)" v-if="hasPermission('Kelompok Biaya', 'canUpdate')"><i class="far fa-edit"></i></button>
                  <button class="btn-icon text-danger" @click="deleteData(child.id)"><i class="far fa-trash-alt"></i></button>
                </td>
              </tr>
            </template>
            <tr v-if="filteredData.length === 0">
              <td colspan="6" class="text-center py-4">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination flex justify-between align-center mt-4">
        <div>Menampilkan {{ filteredData.length }} data dari total {{ filteredData.length }} data</div>
        <div class="page-buttons">
          <button class="btn btn-secondary mr-2" disabled>Prev</button>
          <button class="btn btn-secondary" disabled>Next</button>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="card-container form-card" v-if="showForm">
      <form @submit.prevent="saveData">
        <div class="form-group">
          <label>Kategori</label>
          <select v-model="form.kategoriId" class="form-control">
            <option value="">Select a cost (Kosongkan jika ini kategori utama)</option>
            <option v-for="item in topLevelData" :key="item.id" :value="item.id">
              {{ item.kode }} - {{ item.nama }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Kode Akun</label>
          <input type="text" v-model="form.kodeAkun" class="form-control" placeholder="Select an account" />
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Kode</label>
            <input type="text" v-model="form.kode" class="form-control" placeholder="Kode" required />
          </div>
          <div class="form-group half">
            <label>Nama Biaya</label>
            <input type="text" v-model="form.nama" class="form-control" placeholder="Cost Name" required />
          </div>
        </div>

        <div class="form-group">
          <label>Biaya</label>
          <div class="input-group">
            <span class="input-group-text">Rp.</span>
            <input type="number" v-model="form.stdBiaya" class="form-control" placeholder="0" />
          </div>
        </div>

        <div class="form-group">
          <label>Tipe</label>
          <div class="checkbox-grid">
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Operasional"> Operasional</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Biaya BBM"> Biaya BBM</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Biaya Vendor"> Biaya Vendor</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Invoice"> Invoice</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Biaya Driver"> Biaya Driver</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Operasional Kantor"> Operasional Kantor</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Biaya Kendaraan"> Biaya Kendaraan</label>
            <label class="checkbox-label"><input type="checkbox" v-model="form.tipeSelected" value="Reimburstment"> Reimburstment</label>
          </div>
        </div>

        <div class="form-group">
          <label>Keterangan</label>
          <input type="text" v-model="form.keterangan" class="form-control" placeholder="Keterangan" />
        </div>

        <div class="form-actions mt-4">
          <button type="button" class="btn btn-danger mr-2" @click="closeForm()">Batal</button>
          <button type="submit" class="btn btn-primary">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';

const hasPermission = inject('hasPermission', () => true);
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000/api/kelompok-biaya';

const allData = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');
const perPage = ref(10);

const form = ref({
  id: null,
  kategoriId: '',
  kodeAkun: '',
  kode: '',
  nama: '',
  stdBiaya: 0,
  tipeSelected: [],
  keterangan: ''
});

// Fetch Data
const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    allData.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

onMounted(() => {
  fetchData();
});

// Top level data for select
const topLevelData = computed(() => {
  return allData.value.filter(item => !item.kategoriId);
});

// Structured data for table
const tableData = computed(() => {
  const topLevels = allData.value.filter(item => !item.kategoriId);
  return topLevels.map(parent => {
    return {
      ...parent,
      children: allData.value.filter(child => child.kategoriId === parent.id)
    };
  });
});

const filteredData = computed(() => {
  if (!searchQuery.value) return tableData.value;
  const q = searchQuery.value.toLowerCase();
  
  return tableData.value.filter(parent => {
    const parentMatch = parent.kode.toLowerCase().includes(q) || parent.nama.toLowerCase().includes(q);
    const childMatch = parent.children.some(child => 
      child.kode.toLowerCase().includes(q) || child.nama.toLowerCase().includes(q)
    );
    return parentMatch || childMatch;
  });
});

const formatRupiah = (value) => {
  if (!value) return '0';
  return value.toLocaleString('id-ID');
};

const openAddForm = () => {
  isEdit.value = false;
  resetForm();
  showForm.value = true;
};

const openEditForm = (item) => {
  isEdit.value = true;
  let parsedTipe = [];
  try {
    if (item.tipe) {
      const parsed = JSON.parse(item.tipe);
      parsedTipe = Array.isArray(parsed) ? parsed : [item.tipe];
    }
  } catch (e) {
    parsedTipe = item.tipe ? [item.tipe] : [];
  }

  form.value = {
    id: item.id,
    kategoriId: item.kategoriId || '',
    kodeAkun: item.kodeAkun || '',
    kode: item.kode,
    nama: item.nama,
    stdBiaya: item.stdBiaya || 0,
    tipeSelected: parsedTipe,
    keterangan: item.keterangan || ''
  };
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    id: null,
    kategoriId: '',
    kodeAkun: '',
    kode: '',
    nama: '',
    stdBiaya: 0,
    tipeSelected: [],
    keterangan: ''
  };
};

const saveData = async () => {
  try {
    const payload = {
      kategoriId: form.value.kategoriId || null,
      kodeAkun: form.value.kodeAkun,
      kode: form.value.kode,
      nama: form.value.nama,
      stdBiaya: form.value.stdBiaya,
      tipe: form.value.tipeSelected,
      keterangan: form.value.keterangan
    };

    if (isEdit.value) {
      await axios.put(`${API_URL}/${form.value.id}`, payload);
      Swal.fire('Berhasil!', 'Data berhasil diubah.', 'success');
    } else {
      await axios.post(API_URL, payload);
      Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success');
    }
    closeForm();
    fetchData();
  } catch (error) {
    console.error(error);
    Swal.fire('Error', error.response?.data?.error || 'Gagal menyimpan data', 'error');
  }
};

const deleteData = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, hapus!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Gagal menghapus data', 'error');
    }
  }
};
</script>

<style scoped>
.operasional-kelompokbiaya-page {
  padding: 20px;
}
.page-header h1 {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 600;
}
.breadcrumb {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
}
.card-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #eaeaea;
}
.form-card {
  max-width: 100%;
}
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
.mt-4 { margin-top: 1rem; }
.mr-2 { margin-right: 0.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.font-bold, .text-bold { font-weight: bold; }
.text-primary { color: #0056b3; }
.uppercase { text-transform: uppercase; }
.text-gray { color: #6c757d; }
.text-danger { color: #dc3545; }

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary { background: #2a68e8; color: white; }
.btn-danger { background: #e02424; color: white; }
.btn-secondary { background: #a4bdfc; color: white; }
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
}

.table-controls { margin-bottom: 15px; }
.search-box {
  position: relative;
}
.search-box input {
  padding: 6px 10px 6px 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.search-box i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th, .data-table td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}
.data-table th {
  color: #666;
  font-weight: 500;
  border-bottom: 2px solid #ddd;
}
.parent-row td {
  background-color: #fcfcfc;
}
.child-row td {
  background-color: #ffffff;
}
.indent-1 {
  padding-left: 30px !important;
}

.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}
.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
.form-row {
  display: flex;
  gap: 15px;
}
.half {
  flex: 1;
}
.input-group {
  display: flex;
}
.input-group-text {
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #666;
}
.input-group .form-control {
  border-radius: 0 4px 4px 0;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal !important;
}
</style>
