import React from 'react';

export const TR_THEINT_LOGO_URL = '/src/assets/images/tr_theint_logo_1791300639189.jpg';

interface BrandLogoProps {
  onClick?: () => void;
  roleBadge?: string;
  showSpecGuides?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  roleBadge,
  showSpecGuides = false,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 text-left focus:outline-none transition-opacity hover:opacity-95 shrink-0 cursor-pointer ${className} ${
        showSpecGuides ? 'ring-1 ring-dashed ring-[#f48fb1]/60 bg-[#fff0f2] px-1.5 py-0.5 rounded-lg' : ''
      }`}
    >
      <img
        src={TR_THEINT_LOGO_URL}
        alt="Teacher Theint English"
        referrerPolicy="no-referrer"
        className={`${sizeClasses} rounded-full object-cover shadow-xs shrink-0 border-2 border-[#f48fb1] bg-white`}
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-['Quicksand'] font-bold text-base text-[#22191b] tracking-tight block group-hover:text-[#f48fb1] transition-colors">
            Teacher Theint English
          </span>
          {roleBadge && (
            <span className="px-2.5 py-0.5 text-[11px] font-['Quicksand'] font-bold rounded-full bg-[#fff0f2] text-[#964261] border border-[#f5e4e7] shadow-2xs">
              {roleBadge}
            </span>
          )}
        </div>
        <span className="text-xs text-[#534247] font-medium block">
          English Teaching &amp; Learning Platform
        </span>
      </div>

      {showSpecGuides && (
        <span className="absolute -bottom-5 left-0 text-[9px] font-mono bg-[#22191b] text-white px-1.5 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none">
          Teacher Theint Official Logo
        </span>
      )}
    </button>
  );
};
