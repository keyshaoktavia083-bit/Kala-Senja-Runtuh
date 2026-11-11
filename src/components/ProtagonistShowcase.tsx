import React from 'react';
import { PROTAGONIST_MAYA, SURVIVAL_TOOLS } from '../data/zombieGameConcept';
import { Crosshair, ShieldCheck, HeartPulse, Sparkles, BookOpen, User } from 'lucide-react';

export const ProtagonistShowcase: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
          <span>PROFIL TOKOH UTAMA</span>
          <span aria-hidden="true">·</span>
          <span>THE FEMALE PROTAGONIST</span>
        </div>
        <h3 className="text-xl font-heading font-semibold text-white mt-1">
          Maya Pradipta — Peneliti Mikologi & Pejuang Bertahan Hidup
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Bukan prajurit super tanpa emosi, melainkan seorang ilmuwan perempuan cerdas dengan ketahanan fisik luar biasa, keahlian farmakope herbal, dan tekad bulat menyelamatkan adiknya.
        </p>
      </div>

      {/* Grid: Maya Portrait & Bio (Left 5) + Skills & Tools (Right 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch">
        {/* Left Side: Portrait & Character Stats (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square group shadow-xl">
            <img
              src={PROTAGONIST_MAYA.portrait}
              alt={PROTAGONIST_MAYA.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">{PROTAGONIST_MAYA.name}</h4>
                  <div className="text-[11px] text-amber-400">{PROTAGONIST_MAYA.profession}</div>
                </div>
                <span className="text-xs font-mono-nums text-slate-400">Usia {PROTAGONIST_MAYA.age} Th</span>
              </div>
            </div>
          </div>

          {/* Motivation Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="text-amber-400 font-semibold flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5" />
              Misi Personal & Ikatan Emosional:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {PROTAGONIST_MAYA.motivation}
            </p>
          </div>
        </div>

        {/* Right Side: Backstory, Signature Skills, and Crafting Tools (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Backstory */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Latar Belakang Karakter
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {PROTAGONIST_MAYA.backstory}
            </p>
            <div className="pt-2 text-[11px] text-slate-400 italic border-t border-slate-800/80">
              "Kekuatan Maya bukan pada peluru tanpa batas, melainkan pada kemampuannya menganalisis ekosistem spora dan memutarbalikkan senjata alam untuk bertahan hidup."
            </div>
          </div>

          {/* Signature Skills */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              KEAHLIAN KHAS SURVIVAL MAYA
            </div>
            <div className="space-y-2.5">
              {PROTAGONIST_MAYA.signatureSkills.map((skill, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span className="text-[10px] font-mono text-amber-400">0{idx + 1}</span>
                    <span>{skill.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 pl-5">
                    {skill.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              PERALATAN SURVIVAL KHAS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SURVIVAL_TOOLS.map((tool) => (
                <div key={tool.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-slate-200">{tool.name}</div>
                  <div className="text-[10px] text-amber-400 font-mono-nums">{tool.category} · {tool.stats}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
