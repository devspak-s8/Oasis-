import React, { useState } from 'react';
import { Development } from '../types';
import { DevelopmentCard } from '../components/DevelopmentCard';
import { Building, Search } from 'lucide-react';
import { FadeIn, SlideInLeft, SlideInRight } from '../components/ScrollAnimations';

interface DevelopmentsPageProps {
  developments: Development[];
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopmentId?: string) => void;
}

export const DevelopmentsPage: React.FC<DevelopmentsPageProps> = ({
  developments,
  onNavigate,
  onOpenLeadModal
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDevelopments = developments.filter((dev) => {
    if (selectedLocation !== 'all' && !dev.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    if (selectedAvailability !== 'all' && dev.availability !== selectedAvailability) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        dev.name.toLowerCase().includes(q) ||
        dev.location.toLowerCase().includes(q) ||
        dev.overview.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft className="space-y-4 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
          Property Portfolio
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Our Developments
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-normal">
          Explore our master-planned residential estates and strategic investment parcels located across high-growth corridors in Ogun State. Each development features verified survey documentation, clear infrastructure plans, and flexible payment options.
        </p>
      </SlideInLeft>

      {/* Filter and Search Bar */}
      <FadeIn delay={0.1}>
        <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by estate name, location or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#060E1A] border border-[#1E3A6E] text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="filter-location" className="text-xs text-slate-400 font-medium">Location:</label>
                <select
                  id="filter-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-[#060E1A] border border-[#1E3A6E] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                >
                  <option value="all">All Locations</option>
                  <option value="mowe">Mowe-Ofada Corridor</option>
                  <option value="abeokuta">Abeokuta Hub (Ita Oshin)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="filter-status" className="text-xs text-slate-400 font-medium">Status:</label>
                <select
                  id="filter-status"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="bg-[#060E1A] border border-[#1E3A6E] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
                >
                  <option value="all">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Selling Fast">Selling Fast</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              {(selectedLocation !== 'all' || selectedAvailability !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedAvailability('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#C8A45D] hover:underline px-2 py-1"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Development Grid: Slide In from Left and Right */}
      {filteredDevelopments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDevelopments.map((dev, idx) => {
            const Wrapper = idx % 2 === 0 ? SlideInLeft : SlideInRight;
            return (
              <Wrapper key={dev.id} delay={0.15}>
                <DevelopmentCard
                  development={dev}
                  onViewDetails={(slug) => onNavigate(`/developments/${slug}`)}
                  onQuickEnquire={(id) => onOpenLeadModal(id)}
                />
              </Wrapper>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-12 text-center space-y-4">
          <Building className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No developments match your current filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or location filters to view all active developments.
          </p>
          <button
            onClick={() => {
              setSelectedLocation('all');
              setSelectedAvailability('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C8A45D] text-[#0B1930]"
          >
            Show All Developments
          </button>
        </div>
      )}

      {/* Advisory Banner */}
      <FadeIn>
        <div className="bg-[#060E1A] border border-[#1E3A6E] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Looking for Institutional Acreage or Bespoke Land Banking?
            </h3>
            <p className="text-xs text-slate-400">
              Our advisory team coordinates tailored commercial parcel allocations and corporate site tours upon request.
            </p>
          </div>
          <button
            onClick={() => onOpenLeadModal()}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg whitespace-nowrap shadow-sm"
          >
            Request Corporate Consultation
          </button>
        </div>
      </FadeIn>
    </div>
  );
};
