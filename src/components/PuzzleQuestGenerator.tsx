import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, Layers, Compass, Lightbulb, Award, RefreshCw } from 'lucide-react';

interface GeneratedPuzzle {
  title: string;
  biome: string;
  hook: string;
  environmentalSetup: string;
  stepByStepSolution: string[];
  emergentSolutions: string[];
  reward: string;
  physicsPrinciples: string[];
}

const TEMPLATE_PRESETS: GeneratedPuzzle[] = [
  {
    title: "Katup Monolit Tiga Tingkat (The Tri-Phase Sluice)",
    biome: "Lembah Geotermal Sunderfall",
    hook: "Gerbang kuil terkubur di balik air terjun beracun dan turbin monolit butuh tekanan uap 4.0 Bar.",
    environmentalSetup: "Aliran air sungai gletser dingin mengalir di atas lempeng magma bawah tanah yang belum terhubung. Katup pengalih air tertutup pasir.",
    stepByStepSolution: [
      "1. Gunakan hembusan pneumatik untuk menyingkirkan sumbatan pasir pada Katup A.",
      "2. Salurkan air dingin ke ruang pemanas magma vulkanik.",
      "3. Tembakkan modul termal untuk memicu reaksi pendidihan cepat hingga uap mencapai 4.2 Bar.",
      "4. Alirkan semburan kriogenik ke genangan air hilir untuk memadatkan jembatan es kokoh sebelum gerbang kembali tertutup."
    ],
    emergentSolutions: [
      "Alternatif 1: Membekukan seluruh puncak air terjun menjadi kolom es vertikal lalu memanjatnya langsung ke celah ventilasi atap tanpa memutar turbin.",
      "Alternatif 2: Menggunakan glider dengan memanfaatkan kolom uap panas untuk melambung melewati benteng luar kuil."
    ],
    reward: "Chrono-Core Fragment: Cryo Crystal (Memperluas jangkauan beku hingga 15 meter).",
    physicsPrinciples: ["Termodinamika Transisi Fase (Cair -> Gas -> Padat)", "Konveksi Udara Panas"]
  },
  {
    title: "Monolit Jam Matahari & Sulur Bioluminesen (The Sun-Chrono Dial)",
    biome: "Hutan Kristal Waktu (Verdant Chronowoods)",
    hook: "Ruang harta karun di puncak pohon raksasa tertutup oleh kanopi kayu purba yang telah membatu.",
    environmentalSetup: "Sinar matahari terhalang oleh 3 cermin lodestone terapung yang miring karena ketidakseimbangan medan magnet.",
    stepByStepSolution: [
      "1. Tembakkan polaritas (+) ke batu pemberat lodestone pertama agar mengapung seimbang.",
      "2. Pantulkan berkas sinar matahari menembus prisma kristal menuju benih bunga purba di dasar reruntuhan.",
      "3. Lepaskan katalis Chrono-Flora pada benih tersebut.",
      "4. Sulur raksasa tumbuh menjulang dalam 4 detik, mendobrak kanopi kayu dan menciptakan tangga spiral alami ke atas."
    ],
    emergentSolutions: [
      "Alternatif 1: Menyalakan api terkontrol pada sarang lebah getah di dekatnya untuk membakar kayu lapuk tanpa menyentuh cermin.",
      "Alternatif 2: Menembakkan panah magnetik ke sangkar gantung lalu menaikinya saat ditarik medan kutub tebing."
    ],
    reward: "Aetheric Spore Pouch (Dapat menanam benih sulur instan di permukaan dinding batu).",
    physicsPrinciples: ["Optika Geometris Pantulan Cermin", "Fototropisme Terakselerasi"]
  },
  {
    title: "Resonansi Garpu Tala & Menara Petir (The Storm Harp)",
    biome: "Puncak Badai Zephyr",
    hook: "Gerbang sonik memblokir jalan lintasan puncak, dan sambaran petir alami terus menyambar plat konduktif.",
    environmentalSetup: "Dua konduktor tembaga patah. Arus angin bertiup kencang dari jurang barat membawa partikel kabut basah berkonduktivitas tinggi.",
    stepByStepSolution: [
      "1. Tembakkan semprotan es untuk menghubungkan celah konduktor tembaga yang patah dengan pilar es konduktif berair garam.",
      "2. Arahkan deflektor angin ke garpu tala frekuensi tinggi.",
      "3. Sambaran petir yang diredam dialirkan ke elektromagnetik pembuka gerbang.",
      "4. Getaran harmonik dan impuls listrik serentak melumpuhkan kunci monolit."
    ],
    emergentSolutions: [
      "Alternatif: Melempar tombak besi yang diikat tali basah ke awan petir untuk memicu pelepasan listrik berlebih (overload fuse) yang meledakkan gerbang secara paksa."
    ],
    reward: "Conductive Magnetic Coil (Mengubah gauntlet menjadi pengarah sambaran listrik alami).",
    physicsPrinciples: ["Resonansi Akustik", "Konduktivitas Elektrolit", "Hukum Faraday"]
  }
];

