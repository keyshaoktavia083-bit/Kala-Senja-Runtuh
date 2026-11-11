export interface BiomeInfo {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  climate: string;
  coreElements: string[];
  signaturePuzzle: string;
  description: string;
  environmentalHazards: string[];
  emergentTrick: string;
}

export interface ElementalReaction {
  id: string;
  elementA: string;
  elementB: string;
  resultName: string;
  icon: string;
  physicsDescription: string;
  gameplayApplication: string;
  realWorldPhysicsAnalogy: string;
}

export interface PuzzleConcept {
  id: string;
  title: string;
  biomeId: string;
  difficulty: 'Eksplorasi' | 'Tantangan Menengah' | 'Kuil Epik';
  mechanics: string[];
  scenario: string;
  canonicalSolution: string[];
  emergentSolutions: string[];
  reward: string;
}

export const GAME_OVERVIEW = {
  title: "CHRONOSFERA",
  subtitle: "Ekspedisi Alam Kuno (Echoes of the Living Biosphere)",
  tagline: "Dunia Terbuka yang Bukan Sekadar Latar Belakang, Melainkan Mesin Puzzle Hidup yang Bereaksi Terhadap Setiap Hukum Fisika.",
  heroImage: "/src/assets/images/chronosfera_hero_world_1794361387680.jpg",
  gauntletImage: "/src/assets/images/relic_aether_gauntlet_1794361388896.jpg",
  logline: "Di dunia di mana cuaca, arus air, medan magnet, dan siklus botani dikendalikan oleh monolit peninggalan bangsa Chronarch, kamu bermain sebagai 'Aether-Pilgrim'. Bekali sarung tangan kunomu untuk memanipulasi fase materi, mengalirkan angin, dan membalik polaritas bebatuan guna menembus reruntuhan raksasa yang saling terhubung.",
  keyPillars: [
    {
      title: "Sistem Fisika Kausal (Tanpa Skrip Kaku)",
      desc: "Setiap elemen air, es, uap, api, angin, dan magnet berinteraksi secara modular. Jika air membeku, ia mengapung dan menahan beban; jika mendidih, uapnya menghasilkan daya angkat aerodinamis.",
    },
    {
      title: "Puzzle Makro & Mikro yang Mempengaruhi Ekosistem",
      desc: "Memecahkan puzzle bendungan di hulu gunung akan mengeringkan lembah di hilir, mengungkap pintu kuil kuno bawah danau yang sebelumnya terkubur ribuan tahun.",
    },
    {
      title: "Navigasi Berbasis Arus Lingkungan",
      desc: "Tidak ada 'fast travel' instan yang merusak imersi. Perjalanan menggunakan glider membran memanfaatkan termal uap panas dan medan magnetik rel bebatuan kuno.",
    },
    {
      title: "Emergent Problem Solving",
      desc: "Setiap rintangan memiliki minimal 3 cara penyelesaian: melalui manipulasi suhu, manipulasi arus kinetik, atau pemanfaatan flora purba.",
    }
  ]
};

