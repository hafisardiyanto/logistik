const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:3000/api/trayek', {
      kode: 'TEST-01',
      nama: 'TEST NAME',
      cabang: 'TEST CABANG',
      kotaAsalId: 1,
      kotaTujuanId: 2,
      keterangan: 'TEST KETERANGAN',
      aktif: true
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
test();