export const PuzzleQuestGenerator: React.FC = () => {
  const [selectedBiome, setSelectedBiome] = useState<string>("sunderfall");
  const [selectedDiff, setSelectedDiff] = useState<string>("Tantangan Menengah");
  const [selectedElement, setSelectedElement] = useState<string>("Termal & Fase Zat");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<GeneratedPuzzle>(TEMPLATE_PRESETS[0]);

  const handleGenerate = () => {
    sound.playClick();
    setIsGenerating(true);

    setTimeout(() => {
      // Pick or synthesize based on selection
      let template = TEMPLATE_PRESETS[0];
      if (selectedBiome === "chronowoods" || selectedElement.includes("Botani")) {
        template = TEMPLATE_PRESETS[1];
      } else if (selectedBiome === "zephyr" || selectedElement.includes("Resonansi")) {
        template = TEMPLATE_PRESETS[2];
      } else {
        template = {
          title: `Misteri Katup ${selectedElement} (${selectedDiff})`,
          biome: selectedBiome === "sunderfall" ? "Lembah Geotermal Sunderfall" : "Wilayah Eksplorasi Kuno",
          hook: `Sebuah struktur monolit Chronarch terkunci dengan mekanisme ${selectedElement.toLowerCase()} yang membutuhkan ketelitian fisika.`,
          environmentalSetup: "Suhu lingkungan dan medan energi lokal berada dalam kondisi kritis, menghalangi akses ke relik utama.",
          stepByStepSolution: [
            `1. Identifikasi sumber energi primer (${selectedElement}) di tebing sekitar.`,
            "2. Gunakan Aether-Gauntlet untuk memanipulasi arus materi lingkungan.",
            "3. Seimbangkan variabel tekanan dan aliran hingga indikator monolit menyala hijau.",
            "4. Manfaatkan perubahan wujud material untuk melintasi rintangan tanpa cedera."
          ],
          emergentSolutions: [
            "Solusi Kreatif A: Meledakkan gas alam terperangkap untuk menciptakan daya dorong seketika.",
            "Solusi Kreatif B: Menggabungkan glider dengan arus udara konveksi untuk menyusup lewat ventilasi belakang."
          ],
          reward: "Aether Tuning Matrix (Peningkatan efisiensi energi gauntlet +25%).",
          physicsPrinciples: ["Kekekalan Energi", "Hukum Tekanan Fluida Bernoulli"]
        };
      }

      setCurrentPuzzle(template);
      setIsGenerating(false);
      sound.playFreeze();
    }, 400);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
            <span>PERANGKAT GAME DESIGNER</span>
            <span aria-hidden="true">·</span>
            <span>MODULAR QUEST ARCHITECT</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Generator Konsep Puzzle Fisika Lingkungan
          </h3>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-all shadow-md self-start md:self-auto cursor-pointer"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? "Merancang Rantai Kausal..." : "Rancang Puzzle Baru"}
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Pilih Biome Lokasi:</label>
          <select
            value={selectedBiome}
            onChange={(e) => setSelectedBiome(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="sunderfall">Lembah Geotermal Sunderfall</option>
            <option value="chronowoods">Hutan Kristal Waktu (Chronowoods)</option>
            <option value="zephyr">Puncak Badai Zephyr</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Tingkat Kesulitan:</label>
          <select
            value={selectedDiff}
            onChange={(e) => setSelectedDiff(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="Eksplorasi Santai">Eksplorasi Santai (Micro-Puzzle 3 Menit)</option>
            <option value="Tantangan Menengah">Tantangan Menengah (Kuil Reruntuhan 10 Menit)</option>
            <option value="Kuil Epik Regional">Kuil Epik Regional (Macro-Biome Shift)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Kombinasi Elemen Inti:</label>
          <select
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="Termal & Fase Zat">Termal & Fase Zat (Panas, Dingin, Uap)</option>
            <option value="Resonansi Angin & Akustik">Resonansi Angin & Akustik Sonik</option>
            <option value="Polaritas Lodestone">Polaritas Lodestone & Gravitasi</option>
            <option value="Botani Chrono">Botani Chrono & Pertumbuhan Cepat</option>
          </select>
        </div>
      </div>

      {/* Generated Blueprint Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <div className="text-xs text-amber-400 font-semibold tracking-wide">
              {currentPuzzle.biome} · {selectedDiff}
            </div>
            <h4 className="text-lg font-heading font-bold text-white mt-0.5">
              {currentPuzzle.title}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {currentPuzzle.physicsPrinciples.map((principle, idx) => (
              <span key={idx} className="text-[11px] font-mono-nums text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {principle}
              </span>
            ))}
          </div>
        </div>

        {/* Hook & Setup */}
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-semibold text-slate-200">Situasi & Rintangan: </span>
            <span className="text-slate-300">{currentPuzzle.hook}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-200">Kondisi Alam Awal: </span>
            <span className="text-slate-400">{currentPuzzle.environmentalSetup}</span>
          </div>
        </div>

        {/* 2 Column breakdown: Canonical vs Emergent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Canonical */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <Compass className="w-4 h-4" />
              Rantai Solusi Utama (Kausalitas Fisika):
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              {currentPuzzle.stepByStepSolution.map((step, sIdx) => (
                <li key={sIdx}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Emergent Alternatives */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <Lightbulb className="w-4 h-4" />
              Solusi Alternatif Kreatif (Emergent Gameplay):
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              {currentPuzzle.emergentSolutions.map((sol, eIdx) => (
                <li key={eIdx}>{sol}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reward */}
        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-600/30 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Hadiah Penjelajah:</span>
            <span className="text-slate-200">{currentPuzzle.reward}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
