import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import PengaturanAplikasi from "../views/Pengaturan/Aplikasi.vue";
import PengaturanUser from "../views/Pengaturan/User.Vue";

import Kendaraan from "../views/Pengaturan/Kendaraan/Index.vue";
import Pabrikan from "../views/Pengaturan/Kendaraan/Pabrikan.vue";
import Tipe from "../views/Pengaturan/Kendaraan/Tipe.Vue";
import Equipment from "../views/Pengaturan/Kendaraan/Equipment.vue";
import Body from "../views/Pengaturan/Kendaraan/Body.vue";
import Axel from "../views/Pengaturan/Kendaraan/Axel.vue";
import Varian from "../views/Pengaturan/Kendaraan/Varian.vue";

import PengaturanUmum from "../views/Pengaturan/Aplikasi/PengaturanUmum.vue";
import JenisLayanan from "../views/Pengaturan/Aplikasi/JenisLayanan.vue";
import JenisSatuan from "../views/Pengaturan/Aplikasi/JenisSatuan.vue";
import TipeContainer from "../views/Pengaturan/Aplikasi/TipeContainer.vue";
import Komoditas from "../views/Pengaturan/Aplikasi/Komoditas.vue";
import KopSurat from "../views/Pengaturan/Aplikasi/KopSurat.vue";
import IntegrasiGPS from "../views/Pengaturan/Aplikasi/IntegrasiGPS.vue";
import Pelayaran from "../views/Pengaturan/Aplikasi/Pelayaran.vue";
import DaftarKapal from "../views/Pengaturan/Aplikasi/DaftarKapal.vue";
import TrayekIndex from "../views/Pengaturan/Aplikasi/Trayek/Index.vue";
import TrayekForm from "../views/Pengaturan/Aplikasi/Trayek/Form.vue";
import PerusahaanIndex from "../views/Pengaturan/Aplikasi/Perusahaan/Index.vue";
import PerusahaanForm from "../views/Pengaturan/Aplikasi/Perusahaan/Form.vue";
import JenisSatuanUmum from "../views/Pengaturan/Umum/JenisSatuan.vue";
import TipeContainerUmum from "../views/Pengaturan/Umum/TipeContainer.vue";
import KomoditasUmum from "../views/Pengaturan/Umum/Komoditas.vue";
import JenisBBM from "../views/Pengaturan/Umum/JenisBBM.vue";
import LevelPelanggan from "../views/Pengaturan/Umum/LevelPelanggan.vue";
import TahapanPenawaran from "../views/Pengaturan/Umum/TahapanPenawaran.vue";
import Negara from "../views/Pengaturan/Lokasi/Negara.vue";
import Pelabuhan from "../views/Pengaturan/Lokasi/Pelabuhan.vue";
import TrayekUmum from "../views/Pengaturan/Lokasi/Trayek.vue";
import Spbu from "../views/Pengaturan/Lokasi/Spbu.vue";
import DepoKontainer from "../views/Pengaturan/Lokasi/DepoKontainer.vue";
import GateLocation from "../views/Pengaturan/Lokasi/GateLocation.vue";
import KelompokBiaya from "../views/Pengaturan/Operasional/KelompokBiaya.vue";
import JenisBiaya from "../views/Pengaturan/Operasional/JenisBiaya.vue";
import StandarBiaya from "../views/Pengaturan/Operasional/StandarBiaya.vue";
import ServiceTime from "../views/Pengaturan/Operasional/ServiceTime.vue";
import WindowReceive from "../views/Pengaturan/Operasional/WindowReceive.vue";
import AlasanBatal from "../views/Pengaturan/Operasional/AlasanBatal.vue";
import Brand from "../views/Pengaturan/Inventori/Brand.vue";
import TipeBin from "../views/Pengaturan/Inventori/TipeBin.vue";
import Kategori from "../views/Pengaturan/Inventori/Kategori.vue";
import MasterItem from "../views/Pengaturan/Inventori/MasterItem.vue";
import Warehouse from "../views/Pengaturan/Inventori/Warehouse.vue";
import BinLocation from "../views/Pengaturan/Inventori/BinLocation.vue";
import LoadingDock from "../views/Pengaturan/Inventori/LoadingDock.vue";
import MasterPajak from "../views/Pengaturan/Keuangan/MasterPajak.vue";

