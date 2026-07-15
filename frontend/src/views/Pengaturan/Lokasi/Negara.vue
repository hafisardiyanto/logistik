<template>
  <div class="aplikasi-lokasi-page">
    <div class="page-header">
      <h1>Negara, Provinsi, Kota, Kec.</h1>
      <div class="breadcrumb">
        <RouterLink to="/" title="/">Home</RouterLink> &gt; <RouterLink to="/pengaturan/aplikasi" title="/pengaturan/aplikasi">Pengaturan Aplikasi</RouterLink> &gt; <span>Pengaturan Lokasi</span> &gt; <span>Negara, Provinsi, Kota, Kec.</span>
      </div>
    </div>

    <div class="tabs">
      <button class="tab-btn" :class="{ active: currentTab === 'negara' }" @click="switchTab('negara')">Negara</button>
      <button class="tab-btn" :class="{ active: currentTab === 'provinsi' }" @click="switchTab('provinsi')">Provinsi</button>
      <button class="tab-btn" :class="{ active: currentTab === 'kota' }" @click="switchTab('kota')">Kota</button>
      <button class="tab-btn" :class="{ active: currentTab === 'kecamatan' }" @click="switchTab('kecamatan')">Kecamatan</button>
    </div>

    <div class="table-card">
      <div class="toolbar">
        <button class="btn-primary" @click="openModal()" v-if="hasPermission('Pengaturan', 'canCreate')">
          + Tambah {{ tabLabel }}
        </button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama {{ tabLabel }}</th>
            <th v-if="currentTab === 'provinsi'">Negara</th>
            <th v-if="currentTab === 'kota'">Provinsi</th>
            <th v-if="currentTab === 'kecamatan'">Kota</th>
            <th>Status</th>
            <th style="text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listData.length === 0">
            <td :colspan="currentTab === 'negara' ? 4 : 5" style="text-align: center; padding: 20px;">Belum ada data</td>
          </tr>
          <tr v-for="(item, index) in listData" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td style="font-weight: 500; color: #2563eb;">{{ item.nama }}</td>
            <td v-if="currentTab === 'provinsi'">{{ item.negara?.nama }}</td>
            <td v-if="currentTab === 'kota'">{{ item.provinsi?.nama }}</td>
            <td v-if="currentTab === 'kecamatan'">{{ item.kota?.nama }}</td>
            <td>
              <span :class="item.aktif ? 'badge-active' : 'badge-inactive'">
                {{ item.aktif ? 'Aktif' : 'Non-Aktif' }}
              </span>
            </td>
            <td style="text-align: right;">
              <button class="btn-icon text-primary" @click="openModal(item)" title="Edit" v-if="hasPermission('Pengaturan', 'canUpdate')">✎</button>
              <button class="btn-icon text-danger" @click="deleteItem(item.id)" title="Hapus" v-if="hasPermission('Pengaturan', 'canDelete')">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div class="modal-backdrop" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ form.id ? 'Edit' : 'Tambah' }} {{ tabLabel }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group" v-if="currentTab === 'provinsi'">
            <label>Pilih Negara <span style="color:red">*</span></label>
            <select v-model="form.negaraId" class="form-control">
              <option value="">-- Pilih Negara --</option>
              <option v-for="n in parentsData" :key="n.id" :value="n.id">{{ n.nama }}</option>
            </select>
          </div>
          <div class="form-group" v-if="currentTab === 'kota'">
            <label>Pilih Provinsi <span style="color:red">*</span></label>
            <select v-model="form.provinsiId" class="form-control">
              <option value="">-- Pilih Provinsi --</option>
              <option v-for="p in parentsData" :key="p.id" :value="p.id">{{ p.nama }}</option>
            </select>
          </div>
          <div class="form-group" v-if="currentTab === 'kecamatan'">
            <label>Pilih Kota <span style="color:red">*</span></label>
            <select v-model="form.kotaId" class="form-control">
              <option value="">-- Pilih Kota --</option>
              <option v-for="k in parentsData" :key="k.id" :value="k.id">{{ k.nama }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Nama {{ tabLabel }} <span style="color:red">*</span></label>
            <input type="text" v-model="form.nama" class="form-control" />
          </div>
          <div class="checkbox-wrap">
            <input type="checkbox" id="aktif-check" v-model="form.aktif" />
            <label for="aktif-check" style="margin: 0; cursor: pointer;">Status Aktif</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-outline" @click="closeModal">Batal</button>
          <button class="btn-primary" @click="saveData" v-if="hasPermission('Negara', 'canCreate')">{{ form.id ? 'Simpan' : 'Tambah' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import axios from 'axios';

const hasPermission = inject('hasPermission', () => true);

const currentTab = ref('negara');
const listData = ref([]);
const parentsData = ref([]); // To hold parent options for select dropdown
const showModal = ref(false);

const form = ref({
  id: null,
  nama: '',
  aktif: true,
  negaraId: '',
  provinsiId: '',
  kotaId: ''
});

const tabLabel = computed(() => {
  return currentTab.value.charAt(0).toUpperCase() + currentTab.value.slice(1);
});

const switchTab = (tab) => {
  currentTab.value = tab;
  fetchData();
};

const fetchData = async () => {
  try {
    const res = await axios.get(`/api/lokasi/${currentTab.value}`);
    if (res.data.success) {
      listData.value = res.data.data;
    }
  } catch (error) {
    console.error(`Error fetching ${currentTab.value}:`, error);
  }
};

const loadParentsData = async () => {
  try {
    let endpoint = '';
    if (currentTab.value === 'provinsi') endpoint = 'negara';
    if (currentTab.value === 'kota') endpoint = 'provinsi';
    if (currentTab.value === 'kecamatan') endpoint = 'kota';
    
    if (endpoint) {
      const res = await axios.get(`/api/lokasi/${endpoint}`);
      if (res.data.success) {
        parentsData.value = res.data.data;
      }
    }
  } catch (error) {
    console.error("Error loading parent options:", error);
  }
};

const openModal = async (item = null) => {
  if (currentTab.value !== 'negara') {
    await loadParentsData();
  }
  
  if (item) {
    form.value = { ...item };
  } else {
    form.value = { id: null, nama: '', aktif: true, negaraId: '', provinsiId: '', kotaId: '' };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveData = async () => {
  if (!form.value.nama) {
    alert(`Nama ${tabLabel.value} wajib diisi`);
    return;
  }
  if (currentTab.value === 'provinsi' && !form.value.negaraId) return alert("Pilih negara!");
  if (currentTab.value === 'kota' && !form.value.provinsiId) return alert("Pilih provinsi!");
  if (currentTab.value === 'kecamatan' && !form.value.kotaId) return alert("Pilih kota!");

  try {
    let res;
    if (form.value.id) {
      res = await axios.put(`/api/lokasi/${currentTab.value}/${form.value.id}`, form.value);
    } else {
      res = await axios.post(`/api/lokasi/${currentTab.value}`, form.value);
    }
    if (res.data.success) {
      closeModal();
      fetchData();
    }
  } catch (error) {
    alert(error.response?.data?.message || "Terjadi kesalahan");
  }
};

const deleteItem = async (id) => {
  if (!confirm("Hapus data ini? (Data turunan mungkin juga akan terhapus)")) return;
  try {
    const res = await axios.delete(`/api/lokasi/${currentTab.value}/${id}`);
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

<style scoped src="../../../assets/css/aplikasi-lokasi.css"></style>
