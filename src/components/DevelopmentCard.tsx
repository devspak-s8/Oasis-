import React from 'react';
import { Development } from '../types';
import { formatCurrencyNaira } from '../utils/realEstateCalculators';
import { MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface DevelopmentCardProps {
  development: Development;
  onViewDetails: (slug: string) => void;
  onQuickEnquire: (id: string, name: string) => void;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
  development,
  onViewDetails,
  onQuickEnquire
}) => {
  return (
    <div className="group bg-[#102342] border border-[#1E3A6E] rounded-2xl overflow-hidden shadow-lg hover:border-[#C8A45D]/60 transition-all duration-300 flex flex-col">
      {/* Property Image with Measured Scrim */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#060E1A]">
        <img
          src={development.heroImage}
          alt={`${development.name} - ${development.location}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102342] via-transparent to-black/40 pointer-events-none" />

        {/* Clean unboxed availability indicator (No pill box) */}
        <div className="absolute top-4 left-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-white drop-shadow flex items-center gap-2">
            <span
              className={`w-2 h-2 ${
                development.availability === 'Available'
                  ? 'bg-emerald-400'
                  : development.availability === 'Selling Fast'
                  ? 'bg-amber-400'
                  : 'bg-slate-400'
              }`}
            />
            <span className={development.availability === 'Available' ? 'text-emerald-300' : 'text-amber-300'}>
              {development.availability}
            </span>
          </div>
        </div>

        {/* Location line (No pill enclosures) */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span className="font-semibold text-slate-100">{development.location}</span>
          </div>
          <span className="text-slate-300 text-xs drop-shadow font-medium">
            {development.state}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata line without pill clutter */}
          <div className="flex items-center gap-2 text-xs text-[#C8A45D] font-medium mb-1">
            <span>{development.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{development.plotSizes.length} Plot Sizes</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#C8A45D] transition-colors">
            {development.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {development.overview}
          </p>

          {/* Key Infrastructure Preview */}
          <div className="mt-4 pt-3 border-t border-[#1E3A6E]/50 space-y-1.5">
            {development.infrastructure.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Zone */}
        <div className="pt-4 border-t border-[#1E3A6E] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Starting From
            </span>
            <span className="text-base font-bold font-mono text-white">
              {formatCurrencyNaira(development.startingPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickEnquire(development.id, development.name)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#060E1A] hover:bg-[#142B52] border border-[#1E3A6E] text-slate-200 transition-colors"
            >
              Enquire
            </button>
            <button
              onClick={() => onViewDetails(development.slug)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