const routes = [

  {
    path: "/login",
    component: Login
  },
  {
    path: "/dashboard",
    redirect: "/"
  },
  {
    path: "/",
    component: Dashboard,
    children: [


      {
        path: "pengaturan/aplikasi",
        component: PengaturanAplikasi
      },
      {
        path: "pengaturan/user",
        component: PengaturanUser
      },
      {
        path: "pengaturan/kendaraan",
        component: Kendaraan
      },
      {
        path: "pengaturan/kendaraan/pabrikan",
        component: Pabrikan
      },
      {
        path: "pengaturan/kendaraan/tipe",
        component: Tipe
      },
      {
        path: "pengaturan/kendaraan/equipment",
        component: Equipment
      },
      {
        path: "pengaturan/kendaraan/body",
        component: Body
      },
      {
        path: "pengaturan/kendaraan/axel",
        component: Axel
      },
      {
        path: "pengaturan/kendaraan/varian",
        component: Varian
      },
      {
        path: "pengaturan/aplikasi/pengaturanumum",
        component: PengaturanUmum
      },
      {
        path: "pengaturan/aplikasi/jenislayanan",
        component: JenisLayanan
      },
      {
        path: "pengaturan/aplikasi/jenissatuan",
        component: JenisSatuan
      },
      {
        path: "pengaturan/aplikasi/tipecontainer",
        component: TipeContainer
      },
      {
        path: "pengaturan/aplikasi/komoditas",
        component: Komoditas
      },
      {
        path: "pengaturan/aplikasi/kopsurat",
        component: KopSurat
      },
      {
        path: "pengaturan/aplikasi/integrasigps",
        component: IntegrasiGPS
      },
      {
        path: "pengaturan/aplikasi/pelayaran",
        component: Pelayaran
      },
      {
        path: "pengaturan/aplikasi/daftarkapal",
        component: DaftarKapal
      },
      {
        path: "pengaturan/aplikasi/trayek",
        component: TrayekIndex
      },
      {
        path: "pengaturan/aplikasi/trayek/tambah",
        component: TrayekForm
      },
      {
        path: "pengaturan/aplikasi/trayek/edit/:id",
        component: TrayekForm
      },
      {
        path: "pengaturan/perusahaan",
        component: PerusahaanIndex
      },
      {
        path: "pengaturan/perusahaan/tambah",
        component: PerusahaanForm
      },
      {
        path: "pengaturan/perusahaan/edit/:id",
        component: PerusahaanForm
      },
      {
        path: "pengaturan/umum/jenissatuan",
        component: JenisSatuan
      },
      {
        path: "pengaturan/umum/tipecontainer",
        component: TipeContainer
      },
      {
        path: "pengaturan/umum/komoditas",
        component: Komoditas
      },
      {
        path: "pengaturan/umum/jenisbbm",
        component: JenisBBM
      },
      {
        path: "pengaturan/umum/levelpelanggan",
        component: LevelPelanggan
      },
      {
        path: "pengaturan/umum/tahapanpenawaran",
        component: TahapanPenawaran
      },
      {
        path: "pengaturan/lokasi/negara",
        component: Negara
      },
      {
        path: "pengaturan/lokasi/pelabuhan",
        component: Pelabuhan
      },
      {
        path: "pengaturan/lokasi/trayek",
        component: TrayekIndex
      },
      {
        path: "pengaturan/lokasi/spbu",
        component: Spbu
      },
      {
        path: "pengaturan/lokasi/depokontainer",
        component: DepoKontainer
      },
      {
        path: "pengaturan/lokasi/gatelocation",
        component: GateLocation
      },
      {
        path: "pengaturan/operasional/kelompokbiaya",
        component: KelompokBiaya
      },
      {
        path: "pengaturan/operasional/jenisbiaya",
        component: JenisBiaya
      },
      {
        path: "pengaturan/operasional/standarbiaya",
        component: StandarBiaya
      },
      {
        path: "pengaturan/operasional/servicetime",
        component: ServiceTime
      },
      {
        path: "pengaturan/operasional/windowreceive",
        component: WindowReceive
      },
      {
        path: "pengaturan/operasional/alasanbatal",
        component: AlasanBatal
      },
      {
        path: "pengaturan/inventori/brand",
        component: Brand
      },
      {
        path: "pengaturan/inventori/tipebin",
        component: TipeBin
      },
      {
        path: "pengaturan/inventori/kategori",
        component: Kategori
      },
      {
        path: "pengaturan/inventori/masteritem",
        component: MasterItem
      },
      {
        path: "pengaturan/inventori/warehouse",
        component: Warehouse
      },
      {
        path: "pengaturan/inventori/binlocation",
        component: BinLocation
      },
      {
        path: "pengaturan/inventori/loadingdock",
        component: LoadingDock
      },
      {
        path: "pengaturan/keuangan/masterpajak",
        component: MasterPajak
      }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});