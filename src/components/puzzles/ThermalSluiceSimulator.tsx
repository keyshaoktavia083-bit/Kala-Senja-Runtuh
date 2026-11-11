import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Flame, Snowflake, Waves, Gauge, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export const ThermalSluiceSimulator: React.FC = () => {
  // Simulator State
  const [inflowGate, setInflowGate] = useState<number>(60); // 0 to 100%
  const [thermalMode, setThermalMode] = useState<'freeze' | 'neutral' | 'heat'>('neutral');
  const [turbineValveOpen, setTurbineValveOpen] = useState<boolean>(false);
  const [cryoBeamActive, setCryoBeamActive] = useState<boolean>(false);

  // Dynamic Physical outputs
  const [waterTemp, setWaterTemp] = useState<number>(18); // Celcius
  const [steamPressure, setSteamPressure] = useState<number>(0); // Bar (Target: 3.5 - 4.5)
  const [iceThickness, setIceThickness] = useState<number>(0); // 0 to 100% (Target: >= 75%)
  const [isGateUnlocked, setIsGateUnlocked] = useState<boolean>(false);
  const [isCrossed, setIsCrossed] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("Buka aliran air dan atur sistem termal untuk mengaktifkan turbin monolit.");

  // Simulation physics loop tick
  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate Temperature
      setWaterTemp((prev) => {
        let target = 20;
        if (thermalMode === 'heat') target = 135;
        if (thermalMode === 'freeze') target = -15;
        const delta = (target - prev) * 0.15;
        return Math.round((prev + delta) * 10) / 10;
      });

      // Calculate Steam Pressure
      setSteamPressure((prev) => {
        let target = 0;
        if (waterTemp > 90 && inflowGate > 30 && turbineValveOpen) {
          // Healthy boiling producing strong steam
          target = 4.2 * (inflowGate / 100);
        } else if (waterTemp > 90 && !turbineValveOpen) {
          target = 1.0; // pressure buildup without turbine flow
        }
        const delta = (target - prev) * 0.2;
        return Math.max(0, Math.round((prev + delta) * 10) / 10);
      });

      // Calculate Ice Thickness in the riverbed
      setIceThickness((prev) => {
        let target = 0;
        if (cryoBeamActive || (thermalMode === 'freeze' && waterTemp < 2)) {
          target = Math.min(100, (inflowGate > 10 ? 88 : 40));
        } else if (waterTemp > 30) {
          target = 0;
        } else {
          target = Math.max(0, prev - 15);
        }
        const delta = (target - prev) * 0.25;
        return Math.max(0, Math.min(100, Math.round(prev + delta)));
      });
    }, 200);

    return () => clearInterval(timer);
  }, [thermalMode, inflowGate, turbineValveOpen, cryoBeamActive, waterTemp]);

  // Check victory condition
  useEffect(() => {
    const turbineActive = steamPressure >= 3.4 && steamPressure <= 4.8;
    const bridgeSolid = iceThickness >= 70;

    if (turbineActive && !isGateUnlocked) {
      setIsGateUnlocked(true);
      sound.playSteam();
    } else if (!turbineActive && isGateUnlocked && !isCrossed) {
      setIsGateUnlocked(false);
    }

    if (turbineActive && bridgeSolid && !isCrossed) {
      setIsCrossed(true);
      sound.playVictory();
      setFeedbackMsg("LUAR BIASA! Turbin uap mengangkat gerbang kuno dan jembatan es menahan langkahmu menembus kuil!");
    } else if (turbineActive && !bridgeSolid) {
      setFeedbackMsg("Gerbang terangkat! Namun sungai berarus deras berbahaya untuk diseberangi tanpa jembatan es.");
    } else if (!turbineActive && bridgeSolid) {
      setFeedbackMsg("Jembatan es padat telah terbentuk, tetapi gerbang monolit kuil masih terkunci (butuh 3.5 - 4.5 Bar uap).");
    }
  }, [steamPressure, iceThickness, isGateUnlocked, isCrossed]);

  const handleReset = () => {
    sound.playClick();
    setInflowGate(60);
    setThermalMode('neutral');
    setTurbineValveOpen(false);
    setCryoBeamActive(false);
    setIsGateUnlocked(false);
    setIsCrossed(false);
    setWaterTemp(18);
    setSteamPressure(0);
    setIceThickness(0);
    setFeedbackMsg("Sistem disetel ulang ke kondisi awal.");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 text-slate-100 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
            <span>SIMULATOR FISIKA LINGKUNGAN</span>
            <span aria-hidden="true">·</span>
            <span>LEMBAH SUNDERFALL</span>
            <span aria-hidden="true">·</span>
            <span>FASE ZAT (H2O)</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Reaktor Katup Geotermal & Jembatan Es
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Puzzle
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: Visual Simulation Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Ambient visual overlay particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Scheme Diagram SVG */}
          <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
            {/* Top Level: Hulu Sungai & Pipa Reaktor */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-950 text-sky-400 border border-sky-800">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Debit Air Hulu (Katup A)</div>
                  <div className="text-sm font-semibold font-mono-nums text-sky-300">{inflowGate}% Aliran</div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="text-right">
                <div className="text-xs text-slate-400">Suhu Reaktor Bawah Tanah</div>
                <div className={`text-base font-bold font-mono-nums ${waterTemp > 90 ? 'text-amber-400' : waterTemp < 5 ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {waterTemp}°C {waterTemp > 90 ? '(Mendidih)' : waterTemp < 2 ? '(Beku)' : '(Cair)'}
                </div>
              </div>
            </div>

            {/* Middle Section: Turbin Uap & Kanal Sungai */}
            <div className="my-4 grid grid-cols-2 gap-4">
              {/* Turbin Uap Block */}
              <div className={`p-4 rounded-xl border transition-all ${steamPressure >= 3.5 ? 'bg-amber-950/30 border-amber-600/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-slate-900/60 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    Turbin Uap Monolit
                  </div>
                  <span className="text-xs font-mono-nums px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Target: 3.5 - 4.5 Bar
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono-nums text-white">{steamPressure}</span>
                  <span className="text-xs text-slate-400 font-mono">Bar Tekanan</span>
                </div>

                <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${steamPressure >= 3.5 ? 'bg-amber-400' : 'bg-sky-500'}`}
                    style={{ width: `${Math.min(100, (steamPressure / 5) * 100)}%` }}
                  />
                </div>

                <div className="mt-2 text-[11px] text-slate-400">
                  {turbineValveOpen ? "Katup Terbuka (Uap mengalir memutar roda gigi)" : "Katup Tertutup (Uap terhambat)"}
                </div>
              </div>

              {/* Jembatan Es / Sungai Hilir */}
              <div className={`p-4 rounded-xl border transition-all ${iceThickness >= 70 ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'bg-slate-900/60 border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-cyan-400" />
                    Kanal Seberang (Jembatan Es)
                  </div>
                  <span className="text-xs font-mono-nums px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Target: ≥ 70%
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono-nums text-white">{iceThickness}%</span>
                  <span className="text-xs text-slate-400 font-mono">Ketebalan Kristal</span>
                </div>

                <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${iceThickness}%` }}
                  />
                </div>

                <div className="mt-2 text-[11px] text-slate-400">
                  {iceThickness >= 70 ? "Pijakan es padat, aman untuk dilalui!" : "Arus jeram berarus deras mematikan!"}
                </div>
              </div>
            </div>

            {/* Bottom Target: Monolith Ancient Gate */}
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${isGateUnlocked ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-slate-900/80 border-slate-800'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isGateUnlocked ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500'}`} />
                <div>
                  <div className="text-xs text-slate-400">Status Pintu Masuk Kuil Kuno</div>
                  <div className="text-sm font-semibold text-white">
                    {isGateUnlocked ? "GERBANG TERANGKAT TERBUKA" : "TERKUNCI MEKANISME TURBIN"}
                  </div>
                </div>
              </div>

              {isCrossed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  BERHASIL MENYEBERANG
                </div>
              ) : (
                <div className="text-xs text-amber-400/90 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Menunggu Kondisi Seimbang
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Gauntlet Controls & Interactive Knobs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              KONTROL GAUNTLET & LINGKUNGAN
            </div>

            {/* Inflow Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300">1. Bukaan Katup Pintu Air Hulu:</span>
                <span className="font-mono-nums font-bold text-sky-400">{inflowGate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inflowGate}
                onChange={(e) => {
                  setInflowGate(Number(e.target.value));
                  sound.playClick();
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0% Tertutup</span>
                <span>50% Aliran Sedang</span>
                <span>100% Deras</span>
              </div>
            </div>

            {/* Thermal Gauntlet Selector */}
            <div>
              <label className="block text-xs text-slate-300 mb-2">
                2. Inti Termal Gauntlet ke Reaktor Magma:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setThermalMode('freeze');
                    sound.playFreeze();
                  }}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                    thermalMode === 'freeze'
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Snowflake className="w-4 h-4 mb-1 text-cyan-400" />
                  Kriogenik (-15°C)
                </button>

                <button
                  onClick={() => {
                    setThermalMode('neutral');
                    sound.playClick();
                  }}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                    thermalMode === 'neutral'
                      ? 'bg-slate-800 border-slate-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Waves className="w-4 h-4 mb-1 text-slate-400" />
                  Alami (20°C)
                </button>

                <button
                  onClick={() => {
                    setThermalMode('heat');
                    sound.playSteam();
                  }}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                    thermalMode === 'heat'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flame className="w-4 h-4 mb-1 text-rose-400" />
                  Magma (+135°C)
                </button>
              </div>
            </div>

            {/* Turbine Valve Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-200">3. Katup Pelepas Pipa Turbin</div>
                  <div className="text-[11px] text-slate-400">Salurkan uap panas ke turbin monolit</div>
                </div>
                <button
                  onClick={() => {
                    setTurbineValveOpen(!turbineValveOpen);
                    sound.playClick();
                    if (!turbineValveOpen) sound.playSteam();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    turbineValveOpen
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {turbineValveOpen ? "TERBUKA" : "TERTUTUP"}
                </button>
              </div>
            </div>

            {/* Cryo Beam to Riverbed Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-200">4. Pancaran Es Gauntlet ke Kanal</div>
                  <div className="text-[11px] text-slate-400">Bekukan permukaan sungai menjadi jembatan</div>
                </div>
                <button
                  onClick={() => {
                    setCryoBeamActive(!cryoBeamActive);
                    sound.playFreeze();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    cryoBeamActive
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cryoBeamActive ? "AKTIF" : "NONAKTIF"}
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Educational / Mission Brief Callout */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 text-xs">
            <span className="font-semibold text-amber-400">Petunjuk Logika Lingkungan:</span>
            <p className="text-slate-300 mt-1 leading-relaxed">
              {feedbackMsg}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Insight Box */}
      <div className="bg-slate-950/40 border border-slate-800/70 rounded-xl p-4 text-xs text-slate-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-200">Kaidah Desain Fisika (The Breath of the Wild/Outer Wilds Spirit):</span>
          {" "}Simulator ini membuktikan tidak ada animasi tombol "quick-time event" palsu. Solusi puzzle mengalir langsung dari simulasi termodinamika suhu, massa air, dan tekanan uap.
        </div>
      </div>
    </div>
  );
};
