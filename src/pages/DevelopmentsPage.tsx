import React, { useState } from 'react';
import { Development } from '../types';
import { DevelopmentCard } from '../components/DevelopmentCard';
import { Building, Search } from 'lucide-react';
import { FadeIn, SlideInLeft, WakeUpCard } from '../components/ScrollAnimations';
import { useTheme } from '../context/ThemeContext';
import { CustomSelect } from '../components/CustomSelect';
import { FlungCard } from '../components/FlungCard';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

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

  const totalPages = Math.ceil(filteredDevelopments.length / itemsPerPage) || 1;
  const paginatedDevelopments = filteredDevelopments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 overflow-x-hidden">
      {/* Header */}
      <SlideInLeft className="space-y-4 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#C8A45D]">
          Property Portfolio
        </div>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-[#0B1930]'
        }`}>
          Our Developments
        </h1>
        <p className={`text-base leading-relaxed font-normal ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Explore our master-planned residential estates and strategic investment parcels located across high-growth corridors in Ogun State. Each development features verified survey documentation, clear infrastructure plans, and flexible payment options.
        </p>
      </SlideInLeft>

      {/* Filter and Search Bar */}
      <FadeIn delay={0.1}>
        <div className={`rounded-2xl p-4 sm:p-6 border shadow-md space-y-4 ${
          isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
        }`}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by estate name, location or keywords..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A45D] ${
                  isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white placeholder:text-slate-400' : 'bg-slate-50 border-slate-300 text-[#0B1930] placeholder:text-slate-500'
                }`}
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-48">
                <CustomSelect
                  options={[
                    { value: 'all', label: 'All Locations' },
                    { value: 'mowe', label: 'Mowe-Ofada Corridor' },
                    { value: 'abeokuta', label: 'Abeokuta Hub (Ita Oshin)' }
                  ]}
                  value={selectedLocation}
                  onChange={(val) => setSelectedLocation(val)}
                  placeholder="Select Location"
                />
              </div>

              <div className="w-44">
                <CustomSelect
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'Available', label: 'Available' },
                    { value: 'Selling Fast', label: 'Selling Fast' },
                    { value: 'Sold Out', label: 'Sold Out' }
                  ]}
                  value={selectedAvailability}
                  onChange={(val) => setSelectedAvailability(val)}
                  placeholder="Select Status"
                />
              </div>

              {(selectedLocation !== 'all' || selectedAvailability !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedAvailability('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#C8A45D] hover:underline font-semibold self-center pt-1"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Development Grid */}
      {paginatedDevelopments.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {paginatedDevelopments.map((dev, idx) => (
              <FlungCard
                key={dev.id}
                index={idx}
                className={idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-10'}
              >
                <DevelopmentCard
                  development={dev}
                  onViewDetails={(slug) => onNavigate(`/developments/${slug}`)}
                  onQuickEnquire={(id) => onOpenLeadModal(id)}
                />
              </FlungCard>
            ))}
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg text-xs font-bold font-mono transition-all ${
                      isCurrent
                        ? 'bg-[#C8A45D] text-[#0B1930] shadow-md'
                        : isDark
                        ? 'bg-[#102342] text-slate-300 hover:text-white border border-[#1E3A6E]'
                        : 'bg-white text-slate-700 hover:text-[#0B1930] border border-slate-300 shadow-xs'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className={`rounded-2xl p-12 text-center space-y-4 border ${
          isDark ? 'bg-[#102342] border-[#1E3A6E] text-white' : 'bg-white border-slate-200 text-[#0B1930]'
        }`}>
          <Building className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B1930]'}`}>No developments match your current filter</h3>
          <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
        <div className={`rounded-2xl p-8 border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-[#060E1A] border-[#1E3A6E] text-white' : 'bg-[#0B1930] text-white border-slate-800'
        }`}>
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Looking for Institutional Acreage or Bespoke Land Banking?
            </h3>
            <p className="text-xs text-slate-300">
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

