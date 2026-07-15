<template>
  <div class="inventori-kategori-page">
    <div class="page-header">
      <h1>Kategori</h1>
      <p>Kelola data kategori</p>
    </div>
    <div class="table-card">
      <div class="table-header-toolbar">
        <div class="header-titles">
          <h2>Daftar Kategori</h2>
        </div>
        <div class="header-actions">
          <button class="btn-primary" v-if="hasPermission('Kategori', 'canCreate')">+ Tambah Data</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama / Deskripsi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colspan="4" style="text-align: center; padding: 20px;">Belum ada data</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const hasPermission = inject('hasPermission', () => true);

</script>
<style scoped src="../../../assets/css/inventori-kategori.css"></style>
