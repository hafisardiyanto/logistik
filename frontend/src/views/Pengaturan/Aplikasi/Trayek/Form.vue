<template>
  <div class="aplikasi-trayek-page">
    <div class="page-header">
      <h1>{{ isEdit ? 'Edit' : 'Tambah' }} Trayek/Rute</h1>
      <div class="breadcrumb">
        <RouterLink to="/" title="/">Home</RouterLink> &gt; <RouterLink to="/pengaturan/aplikasi" title="/pengaturan/aplikasi">Pengaturan Aplikasi</RouterLink> &gt; <RouterLink to="/pengaturan/aplikasi/trayek" title="/pengaturan/aplikasi/trayek">Trayek / Rute</RouterLink> &gt; <span>{{ isEdit ? 'Edit' : 'Tambah' }} Trayek/Rute</span>
      </div>
    </div>

    <div class="table-card">
      <div class="form-grid">
        <div class="form-group">
          <label>Kode Trayek <span>*</span></label>
          <input type="text" v-model="form.kode" class="form-control" placeholder="Contoh: TR-001" />
        </div>
        <div class="form-group">
          <label>Cabang Pengelola <span>*</span></label>
          <select v-model="form.cabang" class="form-control">
            <option value="">Pilih Cabang Pengelola</option>
            <option v-for="(cabang, idx) in cabangList" :key="idx" :value="cabang.nama">{{ cabang.nama }}</option>
          </select>
        </div>
      </div>

      <div class="form-grid full">
        <div class="form-group">
          <label>Nama Trayek / Rute <span>*</span></label>
          <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: JKT - SUB" />
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Kota Asal <span>*</span></label>
          <select v-model="form.kotaAsalId" class="form-control">
            <option value="">Pilih Kota Asal</option>
            <option v-for="kota in kotaList" :key="kota.id" :value="kota.id">{{ kota.nama }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Kota Tujuan <span>*</span></label>
          <select v-model="form.kotaTujuanId" class="form-control">
            <option value="">Pilih Kota Tujuan</option>
            <option v-for="kota in kotaList" :key="kota.id" :value="kota.id">{{ kota.nama }}</option>
          </select>
        </div>
      </div>

      <div class="form-grid full">
        <div class="form-group">
          <label>Keterangan</label>
          <textarea v-model="form.keterangan" class="form-control" rows="3" placeholder="Keterangan tambahan..."></textarea>
        </div>
      </div>

      <div class="checkbox-wrap">
        <input type="checkbox" id="aktif-check" v-model="form.aktif" />
        <label for="aktif-check" style="margin:0; font-weight:normal; cursor:pointer;">Aktif</label>
      </div>

      <div class="form-actions">
        <button class="btn-danger" @click.prevent="router.push('/pengaturan/aplikasi/trayek')">Batal</button>
        <button class="btn-primary" @click.prevent="saveData">{{ isEdit ? 'Simpan Data' : 'Tambah Data' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const isEdit = computed(() => !!route.params.id);
const kotaList = ref([]);
const cabangList = ref([]);

const form = ref({
  kode: '',
  nama: '',
  cabang: '',
  kotaAsalId: '',
  kotaTujuanId: '',
  keterangan: '',
  aktif: true
});

const loadKota = async () => {
  try {
    const res = await axios.get('/api/lokasi/kota');
    if (res.data.success) {
      kotaList.value = res.data.data;
    }
  } catch (error) {
    console.error("Error loading kota:", error);
  }
};

const loadCabang = async () => {
  try {
    const list = [];
    // 1. Ambil nama perusahaan pusat dari AppSettings
    try {
      const resPusat = await axios.get('/api/app-settings?group=perusahaan_pusat');
      const namaPusat = resPusat.data.find(item => item.key === 'nama_perusahaan');
      if (namaPusat && namaPusat.value) {
        list.push({ nama: namaPusat.value + ' (Pusat)' });
      }
    } catch (e) {
      console.error("Error loading kantor pusat:", e);
    }
    
    // 2. Ambil daftar kantor cabang
    try {
      const resCabang = await axios.get('/api/perusahaan');
      if (resCabang.data.success) {
        resCabang.data.data.forEach(c => {
          list.push({ nama: c.nama + ' (Cabang)' });
        });
      }
    } catch (e) {
      console.error("Error loading kantor cabang:", e);
    }
    
    cabangList.value = list;
  } catch (error) {
    console.error("Error in loadCabang:", error);
  }
};

const loadData = async () => {
  if (!isEdit.value) return;
  try {
    const res = await axios.get(`/api/trayek/${route.params.id}`);
    if (res.data.success) {
      const data = res.data.data;
      form.value = {
        kode: data.kode,
        nama: data.nama,
        cabang: data.cabang || '',
        kotaAsalId: data.kotaAsalId,
        kotaTujuanId: data.kotaTujuanId,
        keterangan: data.keterangan || '',
        aktif: data.aktif
      };
    }
  } catch (error) {
    alert("Gagal memuat data");
    router.push('/pengaturan/aplikasi/trayek');
  }
};

const saveData = async () => {
  console.log("Triggered saveData", form.value);
  if (!form.value.kode || !form.value.nama || !form.value.kotaAsalId || !form.value.kotaTujuanId) {
    alert("Silakan isi semua field yang wajib!");
    return;
  }
  
  try {
    let res;
    if (isEdit.value) {
      res = await axios.put(`/api/trayek/${route.params.id}`, form.value);
    } else {
      res = await axios.post('/api/trayek', form.value);
    }
    
    if (res.data.success) {
      router.push('/pengaturan/aplikasi/trayek');
    }
  } catch (error) {
    alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data");
  }
};

onMounted(async () => {
  await loadCabang();
  await loadKota();
  await loadData();
});
</script>

<style scoped src="../../../../assets/css/aplikasi-trayek.css"></style>
