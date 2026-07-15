<template>
  <div class="operasional-windowreceive-page">
    <div class="page-header">
      <h1>Window Receive Time (WRT)</h1>
      <p>Kelola data window receive time (wrt)</p>
    </div>
    <div class="table-card">
      <div class="table-header-toolbar">
        <div class="header-titles">
          <h2>Daftar Window Receive Time (WRT)</h2>
        </div>
        <div class="header-actions">
          <button class="btn-primary" v-if="hasPermission('Window Receive', 'canCreate')">+ Tambah Data</button>
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
<style scoped src="../../../assets/css/operasional-windowreceive.css"></style>
