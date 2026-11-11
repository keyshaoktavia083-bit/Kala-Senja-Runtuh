import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Magnet, Play, RotateCcw, CheckCircle2, ChevronRight } from 'lucide-react';

type Polarity = '+' | '-' | '0';

export const MagneticTramSimulator: React.FC = () => {
  // 4 Pillars across the chasm
  const [pillarPolarities, setPillarPolarities] = useState<Polarity[]>(['+', '-', '+', '-']);
  const [tramPosition, setTramPosition] = useState<number>(0); // 0 (start), 1, 2, 3 (goal)
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Atur kutub magnetik pilar untuk memandu kapsul melintasi jurang.");
  const [hasWon, setHasWon] = useState<boolean>(false);

  const togglePolarity = (index: number) => {
    if (isSimulating) return;
    sound.playMagnet();
    setPillarPolarities((prev) => {
      const copy = [...prev];
      const cycle: Record<Polarity, Polarity> = { '+': '-', '-': '0', '0': '+' };
      copy[index] = cycle[copy[index]];
      return copy;
    });
  };

  const handleLaunch = async () => {
    if (isSimulating || hasWon) return;
    setIsSimulating(true);
    sound.playClick();
    setMessage("Kapsul melepaskan kaitan dermaga... menganalisis gaya fluks Lorentz.");

    let currentPos = tramPosition;

    // Simulate step by step movement
    for (let step = currentPos; step < 3; step++) {
      const currentPillar = pillarPolarities[step];
      const nextPillar = pillarPolarities[step + 1];

      await new Promise((r) => setTimeout(r, 700));

      // Rule: Next pillar must be '-' to attract the '+' capsule, OR current pillar must be '+' to push away
      if (nextPillar === '-' && (currentPillar === '+' || currentPillar === '0')) {
        currentPos = step + 1;
        setTramPosition(currentPos);
        sound.playMagnet();
        setMessage(`Kapsul tertarik dengan sukses ke Pilar ${currentPos + 1}!`);
      } else if (nextPillar === '+') {
        setMessage(`Tabrakan medan repulsi senama (+) di Pilar ${step + 2}! Kapsul tertahan.`);
        break;
      } else {
        setMessage(`Gaya magnet di Pilar ${step + 2} tidak cukup untuk menarik inersia 3 ton. Kapsul terhenti.`);
        break;
      }
    }

    if (currentPos === 3) {
      setHasWon(true);
      sound.playVictory();
      setMessage("SEMPURNA! Kapsul Inti Energi berhasil mendarat di Dermaga Seberang.");
    }

    setIsSimulating(false);
  };

  const handleReset = () => {
    sound.playClick();
    setTramPosition(0);
    setPillarPolarities(['+', '-', '+', '-']);
    setIsSimulating(false);
    setHasWon(false);
    setMessage("Posisi kapsul dan pilar dikembalikan ke dermaga awal.");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-medium tracking-wide">
            <span>SIMULATOR FISIKA LINGKUNGAN</span>
            <span aria-hidden="true">·</span>
            <span>KAWAH LODESTONE</span>
            <span aria-hidden="true">·</span>
            <span>POLARITAS & LEVITASI MAGNETIK</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Rel Fluks Lodestone Melintasi Jurang Gravitasi Nol
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Rel
        </button>
      </div>

      {/* Main Chasm Canvas */}
      <div className="my-6 bg-slate-950/80 border border-slate-800 rounded-xl p-6 min-h-[320px] flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Jurang Anomali Gravitasi (Lebar 50 Meter)</span>
          <span className="font-mono-nums text-blue-400">Massa Kapsul: 3.000 kg · Muatan: POSITIF (+)</span>
        </div>

        {/* The 4 Pillars Track */}
        <div className="relative py-10 my-4 flex items-center justify-between px-6">
          {/* Track Line / Energy Beam */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500/80 transition-all duration-700"
              style={{ width: `${(tramPosition / 3) * 100}%` }}
            />
          </div>

          {/* Pillars 0, 1, 2, 3 */}
          {[0, 1, 2, 3].map((idx) => {
            const isCurrent = tramPosition === idx;
            const pol = pillarPolarities[idx];

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                {/* Pillar Top Node Button */}
                <button
                  disabled={isSimulating}
                  onClick={() => togglePolarity(idx)}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                    pol === '+'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : pol === '-'
                      ? 'bg-blue-950/60 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-800 border-slate-600 text-slate-400'
                  }`}
                  title="Klik untuk mengubah kutub (+ / - / 0)"
                >
                  <Magnet className="w-4 h-4 mb-0.5" />
                  <span className="text-base font-bold font-mono-nums">{pol}</span>
                </button>

                {/* Pillar Label */}
                <div className="mt-2 text-[11px] font-mono-nums text-slate-400 text-center">
                  Pilar {idx + 1}
                  <div className="text-[10px] text-slate-400">
                    {idx === 0 ? "(Dermaga Awal)" : idx === 3 ? "(Tujuan Akhir)" : `${idx * 16}m`}
                  </div>
                </div>

                {/* Tram Indicator if positioned here */}
                {isCurrent && (
                  <div className="absolute -top-9 px-2.5 py-1 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-lg animate-bounce">
                    <span>KAPSUL (+)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Message Banner */}
        <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
          hasWon ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-400">Status Gerak:</span>
            <span>{message}</span>
          </div>

          {hasWon && (
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> SUKSES TERKONEKSI
            </span>
          )}
        </div>
      </div>

      {/* Control Bar & Guide */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 max-w-lg leading-relaxed">
          <span className="font-semibold text-slate-200">Hukum Polaritas Kuno:</span>
          {" "}Kapsul selalu bermuatan positif (+). Untuk menariknya maju, pilar di depannya harus bermuatan negatif (-), sedangkan pilar yang ditinggalkan harus netral (0) atau tolak (+). Klik tombol pilar untuk mengganti kutub!
        </div>

        <button
          onClick={handleLaunch}
          disabled={isSimulating || hasWon}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all ${
            isSimulating || hasWon
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 hover:scale-[1.02]'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          {hasWon ? "MISI SELESAI" : isSimulating ? "MENGALIRKAN FLUKS..." : "LUNCURKAN KAPSUL"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
