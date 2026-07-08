<template>
  <div class="aplikasi-jenislayanan-page">
    <div class="page-header">
      <h1>{{ isDetail ? 'Detail' : (form.id ? 'Edit' : 'Tambah') }} Layanan Logistik</h1>
      <div class="breadcrumb">
        <span>Home</span> > <span>Pengaturan Aplikasi</span> > <span>Jenis Layanan Logistik</span> > <span>{{ isDetail ? 'Detail' : (form.id ? 'Edit' : 'Tambah') }} Layanan</span>
      </div>
      
    </div>

    <div class="form-card" v-if="isAdding">
      <div class="form-grid">
        <div class="form-column">
          <div class="form-group">
            <label>Kode <span class="text-danger" v-if="!isDetail">*</span></label>
            <input type="text" v-model="form.kode" class="form-control" :disabled="isDetail" />
          </div>

          <div class="form-group">
            <label>Nama Layanan <span class="text-danger" v-if="!isDetail">*</span></label>
            <input type="text" v-model="form.nama" class="form-control" :disabled="isDetail" />
          </div>

          <div class="form-group">
            <label>Grup Layanan</label>
            <select v-model="form.groupId" class="form-control" :disabled="isDetail">
              <option value="">Pilih Grup Layanan</option>
              <option v-for="grup in groupLayananList" :key="grup.id" :value="grup.id">
                {{ grup.nama }}
              </option>
            </select>
          </div>
          
          <div class="form-actions">
            <button class="btn-batal" @click="batal">{{ isDetail ? 'Kembali' : 'Batal' }}</button>
            <button class="btn-simpan" @click="simpanData" v-if="!isDetail">Simpan</button>
          </div>
        </div>

        <div class="form-column">
          <div class="form-group">
            <label>Keterangan</label>
            <textarea v-model="form.keterangan" class="form-control textarea" placeholder="Masukkan keterangan tambahan jika diperlukan..." :disabled="isDetail"></textarea>
          </div>

          <div class="form-group row-checkbox">
            <label>Default</label>
            <div class="checkbox-wrapper">
              <input type="checkbox" v-model="form.default" id="default-check" :disabled="isDetail" />
              <label for="default-check">Ya</label>
            </div>
          </div>

          <div class="form-group row-checkbox">
            <label>Aktif</label>
            <div class="checkbox-wrapper">
              <input type="checkbox" v-model="form.aktif" id="aktif-check" :disabled="isDetail" />
              <label for="aktif-check">Ya</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tampilan Tabel (Sembunyikan saat mode tambah) -->
    <div class="table-card" v-else>
      <div class="table-header-toolbar">
        <div class="header-titles">
          <h2>Daftar Jenis Layanan Logistik</h2>
        </div>
        <div class="header-actions">
          <button class="btn-primary" @click="isAdding = true">+ Tambah Data</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama Layanan</th>
            <th>Grup</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="jenisLayananList.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">Belum ada data</td>
          </tr>
          <tr v-for="(item, index) in jenisLayananList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.kode }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.group ? item.group.nama : '-' }}</td>
            <td>
              <span v-if="item.aktif" class="badge-aktif">Aktif</span>
              <span v-else class="badge-nonaktif">Non Aktif</span>
            </td>
            <td>
              <button class="btn-sm btn-info" @click="detailData(item)" style="margin-right: 5px;">Detail</button>
              <button class="btn-sm btn-warning" @click="editData(item)" style="margin-right: 5px;">Edit</button>
              <button class="btn-sm btn-danger" @click="hapusData(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isAdding = ref(false); // Default to false to show table list by default
const isDetail = ref(false); // Default to false
const groupLayananList = ref([]);
const jenisLayananList = ref([]);

const form = ref({
  id: null,
  kode: '',
  nama: '',
  groupId: '',
  keterangan: '',
  default: false,
  aktif: true
});

const getGroupLayanan = async () => {
  try {
    const response = await axios.get('/api/group-layanan');
    if (response.data.success) {
      groupLayananList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching group layanan:', error);
  }
};

const getJenisLayanan = async () => {
  try {
    const response = await axios.get('/api/jenis-layanan');
    if (response.data.success) {
      jenisLayananList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching jenis layanan:', error);
  }
};

const simpanData = async () => {
  if (!form.value.kode || !form.value.nama || !form.value.groupId) {
    alert("Kode, Nama, dan Grup Layanan wajib diisi!");
    return;
  }
  
  try {
    let response;
    if (form.value.id) {
      // Edit
      response = await axios.put(`/api/jenis-layanan/${form.value.id}`, form.value);
    } else {
      // Create
      response = await axios.post('/api/jenis-layanan', form.value);
    }

    if (response.data.success) {
      alert("Data berhasil disimpan!");
      batal();
      getJenisLayanan();
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Terjadi kesalahan saat menyimpan data.");
  }
};

const editData = (item) => {
  form.value = {
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    groupId: item.groupId,
    keterangan: item.keterangan || '',
    default: item.default,
    aktif: item.aktif
  };
  isAdding.value = true;
  isDetail.value = false;
};

const detailData = (item) => {
  form.value = {
    id: item.id,
    kode: item.kode,
    nama: item.nama,
    groupId: item.groupId,
    keterangan: item.keterangan || '',
    default: item.default,
    aktif: item.aktif
  };
  isAdding.value = true;
  isDetail.value = true;
};

const hapusData = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

  try {
    const response = await axios.delete(`/api/jenis-layanan/${id}`);
    if (response.data.success) {
      alert("Data berhasil dihapus!");
      getJenisLayanan();
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message); // Notifikasi jika sudah digunakan transaksi
    } else {
      console.error("Error deleting data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  }
};

const batal = () => {
  form.value = {
    id: null,
    kode: '',
    nama: '',
    groupId: '',
    keterangan: '',
    default: false,
    aktif: true
  };
  isAdding.value = false;
  isDetail.value = false;
};

onMounted(() => {
  getGroupLayanan();
  getJenisLayanan();
});
</script>

<style scoped src="../../../assets/css/aplikasi-jenislayanan.css"></style>
