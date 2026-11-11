import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Ear, Eye, Crosshair, Volume2, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TacticalStealthSimulator: React.FC = () => {
  const [stalkerAlertLevel, setStalkerAlertLevel] = useState<'calm' | 'suspicious' | 'hunting' | 'neutralized'>('calm');
  const [decibelNoise, setDecibelNoise] = useState<number>(12); // dB
  const [ammoCrossbow, setAmmoCrossbow] = useState<number>(3);
  const [bottlesCount, setBottlesCount] = useState<number>(2);
  const [encounterOutcome, setEncounterOutcome] = useState<string>("Maya berada di balik pilar beton. Seekor Spore Stalker berjarak 14 meter sedang mendecakkan bunyi klik sensorik.");
  const [isResolved, setIsResolved] = useState<boolean>(false);

  const handleThrowBottle = () => {
    if (bottlesCount <= 0 || isResolved) return;
    sound.playFreeze();
    setBottlesCount((prev) => prev - 1);
    setDecibelNoise(65);
    setStalkerAlertLevel('suspicious');
    setEncounterOutcome("PRAK! Botol kaca pecah di ujung lorong seberang. Stalker melompat ke arah sumber suara, memunggungi posisimu!");
  };

  const handleSneakTakedown = () => {
    if (isResolved) return;
    if (stalkerAlertLevel === 'calm') {
      sound.playSteam();
      setDecibelNoise(38);
      setStalkerAlertLevel('suspicious');
      setEncounterOutcome("Lantai basah berderit pelan! Stalker mulai berputar curiga mencari sumber getaran!");
    } else if (stalkerAlertLevel === 'suspicious') {
      sound.playSteam();
      setStalkerAlertLevel('neutralized');
      setIsResolved(true);
      sound.playVictory();
      setEncounterOutcome("TAKEDOWN SENYAP BERHASIL! Memanfaatkan arah pandang Stalker yang teralihkan, Maya menusukkan belati herbisida tepat ke sambungan tulang leher!");
    } else {
      setStalkerAlertLevel('hunting');
      setEncounterOutcome("GAGAL! Stalker sudah dalam posisi siaga penuh dan menyergap sebelum kamu mendekat!");
    }
  };

  const handleCrossbowShot = () => {
    if (ammoCrossbow <= 0 || isResolved) return;
    sound.playClick();
    setAmmoCrossbow((prev) => prev - 1);
    setDecibelNoise(18);

    if (stalkerAlertLevel === 'suspicious' || stalkerAlertLevel === 'calm') {
      sound.playFreeze();
      setStalkerAlertLevel('neutralized');
      setIsResolved(true);
      sound.playVictory();
      setEncounterOutcome("HEADSHOT PREFECT! Anak panah titanium menembus tudung jamur di tengkorak secara hening. Stalker tumbang tanpa sempat menjerit!");
    } else {
      sound.playSteam();
      setStalkerAlertLevel('hunting');
      setEncounterOutcome("Meleset! Stalker bergerak terlalu cepat saat dalam mode berburu!");
    }
  };

  const handleReset = () => {
    sound.playClick();
    setStalkerAlertLevel('calm');
    setDecibelNoise(12);
    setAmmoCrossbow(3);
    setBottlesCount(2);
    setIsResolved(false);
    setEncounterOutcome("Maya berada di balik pilar beton. Seekor Spore Stalker berjarak 14 meter sedang mendecakkan bunyi klik sensorik.");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-400 font-medium tracking-wide">
            <span>SIMULASI TAKTIK SENSORIK</span>
            <span aria-hidden="true">·</span>
            <span>STEALTH & AUDIO-DRIVEN COMBAT</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Pertemuan Taktis: Spore Stalker di Koridor Rumah Sakit
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Situasi
        </button>
      </div>

      {/* Main Grid: Tactical Sensor Visualizer + Action Commands */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: Decibel & Threat Indicator (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              SENSOR AKUSTIK LINGKUNGAN
            </div>

            {/* Decibel Meter */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Volume2 className="w-4 h-4 text-amber-400" /> Emisi Suara Maya:
                </span>
                <span className={`font-mono-nums font-bold ${decibelNoise > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {decibelNoise} dB
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${decibelNoise > 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                  style={{ width: `${Math.min(100, (decibelNoise / 80) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10 dB (Napas)</span>
                <span>40 dB (Langkah)</span>
                <span>80 dB (Tembakan Senjata)</span>
              </div>
            </div>

            {/* Stalker Alert Status */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Status Kewaspadaan Stalker:</span>
                <span className="font-mono-nums text-[10px]">Jarak: 14m</span>
              </div>
              <div className={`text-base font-heading font-bold ${
                stalkerAlertLevel === 'calm' ? 'text-emerald-400' :
                stalkerAlertLevel === 'suspicious' ? 'text-amber-400 animate-pulse' :
                stalkerAlertLevel === 'hunting' ? 'text-rose-500' : 'text-sky-400'
              }`}>
                {stalkerAlertLevel === 'calm' && "TENANG (Mendengarkan Gelombang Kosong)"}
                {stalkerAlertLevel === 'suspicious' && "CURIGA (Mendekati Sumber Bunyi)"}
                {stalkerAlertLevel === 'hunting' && "MENYERANG (Penyergapan Mematikan!)"}
                {stalkerAlertLevel === 'neutralized' && "DILUMPUHKAN (Area Aman)"}
              </div>
            </div>
          </div>

          {/* Quick ammo & items */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Anak Panah Crossbow: <strong className="text-white font-mono-nums">{ammoCrossbow}</strong></span>
            <span>Botol Beling: <strong className="text-white font-mono-nums">{bottlesCount}</strong></span>
          </div>
        </div>

        {/* Right Side: Tactical Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4 flex-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              OPSI KEPUTUSAN TAKTIS MAYA:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                disabled={bottlesCount <= 0 || isResolved}
                onClick={handleThrowBottle}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  bottlesCount > 0 && !isResolved
                    ? 'border-slate-800 bg-slate-900/80 hover:border-amber-400 hover:bg-slate-900'
                    : 'border-slate-900 bg-slate-950 text-slate-600 cursor-not-allowed'
                }`}
              >
                <div className="text-xs font-bold text-amber-400">1. Lempar Botol Kaca</div>
                <div className="text-[11px] text-slate-400 mt-1">Pancing perhatian Stalker ke sudut berlawanan (65 dB).</div>
              </button>

              <button
                disabled={isResolved}
                onClick={handleSneakTakedown}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  !isResolved
                    ? 'border-slate-800 bg-slate-900/80 hover:border-emerald-400 hover:bg-slate-900'
                    : 'border-slate-900 bg-slate-950 text-slate-600 cursor-not-allowed'
                }`}
              >
                <div className="text-xs font-bold text-emerald-400">2. Mengendap di Bayangan</div>
                <div className="text-[11px] text-slate-400 mt-1">Dekati perlahan dari belakang saat target teralihkan.</div>
              </button>

              <button
                disabled={ammoCrossbow <= 0 || isResolved}
                onClick={handleCrossbowShot}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  ammoCrossbow > 0 && !isResolved
                    ? 'border-slate-800 bg-slate-900/80 hover:border-sky-400 hover:bg-slate-900'
                    : 'border-slate-900 bg-slate-950 text-slate-600 cursor-not-allowed'
                }`}
              >
                <div className="text-xs font-bold text-sky-400">3. Tembak Headshot Crossbow</div>
                <div className="text-[11px] text-slate-400 mt-1">Bidikan senyap (18 dB) langsung ke batang leher.</div>
              </button>
            </div>

            {/* Outcome Narrative Box */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed mt-2 ${
              isResolved ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                {isResolved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                Hasil Keputusan Taktis:
              </div>
              <p>{encounterOutcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
