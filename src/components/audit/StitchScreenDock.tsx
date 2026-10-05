import React, { useState } from 'react';
import { SCREEN_INVENTORY, ScreenId } from '../../types/navigation';

interface StitchScreenDockProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  showSpecGuides: boolean;
  onToggleSpecGuides: () => void;
}

export const StitchScreenDock: React.FC<StitchScreenDockProps> = ({
  currentScreen,
  onSelectScreen,
  showSpecGuides,
  onToggleSpecGuides,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const activeMeta =
    SCREEN_INVENTORY.find((s) => s.id === currentScreen) || SCREEN_INVENTORY[0];

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="h-10 px-4 rounded-full bg-[#2D2529] text-white text-[12px] font-semibold shadow-lg flex items-center gap-2 hover:bg-[#B75E78] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">layers</span>
          <span>Stitch Screen Switcher ({activeMeta.code})</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Audit Comparison Drawer / Modal */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2529]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DDE1] max-w-4xl w-full max-h-[82vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E9DDE1] flex items-center justify-between bg-[#FCFAF9]">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#B75E78]">
                  Teacher Theint English • Master Navbar Consistency Audit
                </div>
                <h2 className="font-serif-editorial text-2xl font-semibold text-[#2D2529]">
                  Selected Screens → Home Page Navigation System Alignment
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAuditModalOpen(false)}
                className="w-9 h-9 rounded-lg border border-[#E9DDE1] bg-[#FFFFFF] text-[#766A70] hover:text-[#2D2529] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-4 rounded-xl bg-[#F3DDE3]/40 border border-[#D8899D]/50 text-[13px] text-[#2D2529] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-[#B75E78]">Canonical Visual Reference:</span>{' '}
                  Home Page Navbar (`h-20` / 80px height • `#FFFFFF/95` surface • `#E9DDE1` 1px
                  border • `TT` 40×40px emblem • `Manrope` 14px links • `h-10` rounded-lg buttons).
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#B75E78] text-white text-[11px] font-bold">
                  {SCREEN_INVENTORY.length} / {SCREEN_INVENTORY.length} Screens Aligned
                </span>
              </div>

              <div className="divide-y divide-[#E9DDE1] border border-[#E9DDE1] rounded-xl overflow-hidden">
                {SCREEN_INVENTORY.map((scr) => {
                  const isCurrent = scr.id === currentScreen;
                  return (
                    <div
                      key={scr.id}
                      className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isCurrent ? 'bg-[#F3DDE3]/25' : 'bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F7F1F3] text-[#B75E78] border border-[#E9DDE1]">
                            {scr.code}
                          </span>
                          <span className="font-semibold text-[14px] text-[#2D2529]">
                            {scr.title}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#766A70]">
                          <strong className="text-[#2D2529]">Previous Issue:</strong>{' '}
                          {scr.previousViolation}
                        </p>
                        <p className="text-[12px] text-[#B75E78]">
                          <strong>Correction Applied:</strong> {scr.appliedCorrection}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectScreen(scr.id);
                          setAuditModalOpen(false);
                        }}
                        className={`h-9 px-3.5 rounded-lg text-[12px] font-semibold shrink-0 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#B75E78] text-white'
                            : 'bg-[#FCFAF9] text-[#2D2529] border border-[#E9DDE1] hover:bg-[#F3DDE3]/50'
                        }`}
                      >
                        {isCurrent ? 'Currently Viewing' : 'Inspect Screen'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Stitch Screen Inspector Bar */}
      <div className="fixed bottom-3 inset-x-0 z-40 px-3 pointer-events-none">
        <div className="max-w-[1240px] mx-auto bg-[#2D2529]/95 backdrop-blur-md text-white rounded-2xl border border-[#766A70]/40 px-3.5 py-2.5 shadow-xl pointer-events-auto flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#D8899D] text-[#2D2529] text-[10px] font-extrabold uppercase tracking-wider">
                {activeMeta.isReference ? 'Reference Navbar' : 'Corrected Navbar'}
              </span>
              <span className="text-[12.5px] font-semibold text-white">
                {activeMeta.code}: {activeMeta.title}
              </span>
              <span className="hidden lg:inline text-[11.5px] text-[#F3DDE3]/80">
                — {activeMeta.appliedCorrection}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleSpecGuides}
                className={`h-7 px-2.5 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  showSpecGuides
                    ? 'bg-[#D8899D] text-[#2D2529]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">straighten</span>
                <span>{showSpecGuides ? 'Hide Spec Guides' : 'Navbar Spec Guides'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAuditModalOpen(true)}
                className="h-7 px-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">fact_check</span>
                <span>Consistency Audit ({SCREEN_INVENTORY.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize Stitch Dock"
                className="h-7 w-7 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* Screen Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {SCREEN_INVENTORY.map((scr) => {
              const isSelected = scr.id === currentScreen;
              return (
                <button
                  key={scr.id}
                  type="button"
                  onClick={() => onSelectScreen(scr.id)}
                  className={`h-7 px-2.5 rounded-lg text-[11.5px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F3DDE3] text-[#2D2529] font-bold shadow-2xs'
                      : 'bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      scr.category === 'PUBLIC'
                        ? 'bg-[#D8899D]'
                        : scr.category === 'AUTH'
                        ? 'bg-amber-300'
                        : 'bg-emerald-300'
                    }`}
                  />
                  <span>{scr.title.replace(' (10-Section Public IA)', '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
