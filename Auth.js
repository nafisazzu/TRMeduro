// ── TOKO MEDURO – Auth & Role System ──
var AUTH_KEY = 'tokomeduro_auth';

function getSession() {
  var raw = sessionStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

function doLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

function requireLogin() {
  var s = getSession();
  if (!s) { window.location.href = 'index.html'; return null; }
  return s;
}

function requireOwner() {
  var s = requireLogin();
  if (!s) return null;
  if (s.role !== 'owner') {
    alert('Halaman ini hanya dapat diakses oleh Owner.');
    window.location.href = 'dashboard.html';
    return null;
  }
  return s;
}

function renderUserBadge(id) {
  var s = getSession(); if (!s) return;
  var el = document.getElementById(id); if (!el) return;
  el.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:1px">' +
    '<span style="font-size:11px;font-weight:700;color:#fff">' + s.nama + '</span>' +
    '<span style="font-size:9px;background:rgba(255,255,255,0.25);padding:1px 7px;border-radius:99px;color:#fff;text-transform:uppercase;letter-spacing:0.5px">' + s.role + '</span>' +
    '</div>';
}

function applyRoleAccess() {
  var s = getSession(); if (!s) return;
  if (s.role === 'kasir') {
    // Sembunyikan nav owner-only
    var ownerNavs = document.querySelectorAll('[data-owner-only="true"]');
    for (var i = 0; i < ownerNavs.length; i++) { ownerNavs[i].style.display = 'none'; }
    // Sembunyikan elemen edit/hapus/restock di stok barang
    var ownerEls = document.querySelectorAll('[data-owner-el="true"]');
    for (var j = 0; j < ownerEls.length; j++) { ownerEls[j].style.display = 'none'; }
  }
}

function updateNotifBadge() {
  var raw = localStorage.getItem('tokomeduro_notif') || '[]';
  var unread = JSON.parse(raw).filter(function(n){ return !n.dibaca; });
  var badge = document.getElementById('navBadge');
  if (!badge) return;
  if (unread.length > 0) {
    badge.textContent = unread.length;
    badge.style.display = 'flex';
    badge.style.background = '#7c3aed';
  } else {
    if (typeof getProduk === 'function') {
      var kritis = getProduk().filter(function(p){ return p.stok <= 3; }).length;
      if (kritis > 0) { badge.textContent = kritis; badge.style.display = 'flex'; badge.style.background = '#ef4444'; return; }
    }
    badge.style.display = 'none';
  }
}
