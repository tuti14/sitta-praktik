// SCRIPT LUPA PASSWORD
document.addEventListener('DOMContentLoaded', () => {
    const lupaPasswordForm = document.getElementById('lupaPasswordForm');
    const emailLP = document.getElementById('emailLP');

    // Logika Validasi
    if (lupaPasswordForm) {
        lupaPasswordForm.addEventListener('submit', function(e) {
            // Cek apakah input kosong (pengganti empty)
            if (!emailLP.value.trim()) {
                e.preventDefault();
                alert('Silakan masukkan alamat email Anda.');
                return;
            }

            // Validasi format email (Regex sederhana)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailLP.value)) {
                e.preventDefault();
                alert('Format email tidak valid!');
            } else {
                e.preventDefault(); // Menahan reload untuk simulasi
                alert('Instruksi pemulihan telah dikirim ke: ' + emailLP.value);
                // logika pengiriman ke server
            }
        });
    }
});

// SCRIPT DAFTAR AKUN
document.addEventListener('DOMContentLoaded', () => {
    const daftarAkunForm = document.getElementById('daftarAkunForm');
    const togglePasswordDA = document.getElementById('togglePasswordDA');
    const toggleCPasswordDA = document.getElementById('toggleCPasswordDA');
    const passwordInputDA = document.getElementById('passwordDA');
    const cPasswordInputDA = document.getElementById('cpasswordDA');

    // 1. Logika Toggle Show/Hide Password Utama
    if (togglePasswordDA && passwordInputDA) {
        togglePasswordDA.addEventListener('click', function() {
            // Cek tipe saat ini
            const type = passwordInputDA.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInputDA.setAttribute('type', type);
            
            // Toggle icon Class (Ganti eye-slash ke eye)
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // 2. Logika Toggle Show/Hide Konfirmasi Password
    if (toggleCPasswordDA && cPasswordInputDA) {
        toggleCPasswordDA.addEventListener('click', function() {
            // Cek tipe saat ini
            const type = cPasswordInputDA.getAttribute('type') === 'password' ? 'text' : 'password';
            cPasswordInputDA.setAttribute('type', type);
            
            // Toggle icon Class
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // 3. Logika Validasi Kecocokan Password saat Submit
    if (daftarAkunForm) {
        daftarAkunForm.addEventListener('submit', function(e) {
            if (passwordInputDA.value !== cPasswordInputDA.value) {
                e.preventDefault(); // Batalkan pengiriman form
                alert('Kata sandi dan konfirmasi kata sandi tidak cocok!');
            } else {
                alert('Pendaftaran berhasil (simulasi)!');
                // proses pendaftaran...
            }
        });
    }
});


// SCRIPT LOGIN
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const btnLogin = document.querySelector('.btn-login');

    // 1. Logika Toggle Show/Hide Password
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon Class
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // 2. Logika Validasi Login & Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // Visual: Ubah tombol menjadi status loading
        const originalBtnText = btnLogin.innerHTML;
        btnLogin.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses...';
        btnLogin.style.opacity = '0.7';
        btnLogin.style.pointerEvents = 'none';

        // Simulasi delay jaringan (1 detik) sebelum memeriksa data
        setTimeout(() => {
            // Mencari user di data.js
            const user = sittaUserData.users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');

                // Simpan apa adanya dari data.js, jika kosong baru kasih default string
                const sessionData = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo: (user.photo && user.photo !== "") ? user.photo : "assets/avatar.png"
                };

                localStorage.setItem('userActive', JSON.stringify(sessionData));

                alert(`Selamat Datang, ${user.name}!`);
                window.location.href = 'dashboard.html';
                
            } else {
                // KONDISI GAGAL
                alert('Email atau Password salah! Silakan coba lagi.');
                
                // Kembalikan status tombol
                btnLogin.innerHTML = originalBtnText;
                btnLogin.style.opacity = '1';
                btnLogin.style.pointerEvents = 'auto';
                
                // Reset input password
                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 1000);
    });
});


// SCRIPT DASHBOARD
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleMenu');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
            const overlay = document.getElementById('sidebarOverlay');

    // --- RESPONSIVE SIDEBAR LOGIC ---
    toggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        } else {
            sidebar.classList.toggle('hide');
            mainContent.classList.toggle('full');
        }
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('show');
                overlay.classList.remove('show');
    });

    // --- DROPDOWN LAPORAN ---
    const laporanGroup = document.getElementById('laporanGroup');
        laporanGroup.querySelector('.group-title').addEventListener('click', () => {
        laporanGroup.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // --- DYNAMIC DATA RENDER ---
    function renderDashboard() {
        // 1. Logika Ucapan Berdasarkan Waktu (Greeting)
        const now = new Date();
        const hour = now.getHours();
        let greeting = "Selamat Malam"; // Default

        if (hour >= 5 && hour < 11) {
            greeting = "Selamat Pagi";
        } else if (hour >= 11 && hour < 15) {
            greeting = "Selamat Siang";
        } else if (hour >= 15 && hour < 18) {
            greeting = "Selamat Sore";
        }

        // Render Informasi User
        const savedUser = localStorage.getItem('userActive');
        let currentUser = dashboardData.currentUser; // Default fallback ke data.js

        if (savedUser) {
            currentUser = JSON.parse(savedUser); // Gunakan data user yang baru saja login
        }

        // Render Informasi User
        const userNameElements = document.querySelectorAll('.user-info .name, .welcome-banner h1');
        const userRoleElement = document.querySelector('.user-info .role');
        const userPhotoElement = document.querySelector('.user-profile .avatar');

        if (currentUser) {
            // Update Nama di Topbar (elemen pertama)
            if(userNameElements[0]) userNameElements[0].innerText = currentUser.name;
            
            // Update Ucapan Dinamis di Banner Welcome (elemen kedua)
            if(userNameElements[1]) {
                userNameElements[1].innerText = `${greeting}, ${currentUser.name}! 👋`;
            }
            
            // Update Role dan Photo
            if(userRoleElement) {
                // Jika role tidak ada di data login, asumsikan berdasarkan email atau default
                userRoleElement.innerText = currentUser.email === "admin@ut.ac.id" ? "Administrator" : "Mahasiswa";
            }
            if(userPhotoElement) userPhotoElement.src = currentUser.photo || "assets/avatar.png";
        }

        // 2. Render Pesanan Terbaru
        const orderList = document.getElementById('orderList');
        if (orderList && dashboardData.pesananTerbaru) {
            orderList.innerHTML = ''; 
            dashboardData.pesananTerbaru.forEach(item => {
                orderList.innerHTML += `
                    <div class="order-item">
                        <div class="order-right">
                            <div class="order-icon"><i class="fa-solid fa-box"></i></div>
                            <div class="order-info">
                                <strong>${item.do}</strong>
                                <p>${item.nama}</p>
                                <p><small>${item.tgl}</small></p>
                            </div>
                        </div>
                        <span class="status-badge" style="background: ${item.color}15; color: ${item.color}">${item.status}</span>
                    </div>
                `;
            });
        }

        // 3. Render Pengumuman
        const annList = document.getElementById('announcementList');
        if (annList && dashboardData.pengumuman) {
            annList.innerHTML = ''; 
            dashboardData.pengumuman.forEach(info => {
                annList.innerHTML += `
                    <div class="announce-item" style="align-items: flex-start; margin-bottom: 15px;">
                        <i class="fa-solid fa-circle-info" style="color: var(--accent-yellow); margin-top: 5px;"></i>
                        <div class="announce-info">
                            <strong style="font-size: 0.85rem; display: block;">${info.judul}</strong>
                            <p style="font-size: 0.75rem; color: var(--text-body); line-height: 1.4;">${info.isi}</p>
                            <small style="font-size: 0.65rem; color: var(--text-body-secondary);">${info.tgl}</small>
                        </div>
                    </div>
                `;
            });
        }
    }

    renderDashboard();

    // --- REALTIME CLOCK ---
    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit', minute: '2-digit',
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        const clockElement = document.getElementById('current-time');
        if(clockElement) {
            clockElement.innerText = formatter.format(now) + " WIB";
        }
    }
    
    setInterval(updateClock, 1000);
    updateClock();
});


