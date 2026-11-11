import React, { useState } from 'react';
import { INFECTED_VARIANTS, InfectedVariant } from '../data/zombieGameConcept';
import { sound } from '../utils/audio';
import { ShieldAlert, Ear, Flame, AlertCircle } from 'lucide-react';

export const InfectedBestiaryShowcase: React.FC = () => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(INFECTED_VARIANTS[0].id);

  const selectedVariant = INFECTED_VARIANTS.find((v) => v.id === selectedVariantId) || INFECTED_VARIANTS[0];

  const handleSelect = (v: InfectedVariant) => {
    sound.playClick();
    setSelectedVariantId(v.id);
    if (v.id === 'spore_stalker') sound.playFreeze();
    if (v.id === 'bloat_burster') sound.playSteam();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-400 font-medium tracking-wide">
            <span>MUTASI BIOLOGIS & BESTIARY</span>
            <span aria-hidden="true">·</span>
            <span>MYCOCORDYCEPS NECROSIS</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-white mt-1">
            Katalog Varian Infected Jamur Spora
          </h3>
        </div>

        {/* Variant Selectors */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
          {INFECTED_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => handleSelect(v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedVariant.id === v.id
                  ? 'bg-rose-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual Art (Left) + Behavioral Lore & Tactics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: Mutant Visual Artwork (5 cols) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[350px] flex flex-col justify-end group shadow-2xl">
          <img
            src="/src/assets/images/infected_spore_stalker_1794362677919.jpg"
            alt={selectedVariant.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative z-10 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold font-mono-nums text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Ancaman: {selectedVariant.threatLevel}</span>
            </div>
            <h4 className="text-xl font-heading font-bold text-white mt-1">
              {selectedVariant.name}
            </h4>
            <p className="text-xs text-slate-300 font-mono-nums">
              {selectedVariant.stage}
            </p>
          </div>
        </div>

        {/* Right Side: Sensory Behavior & Tactics (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Lore */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              ASAL-USUL MUTASI SPORA
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedVariant.lore}
            </p>
          </div>

          {/* Sensory Behavior */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Ear className="w-4 h-4" />
              Perilaku Sensorik & Pendengaran:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedVariant.sensoryBehavior}
            </p>
          </div>

          {/* Tactical Countermeasure */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-semibold">
              <Flame className="w-4 h-4" />
              Kelemahan Taktis & Cara Mengalahkan:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedVariant.weakness}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
