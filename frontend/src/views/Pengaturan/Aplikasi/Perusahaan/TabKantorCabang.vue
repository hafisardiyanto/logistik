<template>
  <div class="tab-content-wrapper">
    <div class="toolbar d-flex justify-content-between align-items-center mb-4">
      <h5 class="m-0 font-weight-bold" style="font-size: 16px;">Daftar Kantor Cabang</h5>
      <button class="btn-primary" @click="goToForm(null)">
        + Tambah Cabang Baru
      </button>
    </div>

    <div class="filters d-flex justify-content-between align-items-center mb-3">
      <div class="filter-left d-flex align-items-center gap-2">
        <span style="font-size: 14px; color: #6c757d;">Menampilkan</span>
        <select v-model="perPage" class="form-control form-control-sm" style="width: 70px;" @change="currentPage = 1">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div class="filter-right">
        <input type="text" v-model="searchQuery" class="form-control form-control-sm" placeholder="Cari Nama/Kode..." @keyup.enter="currentPage = 1" style="width: 250px;" />
      </div>
    </div>

    <div class="table-responsive">
      <table class="data-table w-100">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Cabang</th>
            <th>NPWP</th>
            <th>Telepon</th>
            <th>Email</th>
            <th>Status</th>
            <th style="width: 80px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="7" class="text-center py-4 text-muted">Data tidak ditemukan</td>
          </tr>
          <tr v-for="item in paginatedData" :key="item.id">
            <td style="font-weight: 500;">{{ item.kode }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.npwp || '-' }}</td>
            <td>{{ item.telepon || '-' }}</td>
            <td>{{ item.email || '-' }}</td>
            <td>
              <span :class="item.aktif ? 'badge-active' : 'badge-inactive'">
                {{ item.aktif ? 'Aktif' : 'Non-Aktif' }}
              </span>
            </td>
            <td style="text-align: right;">
              <button class="btn-icon text-primary" @click="goToForm(item.id)" title="Edit">
                <i class="fa fa-edit"></i> ✎
              </button>
              <button class="btn-icon text-danger" @click="deleteItem(item.id)" title="Hapus">
                <i class="fa fa-trash"></i> 🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination d-flex justify-content-between align-items-center mt-3">
      <span style="font-size: 13px; color: #6c757d;">Menampilkan {{ paginatedData.length }} dari {{ filteredData.length }} data</span>
      <div class="page-numbers d-flex gap-1">
        <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
        <button v-for="page in totalPages" :key="page" class="btn-page" :class="{ active: currentPage === page }" @click="currentPage = page">
          {{ page }}
        </button>
        <button class="btn-page" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const listData = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const fetchData = async () => {
  try {
    const res = await axios.get('/api/perusahaan');
    if (res.data.success) {
      listData.value = res.data.data;
    }
  } catch (error) {
    console.error("Error fetching perusahaan:", error);
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
    router.push(`/pengaturan/perusahaan/edit/${id}?tab=cabang`);
  } else {
    router.push('/pengaturan/perusahaan/tambah?tab=cabang');
  }
};

const deleteItem = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data cabang ini?")) return;
  try {
    const res = await axios.delete(`/api/perusahaan/${id}`);
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

<style scoped>
.tab-content-wrapper {
  animation: fadeIn 0.3s ease-in-out;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th, .data-table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 16px;
  font-size: 14px;
  text-align: left;
}
.data-table th {
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 600;
}
.badge-active {
  background-color: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
.badge-inactive {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
}
.btn-page {
  padding: 4px 10px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}
.btn-page.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}
.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
