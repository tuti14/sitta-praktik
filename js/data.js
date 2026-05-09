// DATA USER
const sittaUserData = {
    users: [
        { 
            email: "mahasiswa@ut.ac.id", 
            password: "password123", 
            name: "Tuti Rahmawati", 
            role: "Mahasiswa",
            photo: "assets/user-avatar.png"
        },
        { 
            email: "admin@ut.ac.id", 
            password: "adminsitta", 
            name: "Admin Pusat", 
            role: "Administrator",
            photo: "assets/admin-avatar.png"
        }
    ]
};


// DATA DASHBOARD
const dashboardData = {
    currentUser: {},
    pesananTerbaru: [
        { do: "DO12345678", nama: "Pengantar Ekonomi Mikro", status: "Dikirim", tgl: "20 Mei 2024", color: "#198754" },
        { do: "DO12345677", nama: "Statistika Dasar", status: "Proses", tgl: "18 Mei 2024", color: "#ffc107" },
        { do: "DO12345676", nama: "Pengantar Akuntansi", status: "Menunggu", tgl: "16 Mei 2024", color: "#0dcaf0" }
    ],
    pengumuman: [
        { judul: "Pengiriman Wilayah 3T", isi: "Mungkin mengalami keterlambatan.", tgl: "20 Mei 2024" },
        { judul: "Libur Nasional", isi: "Pengiriman tidak dilakukan pada 23 Mei 2024.", tgl: "18 Mei 2024" }
    ]
};


// DATA TRACKING PENGIRIMAN
const sittatrackData = {
    tracking: [
        {
            no_do: "DO12345678",
            penerima: {
                nama: "Tuti Rahmawati",
                alamat: "Jl. Pendidikan No. 45, RT 03/RW 02, Kel. Margahayu, Kec. Bekasi Timur, Kota Bekasi, Jawa Barat 17113"
            },
            order: {
                tgl: "20 Mei 2024, 10:15 WIB",
                total_harga: 250000,
                biaya_pengiriman: 23000,
                biaya_layanan: 2500,
                status_bayar: "LUNAS"
            },
            ekspedisi: {
                nama: "JNE Express",
                no_resi: "JNE1234567890",
                tgl_kirim: "21 Mei 2024, 09:30 WIB",
                jenis_paket: "REG (Reguler)",
                estimasi: "23 Mei 2024"
            },
            status_step: 3, // 1: Order Diterima, 2: Dikirim, 3: Perjalanan, 4: Tiba, 5: Selesai
            timeline: [
                { tgl: "21 Mei 2024", jam: "13:20 WIB", status: "Dalam Perjalanan", detail: "Paket sedang dalam perjalanan menuju kota tujuan.", lokasi: "Bekasi" },
                { tgl: "21 Mei 2024", jam: "09:45 WIB", status: "Paket Diberangkatkan", detail: "Paket telah diberangkatkan dari hub JNE Jakarta.", lokasi: "Jakarta" },
                { tgl: "20 Mei 2024", jam: "19:30 WIB", status: "Paket Diproses", detail: "Paket sedang diproses di gudang asal.", lokasi: "Jakarta" },
                { tgl: "20 Mei 2024", jam: "10:30 WIB", status: "Order Diterima", detail: "Pesanan telah diterima oleh sistem.", lokasi: "Sistem SITTA" }
            ]
        }
    ]
};


// DATA STOK BUKU
const sittaStokData = [
    { id: 1, kode: "BAJ101", judul: "Pengantar Ekonomi Mikro", penerbit: "Universitas Terbuka", kategori: "Ekonomi", harga: 75000, stok: 150 },
    { id: 2, kode: "BAJ102", judul: "Statistika Dasar", penerbit: "Universitas Terbuka", kategori: "Statistika", harga: 60000, stok: 120 },
    { id: 3, kode: "BAJ103", judul: "Pengantar Akuntansi", penerbit: "Universitas Terbuka", kategori: "Akuntansi", harga: 80000, stok: 200 },
    { id: 4, kode: "BAJ104", judul: "Manajemen Pemasaran", penerbit: "Universitas Terbuka", kategori: "Manajemen", harga: 85000, stok: 95 },
    { id: 5, kode: "BAJ105", judul: "Pengantar Hukum Indonesia", penerbit: "Universitas Terbuka", kategori: "Hukum", harga: 70000, stok: 35 },
    { id: 6, kode: "BAJ106", judul: "Sistem Informasi Manajemen", penerbit: "Universitas Terbuka", kategori: "Sistem Informasi", harga: 90000, stok: 60 },
    { id: 7, kode: "BAJ107", judul: "Bahasa Inggris I", penerbit: "Universitas Terbuka", kategori: "Bahasa", harga: 50000, stok: 20 },
    { id: 8, kode: "BAJ108", judul: "Pendidikan Kewarganegaraan", penerbit: "Universitas Terbuka", kategori: "Pendidikan", harga: 45000, stok: 82 }
];


// DATA DETAIL BUKU
const sittaBukuData = [
    {
        kode: "BAJ101",
        judul: "Pengantar Ekonomi Mikro",
        edisi: "2",
        penulis: "Dr. Sri Wahyuni",
        penerbit: "Universitas Terbuka",
        isbn: "978-602-392-123-4",
        kategori: "Ekonomi",
        jenjang: "S1",
        mataKuliah: "Pengantar Ekonomi Mikro",
        sks: "3 SKS",
        cover: "assets/books.png", // Path ke gambar cover
        deskripsi: "Bahan ajar ini membahas konsep dasar ekonomi mikro, meliputi teori permintaan dan penawaran, elastisitas, teori produksi, biaya produksi, pasar persaingan sempurna, persaingan monopolistik, oligopoli, dan monopoli. Dilengkapi dengan contoh kasus dan latihan soal untuk mempermudah pemahaman mahasiswa.",
        stokTersedia: 150,
        stokMenipis: 20,
        perluRestock: 5,
        totalStok: 170,
        jumlahHalaman: "320 halaman",
        tahunTerbit: "2022",
        bahasa: "Indonesia",
        format: "Cetak",
        topik: [
            "Pendahuluan Ekonomi Mikro",
            "Permintaan, Penawaran, dan Keseimbangan Pasar",
            "Teori Perilaku Konsumen",
            "Teori Produksi dan Biaya Produksi",
            "Struktur Pasar: Persaingan Sempurna, Monopolistik, Oligopoli, Monopoli"
        ]
    }
];