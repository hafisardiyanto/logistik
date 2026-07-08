<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="logo-text">Management Order</h2>
      </div>
      
      <div class="sidebar-scroll">
        <div class="menu-section">
          <a href="#" class="menu-item"><i class="icon">🏠</i> Home</a>
          
          <!-- Dropdown Dashboard -->
          <div class="menu-group">
            <div class="menu-item has-dropdown" @click="toggleMenu('dashboard')">
              <span><i class="icon">📈</i> Dashboard</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.dashboard">
              <a href="#">Rekap Pengiriman</a>
              <a href="#">Batal Muat</a>
            </div>
          </div>
        </div>

        <div class="menu-label" v-if="hasPermission('Kontak', 'canRead')">DATA</div>
        <div class="menu-section" v-if="hasPermission('Kontak', 'canRead')">
          <div class="menu-group">
            <div class="menu-item has-dropdown" @click="toggleMenu('data')">
              <span><i class="icon">👥</i> Kontak</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.data">
              <a href="#">Pegawai</a>
              <a href="#">Pelanggan</a>
              <a href="#">Vendor Logistik</a>
              <a href="#">Bengkel</a>
            </div>
          </div>
        </div>

        <div class="menu-label" v-if="hasPermission('Tarif Logistik', 'canRead') || hasPermission('Pemasaran', 'canRead')">TARIF & KONTRAK</div>
        <div class="menu-section">
          <div class="menu-group" v-if="hasPermission('Tarif Logistik', 'canRead')">
            <div class="menu-item has-dropdown" @click="toggleMenu('tarif')">
              <span><i class="icon">🏷️</i> Tarif</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.tarif">
              <a href="#">Tarif Logistik Umum</a>
              <a href="#">Tarif Kontrak</a>
              <a href="#">Tarif Vendor</a>
            </div>
          </div>
          <div class="menu-group" v-if="hasPermission('Pemasaran', 'canRead')">
            <div class="menu-item has-dropdown" @click="toggleMenu('pemasaran')">
              <span><i class="icon">📢</i> Pemasaran</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.pemasaran">
              <a href="#">Daftar Lead</a>
              <a href="#">Permintaan Penawaran</a>
              <a href="#">Penawaran Harga</a>
              <a href="#">Laporan</a>
            </div>
          </div>
        </div>

        <div class="menu-label" v-if="hasPermission('Order', 'canRead') || hasPermission('Kapal & Kontainer', 'canRead')">TRANSAKSI & OPERASIONAL</div>
        <div class="menu-section" v-if="hasPermission('Order', 'canRead') || hasPermission('Kapal & Kontainer', 'canRead')">
          <div class="menu-group" v-if="hasPermission('Order', 'canRead')">
            <div class="menu-item has-dropdown" @click="toggleMenu('order')">
              <span><i class="icon">📦</i> Order</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.order">
              <a href="#">Work Order</a>
              <a href="#">Job Order</a>
              <a href="#">Manifest/Packing List</a>
              <a href="#">Vendor Job</a>
              <a href="#">Delivery Order</a>
              <a href="#">Auto routing</a>
              <a href="#">Operational Progress</a>
              <a href="#">Laporan</a>
            </div>
          </div>
        
        </div>

        <div class="menu-label" v-if="hasPermission('Data Kendaraan', 'canRead')">MANAJEMEN KENDARAAN</div>
        <div class="menu-section" v-if="hasPermission('Data Kendaraan', 'canRead')">
          <div class="menu-group">
            <div class="menu-item has-dropdown" @click="toggleMenu('kendaraan')">
              <span><i class="icon">🚚</i> Data Kendaraan</span>
              <span class="arrow">⌄</span>
            </div>
            <div class="submenu" v-show="openMenus.kendaraan">
              <a href="#">Daftar Kendaraan</a>
              <a href="#">Trailer</a>
              <a href="#">ISO Tank Container</a>
            </div>
          </div>
        </div>

        <div class="menu-label" v-if="isSuperAdmin">PENGATURAN</div>
        <div class="menu-section" v-if="isSuperAdmin">
          <div class="menu-group">
            <div class="menu-item has-dropdown active" @click="toggleMenu('pengaturan')">
              <span><i class="icon">⚙️</i> Pengaturan Umum</span>
              <span class="arrow">⌄</span>
            </div>
           <div class="submenu" v-show="openMenus.pengaturan">

    <RouterLink to="/pengaturan/aplikasi">
        Pengaturan Aplikasi
    </RouterLink>

    <RouterLink to="/pengaturan/perusahaan">
        Pengaturan Perusahaan
    </RouterLink>

    <RouterLink to="/pengaturan/user">
        Pengaturan User
    </RouterLink>

    <RouterLink to="/pengaturan/kendaraan">
        Setting Kendaraan
    </RouterLink>

