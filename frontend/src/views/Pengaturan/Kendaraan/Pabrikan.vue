<template>
  <div class="pabrikan-page">
    <div class="page-header">
      <h1>Pabrikan / Manufaktur</h1>
      <p class="breadcrumb">
        <router-link to="/">Home</router-link> &gt; 
        <router-link to="/pengaturan/aplikasi">Pengaturan Aplikasi</router-link> &gt; 
        <span>Pabrikan / Manufaktur</span>
      </p>
    </div>

    <div class="card-container">
      <div class="card-header flex justify-end mb-4">
        <button class="btn btn-primary" @click="openAddForm()">
          <i class="fas fa-plus"></i> Tambah Data
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
          <input type="text" v-model="searchQuery" placeholder="Masukkan Nama Pabrikan Lalu Tekan Enter" />
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Pabrikan <i class="fas fa-sort"></i></th>
              <th>Tipe Pabrikan <i class="fas fa-sort"></i></th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td class="text-primary font-bold">{{ item.nama }}</td>
              <td class="text-primary">{{ item.tipePabrikan?.nama }}</td>
              <td class="action-buttons text-right">
                <button class="btn btn-info btn-sm mr-2" @click="openDetailForm(item)">Detail</button>
                <button class="btn btn-warning btn-sm mr-2" @click="openEditForm(item)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteData(item.id)">Hapus</button>
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td colspan="3" class="text-center py-4">
                <p class="mb-2">Data Kosong</p>
                <button class="btn btn-primary" @click="openAddForm()">+ Tambah Data</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination flex justify-between align-center mt-4">
        <div>Menampilkan {{ filteredData.length }} data dari total {{ allData.length }} data</div>
        <div class="page-buttons">
          <button class="btn btn-secondary mr-2" disabled>Prev</button>
          <button class="btn btn-secondary" disabled>Next</button>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div class="modal-overlay" v-if="showForm">
      <div class="modal-content">
        <div class="modal-header flex justify-between align-center">
          <h2>{{ isDetail ? 'Detail Pabrikan' : (isEdit ? 'Edit Pabrikan' : 'Tambah Pabrikan') }}</h2>
          <button class="btn-close" @click="closeForm()">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveData">
            <div class="form-group">
              <label>Nama Pabrikan <span v-if="!isDetail" class="text-danger">*</span></label>
              <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: Toyota, Hino, etc." :disabled="isDetail" required />
            </div>
            <div class="form-group">
              <label>Tipe Pabrikan <span v-if="!isDetail" class="text-danger">*</span></label>
              <select v-model="form.tipePabrikanId" class="form-control" :disabled="isDetail" required>
                <option value="">Pilih tipe</option>
                <option v-for="tipe in listTipe" :key="tipe.id" :value="tipe.id">
                  {{ tipe.nama }}
                </option>
              </select>
            </div>
            <div class="form-actions flex justify-end mt-4" v-if="!isDetail">
              <button type="submit" class="btn btn-primary w-100">Simpan Data</button>
            </div>
            <div class="form-actions flex justify-end mt-4" v-else>
              <button type="button" class="btn btn-secondary w-100" @click="closeForm()">Tutup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000/api/pabrikan';

const allData = ref([]);
const listTipe = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const isDetail = ref(false);
const searchQuery = ref('');
const perPage = ref(10);

const form = ref({
  id: null,
  nama: '',
  tipePabrikanId: ''
});

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    allData.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data pabrikan:", error);
  }
};

const fetchTipe = async () => {
  try {
    const response = await axios.get(`${API_URL}/tipe`);
    listTipe.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data tipe pabrikan:", error);
  }
};

onMounted(() => {
  fetchData();
  fetchTipe();
});

const filteredData = computed(() => {
  if (!searchQuery.value) return allData.value;
  const q = searchQuery.value.toLowerCase();
  
  return allData.value.filter(item => {
    return item.nama.toLowerCase().includes(q) || 
           (item.tipePabrikan && item.tipePabrikan.nama.toLowerCase().includes(q));
  });
});

const openAddForm = () => {
  isEdit.value = false;
  isDetail.value = false;
  resetForm();
  showForm.value = true;
};

const openEditForm = (item) => {
  isEdit.value = true;
  isDetail.value = false;
  form.value = {
    id: item.id,
    nama: item.nama,
    tipePabrikanId: item.tipePabrikanId
  };
  showForm.value = true;
};

const openDetailForm = (item) => {
  isEdit.value = false;
  isDetail.value = true;
  form.value = {
    id: item.id,
    nama: item.nama,
    tipePabrikanId: item.tipePabrikanId
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
    nama: '',
    tipePabrikanId: ''
  };
};

const saveData = async () => {
  if (isDetail.value) return; // Prevent save if somehow triggered in detail mode
  
  try {
    const payload = {
      nama: form.value.nama,
      tipePabrikanId: form.value.tipePabrikanId
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
      const errorMsg = error.response?.data?.error || 'Gagal menghapus data';
      // Tampilkan error yang spesifik terkait foreign key
      Swal.fire('Error', errorMsg, 'error');
    }
  }
};
</script>

<style scoped>
@import '../../../assets/css/pabrikan.css';
</style>
