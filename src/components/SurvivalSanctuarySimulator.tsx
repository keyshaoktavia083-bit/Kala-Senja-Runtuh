import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { 
  Heart, 
  ShieldAlert, 
  Droplet, 
  Wind, 
  Sun, 
  Moon, 
  Crosshair, 
  Hammer, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Zap
} from 'lucide-react';

export const SurvivalSanctuarySimulator: React.FC = () => {
  // Day State
  const [day, setDay] = useState<number>(1);
  const [phase, setPhase] = useState<'morning' | 'afternoon' | 'night' | 'day_end'>('morning');

  // Maya's Vital Stats
  const [health, setHealth] = useState<number>(85);
  const [infection, setInfection] = useState<number>(18);
  const [energy, setEnergy] = useState<number>(75);
  const [stealthLevel, setStealthLevel] = useState<number>(20); // 0 to 100 dB

  // Inventory & Shelter Resources
  const [cleanWater, setCleanWater] = useState<number>(4); // Liters
  const [herbalSupplies, setHerbalSupplies] = useState<number>(3); // Units
  const [maskFilters, setMaskFilters] = useState<number>(2); // Units
  const [shelterBarricade, setShelterBarricade] = useState<number>(90); // %
  const [batteryPower, setBatteryPower] = useState<number>(80); // %

  // Event Log & Message
  const [logMessages, setLogMessages] = useState<string[]>([
    "Fajar Hari ke-1: Kabut spora tipis menyelimuti atap gedung. Maya memeriksa persediaan panah dan masker respirator."
  ]);
  const [scavengeChoice, setScavengeChoice] = useState<string | null>(null);
  const [isDefending, setIsDefending] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [survivedDays, setSurvivedDays] = useState<number>(0);

  const addLog = (msg: string) => {
    setLogMessages((prev) => [msg, ...prev.slice(0, 5)]);
  };

  // Scavenge Action (Morning)
  const handleScavenge = (location: 'clinic' | 'market' | 'military') => {
    sound.playClick();
    if (energy < 20) {
      addLog("Maya terlalu lelah untuk menjelajah! Istirahat dulu.");
      return;
    }

    if (location === 'clinic') {
      sound.playFreeze();
      setHerbalSupplies((prev) => prev + 2);
      setMaskFilters((prev) => prev + 1);
      setInfection((prev) => Math.min(100, prev + 8));
      setEnergy((prev) => Math.max(0, prev - 25));
      setStealthLevel(35);
      addLog("Eksplorasi Apotek Karantina: Mendapatkan 2 tanaman obat antiseptik dan 1 filter masker, namun terpapar sedikit spora.");
    } else if (location === 'market') {
      sound.playClick();
      setCleanWater((prev) => prev + 3);
      setEnergy((prev) => Math.max(0, prev - 20));
      setStealthLevel(25);
      addLog("Eksplorasi Supermarket Runtuh: Menemukan 3 liter air mineral bersegel dan ransum kaleng!");
    } else {
      sound.playSteam();
      // Military post: high risk, high reward
      const roll = Math.random();
      if (roll > 0.3) {
        setShelterBarricade((prev) => Math.min(100, prev + 15));
        setMaskFilters((prev) => prev + 2);
        setEnergy((prev) => Math.max(0, prev - 30));
        setStealthLevel(60);
        addLog("Pos Militer: Menemukan kawat berduri tebal & 2 filter respirator berkualitas tinggi!");
      } else {
        setHealth((prev) => Math.max(0, prev - 20));
        setInfection((prev) => Math.min(100, prev + 15));
        setEnergy((prev) => Math.max(0, prev - 35));
        setStealthLevel(80);
        addLog("Penyergapan Spore Stalker! Maya terluka goresan dan harus kabur dengan kebisingan 80 dB!");
      }
    }

    setScavengeChoice(location);
    setPhase('afternoon');
  };

  // Afternoon Actions
  const handleCraft = (item: 'cure' | 'barricade' | 'filter') => {
    sound.playClick();
    if (item === 'cure') {
      if (herbalSupplies < 1) {
        addLog("Bahan tanaman herbal habis! Butuh scavenge lagi.");
        return;
      }
      sound.playFreeze();
      setHerbalSupplies((prev) => prev - 1);
      setInfection((prev) => Math.max(0, prev - 25));
      setEnergy((prev) => Math.max(0, prev - 10));
      addLog("Maya meracik Cordy-Suppressant: Infeksi spora berhasil ditekan turun sebesar -25%!");
    } else if (item === 'barricade') {
      sound.playSteam();
      setShelterBarricade((prev) => Math.min(100, prev + 20));
      setEnergy((prev) => Math.max(0, prev - 15));
      addLog("Memperkuat gerbang kawat & palang kayu: Ketahanan barikade naik +20%.");
    } else if (item === 'filter') {
      sound.playFreeze();
      setMaskFilters((prev) => prev + 1);
      setEnergy((prev) => Math.max(0, prev - 15));
      addLog("Membersihkan filter arang aktif: Mendapatkan 1 filter cadangan baru.");
    }
  };

  // Night Defense Phase
  const handleNightDefense = (strategy: 'stealth' | 'uv_trap' | 'crossbow') => {
    sound.playClick();
    setIsDefending(true);

    setTimeout(() => {
      if (strategy === 'stealth') {
        // quiet, saves energy
        sound.playFreeze();
        setShelterBarricade((prev) => Math.max(0, prev - 15));
        setStealthLevel(15);
        addLog("Malam Senyap: Maya mematikan seluruh lampu dan bersembunyi. Kawanan Stalker hanya mencakar pagar lalu pergi.");
      } else if (strategy === 'uv_trap') {
        sound.playWindChime();
        if (batteryPower >= 30) {
          setBatteryPower((prev) => prev - 30);
          addLog("Jebakan Lampu UV Aktif! Cahaya ultraviolet membakar miselium jamur, kawanan zombie terpukul mundur tanpa merusak shelter!");
        } else {
          setShelterBarricade((prev) => Math.max(0, prev - 25));
          addLog("Daya baterai surya tidak cukup! Barikade mengalami kerusakan benturan.");
        }
      } else {
        // Crossbow sniper
        sound.playSteam();
        setEnergy((prev) => Math.max(0, prev - 20));
        addLog("Pertahanan Tembakan Senyap: Maya menembak 3 Spore Stalker tepat di kepala dari jendela observasi!");
      }

      // Daily consumption
      setCleanWater((prev) => Math.max(0, prev - 1));
      setEnergy((prev) => Math.min(100, prev + 30)); // sleeping recovers energy
      setBatteryPower((prev) => Math.min(100, prev + 25)); // morning recharge
      setStealthLevel(20);
      setIsDefending(false);
      setPhase('day_end');

      // Check survival conditions
      if (health <= 0 || infection >= 100 || shelterBarricade <= 0) {
        setGameOver(true);
        addLog("Maya gugur... Atap berhasil ditembus atau infeksi spora melumpuhkan kesadaran.");
      } else {
        sound.playVictory();
        setSurvivedDays((prev) => prev + 1);
        addLog(`Maya berhasil bertahan melewati malam! Hari ke-${day} tuntas.`);
      }
    }, 600);
  };

  const handleNextDay = () => {
    sound.playClick();
    setDay((prev) => prev + 1);
    setPhase('morning');
    setScavengeChoice(null);
    addLog(`Memasuki Hari ke-${day + 1}: Suara transmisi radio terdengar samar dari arah Sektor 0.`);
  };

  const handleRestart = () => {
    sound.playClick();
    setDay(1);
    setPhase('morning');
    setHealth(85);
    setInfection(18);
    setEnergy(75);
    setCleanWater(4);
    setHerbalSupplies(3);
    setMaskFilters(2);
    setShelterBarricade(90);
    setBatteryPower(80);
    setStealthLevel(20);
    setGameOver(false);
    setSurvivedDays(0);
    setLogMessages(["Simulasi disetel ulang. Maya memulai harinya kembali di atap gedung."]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
            <span>SIMULASI SURVIVAL REAL-TIME</span>
            <span aria-hidden="true">·</span>
            <span>HARI KE-{day}</span>
            <span aria-hidden="true">·</span>
            <span>ROOFTOP SANCTUM SEKTOR 4</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Siklus Bertahan Hidup & Manajemen Shelter Maya
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono-nums">
            {phase === 'morning' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
            {phase === 'afternoon' && <Hammer className="w-3.5 h-3.5 text-sky-400" />}
            {phase === 'night' && <Moon className="w-3.5 h-3.5 text-purple-400" />}
            {phase === 'day_end' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="capitalize text-slate-300 font-medium">
              Fase: {phase === 'morning' ? 'Pagi (Scavenge)' : phase === 'afternoon' ? 'Siang (Crafting)' : phase === 'night' ? 'Malam (Defend)' : 'Fajar Tiba'}
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Status HUD (Left) + Phase Action Stage (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: Maya's Vitals & Shelter Resources (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Maya's Vital Indicators */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3.5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>STATUS FISIK & INFEKSI MAYA</span>
              <span className="text-[10px] text-amber-400 font-mono">Subjek: MP-027</span>
            </div>

            {/* Health Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> Kesehatan Tubuh:
                </span>
                <span className="font-mono-nums font-bold text-white">{health}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${health}%` }}
                />
              </div>
            </div>

            {/* Spore Infection Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> Tingkat Infeksi Spora:
                </span>
                <span className={`font-mono-nums font-bold ${infection > 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                  {infection}% {infection > 60 ? '(KRITIS!)' : '(Terkendali)'}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${infection > 60 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${infection}%` }}
                />
              </div>
            </div>

            {/* Energy */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Stamina & Energi:
                </span>
                <span className="font-mono-nums font-bold text-amber-300">{energy}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>

            {/* Noise meter */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Kebisingan Akustik:</span>
              <span className={`font-mono-nums font-semibold px-2 py-0.5 rounded text-[11px] ${stealthLevel > 50 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-900 text-slate-300'}`}>
                {stealthLevel} dB {stealthLevel > 50 ? '(Menarik Zombie!)' : '(Senyap)'}
              </span>
            </div>
          </div>

          {/* Shelter Resources */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              INVENTORI & KEKUATAN SANCTUARY
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Droplet className="w-3 h-3 text-sky-400" /> Air Suling Murni
                </div>
                <div className="text-sm font-bold font-mono-nums text-white mt-0.5">{cleanWater} Liter</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> Ekstrak Herbal
                </div>
                <div className="text-sm font-bold font-mono-nums text-white mt-0.5">{herbalSupplies} Unit</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Wind className="w-3 h-3 text-amber-400" /> Filter Respirator
                </div>
                <div className="text-sm font-bold font-mono-nums text-white mt-0.5">{maskFilters} Cadangan</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" /> Baterai Solar Atap
                </div>
                <div className="text-sm font-bold font-mono-nums text-white mt-0.5">{batteryPower}% Daya</div>
              </div>
            </div>

            {/* Barricade status */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Integritas Barikade Atap:</span>
                <span className="font-mono-nums font-bold text-white">{shelterBarricade}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${shelterBarricade}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Phase Decision Board (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex-1 flex flex-col justify-between">
            {gameOver ? (
              <div className="text-center py-8 space-y-3">
                <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold font-heading text-white">MAYA GUGUR DI HARI KE-{day}</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Infeksi spora melewati batas toleransi atau barikade rooftop berhasil dirobohkan kawanan infected.
                </p>
                <button
                  onClick={handleRestart}
                  className="mt-4 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl shadow-lg cursor-pointer"
                >
                  Mulai Ulang Siklus Bertahan Hidup
                </button>
              </div>
            ) : (
              <>
                {/* Stage Heading */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-amber-400 font-semibold tracking-wide">
                        {phase === 'morning' && "PILIHAN SCAVENGE PAGI HARI (ZONA KOTA)"}
                        {phase === 'afternoon' && "LABORATORIUM BOTANI & PERBAIKAN SHELTER"}
                        {phase === 'night' && "PERTAHANAN MALAM: KAWANAN SPORE STALKER MEMANJAT"}
                        {phase === 'day_end' && "EVALUASI AKHIR HARI & REKAP KONDISI"}
                      </span>
                      <h4 className="text-base font-heading font-bold text-white mt-0.5">
                        {phase === 'morning' && "Tentukan Lokasi Ekspedisi Luar Maya"}
                        {phase === 'afternoon' && "Gunakan Sumber Daya yang Dikumpulkan"}
                        {phase === 'night' && "Pilih Strategi Pertahanan Shelter Atap"}
                        {phase === 'day_end' && "Maya Beristirahat Menanti Fajar Baru"}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Content according to phase */}
                <div className="my-5">
                  {phase === 'morning' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleScavenge('clinic')}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500 hover:bg-slate-900 text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                          1. Apotek Karantina
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Prioritas: Tanaman obat herbal & filter respirator.
                        </div>
                        <div className="mt-3 text-[10px] text-slate-500 font-mono-nums">
                          Bahaya: Spora Sedang
                        </div>
                      </button>

                      <button
                        onClick={() => handleScavenge('market')}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500 hover:bg-slate-900 text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300">
                          2. Supermarket Runtuh
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Prioritas: Air bersih steril & ransum kaleng kalori.
                        </div>
                        <div className="mt-3 text-[10px] text-slate-500 font-mono-nums">
                          Bahaya: Shambler Lambat
                        </div>
                      </button>

                      <button
                        onClick={() => handleScavenge('military')}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-amber-500 hover:bg-slate-900 text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                          3. Pos Militer Terbengkalai
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Prioritas: Kawat berduri barikade & peredam senjata.
                        </div>
                        <div className="mt-3 text-[10px] text-slate-500 font-mono-nums">
                          Bahaya: Spore Stalker Tinggi!
                        </div>
                      </button>
                    </div>
                  )}

                  {phase === 'afternoon' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        Maya kembali ke rooftop greenhouse dengan selamat. Pilih tindakan sebelum hari berganti malam:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          onClick={() => handleCraft('cure')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-emerald-400">Racik Penekan Infeksi</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Biaya: 1 Ekstrak Herbal</div>
                          <div className="text-[10px] text-emerald-300 mt-1 font-mono-nums">Efek: -25% Infeksi Spora</div>
                        </button>

                        <button
                          onClick={() => handleCraft('barricade')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-blue-500 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-blue-400">Perkuat Barikade Kayu</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Biaya: 15 Stamina</div>
                          <div className="text-[10px] text-blue-300 mt-1 font-mono-nums">Efek: +20% Integritas Pagar</div>
                        </button>

                        <button
                          onClick={() => handleCraft('filter')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-amber-500 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-amber-400">Bersihkan Filter Respirator</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Biaya: 15 Stamina</div>
                          <div className="text-[10px] text-amber-300 mt-1 font-mono-nums">Efek: +1 Filter Cadangan</div>
                        </button>
                      </div>

                      <div className="pt-3">
                        <button
                          onClick={() => {
                            sound.playSteam();
                            setPhase('night');
                          }}
                          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                        >
                          Siapkan Diri Menghadapi Malam $\rightarrow$
                        </button>
                      </div>
                    </div>
                  )}

                  {phase === 'night' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>Hujan asam turun membawa spora! 5 Spore Stalker terdeteksi merayap di dinding luar gedung.</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <button
                          disabled={isDefending}
                          onClick={() => handleNightDefense('stealth')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-purple-400 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-purple-400">1. Taktik Bungkam (Stealth)</div>
                          <div className="text-[11px] text-slate-400 mt-1">Matikan lampu, sembunyi di lorong. Zombie merusak sedikit barikade.</div>
                        </button>

                        <button
                          disabled={isDefending}
                          onClick={() => handleNightDefense('uv_trap')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-amber-400 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-amber-400">2. Aktifkan Lampu Sorot UV</div>
                          <div className="text-[11px] text-slate-400 mt-1">Gunakan 30% daya baterai surya untuk mengusir kawanan seketika.</div>
                        </button>

                        <button
                          disabled={isDefending}
                          onClick={() => handleNightDefense('crossbow')}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-sky-400 text-left transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-sky-400">3. Penembak Jitu Crossbow</div>
                          <div className="text-[11px] text-slate-400 mt-1">Habisi Stalker satu per satu secara senyap dari atap kaca.</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {phase === 'day_end' && (
                    <div className="space-y-3 text-center py-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="text-sm font-bold text-white">Maya Melewati Malam dengan Selamat!</div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Energi pulih melalui tidur, generator surya mulai mengisi daya kembali di bawah sinar matahari pagi.
                      </p>
                      <button
                        onClick={handleNextDay}
                        className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer"
                      >
                        Mulai Hari ke-{day + 1}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Event Log Window */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 font-semibold mb-1">Catatan Log Perjalanan Maya:</div>
              <div className="space-y-1 font-mono-nums text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 max-h-24 overflow-y-auto">
                {logMessages.map((msg, i) => (
                  <div key={i} className="leading-relaxed">
                    <span className="text-amber-400">▸</span> {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
