<template>
  <div class="aplikasi-trayek-page">
    <div class="page-header">
      <h1>Trayek / Rute</h1>
      <div class="breadcrumb">
        <RouterLink to="/" title="/">Home</RouterLink> &gt; <RouterLink to="/pengaturan/aplikasi" title="/pengaturan/aplikasi">Pengaturan Aplikasi</RouterLink> &gt; <span>Trayek / Rute</span>
      </div>
    </div>

    <div class="table-card">
      <div class="toolbar">
        <button class="btn-primary" @click="goToForm(null)" v-if="hasPermission('Trayek (Aplikasi)', 'canCreate')">
          + Tambah Trayek/Rute
        </button>
      </div>

      <div class="filters">
        <div class="filter-left">
          <span>Menampilkan</span>
          <select v-model="perPage" class="form-control" style="width: auto;" @change="currentPage = 1">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
        <div class="filter-right">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Masukkan Nama Trayek Lalu Tekan Enter" @keyup.enter="currentPage = 1" />
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Trayek/Rute</th>
            <th>Kota Asal</th>
            <th>Kota Tujuan</th>
            <th>Keterangan</th>
            <th style="width: 80px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">Data tidak ditemukan</td>
          </tr>
          <tr v-for="item in paginatedData" :key="item.id">
            <td style="font-weight: 500;">{{ item.kode }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.kotaAsal?.nama }}</td>
            <td>{{ item.kotaTujuan?.nama }}</td>
            <td>{{ item.keterangan || '-' }}</td>
            <td style="text-align: right;">
              <button class="btn-icon text-primary" @click="goToForm(item.id)" title="Edit" v-if="hasPermission('Trayek (Aplikasi)', 'canUpdate')">
                <i class="fa fa-edit"></i> ✎
              </button>
              <button class="btn-icon text-danger" @click="deleteItem(item.id)" title="Hapus" v-if="hasPermission('Trayek (Aplikasi)', 'canDelete')">
                <i class="fa fa-trash"></i> 🗑
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';

const hasPermission = inject('hasPermission', () => true);
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const listData = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const fetchData = async () => {
  try {
    const res = await axios.get('/api/trayek');
    if (res.data.success) {
      listData.value = res.data.data;
    }
  } catch (error) {
    console.error("Error fetching trayek:", error);
  }
};

const filteredData = computed(() => {
  if (!searchQuery.value) return listData.value;
  const q = searchQuery.value.toLowerCase();
  return listData.value.filter(item => 
    item.nama.toLowerCase().includes(q) || 
    item.kode.toLowerCase().includes(q)
  );
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage.value);
});

const goToForm = (id = null) => {
  if (id) {
    router.push(`/pengaturan/aplikasi/trayek/edit/${id}`);
  } else {
    router.push('/pengaturan/aplikasi/trayek/tambah');
  }
};

const deleteItem = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data trayek ini?")) return;
  try {
    const res = await axios.delete(`/api/trayek/${id}`);
    if (res.data.success) {
      fetchData();
    }
  } catch (error) {
    alert("Gagal menghapus data");
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped src="../../../../assets/css/aplikasi-trayek.css"></style>
