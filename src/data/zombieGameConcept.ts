export interface SurvivorCharacter {
  name: string;
  codename: string;
  age: number;
  profession: string;
  portrait: string;
  backstory: string;
  signatureSkills: { title: string; desc: string }[];
  motivation: string;
  psychologicalProfile: string;
}

export interface InfectedVariant {
  id: string;
  name: string;
  alias: string;
  stage: string;
  image?: string;
  threatLevel: 'Rendah' | 'Tinggi' | 'Mematikan' | 'Apex Predator';
  sensoryBehavior: string;
  weakness: string;
  lore: string;
}

export interface SurvivalPillar {
  title: string;
  tagline: string;
  desc: string;
  icon: string;
}

export const ZOMBIE_GAME_CONCEPT = {
  title: "KALA SENJA RUNTUH",
  englishTitle: "ASHES OF DUSK: MAYA'S ODYSSEY",
  genre: "Hardcore Narrative Survival Horror & Sanctuary Management",
  tagline: "Ketika Hujan Tropis Membawa Spora Karang Hitam, Bertahan Hidup Bukan Sekadar Peluru, Melainkan Menjaga Sisa Kemanusiaan.",
  heroImage: "/src/assets/images/zombie_survival_hero_1794362677079.jpg",
  shelterImage: "/src/assets/images/fortified_rooftop_shelter_1794362677536.jpg",
  infectedImage: "/src/assets/images/infected_spore_stalker_1794362677919.jpg",
  logline: "Tiga tahun setelah wabah jamur saraf Mycocordyceps melumpuhkan kepulauan tropis, Maya—seorang mantan peneliti botani medis—bertahan hidup di atas atap gedung kota runtuh. Berbekal panah senyap dan peralatan penyulingan kimia, ia harus menembus zona karantina berkabut spora untuk menyelamatkan adiknya sekaligus meracik vaksin penyembuh.",
  pillars: [
    {
      title: "Audio-Driven Stealth & Akustik Fisika",
      tagline: "Bunyi Adalah Hukuman Mati",
      desc: "Zombie kehilangan penglihatan namun memiliki pendengaran ultrasonik. Suara gesekan semak, pecahan kaca, atau derit lantai basah memandu kawanan langsung ke arahmu.",
      icon: "👂"
    },
    {
      title: "Sistem Manajemen Spora & Masker Filter",
      tagline: "Bernapas Membutuhkan Pengorbanan",
      desc: "Kabut hujan tropis membawa partikel spora infeksius. Filter masker memiliki durasi terbatas; pemain harus menimbang antara mencari obat penekan spora atau mencari makanan.",
      icon: "☣️"
    },
    {
      title: "Rooftop Greenhouse & Sanctum Building",
      tagline: "Membangun Oase di Atas Neraka",
      desc: "Bukan shelter statis: kelola kebun hidroponik atap, kumpulkan air hujan murni dengan penyaring karbon, pasang panel surya, dan perkuat barikade kawat berduri sebelum malam tiba.",
      icon: "🌱"
    },
    {
      title: "Emergent Human Factions & Dilema Moral",
      tagline: "Manusia yang Hidup Sering Lebih Buas dari Mayat",
      desc: "Temui penyintas lain dengan kepentingan berselisih. Apakah kamu akan membagi persediaan antibiotik terakhirmu, atau menggunakan botol feromon untuk mengarahkan kawanan zombie ke markas bandit musuh?",
      icon: "⚖️"
    }
  ]
};

export const PROTAGONIST_MAYA: SurvivorCharacter = {
  name: "Maya Pradipta",
  codename: "The Herbalist",
  age: 27,
  profession: "Mantan Peneliti Biokimia & Mikologi Tropis",
  portrait: "/src/assets/images/female_protagonist_maya_1794362677007.jpg",
  backstory: "Ketika wabah spora 'Karang Hitam' merebak dari perkebunan sawit pedalaman dan menyapu kota megapolitan dalam 72 jam, Maya kehilangan kedua orang tuanya di pos evakuasi bandara. Ia berhasil melarikan diri ke atap gedung apartemen terbengkalai bersama jurnal penelitian mikologinya. Maya menyadari bahwa adiknya, Dira (14 tahun), memiliki antibodi langka yang dapat menetralisir enzim spora, namun Dira terpisah saat konvoi militer ambruk di Sektor 0.",
  motivation: "Menemukan Dira hidup-hidup di Zona Karantina Nol, mengekstrak serum antibodi, dan menyiarkan formula sintesis vaksin melalui menara pemancar radio atap gedung sebelum infeksi memusnahkan populasi manusia terakhir.",
  psychologicalProfile: "Pragmatis, tenang di bawah tekanan, trauma mendalam akibat kehilangan rekan lab, menolak membunuh sesama manusia kecuali dalam keadaan terpaksa.",
  signatureSkills: [
    {
      title: "Farmakope Herbal & Ekstraksi Toksin",
      desc: "Mampu meracik obat penekan infeksi spora, penawar racun gigitan, dan pelumas peredam senjata dari getah pohon perkotaan."
    },
    {
      title: "Akustik Biomassa",
      desc: "Dapat memperkirakan jumlah dan jenis infected di balik dinding beton tebal hanya dari frekuensi getaran klik suara jamur (*echolocation*)."
    },
    {
      title: "Manajemen Balistik Senyap",
      desc: "Ahli memodifikasi busur silang (*recurve crossbow*), membuat mata panah berongga untuk suntikan racun saraf, dan memanfaatkan kembali anak panah."
    }
  ]
};

