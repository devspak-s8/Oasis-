import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  error,
  id,
  className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`space-y-1.5 relative ${className}`} ref={containerRef}>
      {label && (
        <label id={id ? `${id}-label` : undefined} className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label && id ? `${id}-label` : undefined}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 ${
          error
            ? 'border-rose-500'
            : isDark
            ? 'bg-[#060E1A] border-[#1E3A6E] text-white hover:border-[#C8A45D]/60'
            : 'bg-slate-50 border-slate-300 text-[#0B1930] hover:border-slate-400'
        }`}
      >
        <span className="truncate">
          {selectedOption ? (
            <span className="font-medium">{selectedOption.label}</span>
          ) : (
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{placeholder}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 text-[#C8A45D] ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border shadow-2xl max-h-56 overflow-y-auto p-1.5 space-y-1 backdrop-blur-md transition-all animate-in fade-in zoom-in-95 ${
            isDark
              ? 'bg-[#0B1930] border-[#1E3A6E] text-white'
              : 'bg-white border-slate-200 text-[#0B1930]'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? isDark
                      ? 'bg-[#102342] text-[#C8A45D] font-bold'
                      : 'bg-slate-100 text-[#0B1930] font-bold'
                    : isDark
                    ? 'hover:bg-[#102342]/60 text-slate-300 hover:text-white'
                    : 'hover:bg-slate-50 text-slate-700 hover:text-[#0B1930]'
                }`}
              >
                <div className="flex flex-col truncate">
                  <span className="truncate font-medium">{opt.label}</span>
                  {opt.sublabel && (
                    <span className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {opt.sublabel}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C8A45D] shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
    </div>
  );
};
