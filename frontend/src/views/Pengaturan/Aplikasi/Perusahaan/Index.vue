<template>
  <div class="aplikasi-perusahaan-page">
    <div class="page-header">
      <h1>Pengaturan Perusahaan</h1>
      <p class="text-muted" style="font-size: 14px; margin-top: 5px;">Kelola informasi dan preferensi perusahaan</p>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-navigation mb-4">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'pusat' }"
        @click="activeTab = 'pusat'"
      >
        <i class="fa fa-building mr-2"></i> Kantor Pusat
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'cabang' }"
        @click="activeTab = 'cabang'"
      >
        <i class="fa fa-map-marker mr-2"></i> Kantor Cabang
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'penomoran' }"
        @click="activeTab = 'penomoran'"
      >
        <i class="fa fa-file-text-o mr-2"></i> Penomoran Transaksi
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content-container">
      <TabKantorPusat v-if="activeTab === 'pusat'" />
      <TabKantorCabang v-if="activeTab === 'cabang'" />
      <TabPenomoranTransaksi v-if="activeTab === 'penomoran'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TabKantorPusat from './TabKantorPusat.vue';
import TabKantorCabang from './TabKantorCabang.vue';
import TabPenomoranTransaksi from './TabPenomoranTransaksi.vue';

const route = useRoute();
const router = useRouter();

const activeTab = ref('pusat');

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab;
  }
});
</script>

<style src="../../../../assets/css/aplikasi-perusahaan.css"></style>
<style scoped>
.page-header h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
}
.tabs-navigation {
  display: flex;
  background: #f8fafc;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  margin-top: 20px;
}
.tab-btn {
  background: transparent;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}
.tab-btn:hover {
  background: #f1f5f9;
  color: #334155;
}
.tab-btn.active {
  background: white;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-weight: 600;
}
</style>