// SCRIPT STOCK
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('stokTableBody');
    const searchInp = document.getElementById('searchInp');
    const catFilter = document.getElementById('catFilter');

    // --- RENDER LOGIC ---
    function renderTable(data) {
    tableBody.innerHTML = '';

        data.forEach((item, index) => {
            // Logic warna stok
            let stokClass = 'stok-high';
            if(item.stok < 40) stokClass = 'stok-low';
            else if(item.stok < 100) stokClass = 'stok-medium';

            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td style="font-weight: 600; color: var(--text-body-secondary);">${item.kode}</td>
                    <td style="font-weight: 500;">${item.judul}</td>
                    <td style="color: var(--text-body-secondary);">${item.penerbit}</td>
                    <td>${item.kategori}</td>
                    <td>${item.harga.toLocaleString('id-ID')}</td>
                    <td><span class="stok-badge ${stokClass}">${item.stok}</span></td>
                    <td>
                        <a href="detail.html">
                            <button class="btn-action btn-detail"><i class="fa-solid fa-book-open"></i></button>
                        </a>
                        <a href="#">
                            <button class="btn-action btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        </a>
                        <a href="#">
                            <button class="btn-action btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                        </a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        updateStats(data);
        document.getElementById('dataInfo').innerText = `Menampilkan ${data.length} dari ${sittaStokData.length} data`;
    }

    // --- STATS UPDATE ---
    function updateStats(data) {
        document.getElementById('totalJudul').innerText = data.length;
        document.getElementById('totalStok').innerText = data.reduce((acc, curr) => acc + curr.stok, 0).toLocaleString('id-ID');
        document.getElementById('stokTersedia').innerText = data.filter(i => i.stok >= 40).reduce((acc, curr) => acc + curr.stok, 0).toLocaleString('id-ID');
        document.getElementById('stokMenipis').innerText = data.filter(i => i.stok < 40).length;
    }

    // --- FILTER & SEARCH LOGIC ---
    function filterData() {
        const query = searchInp.value.toLowerCase();
        const category = catFilter.value;

        const filtered = sittaStokData.filter(item => { 
            const matchSearch = item.judul.toLowerCase().includes(query) || 
            item.kode.toLowerCase().includes(query) ||
            item.penerbit.toLowerCase().includes(query);
            const matchCat = category === 'all' || item.kategori === category;
            return matchSearch && matchCat;
        });

        renderTable(filtered);  
    }

    // --- INITIALIZE CATEGORIES ---
    const categories = [...new Set(sittaStokData.map(i => i.kategori))];
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.innerText = cat;
        catFilter.appendChild(opt);
    });

    // --- EVENTS ---
    searchInp.addEventListener('input', filterData);
    catFilter.addEventListener('change', filterData);

    // --- LOGIKA MODAL TAMBAH DATA ---
    const modal = document.getElementById('addModal');
    const AddContent = document.getElementById('AddStokContent');
    const closeModal = document.getElementById('closeModalBtn');
    const addStokForm = document.getElementById('addStokForm');

    window.modalAddStok = function() {
        modal.style.display = 'flex';
        AddStokContent.style.display = 'block';
    };

    // Menutup Modal
    closeModal.onclick = () => { modal.style.display = 'none'; };

    // Mengklik di luar modal untuk tutup
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    // --- FITUR TAMBAH DATA (DOM) ---
    addStokForm.onsubmit = (e) => {
        e.preventDefault();

        // 1. Mengambil Nilai dari Input
        const newEntry = {
            kode: document.getElementById('newKode').value.toUpperCase(),
            judul: document.getElementById('newJudul').value,
            penerbit: document.getElementById('newPenerbit').value,
            kategori: document.getElementById('newKategori').value,
            harga: parseInt(document.getElementById('newHarga').value),
            stok: parseInt(document.getElementById('newStok').value)
        };

        // 2. Memasukkan ke Array Utama
        sittaStokData.unshift(newEntry); // unshift agar data baru muncul paling atas

        // 3. Render Ulang Tabel
        renderTable(sittaStokData);

        // 4. Reset Form dan Tutup Modal
        addStokForm.reset();
        modal.style.display = 'none';

        // Opsional: Alert sukses
        alert('Data berhasil ditambahkan!');
    };

    // Initial Render
    renderTable(sittaStokData);
});


