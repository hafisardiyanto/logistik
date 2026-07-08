<template>
  <div class="pabrikan-page">
    <div class="page-header">
      <h1>Pabrikan / Manufaktur</h1>
      <p>Kelola data pabrikan kendaraan</p>
    </div>
    <div class="table-card">
      <div class="table-header-toolbar">
        <div class="header-titles">
          <h2>Daftar Pabrikan</h2>
        </div>
        <div class="header-actions">
          <button class="btn-primary">+ Tambah Pabrikan</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pabrikan</th>
            <th>Negara Asal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colspan="5" style="text-align: center; padding: 20px;">Belum ada data</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

</script>
<style scoped src="../../../assets/css/pabrikan.css"></style>
