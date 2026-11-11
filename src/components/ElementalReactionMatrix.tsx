import React, { useState } from 'react';
import { ELEMENTAL_REACTIONS, ElementalReaction } from '../data/gameConcept';
import { sound } from '../utils/audio';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const ElementalReactionMatrix: React.FC = () => {
  const [selectedReaction, setSelectedReaction] = useState<ElementalReaction>(ELEMENTAL_REACTIONS[0]);

  const handleSelect = (rx: ElementalReaction) => {
    sound.playClick();
    setSelectedReaction(rx);
    if (rx.id === 'steam_lift') sound.playSteam();
    if (rx.id === 'cryo_bridge') sound.playFreeze();
    if (rx.id === 'acoustic_resonance') sound.playWindChime();
    if (rx.id === 'magnetic_rail') sound.playMagnet();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
          <span>SISTEM MEKANIKA INTI</span>
          <span aria-hidden="true">·</span>
          <span>THE ENVIRONMENTAL REACTION MATRIX</span>
        </div>
        <h3 className="text-xl font-heading font-semibold text-white mt-1">
          Matriks Interaksi Fisika & Kimia Lingkungan
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Berbeda dengan game tradisional yang menggunakan sakelar skrip kaku ("kunci A membuka pintu B"), Chronosfera menggunakan sistem reaksi partikel terbuka di mana elemen alam saling bereaksi secara sistemik.
        </p>
      </div>

      {/* Grid of Reactions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 my-6">
        {ELEMENTAL_REACTIONS.map((rx) => {
          const isSelected = selectedReaction.id === rx.id;
          return (
            <button
              key={rx.id}
              onClick={() => handleSelect(rx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/50'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div>
                <span className="text-2xl">{rx.icon}</span>
                <div className="text-xs font-semibold text-white mt-2 leading-tight">
                  {rx.resultName.split('(')[0]}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-400 font-mono-nums">
                {rx.elementA.split(' ')[0]} + {rx.elementB.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Reaction Deep Dive Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
              {selectedReaction.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold font-mono-nums">
                <span>{selectedReaction.elementA}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span>{selectedReaction.elementB}</span>
              </div>
              <h4 className="text-lg font-heading font-bold text-white mt-0.5">
                {selectedReaction.resultName}
              </h4>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono-nums bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
            ID: {selectedReaction.id}
          </div>
        </div>

        {/* 3 Detail Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
          {/* Physics Description */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="text-amber-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Prinsip Fisika Permainan:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedReaction.physicsDescription}
            </p>
          </div>

          {/* Gameplay Application */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="text-sky-300 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Aplikasi Puzzle & Eksplorasi:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedReaction.gameplayApplication}
            </p>
          </div>

          {/* Real world scientific basis */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Korelasi Sains Dunia Nyata:
            </div>
            <p className="text-slate-400 leading-relaxed font-mono-nums text-[11px]">
              {selectedReaction.realWorldPhysicsAnalogy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
