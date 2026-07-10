<template>
  <div class="tipe-kendaraan-page">
    <div class="page-header">
      <h1>Tipe Kendaraan</h1>
      <p class="breadcrumb">
        <router-link to="/">Home</router-link> &gt; 
        <router-link to="/pengaturan/aplikasi">Pengaturan Aplikasi</router-link> &gt; 
        <span>Tipe Kendaraan</span>
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
          <input type="text" v-model="searchQuery" placeholder="Masukkan Nama Tipe Lalu Tekan Enter" />
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Tipe <i class="fas fa-sort"></i></th>
              <th>Moda <i class="fas fa-sort"></i></th>
              <th>Kapasitas (Ton) <i class="fas fa-sort"></i></th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td class="text-primary font-bold">{{ item.nama }}</td>
              <td>{{ item.tipeModa?.nama }}</td>
              <td>{{ item.kapasitasTonase }}</td>
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
          <h2>{{ isDetail ? 'Detail Tipe Kendaraan' : (isEdit ? 'Edit Tipe Kendaraan' : 'Tambah Tipe Kendaraan') }}</h2>
          <button class="btn-close" @click="closeForm()">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveData">
            <div class="form-group">
              <label>Nama Tipe Kendaraan <span v-if="!isDetail" class="text-danger">*</span></label>
              <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: CDD Long" :disabled="isDetail" required />
            </div>
            
            <div class="form-group">
              <label>Tipe Moda <span v-if="!isDetail" class="text-danger">*</span></label>
              <select v-model="form.tipeModaId" class="form-control" :disabled="isDetail" required>
                <option value="">Pilih Moda</option>
                <option v-for="moda in listModa" :key="moda.id" :value="moda.id">
                  {{ moda.nama }}
                </option>
              </select>
            </div>

            <div class="form-row flex justify-between">
              <div class="form-group w-48">
                <label>Kapasitas Tonase</label>
                <input type="number" step="0.01" v-model="form.kapasitasTonase" class="form-control" :disabled="isDetail" />
              </div>
              <div class="form-group w-48">
                <label>Kapasitas Kubikasi</label>
                <input type="number" step="0.01" v-model="form.kapasitasKubikasi" class="form-control" :disabled="isDetail" />
              </div>
            </div>

            <div class="form-row flex justify-between">
              <div class="form-group w-48">
                <label>Rasio BBM (Muat)</label>
                <input type="number" step="0.01" v-model="form.rasioBbmMuat" class="form-control" :disabled="isDetail" />
              </div>
              <div class="form-group w-48">
                <label>Rasio BBM (Kosong)</label>
                <input type="number" step="0.01" v-model="form.rasioBbmKosong" class="form-control" :disabled="isDetail" />
              </div>
            </div>

            <div class="form-actions flex justify-end mt-4" v-if="!isDetail">
              <button type="button" class="btn btn-transparent mr-2" @click="closeForm()">Batal</button>
              <button type="submit" class="btn btn-primary">Simpan Data</button>
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

const API_URL = 'http://localhost:3000/api/tipe-kendaraan';

const allData = ref([]);
const listModa = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const isDetail = ref(false);
const searchQuery = ref('');
const perPage = ref(10);

const form = ref({
  id: null,
  nama: '',
  tipeModaId: '',
  kapasitasTonase: 0,
  kapasitasKubikasi: 0,
  rasioBbmMuat: 0,
  rasioBbmKosong: 0
});

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    allData.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

const fetchModa = async () => {
  try {
    const response = await axios.get(`${API_URL}/moda`);
    listModa.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data tipe moda:", error);
  }
};

onMounted(() => {
  fetchData();
  fetchModa();
});

const filteredData = computed(() => {
  if (!searchQuery.value) return allData.value;
  const q = searchQuery.value.toLowerCase();
  
  return allData.value.filter(item => {
    return item.nama.toLowerCase().includes(q) || 
           (item.tipeModa && item.tipeModa.nama.toLowerCase().includes(q));
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
    tipeModaId: item.tipeModaId,
    kapasitasTonase: item.kapasitasTonase,
    kapasitasKubikasi: item.kapasitasKubikasi,
    rasioBbmMuat: item.rasioBbmMuat,
    rasioBbmKosong: item.rasioBbmKosong
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
    tipeModaId: '',
    kapasitasTonase: 0,
    kapasitasKubikasi: 0,
    rasioBbmMuat: 0,
    rasioBbmKosong: 0
  };
};

const saveData = async () => {
  if (isDetail.value) return; 
  
  try {
    const payload = {
      nama: form.value.nama,
      tipeModaId: form.value.tipeModaId,
      kapasitasTonase: form.value.kapasitasTonase,
      kapasitasKubikasi: form.value.kapasitasKubikasi,
      rasioBbmMuat: form.value.rasioBbmMuat,
      rasioBbmKosong: form.value.rasioBbmKosong
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
@import '../../../assets/css/tipe-kendaraan.css';
</style>
