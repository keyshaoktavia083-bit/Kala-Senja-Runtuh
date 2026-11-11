import React, { useState } from 'react';
import { ZOMBIE_GAME_CONCEPT } from './data/zombieGameConcept';
import { SurvivalSanctuarySimulator } from './components/SurvivalSanctuarySimulator';
import { TacticalStealthSimulator } from './components/TacticalStealthSimulator';
import { ProtagonistShowcase } from './components/ProtagonistShowcase';
import { InfectedBestiaryShowcase } from './components/InfectedBestiaryShowcase';
import { sound } from './utils/audio';
import { 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  User, 
  Ear, 
  Home, 
  BookOpen, 
  Flame, 
  Heart,
  Droplet,
  Zap,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'stealth' | 'protagonist' | 'bestiary' | 'mechanics'>('simulation');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = () => {
    sound.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) sound.playClick();
  };

  const switchTab = (tab: typeof activeTab) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Bar Contract (§2): Zone 1 Wordmark, Zone 2 Nav Links, Zone 3 1 Primary Action */}
      <header className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchTab('simulation');
            }}
            className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="text-rose-500">KALA SENJA RUNTUH</span>
            <span className="hidden sm:inline text-xs text-slate-400 font-normal">· Sisa Nafas Maya</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => switchTab('simulation')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeTab === 'simulation' ? 'text-rose-400 font-semibold' : ''}`}
            >
              Simulasi Shelter Maya
            </button>
            <button
              onClick={() => switchTab('stealth')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeTab === 'stealth' ? 'text-rose-400 font-semibold' : ''}`}
            >
              Simulasi Taktik Stealth
            </button>
            <button
              onClick={() => switchTab('protagonist')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeTab === 'protagonist' ? 'text-rose-400 font-semibold' : ''}`}
            >
              Tokoh Utama: Maya
            </button>
            <button
              onClick={() => switchTab('bestiary')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeTab === 'bestiary' ? 'text-rose-400 font-semibold' : ''}`}
            >
              Varian Infected Spora
            </button>
            <button
              onClick={() => switchTab('mechanics')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${activeTab === 'mechanics' ? 'text-rose-400 font-semibold' : ''}`}
            >
              Pilar Game Design
            </button>
          </nav>

          {/* Zone 3: 1 primary action + audio toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleMute}
              title={isMuted ? "Nyalakan Suara SFX" : "Matikan Suara"}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
            </button>

            <button
              onClick={() => {
                switchTab('simulation');
                sound.playClick();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md shadow-rose-900/30 cursor-pointer"
            >
              Mulai Simulasi Survival
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-slate-800/80 overflow-hidden">
        {/* Background Image Scrim */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={ZOMBIE_GAME_CONCEPT.heroImage}
            alt="Ashes of Dusk Survival Panorama"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/75 to-[#080c14]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <div className="max-w-3xl space-y-4">
            {/* Zero-Pill Unboxed Metadata Header (§1.A) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-rose-400 font-mono-nums">
              <span>Hardcore Survival Horror</span>
              <span aria-hidden="true">·</span>
              <span>Female Protagonist: Maya Pradipta</span>
              <span aria-hidden="true">·</span>
              <span>Wabah Spora Tropis Mycocordyceps</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
              KALA SENJA RUNTUH
            </h1>
            <p className="text-lg sm:text-xl text-rose-300 font-heading font-medium">
              Sisa Nafas Maya (Ashes of Dusk: Maya's Odyssey)
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2 max-w-2xl">
              {ZOMBIE_GAME_CONCEPT.logline}
            </p>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
                <div className="text-rose-400 font-bold font-mono-nums text-base">Akustik Murni</div>
                <div className="text-slate-400 mt-0.5 text-[11px]">Sensor Desibel & Ekolokasi</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
                <div className="text-emerald-400 font-bold font-mono-nums text-base">Riset Botani</div>
                <div className="text-slate-400 mt-0.5 text-[11px]">Racik Serum Penawar Herbal</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
                <div className="text-amber-400 font-bold font-mono-nums text-base">Rooftop Sanctum</div>
                <div className="text-slate-400 mt-0.5 text-[11px]">Kebun Sayur & Panel Surya</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
                <div className="text-sky-400 font-bold font-mono-nums text-base">Dilema Moral</div>
                <div className="text-slate-400 mt-0.5 text-[11px]">Fraksi Manusia vs Zombie</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-12">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => switchTab('simulation')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'simulation'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            1. Simulasi Bertahan Hidup (Playable Shelter Loop)
          </button>

          <button
            onClick={() => switchTab('stealth')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stealth'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ear className="w-4 h-4" />
            2. Simulasi Taktik Stealth (Hospital Encounter)
          </button>

          <button
            onClick={() => switchTab('protagonist')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'protagonist'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            3. Profil Tokoh Utama: Maya Pradipta
          </button>

          <button
            onClick={() => switchTab('bestiary')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'bestiary'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            4. Varian Infected Spora
          </button>

          <button
            onClick={() => switchTab('mechanics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'mechanics'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            5. Pilar Game Design & Sistem
          </button>
        </div>

        {/* View 1: Playable Day/Night Survival Simulator */}
        {activeTab === 'simulation' && <SurvivalSanctuarySimulator />}

        {/* View 2: Playable Stealth Simulator */}
        {activeTab === 'stealth' && <TacticalStealthSimulator />}

        {/* View 3: Protagonist Maya Showcase */}
        {activeTab === 'protagonist' && <ProtagonistShowcase />}

        {/* View 4: Infected Bestiary Showcase */}
        {activeTab === 'bestiary' && <InfectedBestiaryShowcase />}

        {/* View 5: Pillars and World Mechanics */}
        {activeTab === 'mechanics' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-400 font-medium tracking-wide">
                <span>DOKUMEN DESAIN GAME INTI</span>
                <span aria-hidden="true">·</span>
                <span>THE 4 PILLARS OF SURVIVAL</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mt-1">
                Filosofi Desain: Mengapa Survival Ini Berbeda?
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Alih-alih game tembak-menembak zombie aksi murni, *Kala Senja Runtuh* menonjolkan kerapuhan manusia biasa di hadapan alam yang terinfeksi dan ketegangan psikologis seorang perempuan yang memikul tanggung jawab atas sisa harapan umat manusia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ZOMBIE_GAME_CONCEPT.pillars.map((pillar, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{pillar.icon}</span>
                    <div>
                      <h3 className="text-sm font-heading font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <div className="text-[11px] text-rose-400 font-mono-nums">{pillar.tagline}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Atmosphere & Visual Narrative Showcase */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-heading font-bold text-amber-400 flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Misi Utama: Menara Pemancar Sektor 0
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tujuan utama game adalah mencapai stasiun transmisi darurat di puncak gedung pencakar langit Sektor 0. Maya harus merakit menara radio di shelter-nya untuk menangkap transmisi sandi morse adiknya, memetakan rute bebas spora, dan menyiarkan formula vaksin ke seluruh dunia.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-heading font-bold text-rose-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Interaksi Fraksi Manusia yang Kompleks
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Selain zombie, Maya berhadapan dengan The Citadel Enclave (milisi bersenjata berat yang mengisolasi diri) dan The Scavenger Packs. Pemain dapat memilih untuk bernegosiasi damai, menyelundup tanpa terdeteksi, atau memancing kawanan infected ke markas musuh menggunakan umpan botol suara.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080c14] py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Kala Senja Runtuh</span>
            <span aria-hidden="true">·</span>
            <span>Konsep Game Hardcore Survival Horror</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Protagonis Perempuan: Maya Pradipta</span>
            <span aria-hidden="true">·</span>
            <span>Simulasi Real-Time</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