</div>
          </div>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navbar -->
      <header class="top-navbar">
        <div class="navbar-left">
          <span class="page-breadcrumb">🏠 Home / Pengaturan / Pengaturan User</span>
        </div>
        <div class="navbar-right">
          <div class="user-profile-widget">
            <div class="user-avatar">{{ currentUser?.name?.charAt(0)?.toUpperCase() || '?' }}</div>
            <div class="user-info">
              <span class="user-name">{{ currentUser?.name || 'User' }}</span>
              <span class="user-role">{{ currentUser?.role || 'Tidak ada role' }}</span>
            </div>
            <div class="user-dropdown-arrow">▾</div>
          </div>
        </div>
      </header>

      <div class="content-wrapper">
        <router-view />
        <template v-if="$route.path === '/' || $route.path === '/pengaturan/user'">
          <div v-if="!isSuperAdmin" style="padding: 50px; text-align: center;">
            <h2>Selamat Datang, {{ currentUser?.name }}</h2>
            <p>Role Anda: <strong>{{ currentUser?.role || 'Belum ada role' }}</strong></p>
            <p style="color: #888; margin-top: 10px;">Menu yang tersedia disesuaikan dengan hak akses Anda.</p>
          </div>

          <div v-else>
            <div class="page-header">
              <h1>Pengaturan User</h1>
              <p>Kelola Daftar User, Role dan perijinan dalam perusahaan</p>
            </div>
            
            <div class="tabs">
              <button :class="['tab', { active: currentTab === 'users' }]" @click="currentTab = 'users'">
                <span class="icon">👥</span> Daftar User
              </button>
              <button :class="['tab', { active: currentTab === 'roles' }]" @click="currentTab = 'roles'">
                <span class="icon">🛡️</span> Role & Permission
              </button>
            </div>

          <!-- TAB: DAFTAR USER -->
          <div v-if="currentTab === 'users'" class="table-card">
            <div class="table-header-toolbar">
              <div class="header-titles">
                <h2>Daftar User</h2>
                <p>Kelola User yang memiliki akses ke perusahaan</p>
              </div>
              <div class="header-actions">
                <button class="btn-primary" v-if="isSuperAdmin" @click="showAddUserModal = true">
                  <span class="icon">+</span> Tambah User
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>E-mail</th>
                    <th>Cabang</th>
                    <th>Level</th>
                    <th>Verified</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in usersList" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.cabang }}</td>
                    <td><span class="badge blue">{{ user.level }}</span></td>
                    <td>
                      <span :class="['badge', user.verified === 'Verified' ? 'green' : 'red']">
                        {{ user.verified }}
                      </span>
                    </td>
                    <td><span class="badge green-outline">{{ user.status }}</span></td>
                    <td class="actions">
                      <button class="btn-icon delete" v-if="isSuperAdmin" @click="deleteUser(user.id)">🗑️</button>
                    </td>
                  </tr>
                  <tr v-if="usersList.length === 0">
                    <td colspan="7" style="text-align: center; padding: 20px;">Memuat data...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB: ROLE & PERMISSION -->
          <div v-if="currentTab === 'roles'" class="table-card">
            <div class="table-header-toolbar">
              <div class="header-titles">
                <h2>Manajemen Role & Privilege</h2>
                <p>Kelola hak akses tiap divisi per modul</p>
              </div>
              <div class="header-actions">
                <button class="btn-primary" @click="openAddRoleModal">
                  <span class="icon">+</span> Tambah Role
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nama Role</th>
                    <th>Jumlah User</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="role in rolesList" :key="role.id">
                    <td><span class="badge blue">{{ role.name }}</span></td>
                    <td>{{ role._count ? role._count.users : 0 }} Users</td>
                    <td class="actions">
                      <button class="btn-icon edit" @click="editRole(role)">📝</button>
                      <button class="btn-icon delete" @click="deleteRole(role.id)">🗑️</button>
                    </td>
                  </tr>
                  <tr v-if="rolesList.length === 0">
                    <td colspan="3" style="text-align: center; padding: 20px;">Memuat data...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div> <!-- End of SuperAdmin Content Wrapper -->
        </template>
      </div>
    </main>

    <!-- Modal Tambah User -->
    <div v-if="showAddUserModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Tambah User Baru</h3>
          <button class="close-btn" @click="showAddUserModal = false">&times;</button>
        </div>
        <form @submit.prevent="submitAddUser" class="form-group">
          <input v-model="newUser.name" placeholder="Nama Lengkap" required />
          <input v-model="newUser.email" type="email" placeholder="Email" required />
          <input v-model="newUser.password" type="password" placeholder="Password" required />
          <select v-model="newUser.roleId" required>
            <option value="" disabled>Pilih Role</option>
            <option v-for="role in rolesList" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
          <div class="modal-actions">
            <button type="button" @click="showAddUserModal = false" class="btn-cancel">Batal</button>
            <button type="submit" class="btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Tambah/Edit Role -->
    <div v-if="showRoleModal" class="modal-overlay">
      <div class="modal-content" style="width: 600px; max-height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header">
          <h3>{{ isEditingRole ? 'Edit Role & Privilege' : 'Tambah Role Baru' }}</h3>
          <button class="close-btn" @click="showRoleModal = false">&times;</button>
        </div>
        <form @submit.prevent="submitRoleForm" class="form-group" style="display: flex; flex-direction: column; overflow: hidden; flex: 1;">
          <input v-model="roleForm.name" placeholder="Nama Role (Misal: Supervisor)" required style="margin-bottom: 10px;" />
          
          <div style="overflow-y: auto; flex: 1; border: 1px solid #eee; border-radius: 6px; margin-bottom: 20px;">
            <table class="data-table" style="margin: 0; width: 100%;">
              <thead style="position: sticky; top: 0; background: white; z-index: 1; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                <tr>
                  <th>Modul</th>
                  <th>Create</th>
                  <th>Read</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(perm, idx) in roleForm.permissions" :key="idx">
                  <td>{{ perm.module }}</td>
                  <td><input type="checkbox" v-model="perm.canCreate"></td>
                  <td><input type="checkbox" v-model="perm.canRead"></td>
                  <td><input type="checkbox" v-model="perm.canUpdate"></td>
                  <td><input type="checkbox" v-model="perm.canDelete"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-actions" style="margin-top: 0;">
            <button type="button" @click="showRoleModal = false" class="btn-cancel">Batal</button>
            <button type="submit" class="btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentTab = ref('users')