// SCRIPT TRACK
    function handleTracking() {
        const inputVal = document.getElementById('inputDO').value.trim();
        const resultDiv = document.getElementById('trackingResult');

        // Cari data di Array Objects (data.js)
        const data = sittatrackData.tracking.find(item => item.no_do === inputVal);

        if (data) {
            resultDiv.style.display = 'block';
            
            // Binding Data
            document.getElementById('resNama').innerText = data.penerima.nama;
            document.getElementById('resAlamat').innerText = data.penerima.alamat;
            document.getElementById('resDO').innerText = data.no_do;
            document.getElementById('resTglOrder').innerText = data.order.tgl;
            document.getElementById('resEksp').innerText = data.ekspedisi.nama;
            document.getElementById('resResi').innerText = data.ekspedisi.no_resi;
            document.getElementById('resTotal').innerText = "Rp " + data.order.total_harga.toLocaleString('id-ID');

            // Update Stepper
            for(let i=1; i<=5; i++) {
                const stepEl = document.getElementById(`step${i}`);
                if(i <= data.status_step) stepEl.classList.add('active');
                else stepEl.classList.remove('active');
            }

            // Render Timeline
            const timelineBox = document.getElementById('timelineContainer');
            timelineBox.innerHTML = '';
            data.timeline.forEach(log => {
                timelineBox.innerHTML += `
                    <div class="timeline-item">
                        <div class="time-col">${log.tgl}<br>${log.jam}</div>
                        <div class="status-col">
                            <strong>${log.status}</strong>
                            <p>${log.detail}</p>
                        </div>
                        <div class="loc-col">${log.lokasi}</div>
                    </div>
                `;
            });

        } else {
            alert("Nomor Delivery Order tidak ditemukan!");
            resultDiv.style.display = 'none';
        }
    }