export const ELEMENTAL_REACTIONS: ElementalReaction[] = [
  {
    id: "steam_lift",
    elementA: "Termal Panas (Geotermal)",
    elementB: "Hidro (Air Arus)",
    resultName: "Tekanan Uap Aerodinamis (Thermal Updraft)",
    icon: "💨",
    physicsDescription: "Air mendidih seketika menjadi uap bertekanan tinggi saat dialirkan ke ventilasi magma bawah tanah.",
    gameplayApplication: "Memutar kincir monolit raksasa atau menjadi kolom udara panas yang mengangkat pemain dengan Glider hingga ke puncak tebing terjal.",
    realWorldPhysicsAnalogy: "Siklus termodinamika Rankine & gaya angkat konveksi udara panas."
  },
  {
    id: "cryo_bridge",
    elementA: "Termal Dingin (Kriogenik)",
    elementB: "Hidro (Air Arus)",
    resultName: "Kristalisasi Es Padat (Permafrost Traverse)",
    icon: "❄️",
    physicsDescription: "Molekul air membeku menjadi kisi es padat dengan massa jenis lebih rendah dari air cair, membentuk lapisan terapung yang kokoh.",
    gameplayApplication: "Mengubah air terjun berarus deras menjadi dinding es yang bisa dipanjat, atau membuat jembatan es sementara melintasi danau asam.",
    realWorldPhysicsAnalogy: "Anomali massa jenis es dan transisi fase cair-ke-padat eksotermik."
  },
  {
    id: "magnetic_rail",
    elementA: "Polaritas Fluks (+ / -)",
    elementB: "Bijih Lodestone Kinetik",
    resultName: "Levitasi Magnetik Diamagnetik (Lodestone Rail)",
    icon: "🧲",
    physicsDescription: "Bebatuan kuno yang kaya bijih feromagnetik bereaksi terhadap medan magnetik polaritas sejenis (tolak) atau berlawanan (tarik).",
    gameplayApplication: "Mengapungkan platform batu raksasa menyeberangi jurang tak berdasar atau meluncurkan proyektil batu ke sakelar penyeimbang.",
    realWorldPhysicsAnalogy: "Hukum Lorentz, tolakan kutub senama, dan levitasi superkonduktor efek Meissner."
  },
  {
    id: "acoustic_resonance",
    elementA: "Pneumatik (Arus Angin)",
    elementB: "Garpu Tala Monolit (Akustik)",
    resultName: "Resonansi Frekuensi Selaras (Harmonic Shatter/Unlock)",
    icon: "🔔",
    physicsDescription: "Arus angin yang diarahkan melalui celah resonansi tertentu menghasilkan gelombang bunyi pada frekuensi eigen batu kristal.",
    gameplayApplication: "Membuka gerbang sonik raksasa yang hanya terbuka jika 3 garpu tala berbunyi pada harmoni nada F-Sharp, C, dan G.",
    realWorldPhysicsAnalogy: "Resonansi akustik Helmholtz dan keruntuhan getaran selaras (sympathetic vibration)."
  },
  {
    id: "chrono_flora",
    elementA: "Siklus Waktu Aether",
    elementB: "Flora Bioluminesen",
    resultName: "Akselerasi Pertumbuhan Spora (Rapid Biome Growth)",
    icon: "🌿",
    physicsDescription: "Energi Aether mengkatalisasi mitosis sel tumbuhan purba, memampatkan siklus hidup 50 tahun menjadi 5 detik.",
    gameplayApplication: "Menumbuhkan sulur raksasa dari benih mati untuk dijadikan jembatan gantung, atau meluruhkan kayu rapuh penyumbat pintu air.",
    realWorldPhysicsAnalogy: "Katalisis biokimia dan fototropisme dipercepat."
  }
];

export const BIOMES: BiomeInfo[] = [
  {
    id: "sunderfall",
    name: "Lembah Geotermal Sunderfall",
    subtitle: "Ngarai Uap & Patahan Jeram Beku",
    image: "/src/assets/images/biome_geothermal_canyon_1794361387585.jpg",
    climate: "Fluktuatif Ekstrem (Mata air mendidih bersebelahan dengan gletser permafrost)",
    coreElements: ["Termal Panas", "Kriogenik", "Aliran Hidro Tektonik"],
    signaturePuzzle: "Sistem Katup Terakota & Pengaturan Tekanan Pipa Magma",
    description: "Ngarai bertingkat di mana air gletser pegunungan bertemu dengan celah vulkanik aktif. Reruntuhan bangsa Chronarch di sini berfungsi sebagai pengatur pendingin inti bumi.",
    environmentalHazards: [
      "Hipotermia jika berenang di sungai lelehan es",
      "Semburan uap panas bersuhu 300°C yang membutakan navigasi",
      "Rapuhnya jembatan es jika terpapar panas berlebih"
    ],
    emergentTrick: "Membekukan saluran air sebelum dialirkan ke ventilasi uap untuk menciptakan ledakan uap kompresi (Steam Burst) yang melontarkan pemain ke platform rahasia."
  },
  {
    id: "chronowoods",
    name: "Hutan Kristal Waktu (Verdant Chronowoods)",
    subtitle: "Reruntuhan Sulur & Monolit Lodestone Terapung",
    image: "/src/assets/images/biome_floating_chronowoods_1794361388776.jpg",
    climate: "Lembap Berkabut, Diliputi Partikel Resonansi Magnetik",
    coreElements: ["Polaritas Lodestone", "Botani Purba", "Siklus Waktu"],
    signaturePuzzle: "Rangkaian Jam Matahari Kuno & Jembatan Sulur Fototropik",
    description: "Hutan lebat dengan pohon-pohon raksasa berumur ribuan tahun yang membelit monolit batu terapung. Gravitasi di area ini tidak stabil karena konsentrasi bijih lodestone alami.",
    environmentalHazards: [
      "Anomali gravitasi terbalik yang bisa melempar pemain ke kanopi",
      "Spora jamur pengabur jarak pandang yang harus diusir dengan angin",
      "Bebatuan terapung yang bergerak saat badai magnetik tiba"
    ],
    emergentTrick: "Menggunakan polaritas magnetik negatif pada sarung tangan untuk menarik buah magnetik berduri sebagai pemberat sakelar tekanan di kejauhan."
  },
  {
    id: "zephyr_crags",
    name: "Puncak Badai Zephyr",
    subtitle: "Lembah Labirin Angin & Garpu Tala Raksasa",
    image: "/src/assets/images/chronosfera_hero_world_1794361387680.jpg",
    climate: "Angin Badai Tektonik Berkelanjutan & Tekanan Udara Rendah",
    coreElements: ["Aerodinamika", "Akustik Sonik", "Defleksi Termal"],
    signaturePuzzle: "Labirin Kincir Resonansi Tiga Frekuensi",
    description: "Deretan tebing batu vertikal yang menjulang di atas awan, dibelah oleh celah sempit berangin kencang yang berfungsi sebagai seruling alam raksasa.",
    environmentalHazards: [
      "Turbulensi angin kencang yang merusak kontrol glider",
      "Petir alami yang menyambar objek logam / konduktif",
      "Gelombang ultrasonik dari garpu tala rusak yang mengacaukan kompas"
    ],
    emergentTrick: "Menyalakan api unggun kecil di celah ngarai sempit untuk menghasilkan kolom termal mendadak, memungkinkan glider meluncur naik melebihi batas ketinggian normal."
  }
];

