const fs = require('fs');
const path = require('path');

const moduleMap = {
    // Pengaturan Aplikasi
    'Aplikasi/JenisLayanan.vue': 'Jenis Layanan',
    'Aplikasi/TipeContainer.vue': 'Tipe Container (Aplikasi)',
    'Aplikasi/Komoditas.vue': 'Komoditas (Aplikasi)',
    'Aplikasi/KopSurat.vue': 'Kop Surat',
    'Aplikasi/IntegrasiGPS.vue': 'Integrasi GPS',
    'Aplikasi/Pelayaran.vue': 'Pelayaran',
    'Aplikasi/DaftarKapal.vue': 'Daftar Kapal',
    'Aplikasi/Trayek/Index.vue': 'Trayek (Aplikasi)',
    
    // Kendaraan
    'Kendaraan/Tipe.vue': 'Tipe Kendaraan',
    'Kendaraan/Equipment.vue': 'Equipment',
    'Kendaraan/Body.vue': 'Body Kendaraan',
    'Kendaraan/Axel.vue': 'Axel',
    'Kendaraan/Varian.vue': 'Varian',
    
    // Pengaturan Umum
    'Umum/JenisSatuan.vue': 'Jenis Satuan (Umum)',
    'Umum/TipeContainer.vue': 'Tipe Container (Umum)',
    'Umum/Komoditas.vue': 'Komoditas (Umum)',
    'Umum/JenisBBM.vue': 'Jenis BBM',
    'Umum/LevelPelanggan.vue': 'Level Pelanggan',
    'Umum/TahapanPenawaran.vue': 'Tahapan Penawaran',
    
    // Lokasi
    'Lokasi/Negara.vue': 'Negara',
    'Lokasi/Pelabuhan.vue': 'Pelabuhan',
    'Lokasi/Trayek.vue': 'Trayek (Lokasi)',
    'Lokasi/Spbu.vue': 'SPBU',
    'Lokasi/DepoKontainer.vue': 'Depo Kontainer',
    'Lokasi/GateLocation.vue': 'Gate Location',
    
    // Operasional
    'Operasional/KelompokBiaya.vue': 'Kelompok Biaya',
    'Operasional/JenisBiaya.vue': 'Jenis Biaya',
    'Operasional/StandarBiaya.vue': 'Standar Biaya',
    'Operasional/ServiceTime.vue': 'Service Time',
    'Operasional/WindowReceive.vue': 'Window Receive',
    'Operasional/AlasanBatal.vue': 'Alasan Batal',
    
    // Inventori
    'Inventori/Brand.vue': 'Brand',
    'Inventori/TipeBin.vue': 'Tipe Bin',
    'Inventori/Kategori.vue': 'Kategori',
    'Inventori/MasterItem.vue': 'Master Item',
    'Inventori/Warehouse.vue': 'Warehouse',
    'Inventori/BinLocation.vue': 'Bin Location',
    'Inventori/LoadingDock.vue': 'Loading Dock',
    
    // Keuangan
    'Keuangan/MasterPajak.vue': 'Master Pajak'
};

const basePath = path.join('c:', 'laragon', 'www', 'logistics', 'frontend', 'src', 'views', 'Pengaturan');

function injectVueRef(content) {
    if (content.includes("const hasPermission = inject('hasPermission'")) return content;

    let modified = content;
    // ensure inject is imported
    if (!modified.includes('import {') || !modified.includes('vue')) {
        // Find script setup
        modified = modified.replace(/<script setup>/, "<script setup>\nimport { inject } from 'vue';");
    } else {
        const importRegex = /import\s+{([^}]+)}\s+from\s+['"]vue['"];/;
        const match = modified.match(importRegex);
        if (match && !match[1].includes('inject')) {
            modified = modified.replace(importRegex, (m, p1) => {
                return `import { ${p1.trim()}, inject } from 'vue';`;
            });
        }
    }
    
    let injected = false;
    const axiosRegex = /import .* axios.*;/g;
    modified = modified.replace(axiosRegex, (m) => {
        if(!injected) {
             injected = true;
             return `${m}\n\nconst hasPermission = inject('hasPermission', () => true);`;
        }
        return m;
    });

    if(!injected) {
        const vueImportRegex = /import\s+{[^}]+}\s+from\s+['"]vue['"];/g;
        modified = modified.replace(vueImportRegex, (m) => {
            if(!injected) {
                 injected = true;
                 return `${m}\n\nconst hasPermission = inject('hasPermission', () => true);`;
            }
            return m;
        });
    }

    if(!injected) {
         modified = modified.replace(/<script setup>/, (m) => {
              return `${m}\nimport { inject } from 'vue';\nconst hasPermission = inject('hasPermission', () => true);\n`;
         });
    }
    return modified;
}

for (const [relPath, modName] of Object.entries(moduleMap)) {
    const fullPath = path.join(basePath, relPath);
    if (!fs.existsSync(fullPath)) {
        console.warn('File not found:', fullPath);
        continue;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    content = injectVueRef(content);
    
    const btnsRegex = /<button[^>]*>[\s\S]*?<\/button>/gi;
    
    content = content.replace(btnsRegex, (match) => {
        if (match.includes('v-if="hasPermission')) return match;
        
        let perm = '';
        if (match.match(/Tambah|Import/i)) perm = 'canCreate';
        else if (match.match(/Edit|✎/i)) perm = 'canUpdate';
        else if (match.match(/Hapus|🗑/i)) perm = 'canDelete';
        else if (match.match(/Detail|Export/i)) perm = 'canRead';
        
        if (perm) {
            return match.replace(/<button([^>]*)>/, `<button$1 v-if="hasPermission('${modName}', '${perm}')">`);
        }
        
        return match;
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${modName} -> ${relPath}`);
}