const showAddUserModal = ref(false)
const currentUser = ref(null)

const isSuperAdmin = computed(() => {
  if (!currentUser.value) return false;
  const role = currentUser.value.role || currentUser.value.level || '';
  const email = currentUser.value.email || '';
  return role.toLowerCase().replace(/\s/g, '') === 'superadmin' || email === 'superadmin@logistics.com';
})

// Load permissions dari localStorage
const userPermissions = ref([])

/**
 * Cek apakah user punya hak akses tertentu
 * @param {string} module - Nama modul, misal: 'Order', 'Kontak'
 * @param {string} action - 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete'
 * @returns {boolean}
 */
const hasPermission = (module, action) => {
  // Super Admin selalu punya akses penuh
  if (isSuperAdmin.value) return true;
  const perm = userPermissions.value.find(p => p.module === module);
  return perm ? !!perm[action] : false;
}

const openMenus = reactive({
  dashboard: false,
  data: false,
  tarif: false,
  pemasaran: false,
  order: false,
  kapal: false,
  kendaraan: false,
  pengaturan: true
})

const toggleMenu = (menu) => {
  openMenus[menu] = !openMenus[menu]
}

const usersList = ref([])
const rolesList = ref([])

const newUser = reactive({
  name: '',
  email: '',
  password: '',
  roleId: '',
  cabang: 'Pusat'
})

// Fetch Users from API
const fetchUsers = async () => {
  try {
    const res = await axios.get('/api/users')
    usersList.value = res.data
  } catch (error) {
    console.error('Error fetching users', error)
  }
}

// Fetch Roles from API
const fetchRoles = async () => {
  try {
    const res = await axios.get('/api/roles')
    rolesList.value = res.data
  } catch (error) {
    console.error('Error fetching roles', error)
  }
}

