import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Wind, Volume2, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Deflector {
  id: string;
  name: string;
  angle: number; // 0, 45, 90, 135, 180, 225, 270, 315
  targetAngle: number;
}

export const WindAcousticSimulator: React.FC = () => {
  // Prisms
  const [prisms, setPrisms] = useState<Deflector[]>([
    { id: 'p1', name: 'Prisma Batu Basal Alpha', angle: 0, targetAngle: 45 },
    { id: 'p2', name: 'Prisma Cermin Beta', angle: 90, targetAngle: 135 },
    { id: 'p3', name: 'Prisma Resonator Gamma', angle: 180, targetAngle: 225 }
  ]);

  const [windIntensity, setWindIntensity] = useState<number>(55); // km/h (Need 45 - 65 km/h)
  const [clearedObstacle, setClearedObstacle] = useState<boolean>(false); // clears sand on fork 3

  // Active status of the 3 tuning forks
  const [fork1Active, setFork1Active] = useState<boolean>(false);
  const [fork2Active, setFork2Active] = useState<boolean>(false);
  const [fork3Active, setFork3Active] = useState<boolean>(false);
  const [barrierOpen, setBarrierOpen] = useState<boolean>(false);

  // Rotate prism handler
  const rotatePrism = (id: string) => {
    sound.playClick();
    setPrisms((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newAngle = (p.angle + 45) % 360;
          return { ...p, angle: newAngle };
        }
        return p;
      })
    );
  };

  // Evaluate acoustic wind reflection
  useEffect(() => {
    const isWindGood = windIntensity >= 40 && windIntensity <= 70;

    // Fork 1 (Bass) is reached if Prism 1 is angled at 45°
    const f1 = isWindGood && prisms[0].angle === 45;
    // Fork 2 (Harmony) is reached if Prism 1 is 45° AND Prism 2 is 135°
    const f2 = isWindGood && prisms[0].angle === 45 && prisms[1].angle === 135;
    // Fork 3 (Treble) is reached if Prism 2 is 135° AND Prism 3 is 225° AND sand is cleared
    const f3 = isWindGood && prisms[1].angle === 135 && prisms[2].angle === 225 && clearedObstacle;

    if (f1 && !fork1Active) sound.playWindChime();
    if (f2 && !fork2Active) sound.playWindChime();
    if (f3 && !fork3Active) sound.playWindChime();

    setFork1Active(f1);
    setFork2Active(f2);
    setFork3Active(f3);

    if (f1 && f2 && f3 && !barrierOpen) {
      setBarrierOpen(true);
      sound.playVictory();
    } else if ((!f1 || !f2 || !f3) && barrierOpen) {
      setBarrierOpen(false);
    }
  }, [prisms, windIntensity, clearedObstacle, fork1Active, fork2Active, fork3Active, barrierOpen]);

  const handleReset = () => {
    sound.playClick();
    setPrisms([
      { id: 'p1', name: 'Prisma Batu Basal Alpha', angle: 0, targetAngle: 45 },
      { id: 'p2', name: 'Prisma Cermin Beta', angle: 90, targetAngle: 135 },
      { id: 'p3', name: 'Prisma Resonator Gamma', angle: 180, targetAngle: 225 }
    ]);
    setWindIntensity(55);
    setClearedObstacle(false);
    setBarrierOpen(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 text-slate-100 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium tracking-wide">
            <span>SIMULATOR FISIKA LINGKUNGAN</span>
            <span aria-hidden="true">·</span>
            <span>PUNCAK BADAI ZEPHYR</span>
            <span aria-hidden="true">·</span>
            <span>AERODINAMIKA & RESONANSI SONIK</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Akord Garpu Tala & Defleksi Arus Angin
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Posisi
        </button>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Interactive Visual Map / Acoustic Chamber (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 relative min-h-[380px] flex flex-col justify-between">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Diagram Rongga Ngarai & Garpu Tala Kuil</span>
            <span className="font-mono-nums text-emerald-400 font-semibold">{windIntensity} km/h Kecepatan Angin</span>
          </div>

          {/* Interactive Wind Map Grid */}
          <div className="relative w-full h-[260px] my-4 rounded-lg bg-slate-900/60 border border-slate-800/80 p-4 overflow-hidden flex items-center justify-center">
            {/* Wind vent at bottom left */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-2.5 py-1.5 rounded-lg z-10">
              <Wind className="w-4 h-4 animate-pulse" />
              <span>Ventilasi Angin Lembah</span>
            </div>

            {/* 3 Prisms on the field */}
            <div className="absolute left-[30%] bottom-[35%] flex flex-col items-center">
              <button
                onClick={() => rotatePrism('p1')}
                title="Klik untuk memutar prisma 45°"
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                  prisms[0].angle === 45
                    ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_#10b981]'
                    : 'bg-slate-800 border-slate-600 hover:border-slate-400'
                }`}
                style={{ transform: `rotate(${prisms[0].angle}deg)` }}
              >
                <div className="w-2 h-7 bg-amber-400 rounded-sm" />
              </button>
              <span className="text-[10px] text-slate-400 mt-1 font-mono-nums">Prisma α ({prisms[0].angle}°)</span>
            </div>

            <div className="absolute left-[58%] top-[30%] flex flex-col items-center">
              <button
                onClick={() => rotatePrism('p2')}
                title="Klik untuk memutar prisma 45°"
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                  prisms[1].angle === 135
                    ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_#10b981]'
                    : 'bg-slate-800 border-slate-600 hover:border-slate-400'
                }`}
                style={{ transform: `rotate(${prisms[1].angle}deg)` }}
              >
                <div className="w-2 h-7 bg-amber-400 rounded-sm" />
              </button>
              <span className="text-[10px] text-slate-400 mt-1 font-mono-nums">Prisma β ({prisms[1].angle}°)</span>
            </div>

            <div className="absolute right-[18%] bottom-[30%] flex flex-col items-center">
              <button
                onClick={() => rotatePrism('p3')}
                title="Klik untuk memutar prisma 45°"
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                  prisms[2].angle === 225
                    ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_#10b981]'
                    : 'bg-slate-800 border-slate-600 hover:border-slate-400'
                }`}
                style={{ transform: `rotate(${prisms[2].angle}deg)` }}
              >
                <div className="w-2 h-7 bg-amber-400 rounded-sm" />
              </button>
              <span className="text-[10px] text-slate-400 mt-1 font-mono-nums">Prisma γ ({prisms[2].angle}°)</span>
            </div>

            {/* 3 Tuning Forks Target Nodes */}
            <div className={`absolute top-3 left-[30%] px-2.5 py-1 rounded-md text-[11px] border flex items-center gap-1.5 transition-all ${
              fork1Active ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_12px_#10b981]' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Garpu Bas (F#)</span>
            </div>

            <div className={`absolute top-3 right-[18%] px-2.5 py-1 rounded-md text-[11px] border flex items-center gap-1.5 transition-all ${
              fork2Active ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_12px_#10b981]' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Garpu Harmoni (C)</span>
            </div>

            <div className={`absolute bottom-3 right-4 px-2.5 py-1 rounded-md text-[11px] border flex items-center gap-1.5 transition-all ${
              fork3Active ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_12px_#10b981]' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Garpu Treble (G)</span>
            </div>
          </div>

          {/* Bottom Sonic Gate status */}
          <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            barrierOpen ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${barrierOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
              <span className="text-xs font-medium">
                {barrierOpen ? "GERBANG SONIK HANCUR BERESONANSI (TERBUKA)" : "GERBANG SONIK AKTIF MENUTUP JALAN"}
              </span>
            </div>
            {barrierOpen && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> SELESAI
              </span>
            )}
          </div>
        </div>

        {/* Right Controls & Gauntlet Pneuma Tuning (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              KONTROL VENTILASI & SARUNG TANGAN
            </div>

            {/* Wind velocity slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Intensitas Emisi Angin:</span>
                <span className="font-mono-nums font-bold text-emerald-400">{windIntensity} km/h</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                value={windIntensity}
                onChange={(e) => {
                  setWindIntensity(Number(e.target.value));
                  sound.playClick();
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>20 km/h (Terlalu Lemah)</span>
                <span className="text-emerald-400 font-medium">40-70 km/h (Optimal)</span>
                <span>90 km/h (Turbulen)</span>
              </div>
            </div>

            {/* Sand Obstacle Clearing Button */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-200">Sapu Pasir dari Garpu Treble</div>
                  <div className="text-[11px] text-slate-400">Gunakan denyut pneumatik gauntlet</div>
                </div>
                <button
                  onClick={() => {
                    setClearedObstacle(!clearedObstacle);
                    sound.playSteam();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    clearedObstacle
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {clearedObstacle ? "BERSIH" : "TERSUMBAT PASIR"}
                </button>
              </div>
            </div>

            {/* Prism angle helper badges */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-300 mb-2 font-medium">Status Penyelarasan Garpu Tala:</div>
              <div className="space-y-1.5 text-xs font-mono-nums">
                <div className={`p-2 rounded flex items-center justify-between ${fork1Active ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  <span>Garpu Bas (F#)</span>
                  <span>{fork1Active ? "BERGETAR SELARAS (120 Hz)" : "DIAM / TIDAK TERKENA"}</span>
                </div>
                <div className={`p-2 rounded flex items-center justify-between ${fork2Active ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  <span>Garpu Harmoni (C)</span>
                  <span>{fork2Active ? "BERGETAR SELARAS (440 Hz)" : "DIAM / TIDAK TERKENA"}</span>
                </div>
                <div className={`p-2 rounded flex items-center justify-between ${fork3Active ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  <span>Garpu Treble (G)</span>
                  <span>{fork3Active ? "BERGETAR SELARAS (880 Hz)" : "DIAM / TIDAK TERKENA"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 text-xs">
            <span className="font-semibold text-emerald-400">Instruksi Eksplorasi:</span>
            <p className="text-slate-300 mt-1 leading-relaxed">
              Klik pada tiap prisma untuk memutar sudut pantulan angin sebesar 45°. Arus angin harus memantul dari Prisma α (45°) ke Garpu Bas dan Prisma β (135°), lalu ke Prisma γ (225°) menuju Garpu Treble yang telah disapu dari sumbatan pasir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
