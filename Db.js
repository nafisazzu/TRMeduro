// ── TOKO MEDURO – Shared Data Store (localStorage) ──

const DB_KEY = 'tokomeduro_produk';
const TRX_KEY = 'tokomeduro_transaksi';
const MASUK_KEY = 'tokomeduro_barangmasuk';
const KELUAR_KEY = 'tokomeduro_barangkeluar';

const DEFAULT_PRODUK = [
  { id:1,  nama:'Kansas 20',              kategori:'Rokok',   stok:3,  hargaBeli:16500, hargaJual:19000 },
  { id:2,  nama:'HS Kretek 12',           kategori:'Rokok',   stok:5,  hargaBeli:8750,  hargaJual:10000 },
  { id:3,  nama:'EspresoGold',            kategori:'Rokok',   stok:2,  hargaBeli:17700, hargaJual:20000 },
  { id:4,  nama:'Marlboro F Black 16',    kategori:'Rokok',   stok:3,  hargaBeli:30601, hargaJual:35000 },
  { id:5,  nama:'Marlboro F Black 12',    kategori:'Rokok',   stok:10, hargaBeli:23531, hargaJual:27000 },
  { id:6,  nama:'Mild 16',                kategori:'Rokok',   stok:6,  hargaBeli:35074, hargaJual:40000 },
  { id:7,  nama:'Inter FIM',              kategori:'Rokok',   stok:4,  hargaBeli:25900, hargaJual:29000 },
  { id:8,  nama:'Surya 16 Merah FSM',     kategori:'Rokok',   stok:3,  hargaBeli:34900, hargaJual:39000 },
  { id:9,  nama:'Surya 12',               kategori:'Rokok',   stok:10, hargaBeli:25850, hargaJual:29000 },
  { id:10, nama:'Gajah Baru 16',          kategori:'Rokok',   stok:10, hargaBeli:20650, hargaJual:23000 },
  { id:11, nama:'GB Premium',             kategori:'Rokok',   stok:6,  hargaBeli:16700, hargaJual:19000 },
  { id:12, nama:'Dunhil Hitam 12',        kategori:'Rokok',   stok:5,  hargaBeli:21400, hargaJual:24500 },
  { id:13, nama:'Aqua 600ml',             kategori:'Minuman', stok:24, hargaBeli:2500,  hargaJual:3500  },
  { id:14, nama:'Teh Botol 350ml',        kategori:'Minuman', stok:0,  hargaBeli:3200,  hargaJual:4000  },
  { id:15, nama:'Indomie Goreng',         kategori:'Makanan', stok:2,  hargaBeli:2800,  hargaJual:3500  },
];

// ── PRODUK ──
function getProduk() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_PRODUK));
    return DEFAULT_PRODUK;
  }
  return JSON.parse(raw);
}

function saveProduk(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function tambahProdukBaru(p) {
  const list = getProduk();
  const newId = Math.max(...list.map(x => x.id)) + 1;
  list.push({ ...p, id: newId });
  saveProduk(list);
  return newId;
}

function updateProduk(id, changes) {
  const list = getProduk();
  const idx  = list.findIndex(x => x.id === id);
  if (idx > -1) { Object.assign(list[idx], changes); saveProduk(list); }
}

function hapusProdukById(id) {
  const list = getProduk().filter(x => x.id !== id);
  saveProduk(list);
}

function tambahStok(id, qty) {
  const list = getProduk();
  const p    = list.find(x => x.id === id);
  if (p) { p.stok += qty; saveProduk(list); }
}

function kurangiStok(id, qty) {
  const list = getProduk();
  const p    = list.find(x => x.id === id);
  if (p) { p.stok = Math.max(0, p.stok - qty); saveProduk(list); }
}

// ── TRANSAKSI ──
function getTransaksi() {
  return JSON.parse(localStorage.getItem(TRX_KEY) || '[]');
}

function saveTransaksi(list) {
  localStorage.setItem(TRX_KEY, JSON.stringify(list));
}

function tambahTransaksi(trx) {
  const list = getTransaksi();
  list.unshift(trx);
  saveTransaksi(list);
}

// ── BARANG MASUK ──
function getBarangMasuk() {
  return JSON.parse(localStorage.getItem(MASUK_KEY) || '[]');
}

function tambahBarangMasuk(item) {
  const list = getBarangMasuk();
  list.unshift(item);
  localStorage.setItem(MASUK_KEY, JSON.stringify(list));
}

// ── BARANG KELUAR ──
function getBarangKeluar() {
  return JSON.parse(localStorage.getItem(KELUAR_KEY) || '[]');
}

function tambahBarangKeluar(item) {
  const list = getBarangKeluar();
  list.unshift(item);
  localStorage.setItem(KELUAR_KEY, JSON.stringify(list));
}

// ── UTILS ──
function formatRp(n) {
  return 'Rp ' + (n || 0).toLocaleString('id-ID');
}

function getNomorTrx() {
  const n = parseInt(localStorage.getItem('tokomeduro_trx_counter') || '0') + 1;
  localStorage.setItem('tokomeduro_trx_counter', n);
  return '#TRX-' + String(n).padStart(4, '0');
}