export const PUZZLE_SHOWCASES: PuzzleConcept[] = [
  {
    id: "puzzle_1",
    title: "Katup Monolit Tiga Tingkat (The Tri-Phase Sluice)",
    biomeId: "sunderfall",
    difficulty: "Tantangan Menengah",
    mechanics: ["Fase Air/Es", "Tekanan Uap Turbin", "Katup Seimbang"],
    scenario: "Gerbang Kuil Sunderfall terkunci di balik air terjun deras beracun setinggi 30 meter. Terdapat kincir monolit yang membutuhkan putaran uap bertekanan tinggi 4.0 Bar untuk mengangkat gerbang besi setebal 2 meter.",
    canonicalSolution: [
      "Alihkan aliran air sungai dingin menggunakan katup tuas A ke dalam saluran pipa bawah tanah.",
      "Tembakkan energi panas Aether-Gauntlet ke reaktor geotermal di bawah saluran pipa untuk mendidihkan air dan menghasilkan uap.",
      "Uap bertekanan tinggi memutar kincir batu monolit, menaikkan gerbang kuil selama 25 detik.",
      "Gunakan es kriogenik pada genangan air di depan gerbang untuk membuat titian jembatan es padat sebelum gerbang menutup kembali."
    ],
    emergentSolutions: [
      "Pemain tidak membuka katup uap: Menggunakan cryo-arrow langsung ke puncak air terjun beracun hingga membeku total menjadi kolom es besar, lalu memanjat pilar es dan menyusup lewat ventilasi atap kuil.",
      "Membakar pohon tumbang di dekatnya untuk menciptakan asap tebal penanda arah angin, lalu meluncur dari tebing seberang menggunakan glider tepat saat angin berhembus kencang."
    ],
    reward: "Relik 'Chrono-Core Fragment: Cryo' (Memperluas radius pembekuan instan hingga 15 meter)."
  },
  {
    id: "puzzle_2",
    title: "Akord Harmoni Sang Penjaga Angin (The Zephyr Octave)",
    biomeId: "zephyr_crags",
    difficulty: "Kuil Epik",
    mechanics: ["Defleksi Arus Angin", "Garpu Tala Akustik", "Frekuensi Resonansi"],
    scenario: "Di aula terbuka di puncak tebing, terdapat 3 garpu tala batu purba berukuran raksasa. Gerbang sonik pelindung makam Chronarch hanya akan bergetar pecah jika ketiga garpu tala dibunyikan bersamaan pada frekuensi yang selaras selama minimal 4 detik berturut-turut.",
    canonicalSolution: [
      "Temukan 3 prisma batu deflektor angin di sekitar reruntuhan.",
      "Putar prisma pertama sebesar 45° untuk membagi arus angin utama dari celah tebing menjadi dua aliran terpisah.",
      "Arahkan aliran kiri ke Garpu Tala Bas (frekuensi rendah), aliran kanan ke prisma kedua.",
      "Gunakan hembusan pneumatik gauntlet untuk menyapu tumpukan pasir yang menyumbat rongga resonator pada Garpu Tala Treble.",
      "Ketika ketiga aliran angin menyentuh bilah garpu tala, resonansi harmonik tercipta dan gerbang sonik terurai menjadi serbuk debu mengambang."
    ],
    emergentSolutions: [
      "Pemain yang tidak bisa memecahkan deflektor menggunakan bom magnetik berisi bijih lodestone yang ditarik ke bilah garpu tala sehingga getarannya dipicu oleh hantaman getar mekanis.",
      "Menembakkan panah tali resonan antara kedua garpu tala agar getaran dari satu bilah merambat langsung ke bilah lainnya."
    ],
    reward: "Glider Upgrade: 'Aetheric Wings' (Dapat melakukan dashing udara melawan arah angin)."
  },
  {
    id: "puzzle_3",
    title: "Lintasan Polaritas Lodestone (The Floating Magnet Tram)",
    biomeId: "chronowoods",
    difficulty: "Eksplorasi",
    mechanics: ["Polaritas Magnetik", "Inersia Massa", "Sakelar Gravitasi"],
    scenario: "Pemain harus mengangkut Kapsul Inti Energi seberat 3 ton melintasi jurang kabut selebar 50 meter. Di atas jurang terdapat deretan pilar batu lodestone dengan kutub magnetik yang dapat dibalik.",
    canonicalSolution: [
      "Atur kapsul pada posisi awal dengan kutub POSITIF (+).",
      "Ubah pilar penopang pertama menjadi NEGATIF (-) untuk menarik kapsul meluncur ke depan.",
      "Tepat saat kapsul melintasi pilar pertama, balik kutub pilar pertama menjadi POSITIF (+) untuk memberikan dorongan akselerasi (repulsi).",
      "Secara beruntun atur ritme kutub pilar berikutnya hingga kapsul mendarat di bantalan penahan dermaga seberang."
    ],
    emergentSolutions: [
      "Menggunakan sulur botani purba: Menumbuhkan sulur elastis dari tebing seberang, mengikat kapsul, lalu memotong pasak penahan sehingga kapsul berayun layaknya pendulum melintasi jurang.",
      "Membekukan kabut tebal di dasar jurang menjadi gletser es padat temporer, lalu mendorong kapsul meluncur di atas permukaan es licin."
    ],
    reward: "Gauntlet Dial: 'Bipolar Polarity Attunement' (Dapat membalik kutub dari jarak jauh dengan tembakan proyektil)."
  }
];