export const INFECTED_VARIANTS: InfectedVariant[] = [
  {
    id: "spore_stalker",
    name: "The Spore Stalker (Karang Rekah)",
    alias: "Pemburu Sunyi",
    stage: "Tahap II - Koloni Saraf Mekar",
    threatLevel: "Mematikan",
    sensoryBehavior: "Total buta. Mengeluarkan suara decak klik ultrasonik (*echolocation*). Sangat lincah, mampu memanjat pipa gedung dan langit-langit.",
    weakness: "Sangat sensitif terhadap frekuensi suara nyaring (pecahan botol, lonceng alarm) dan rentan terhadap semprotan herbisida asam.",
    lore: "Terjadi ketika miselium jamur menembus rongga mata dan mekar membentuk tudung jamur keras di sekitar tengkorak. Insting bertahan hidup lenyap, digantikan dorongan menyebarkan spora."
  },
  {
    id: "shambler",
    name: "The Drenched Shambler (Mayat Lumpur)",
    alias: "Penyusup Basah",
    stage: "Tahap I - Infeksi Awal",
    threatLevel: "Rendah",
    sensoryBehavior: "Bergerak gontai di lorong becek, mata keruh memutih, sangat reaktif terhadap cahaya senter dan suara langkah kaki.",
    weakness: "Serangan senyap dari belakang ke batang leher; lambat dan mudah dihindari dengan mengendap.",
    lore: "Warga sipil yang menghirup spora dalam 24 jam terakhir. Otak mereka masih merasakan rasa sakit dan sesekali merintih sebelum menyerang membabi buta."
  },
  {
    id: "bloat_burster",
    name: "The Spore Bloat (Kantung Racun)",
    alias: "Pelepas Wabah",
    stage: "Tahap III - Fermentasi Gas",
    threatLevel: "Tinggi",
    sensoryBehavior: "Bergerak lambat, tubuh membengkak oleh gas metana dan koloni jamur busuk. Meledak jika menerima tembakan di dada.",
    weakness: "Tembakan presisi di tungkai bawah untuk melumpuhkan tanpa memicu ledakan spora beracun.",
    lore: "Infected yang terperangkap di ruangan lembap tanpa ventilasi. Tubuhnya berubah menjadi bom biologis berjalan yang merusak filter masker gas siapapun dalam radius 10 meter."
  },
  {
    id: "matriarch",
    name: "The Mycelium Matriarch (Ratu Miselium)",
    alias: "Inti Koloni",
    stage: "Tahap IV - Apex Anomaly",
    threatLevel: "Apex Predator",
    sensoryBehavior: "Terkoneksi dengan seluruh akar jamur di tanah dalam radius 500 meter. Mampu memanggil ratusan infected secara bersamaan melalui jeritan feromon.",
    weakness: "Insinerasi termal (senjata pembakar) langsung ke inti sarang saraf di rongga dada.",
    lore: "Spesimen raksasa hasil fusi puluhan inang di basement rumah sakit karantina. Dipercaya sebagai sumber mutasi yang memicu keruntuhan kota."
  }
];

export const SURVIVAL_TOOLS = [
  {
    id: "silent_crossbow",
    name: "Crossbow Rakitan Maya (Titanium Cable)",
    category: "Senjata Senyap",
    desc: "Dibuat dari suspensi mobil dan kabel serat baja. Menembakkan panah tanpa decibel suara, anak panah dapat dicabut kembali dari target.",
    stats: "Noise: 5 dB · Jangkauan: 35m · Efisiensi: 90%"
  },
  {
    id: "spore_mask",
    name: "Respirator Militer Filter Karbon Aktif",
    category: "Perlindungan",
    desc: "Menyaring partikel spora mikroskopis di zona merah. Filter arang harus diganti setiap 4 jam saat hujan asam turun.",
    stats: "Filtrasi: 99.4% · Daya Tahan: 240 Menit"
  },
  {
    id: "botanical_kit",
    name: "Perangkat Distilasi Herbal Portable",
    category: "Medis",
    desc: "Peralatan mini untuk mengekstrak senyawa antiseptik dari lumut kerak dan jahe liar guna menekan laju infeksi gigitan.",
    stats: "Waktu Diracik: 3 Menit · Efek: -40% Infeksi"
  },
  {
    id: "decoy_emitter",
    name: "Umpan Frekuensi Suara (Chirp Canister)",
    category: "Taktis",
    desc: "Dapat dilempar ke arah kelompok bandit atau sudut ruangan untuk memikat seluruh Stalker menjauh dari rute jalan keluar.",
    stats: "Radius Pancing: 45m · Durasi Suara: 15 Detik"
  }
];
