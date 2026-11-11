import React, { useState } from 'react';
import { BIOMES, BiomeInfo } from '../data/gameConcept';
import { sound } from '../utils/audio';
import { AlertTriangle, Lightbulb, Compass, MapPin } from 'lucide-react';

export const BiomeShowcase: React.FC = () => {
  const [activeBiomeId, setActiveBiomeId] = useState<string>(BIOMES[0].id);

  const activeBiome = BIOMES.find((b) => b.id === activeBiomeId) || BIOMES[0];

  const handleSelect = (biome: BiomeInfo) => {
    sound.playClick();
    setActiveBiomeId(biome.id);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
            <span>DUNIA & EKOLOGI TERBUKA</span>
            <span aria-hidden="true">·</span>
            <span>4 LIVING BIOMES</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Topografi & Ekosistem Puzzle Terhubung
          </h3>
        </div>

        {/* Biome Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
          {BIOMES.map((b) => (
            <button
              key={b.id}
              onClick={() => handleSelect(b)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeBiome.id === b.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {b.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Biome Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: High Res Environment Visual (6 cols) */}
        <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-end min-h-[360px] group">
          <img
            src={activeBiome.image}
            alt={activeBiome.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Overlay info */}
          <div className="relative z-10 p-5">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeBiome.climate}</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-white mt-1">
              {activeBiome.name}
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {activeBiome.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Environmental Mechanics & Hazards (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Description */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs text-slate-300 leading-relaxed">
              {activeBiome.description}
            </div>

            {/* Core Elements */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Elemen Alam Dominan:</div>
              <div className="flex flex-wrap gap-1.5">
                {activeBiome.coreElements.map((el, i) => (
                  <span key={i} className="text-xs bg-slate-900 border border-slate-700/60 text-amber-300 px-2.5 py-1 rounded-md font-medium">
                    {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature Puzzle */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 mb-1">Puzzle Monolit Khas Biome:</div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeBiome.signaturePuzzle}</span>
              </div>
            </div>
          </div>

          {/* Environmental Hazards */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              Bahaya Fisika Lingkungan (Survival Hazards):
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeBiome.environmentalHazards.map((hz, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400/80 text-[10px] mt-0.5">•</span>
                  <span>{hz}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergent Trick */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <Lightbulb className="w-4 h-4" />
              Trik Emergent Pemain Cerdas:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {activeBiome.emergentTrick}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
