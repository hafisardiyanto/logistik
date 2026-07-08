<template>
  <div class="aplikasi-perusahaan-page">
    <div class="page-header">
      <h1>{{ isEdit ? 'Edit' : 'Tambah' }} Perusahaan/Cabang</h1>
      <div class="breadcrumb">
        <span>Home</span> &gt; <span>Pengaturan Aplikasi</span> &gt; <span style="cursor: pointer" @click="router.push('/pengaturan/perusahaan?tab=cabang')">Perusahaan / Cabang</span> &gt; <span>{{ isEdit ? 'Edit' : 'Tambah' }} Perusahaan</span>
      </div>
    </div>

    <div class="table-card">
      <div class="form-grid">
        <div class="form-group">
          <label>Kode Perusahaan/Cabang <span>*</span></label>
          <input type="text" v-model="form.kode" class="form-control" placeholder="Contoh: LOG-JKT" />
        </div>
        <div class="form-group">
          <label>Nama Perusahaan/Cabang <span>*</span></label>
          <input type="text" v-model="form.nama" class="form-control" placeholder="Contoh: PT. Logistik Cepat Cabang Jakarta" />
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Nomor NPWP</label>
          <input type="text" v-model="form.npwp" class="form-control" placeholder="XX.XXX.XXX.X-XXX.XXX" />
        </div>
        <div class="form-group">
          <label>Telepon</label>
          <input type="text" v-model="form.telepon" class="form-control" placeholder="Contoh: 021-1234567" />
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" class="form-control" placeholder="Email resmi perusahaan" />
        </div>
      </div>

      <div class="form-grid full">
        <div class="form-group">
          <label>Alamat Lengkap</label>
          <textarea v-model="form.alamat" class="form-control" rows="3" placeholder="Alamat lengkap perusahaan atau cabang..."></textarea>
        </div>
      </div>

      <div class="checkbox-wrap">
        <input type="checkbox" id="aktif-check" v-model="form.aktif" />
        <label for="aktif-check" style="margin:0; font-weight:normal; cursor:pointer;">Aktif beroperasi</label>
      </div>

      <div class="form-actions">
        <button class="btn-danger" @click.prevent="router.push('/pengaturan/perusahaan?tab=cabang')">Batal</button>
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

const form = ref({
  kode: '',
  nama: '',
  npwp: '',
  telepon: '',
  email: '',
  alamat: '',
  aktif: true
});

const loadData = async () => {
  if (!isEdit.value) return;
  try {
    const res = await axios.get(`http://localhost:3000/api/perusahaan/${route.params.id}`);
    if (res.data.success) {
      const data = res.data.data;
      form.value = {
        kode: data.kode,
        nama: data.nama,
        npwp: data.npwp || '',
        telepon: data.telepon || '',
        email: data.email || '',
        alamat: data.alamat || '',
        aktif: data.aktif
      };
    }
  } catch (error) {
    alert("Gagal memuat data");
    router.push('/pengaturan/perusahaan?tab=cabang');
  }
};

const saveData = async () => {
  if (!form.value.kode || !form.value.nama) {
    alert("Silakan isi semua field yang wajib (*)");
    return;
  }
  
  try {
    let res;
    if (isEdit.value) {
      res = await axios.put(`http://localhost:3000/api/perusahaan/${route.params.id}`, form.value);
    } else {
      res = await axios.post('http://localhost:3000/api/perusahaan', form.value);
    }
    
    if (res.data.success) {
      router.push('/pengaturan/perusahaan?tab=cabang');
    }
  } catch (error) {
    alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data");
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<style scoped src="../../../../assets/css/aplikasi-perusahaan.css"></style>