// SCRIPT DETAIL BUKU
document.addEventListener('DOMContentLoaded', () => {
    // 1. Validasi Parameter URL
    const urlParams = new URLSearchParams(window.location.search);
     const kodeBuku = urlParams.get('kode') || "BAJ101"; // Default ke BAJ101 untuk demo

    // 2. Simulasi Fetch Data dari data.js
    const buku = sittaBukuData.find(b => b.kode === kodeBuku);
    const container = document.getElementById('detailContainer');

    if (!buku) {
        container.innerHTML = `<h3>Data buku tidak ditemukan.</h3>`;
        return;
    }

    // 3. DOM Manipulation untuk render detail
    container.innerHTML = `
        <div class="main-info">
            <div class="book-cover-wrapper">
                <img src="${buku.cover}" alt="Cover Buku" class="book-cover" onerror="this.src='https://via.placeholder.com/320x450?text=No+Image'">
                <!-- Pagination Dots Simulasi -->
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 8px;">
                     <span style="width: 8px; height: 8px; background-color: var(--bg-info); border-radius: 50%;"></span>
                    <span style="width: 8px; height: 8px; background-color: var(--dark); border-radius: 50%;"></span>
                    <span style="width: 8px; height: 8px; background-color: var(--dark); border-radius: 50%;"></span>
                </div>
            </div>

            <div class="content-info">
                <span class="badge-cat">${buku.kategori}</span>
                <h1 class="book-title">${buku.judul}</h1>
                <p class="book-edition">Edisi ${buku.edisi}</p>
                        
                <ul class="info-list">
                    <li><strong>Penulis:</strong> ${buku.penulis}</li>
                    <li><strong>Penerbit:</strong> ${buku.penerbit}</li>
                    <li><strong>ISBN:</strong> ${buku.isbn}</li>
                    <li><strong>Kode Bahan Ajar:</strong> ${buku.kode}</li>
                    <li><strong>Kategori:</strong> ${buku.kategori}</li>
                    <li><strong>Jenjang:</strong> ${buku.jenjang}</li>
                    <li><strong>Mata Kuliah:</strong> ${buku.mataKuliah}</li>
                    <li><strong>SKS:</strong> ${buku.sks}</li>
                </ul>
            </div>
        </div>

        <div class="stock-panel">
            <h4>Informasi Stok</h4>
            <div class="stock-row">
                <span>Stok Tersedia</span>
                <span class="badge-num" style="background-color: var(--success-subtle); color: var(--text-success);">${buku.stokTersedia}</span>
            </div>
            <div class="stock-row">
                <span>Stok Menipis</span>
                <span class="badge-num" style="background-color: var(--warning-subtle); color: var(--text-warning);">${buku.stokMenipis}</span>
            </div>
            <div class="stock-row">
                <span>Perlu Restock</span>
                <span class="badge-num" style="background-color: var(--danger-subtle); color: var(--text-danger);">${buku.perluRestock}</span>
            </div>
            <div class="stock-row" style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 10px;">
                <strong style="color: var(--primary-blue);">Total Stok</strong>
                <strong style="color: var(--primary-blue); font-size: 1.1rem;">${buku.totalStok}</strong>
            </div>
            <div class="stock-row">
                <span>Satuan</span>
                <span>Eksemplar</span>
            </div>
        </div>

        <div class="description-sec">
            <h4>Deskripsi</h4>
            <p>${buku.deskripsi}</p>
        </div>

        <div class="grid-detail">
            <div class="sub-info-card">
                <h4 style="margin-bottom: 15px; color: var(--ut-blue);">Detail Bahan Ajar</h4>
                <div class="stock-row"><span><i class="fa-solid fa-book-open" style="margin-right: 10px; color: var(--primary-blue);"></i> Jumlah Halaman</span> <span>${buku.jumlahHalaman}</span></div>
                <div class="stock-row"><span><i class="fa-solid fa-calendar-days" style="margin-right: 10px; color: var(--primary-blue);"></i> Tahun Terbit</span> <span>${buku.tahunTerbit}</span></div>
                <div class="stock-row"><span><i class="fa-solid fa-language" style="margin-right: 10px; color: var(--primary-blue);"></i> Bahasa</span> <span>${buku.bahasa}</span></div>
                <div class="stock-row"><span><i class="fa-solid fa-file-pdf" style="margin-right: 10px; color: var(--primary-blue);"></i> Format</span> <span>${buku.format}</span></div>
            </div>

            <div class="sub-info-card">
                <h4 style="margin-bottom: 15px; color: var(--primary-blue);">Topik yang Dibahas</h4>
                <ul class="topic-list">
                    ${buku.topik.map(t => `<li><i class="fa-solid fa-circle-check"></i> ${t}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="footer-actions">
            <button class="btn-outline"><i class="fa-solid fa-list-ul" style="margin-right: 10px;"></i> Lihat Daftar Isi</button>
            <button class="btn-primary"><i class="fa-solid fa-box"></i> Cek Ketersediaan & Pesan</button>
        </div>
    `;
});