export const GAUNTLET_FEATURES = [
  {
    id: "thermo_dial",
    name: "Dial Termal (Pyro & Cryo Flux)",
    desc: "Menghasilkan semburan kalor instan (mencairkan es, menyulut gas metana, memanaskan batuan basal) atau penyerapan kalor cepat (membekukan air, memadatkan lava menjadi obsidian padat).",
    color: "from-amber-500 to-rose-600"
  },
  {
    id: "magnetic_dial",
    name: "Dial Polaritas Magnetik (Lodestone Polarity)",
    desc: "Memproyeksikan medan kutub magnetik Utara (+) atau Selatan (-) ke objek berbijih lodestone untuk menarik atau menolak objek dan menciptakan jembatan levitasi.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "pneuma_dial",
    name: "Dial Pneumatik & Akustik (Aero Pulse)",
    desc: "Menciptakan denyut gelombang kejut udara terarah untuk membelokkan arus angin, memutar turbin kincir, atau memicu resonansi garpu tala kuno.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "chrono_dial",
    name: "Dial Botani Chrono (Flora Catalyst)",
    desc: "Melepaskan partikel perangsang pertumbuhan pada flora prasejarah, mempercepat sulur rambat atau meregangkan cabang pohon menjadi tangga pendakian.",
    color: "from-purple-500 to-pink-600"
  }
];
