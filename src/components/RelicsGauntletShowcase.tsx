import React, { useState } from 'react';
import { GAUNTLET_FEATURES } from '../data/gameConcept';
import { sound } from '../utils/audio';
import { Shield, Wind, Compass, Zap, Sparkles } from 'lucide-react';

export const RelicsGauntletShowcase: React.FC = () => {
  const [activeDialIndex, setActiveDialIndex] = useState<number>(0);

  const activeDial = GAUNTLET_FEATURES[activeDialIndex];

  const handleDialClick = (index: number) => {
    sound.playClick();
    setActiveDialIndex(index);
    if (index === 0) sound.playSteam();
    if (index === 1) sound.playMagnet();
    if (index === 2) sound.playWindChime();
    if (index === 3) sound.playFreeze();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
          <span>PERALATAN PENJELAJAH</span>
          <span aria-hidden="true">·</span>
          <span>THE AETHER-GAUNTLET</span>
        </div>
        <h3 className="text-xl font-heading font-semibold text-white mt-1">
          Sarung Tangan Kuno Peninggalan Chronarch
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Bukan senjata magis konvensional, melainkan instrumen ilmiah kuno yang berfungsi layaknya kunci multifungsi untuk memanipulasi hukum fisika lingkungan secara terarah.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
        {/* Gauntlet Item Image Showcase (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 p-2 shadow-2xl group">
            <img
              src="/src/assets/images/relic_aether_gauntlet_1794361388896.jpg"
              alt="Aether-Gauntlet Ancient Traveler Relic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-center">
              <span className="text-xs font-semibold text-amber-400">The Aether-Gauntlet (Mark IV)</span>
              <div className="text-[10px] text-slate-400">Brass, Giok Kuno & Kristal Resonansi</div>
            </div>
          </div>
        </div>

        {/* Dial Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            PILIH DIAL ELEMEN AKTIF:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GAUNTLET_FEATURES.map((feat, idx) => {
              const isSelected = activeDialIndex === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => handleDialClick(idx)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{feat.name.split('(')[0]}</span>
                    <span className="text-[10px] font-mono-nums text-slate-400">0{idx + 1}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {feat.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Dial Deep Dive */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Detail Operasional: {activeDial.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeDial.desc}
            </p>
          </div>

          {/* Secondary Relics Row */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2.5">
              <Wind className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Membran Glider Kuno</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Menangkap arus termal panas & angin buatan untuk melayang melintasi ngarai tanpa menyentuh tanah.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Chrono-Kompas Akustik</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Mendeteksi garis gaya magnetik tersembunyi dan frekuensi getaran monolit di bawah permukaan tanah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
