const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const appSettingRoutes = require("./routes/appSetting.routes");
const groupLayananRoutes = require("./routes/groupLayanan.routes");
const jenisLayananRoutes = require("./routes/jenisLayanan.routes");
const jenisSatuanRoutes = require("./routes/jenisSatuan.routes");
const tipeContainerRoutes = require("./routes/tipeContainer.routes");
const komoditasRoutes = require("./routes/komoditas.routes");
const lokasiRoutes = require("./routes/lokasi.routes");
const trayekRoutes = require("./routes/trayek.routes");
const perusahaanRoutes = require("./routes/perusahaan.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/app-settings", appSettingRoutes);
app.use("/api/group-layanan", groupLayananRoutes);
app.use("/api/jenis-layanan", jenisLayananRoutes);
app.use("/api/jenis-satuan", jenisSatuanRoutes);
app.use("/api/tipe-container", tipeContainerRoutes);
app.use("/api/komoditas", komoditasRoutes);
app.use("/api/lokasi", lokasiRoutes);
app.use("/api/trayek", trayekRoutes);
app.use("/api/perusahaan", perusahaanRoutes);

app.get("/", (req, res) => {
    res.send("Backend Logistics Running 🚀");
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});