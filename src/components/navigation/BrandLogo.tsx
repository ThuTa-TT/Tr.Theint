import React from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  roleBadge?: string;
  showSpecGuides?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  roleBadge,
  showSpecGuides = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 text-left focus:outline-none transition-opacity hover:opacity-95 shrink-0 cursor-pointer ${
        showSpecGuides ? 'ring-1 ring-dashed ring-[#B75E78]/60 bg-[#F3DDE3]/20 px-1.5 py-0.5 rounded-lg' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-[#F3DDE3] flex items-center justify-center font-bold text-base text-[#B75E78] shadow-sm shrink-0">
        TE
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-[#2D2529] tracking-tight block group-hover:text-[#B75E78] transition-colors">
            Teacher Theint English
          </span>
          {roleBadge && (
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#F3DDE3] text-[#B75E78]">
              {roleBadge}
            </span>
          )}
        </div>
        <span className="text-xs text-[#766A70] block">
          English Teaching &amp; Learning Platform
        </span>
      </div>

      {showSpecGuides && (
        <span className="absolute -bottom-5 left-0 text-[9px] font-mono bg-[#2D2529] text-white px-1.5 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none">
          TE 40×40px (#F3DDE3) • Manrope Bold 16px
        </span>
      )}
    </button>
  );
};
