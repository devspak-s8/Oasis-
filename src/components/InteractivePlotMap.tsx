import React, { useState } from 'react';
import { PlotMapItem } from '../types';
import { Check, Shield, MapPin, Info, ArrowUpRight } from 'lucide-react';

interface InteractivePlotMapProps {
  developmentName: string;
  plots: PlotMapItem[];
  onSelectPlotForEnquiry: (plotNumber: string, size: string) => void;
}

export const InteractivePlotMap: React.FC<InteractivePlotMapProps> = ({
  developmentName,
  plots,
  onSelectPlotForEnquiry
}) => {
  const [selectedPlot, setSelectedPlot] = useState<PlotMapItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');

  const filteredPlots = plots.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const availableCount = plots.filter((p) => p.status === 'available').length;
  const reservedCount = plots.filter((p) => p.status === 'reserved').length;
  const soldCount = plots.filter((p) => p.status === 'sold').length;

  return (
    <div className="bg-[#00097C] border border-[#14288F] rounded-2xl overflow-hidden shadow-xl">
      {/* Header bar with controls */}
      <div className="p-4 sm:p-6 border-b border-[#14288F] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#000538]">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C8A45D]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Estate Cadastral Master Layout
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Select an individual parcel to inspect dimensions, availability status, or request a reservation.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#00097C] rounded-lg border border-[#14288F]/60 text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterStatus === 'all' ? 'bg-[#000538] text-[#C8A45D] shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            All Plots ({plots.length})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterStatus === 'available' ? 'bg-[#000538] text-emerald-300 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Available ({availableCount})
          </button>
          <button
            onClick={() => setFilterStatus('reserved')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterStatus === 'reserved' ? 'bg-[#000538] text-amber-300 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Reserved ({reservedCount})
          </button>
          <button
            onClick={() => setFilterStatus('sold')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterStatus === 'sold' ? 'bg-[#000538] text-slate-400 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Sold ({soldCount})
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative p-4 sm:p-6 bg-[#081224] min-h-[420px] flex items-center justify-center overflow-x-auto">
        <div className="relative w-full max-w-4xl aspect-[16/9] min-w-[620px] bg-[#0E1E38] rounded-xl border border-[#14288F] p-6 shadow-inner overflow-hidden select-none">
          {/* Subtle Estate Roadway Grid System */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="estate-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8A45D" strokeWidth="0.5" strokeDasharray="2,4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#estate-grid)" />
            </svg>
          </div>

          {/* Central Access Boulevard */}
          <div className="absolute left-[50%] top-0 bottom-0 w-12 -translate-x-1/2 bg-[#000538] border-x border-[#C8A45D]/30 flex flex-col items-center justify-between py-3 pointer-events-none z-0">
            <span className="text-[9px] uppercase tracking-widest text-[#C8A45D]/80 font-mono -rotate-90 origin-center whitespace-nowrap mt-8">
              CENTRAL ACCESS BOULEVARD
            </span>
            <span className="text-[8px] text-slate-400 font-mono uppercase tracking-widest -rotate-90 origin-center whitespace-nowrap mb-8">
              SECURITY GATEHOUSE →
            </span>
          </div>

          {/* Cross Street */}
          <div className="absolute top-[38%] left-0 right-0 h-8 bg-[#000538] border-y border-[#14288F] flex items-center px-4 pointer-events-none z-0">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
              INTERNAL CONNECTING DRIVEWAY (12 METRES)
            </span>
          </div>

          {/* Estate Perimeter Label */}
          <div className="absolute top-2 left-3 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            {developmentName} · Master Cadastral Demarcation
          </div>

          {/* Interactive Plot Nodes */}
          {plots.map((plot) => {
            const isMatch = filteredPlots.some((p) => p.id === plot.id);
            const isSelected = selectedPlot?.id === plot.id;

            let bgColor = 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200';
            let dotColor = 'bg-emerald-400';
            if (plot.status === 'reserved') {
              bgColor = 'bg-amber-950/80 border-amber-500/80 text-amber-200';
              dotColor = 'bg-amber-400';
            } else if (plot.status === 'sold') {
              bgColor = 'bg-slate-900/90 border-slate-700 text-slate-400';
              dotColor = 'bg-slate-500';
            }

            if (!isMatch) {
              bgColor = 'opacity-25 pointer-events-none ' + bgColor;
            }

            return (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                style={{
                  left: `${plot.x}%`,
                  top: `${plot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute z-10 w-24 h-16 rounded-lg border-2 flex flex-col items-center justify-center p-1.5 transition-all text-xs font-semibold cursor-pointer ${bgColor} ${
                  isSelected
                    ? 'ring-4 ring-[#C8A45D] ring-offset-2 ring-offset-[#00097C] scale-105 shadow-xl shadow-[#C8A45D]/20 z-20'
                    : 'hover:scale-102 hover:border-[#C8A45D]'
                }`}
                aria-label={`${plot.plotNumber}, ${plot.size}, ${plot.status}`}
              >
                <div className="flex items-center gap-1 leading-none">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  <span className="text-white text-[11px] font-bold tracking-tight">{plot.plotNumber}</span>
                </div>
                <span className="text-[10px] font-medium opacity-90 mt-0.5">{plot.size}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-75 font-mono">{plot.status}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Plot Inspection Panel */}
      <div className="p-4 sm:p-6 bg-[#000538] border-t border-[#14288F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {selectedPlot ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{selectedPlot.plotNumber}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-[#C8A45D] font-medium">{selectedPlot.category}</span>
                <span
                  className={`text-xs uppercase font-mono font-semibold ${
                    selectedPlot.status === 'available'
                      ? 'text-emerald-400'
                      : selectedPlot.status === 'reserved'
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}
                >
                  {selectedPlot.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span>Dimensions: <strong className="text-white font-mono">{selectedPlot.dimensions}</strong></span>
                <span>Area: <strong className="text-white font-mono">{selectedPlot.size}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedPlot.status === 'available' ? (
                <button
                  onClick={() => onSelectPlotForEnquiry(selectedPlot.plotNumber, selectedPlot.size)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#C8A45D] text-[#00097C] hover:bg-[#DFC07C] transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <span>Enquire on {selectedPlot.plotNumber}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ) : selectedPlot.status === 'reserved' ? (
                <button
                  onClick={() => onSelectPlotForEnquiry(selectedPlot.plotNumber, selectedPlot.size)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#00097C] border border-amber-500/50 text-amber-200 hover:bg-[#142B52] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Join Waitlist for {selectedPlot.plotNumber}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-slate-400 italic">This plot is fully allocated. Please choose an adjacent parcel.</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#C8A45D] shrink-0" />
            <span>Click any parcel on the master plan layout above to view precise dimensions, zoning category, and reserve.</span>
          </div>
        )}
      </div>
    </div>
  );
};
