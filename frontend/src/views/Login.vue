<template>
  <div class="login-container">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <div class="login-wrapper">
      
      <!-- Panel Kiri: Animasi Truk CSS -->
      <div class="illustration-panel">
        <div class="css-truck">
          <div class="truck-body"></div>
          <div class="truck-head">
            <div class="window"></div>
          </div>
          <div class="wheels">
            <div class="wheel wheel-1"></div>
            <div class="wheel wheel-2"></div>
            <div class="wheel wheel-3"></div>
          </div>
          <div class="road-lines"></div>
        </div>
        
        <h3 class="brand-title">Management Order </h3>
        <p class="brand-desc"> Sistem Order Secara Real-Time  </p>
      </div>

      <!-- Panel Kanan: Form Login -->
      <div class="login-card">
        <div class="login-header">
          <h2>Selamat Datang</h2>
          <p class="subtitle">Masuk ke portal manajemen logistik</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>Alamat Email</label>
            <input type="email" v-model="email" placeholder="admin@logistics.com" required />
          </div>
          
          <div class="form-group">
            <label>Kata Sandi</label>
            <input type="password" v-model="password" placeholder="••••••••" required />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <button type="submit" :disabled="isLoading" class="btn-login">
            {{ isLoading ? 'Memproses Akses...' : 'MASUK SEKARANG' }}
          </button>
        </form>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('permissions', JSON.stringify(response.data.user.permissions || []))
    
    router.push('/')
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Koneksi ke server logistik terputus.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped src="../assets/css/login.css"></style>
