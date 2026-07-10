<template>
  <div class="body-kendaraan-page">
    <div class="page-header">
      <h1>Body Kendaraan</h1>
      <p class="breadcrumb">
        <router-link to="/">Home</router-link> &gt; 
        <router-link to="/pengaturan/aplikasi">Pengaturan Aplikasi</router-link> &gt; 
        <span>Body Kendaraan</span>
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
          <input type="text" v-model="searchQuery" placeholder="Masukkan Nama Body Lalu Tekan Enter" />
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Body <i class="fas fa-sort"></i></th>
              <th style="text-align: center;">Pengecekan <i class="fas fa-sort"></i></th>
              <th style="text-align: center;">Tampil <i class="fas fa-sort"></i></th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td class="text-primary font-bold">{{ item.nama }}</td>
              <td style="text-align: center;">
                <span :class="item.isPengecekan ? 'badge badge-primary' : 'badge badge-secondary'">
                  {{ item.isPengecekan ? 'Ya' : 'Tidak' }}
                </span>
              </td>
              <td style="text-align: center;">
                <span :class="item.isAktif ? 'badge badge-primary' : 'badge badge-secondary'">
                  {{ item.isAktif ? 'Ya' : 'Tidak' }}
                </span>
              </td>
              <td class="action-buttons text-right">
                <button class="btn btn-info btn-sm mr-2" @click="openDetailForm(item)">Detail</button>
                <button class="btn btn-warning btn-sm mr-2" @click="openEditForm(item)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteData(item.id)">Hapus</button>
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td colspan="4" class="text-center py-4">
                <p class="mb-2">Data Kosong</p>
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
      <div class="modal-content form-modal">
        <div class="modal-header flex justify-between align-center">
          <h2>{{ isDetail ? 'Detail Body' : (isEdit ? 'Edit Body' : 'Tambah Body') }}</h2>
          <button class="btn-close" @click="closeForm()">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveData">
            <div class="form-group">
              <label>Nama Body <span v-if="!isDetail" class="text-danger">*</span></label>
              <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: Box, Bak, etc." :disabled="isDetail" required />
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.isPengecekan" :disabled="isDetail" />
                Tampilkan di Pengecekan
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.isAktif" :disabled="isDetail" />
                Aktif / Tampilkan
              </label>
            </div>

            <div class="form-actions flex justify-end mt-4" v-if="!isDetail">
              <button type="button" class="btn btn-transparent mr-2" @click="closeForm()">Batal</button>
              <button type="submit" class="btn btn-primary">{{ isEdit ? 'Simpan Data' : 'Tambah Data' }}</button>
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

const API_URL = 'http://localhost:3000/api/body-kendaraan';

const allData = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const isDetail = ref(false);
const searchQuery = ref('');
const perPage = ref(10);

const form = ref({
  id: null,
  nama: '',
  isPengecekan: true,
  isAktif: true
});

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

const filteredData = computed(() => {
  if (!searchQuery.value) return allData.value;
  const q = searchQuery.value.toLowerCase();
  
  return allData.value.filter(item => {
    return item.nama.toLowerCase().includes(q);
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
  populateForm(item);
  showForm.value = true;
};

const openDetailForm = (item) => {
  isEdit.value = false;
  isDetail.value = true;
  populateForm(item);
  showForm.value = true;
};

const populateForm = (item) => {
  form.value = {
    id: item.id,
    nama: item.nama,
    isPengecekan: item.isPengecekan,
    isAktif: item.isAktif
  };
};

const closeForm = () => {
  showForm.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    id: null,
    nama: '',
    isPengecekan: true,
    isAktif: true
  };
};

const saveData = async () => {
  if (isDetail.value) return; 
  
  try {
    const payload = {
      nama: form.value.nama,
      isPengecekan: form.value.isPengecekan,
      isAktif: form.value.isAktif
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
      Swal.fire('Error', errorMsg, 'error');
    }
  }
};
</script>

<style scoped>
@import '../../../assets/css/body-kendaraan.css';
</style>
