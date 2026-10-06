import React from 'react';
import { HandwrittenDiagram } from '../data/scienceDiagrams';

interface ScienceDiagramRendererProps {
  diagram: HandwrittenDiagram;
}

export const ScienceDiagramRenderer: React.FC<ScienceDiagramRendererProps> = ({ diagram }) => {
  const { svgType } = diagram;

  switch (svgType) {
    case 'central-dogma':
      return (
        <div className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-stone-800">
          <div className="text-center font-mono text-xs uppercase tracking-widest text-amber-400 mb-4 font-bold">
            Molecular Blueprint: Central Dogma Flow Architecture
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1: Transcription */}
            <div className="bg-stone-850 border border-stone-700/80 rounded-xl p-4 text-center space-y-2 relative">
              <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded uppercase">
                1. In Nucleus
              </span>
              <h5 className="font-serif font-bold text-amber-200 text-sm">Transcription</h5>
              <div className="py-2 flex justify-center">
                <svg width="140" height="60" viewBox="0 0 140 60" className="stroke-current text-blue-400">
                  <path d="M 10 20 Q 35 5, 70 20 T 130 20" fill="none" strokeWidth="2.5" />
                  <path d="M 10 40 Q 35 55, 70 40 T 130 40" fill="none" strokeWidth="2.5" />
                  <line x1="30" y1="12" x2="30" y2="48" strokeWidth="1.5" stroke="#60a5fa" strokeDasharray="2 2" />
                  <line x1="70" y1="20" x2="70" y2="40" strokeWidth="1.5" stroke="#60a5fa" strokeDasharray="2 2" />
                  <line x1="110" y1="12" x2="110" y2="48" strokeWidth="1.5" stroke="#60a5fa" strokeDasharray="2 2" />
                  <path d="M 20 30 L 120 30" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
                </svg>
              </div>
              <p className="text-[11px] text-stone-300 font-sans">
                DNA template (3' to 5') transcribed by RNA Polymerase into single-stranded mRNA with Uracil (U).
              </p>
            </div>

            {/* Step 2: Translation */}
            <div className="bg-stone-850 border border-stone-700/80 rounded-xl p-4 text-center space-y-2 relative">
              <span className="text-[10px] font-mono bg-amber-900/60 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded uppercase">
                2. In Cytoplasm
              </span>
              <h5 className="font-serif font-bold text-amber-200 text-sm">Translation</h5>
              <div className="py-2 flex justify-center">
                <svg width="140" height="60" viewBox="0 0 140 60">
                  {/* Ribosome subunits */}
                  <ellipse cx="70" cy="45" rx="55" ry="14" fill="#3b82f6" opacity="0.6" />
                  <ellipse cx="70" cy="22" rx="42" ry="12" fill="#2563eb" opacity="0.8" />
                  {/* mRNA line */}
                  <line x1="10" y1="35" x2="130" y2="35" stroke="#fbbf24" strokeWidth="3" />
                  {/* Codon marks */}
                  <text x="35" y="33" fill="#ffffff" fontSize="8" fontFamily="monospace">AUG</text>
                  <text x="65" y="33" fill="#ffffff" fontSize="8" fontFamily="monospace">GUC</text>
                  <text x="95" y="33" fill="#ffffff" fontSize="8" fontFamily="monospace">CCA</text>
                  {/* tRNA */}
                  <path d="M 70 8 L 70 28" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="70" cy="6" r="4" fill="#ef4444" />
                </svg>
              </div>
              <p className="text-[11px] text-stone-300 font-sans">
                Ribosome clamps mRNA. tRNA brings amino acids whose anticodon matches triplet codon.
              </p>
            </div>

            {/* Step 3: Translocation */}
            <div className="bg-stone-850 border border-stone-700/80 rounded-xl p-4 text-center space-y-2 relative">
              <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded uppercase">
                3. Peptide Assembly
              </span>
              <h5 className="font-serif font-bold text-amber-200 text-sm">Translocation</h5>
              <div className="py-2 flex justify-center">
                <svg width="140" height="60" viewBox="0 0 140 60">
                  {/* Chain of amino acids */}
                  <circle cx="35" cy="18" r="6" fill="#ec4899" />
                  <line x1="41" y1="18" x2="55" y2="18" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="61" cy="18" r="6" fill="#8b5cf6" />
                  <line x1="67" y1="18" x2="81" y2="18" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="87" cy="18" r="6" fill="#06b6d4" />
                  <line x1="93" y1="18" x2="107" y2="18" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="113" cy="18" r="6" fill="#10b981" />
                  {/* Forward shift arrow */}
                  <path d="M 30 45 L 105 45 M 95 40 L 105 45 L 95 50" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                </svg>
              </div>
              <p className="text-[11px] text-stone-300 font-sans">
                Ribosome shifts forward by 1 triplet codon (translocation) until stop codon releases finished protein.
              </p>
            </div>
          </div>
        </div>
      );

    case 'cellular-respiration':
      return (
        <div className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-stone-800 space-y-4">
          <div className="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            Cellular Energetics: Glycolysis ➔ Krebs Cycle ➔ Electron Transport Chain
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-stone-850 border border-stone-700 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono bg-stone-700 text-stone-200 px-2 py-0.5 rounded">
                CYTOPLASM
              </span>
              <h6 className="font-serif font-bold text-amber-300 text-xs">Glycolysis (EMP Pathway)</h6>
              <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-700/60 font-mono text-xs space-y-1 text-stone-300">
                <div>Glucose (6C)</div>
                <div className="text-amber-400 font-bold">↓ (Oxidation)</div>
                <div>2 Pyruvic Acid (3C)</div>
                <div className="text-green-400 pt-1 font-bold">+ 2 ATP + 2 NADH₂</div>
              </div>
              <p className="text-[10px] text-stone-400">Does not require oxygen. Common to aerobic & anaerobic respiration.</p>
            </div>

            <div className="bg-stone-850 border border-amber-600/60 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                MITOCHONDRIAL MATRIX
              </span>
              <h6 className="font-serif font-bold text-amber-300 text-xs">Krebs Cycle (TCA Cycle)</h6>
              <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-700/60 font-mono text-xs space-y-1 text-stone-300">
                <div>2 Acetyl-CoA (2C)</div>
                <div className="text-amber-400 font-bold">⟳ Cyclic Oxidation</div>
                <div>4 CO₂ evolved</div>
                <div className="text-green-400 pt-1 font-bold">+ 2 ATP + 6 NADH₂ + 2 FADH₂</div>
              </div>
              <p className="text-[10px] text-stone-400">Complete enzymatic breakdown of acetyl groups into CO₂.</p>
            </div>

            <div className="bg-stone-850 border border-green-600/60 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono bg-green-950 text-green-300 border border-green-500/40 px-2 py-0.5 rounded">
                MITOCHONDRIAL CRISTAE
              </span>
              <h6 className="font-serif font-bold text-green-300 text-xs">Electron Transfer Chain (ETC)</h6>
              <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-700/60 font-mono text-xs space-y-1 text-stone-300">
                <div>10 NADH₂ × 3 = 30 ATP</div>
                <div>2 FADH₂ × 2 = 4 ATP</div>
                <div>Substrate ATP = 4 ATP</div>
                <div className="text-amber-300 font-bold border-t border-stone-700 pt-1">
                  TOTAL = 38 ATP + 6 H₂O
                </div>
              </div>
              <p className="text-[10px] text-stone-400">Oxygen acts as final electron acceptor, forming water molecules.</p>
            </div>
          </div>
        </div>
      );

    case 'mitosis-stages':
      return (
        <div className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-stone-800 space-y-4">
          <div className="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            Equational Karyokinesis: Prophase ➔ Metaphase ➔ Anaphase ➔ Telophase (2n ➔ 2n)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {/* Prophase */}
            <div className="bg-stone-850 p-3 rounded-xl border border-stone-700 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">1. Prophase</span>
              <div className="flex justify-center py-2">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  <circle cx="30" cy="30" r="18" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 24 24 L 36 36 M 24 36 L 36 24" stroke="#ec4899" strokeWidth="2.5" />
                  <path d="M 28 20 L 32 40 M 24 30 L 36 30" stroke="#3b82f6" strokeWidth="2.5" />
                </svg>
              </div>
              <p className="text-[10px] text-stone-300">Condensation; nuclear membrane dissolves.</p>
            </div>

            {/* Metaphase */}
            <div className="bg-stone-850 p-3 rounded-xl border border-amber-500/60 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">2. Metaphase</span>
              <div className="flex justify-center py-2">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  <line x1="4" y1="30" x2="56" y2="30" stroke="#eab308" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Chromosomes on equator */}
                  <path d="M 18 24 L 22 36 M 18 36 L 22 24" stroke="#ec4899" strokeWidth="2.5" />
                  <path d="M 28 24 L 32 36 M 28 36 L 32 24" stroke="#3b82f6" strokeWidth="2.5" />
                  <path d="M 38 24 L 42 36 M 38 36 L 42 24" stroke="#10b981" strokeWidth="2.5" />
                </svg>
              </div>
              <p className="text-[10px] text-stone-300">Chromosomes align on equatorial plate.</p>
            </div>

            {/* Anaphase */}
            <div className="bg-stone-850 p-3 rounded-xl border border-stone-700 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">3. Anaphase</span>
              <div className="flex justify-center py-2">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  {/* Sister chromatids pulled to poles */}
                  <path d="M 18 14 L 22 20 L 26 14" fill="none" stroke="#ec4899" strokeWidth="2.5" />
                  <path d="M 34 14 L 38 20 L 42 14" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <path d="M 18 46 L 22 40 L 26 46" fill="none" stroke="#ec4899" strokeWidth="2.5" />
                  <path d="M 34 46 L 38 40 L 42 46" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                </svg>
              </div>
              <p className="text-[10px] text-stone-300">Centromeres split; chromatids pull to poles.</p>
            </div>

            {/* Telophase */}
            <div className="bg-stone-850 p-3 rounded-xl border border-stone-700 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">4. Telophase</span>
              <div className="flex justify-center py-2">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  {/* Constricted cell */}
                  <path d="M 12 12 Q 30 24, 48 12 Q 40 30, 48 48 Q 30 36, 12 48 Q 20 30, 12 12" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  <circle cx="30" cy="18" r="8" fill="none" stroke="#9ca3af" strokeWidth="1" />
                  <circle cx="30" cy="42" r="8" fill="none" stroke="#9ca3af" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-[10px] text-stone-300">Nuclear envelopes reform; furrow splits cell.</p>
            </div>
          </div>
        </div>
      );

    case 'energy-pyramid':
      return (
        <div className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-stone-800 space-y-4">
          <div className="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            Lindeman's 10% Law of Ecological Energy Pyramid (Unidirectional Flow)
          </div>
          <div className="max-w-md mx-auto space-y-2 text-center font-mono">
            <div className="bg-red-900/80 border border-red-500/60 p-2.5 rounded-t-xl text-xs font-bold text-red-200 w-36 mx-auto shadow-xs">
              Apex Predators: 10 kcal
            </div>
            <div className="bg-amber-900/80 border border-amber-500/60 p-2.5 text-xs font-bold text-amber-200 w-60 mx-auto shadow-xs">
              Secondary Carnivores: 100 kcal
            </div>
            <div className="bg-blue-900/80 border border-blue-500/60 p-2.5 text-xs font-bold text-blue-200 w-80 mx-auto shadow-xs">
              Primary Herbivores: 1,000 kcal
            </div>
            <div className="bg-emerald-900/80 border border-emerald-500/60 p-3 rounded-b-xl text-xs font-bold text-emerald-200 w-full shadow-xs">
              Producers (Green Plants / Autotrophs): 10,000 kcal (Base)
            </div>
          </div>
          <div className="text-center text-xs text-stone-400 font-sans pt-2">
            ⭐ 90% of energy is dissipated as metabolic heat at each trophic transfer. Energy flow is strictly NON-CYCLIC.
          </div>
        </div>
      );

    case 'disaster-cycle':
      return (
        <div className="bg-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-stone-800 space-y-4">
          <div className="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            Holistic Disaster Management Cycle (Pre-Disaster & Post-Disaster Continuum)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-bold uppercase">
                Phase 1: Pre-Disaster (Proactive)
              </span>
              <ul className="text-xs space-y-1.5 text-stone-300 font-sans">
                <li>• <strong className="text-emerald-300">1. Preparedness:</strong> Emergency drills & supply stocks.</li>
                <li>• <strong className="text-emerald-300">2. Mitigation:</strong> Earthquake-resistant engineering.</li>
                <li>• <strong className="text-emerald-300">3. Warning:</strong> Doppler radar storm sirens & SMS alerts.</li>
              </ul>
            </div>

            <div className="bg-rose-950/60 border border-rose-500/40 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono bg-rose-900 text-rose-200 px-2 py-0.5 rounded font-bold uppercase">
                Phase 2: Post-Disaster (Reactive & Recovery)
              </span>
              <ul className="text-xs space-y-1.5 text-stone-300 font-sans">
                <li>• <strong className="text-rose-300">4. Emergency Rescue:</strong> Golden 72 hours rescue operations.</li>
                <li>• <strong className="text-rose-300">5. Relief Camps:</strong> Safe drinking water, food & medical aid.</li>
                <li>• <strong className="text-rose-300">6. Rehabilitation:</strong> Psychological trauma counseling.</li>
                <li>• <strong className="text-rose-300">7. Reconstruction:</strong> Build back better seismic housing.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-stone-900 rounded-2xl p-5 text-amber-200 font-mono text-center text-xs border border-stone-800">
          <span className="text-amber-400 font-bold block mb-1">📐 BOARD EXAMINATION SCHEMATIC ARCHITECTURE</span>
          <span>{diagram.caption}</span>
        </div>
      );
  }
};