// Role Form State
const showRoleModal = ref(false)
const isEditingRole = ref(false)
const currentEditRoleId = ref(null)

const defaultModules = [
  'Dashboard', 'Kontak', 'Tarif Logistik', 'Pemasaran', 
  'Order', 'Kapal & Kontainer', 'Data Kendaraan', 'Pengaturan'
]

const roleForm = reactive({
  name: '',
  permissions: []
})

const openAddRoleModal = () => {
  isEditingRole.value = false
  roleForm.name = ''
  roleForm.permissions = defaultModules.map(mod => ({
    module: mod, canCreate: false, canRead: false, canUpdate: false, canDelete: false
  }))
  showRoleModal.value = true
}

const editRole = (role) => {
  isEditingRole.value = true
  currentEditRoleId.value = role.id
  roleForm.name = role.name
  
  // Initialize with defaults, then map existing permissions
  const perms = defaultModules.map(mod => ({
    module: mod, canCreate: false, canRead: false, canUpdate: false, canDelete: false
  }))
  
  if (role.permissions && role.permissions.length > 0) {
    role.permissions.forEach(existingPerm => {
      const target = perms.find(p => p.module === existingPerm.module)
      if (target) {
        target.canCreate = existingPerm.canCreate
        target.canRead = existingPerm.canRead
        target.canUpdate = existingPerm.canUpdate
        target.canDelete = existingPerm.canDelete
      }
    })
  }
  
  roleForm.permissions = perms
  showRoleModal.value = true
}

const submitRoleForm = async () => {
  try {
    if (isEditingRole.value) {
      await axios.put(`/api/roles/${currentEditRoleId.value}`, roleForm)
    } else {
      await axios.post('/api/roles', roleForm)
    }
    showRoleModal.value = false
    fetchRoles()
  } catch (error) {
    alert('Gagal menyimpan Role')
  }
}

const deleteRole = async (id) => {
  if(confirm('Yakin ingin menghapus role ini? Semua user di role ini mungkin kehilangan akses.')) {
    try {
      await axios.delete(`/api/roles/${id}`)
      fetchRoles()
    } catch (error) {
      alert('Gagal menghapus role')
    }
  }
}

// Submit Add User
const submitAddUser = async () => {
  try {
    await axios.post('/api/users', newUser)
    showAddUserModal.value = false
    newUser.name = ''
    newUser.email = ''
    newUser.password = ''
    newUser.roleId = ''
    fetchUsers()
  } catch (error) {
    alert('Gagal menambah user')
  }
}

// Delete User
const deleteUser = async (id) => {
  if(confirm('Yakin ingin menghapus user ini?')) {
    try {
      await axios.delete(`/api/users/${id}`)
      fetchUsers()
    } catch (error) {
      alert('Gagal menghapus')
    }
  }
}

onMounted(async () => {
  // 1. Load dari localStorage dulu (agar tidak blank saat loading)
  const userData = localStorage.getItem('user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  }
  const permsData = localStorage.getItem('permissions')
  if (permsData) {

    userPermissions.value = JSON.parse(permsData)
  }

  // 2. Fetch permissions TERBARU dari backend setiap kali halaman di-refresh
  //    Ini memastikan jika admin update privilege, user akan langsung merasakan efeknya
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Update currentUser dan permissions dengan data terbaru dari DB
      currentUser.value = res.data
      userPermissions.value = res.data.permissions || []
      // Simpan juga ke localStorage agar sinkron
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('permissions', JSON.stringify(res.data.permissions || []))
    } catch (error) {
      // Jika token expired / invalid, redirect ke login
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear()
        router.push('/login')
      }
    }
  }

  // 3. Load data tabel jika SuperAdmin
  if (isSuperAdmin.value) {
    fetchUsers()
    fetchRoles()
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('permissions')
  router.push('/login')
}
</script>

<style scoped src="../assets/css/dashboard.css"></style>
<style scoped>
/* Modal Styles Tambahan */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
  z-index: 100;
}
.modal-content {
  background: white; padding: 30px; border-radius: 12px; width: 400px;
}
.modal-content h3 { margin: 0; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.close-btn { background: transparent; border: none; font-size: 24px; cursor: pointer; color: #666; line-height: 1; }
.close-btn:hover { color: #f00; }
.form-group input, .form-group select {
  width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 6px;
}
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
.btn-cancel { padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; }
</style>
