import React, { useState, useEffect } from 'react';
import { Development, ServiceItem, SiteSettings, Testimonial } from './types';
import { api } from './services/api';
import { INITIAL_DEVELOPMENTS, INITIAL_SERVICES, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from './data/initialData';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DevelopmentsPage } from './pages/DevelopmentsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminPortal } from './pages/AdminPortal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [developments, setDevelopments] = useState<Development[]>(INITIAL_DEVELOPMENTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [loading, setLoading] = useState(false);

  // Global Lead Modal State
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadInitialDevId, setLeadInitialDevId] = useState<string | undefined>();
  const [leadInitialPlotSize, setLeadInitialPlotSize] = useState<string | undefined>();
  const [leadInitialEnquiryType, setLeadInitialEnquiryType] = useState<string | undefined>();

  const loadData = async () => {
    try {
      const [devs, sett, tests] = await Promise.all([
        api.getDevelopments(),
        api.getSettings(),
        api.getTestimonials()
      ]);
      setDevelopments(devs);
      setSettings(sett);
      setTestimonials(tests);
      setServices(api.getServices());
    } catch (e) {
      console.error('Data load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  const handleOpenLeadModal = (initialDevId?: string, initialPlotSize?: string, initialEnquiryType?: string) => {
    setLeadInitialDevId(initialDevId);
    setLeadInitialPlotSize(initialPlotSize);
    setLeadInitialEnquiryType(initialEnquiryType);
    setLeadModalOpen(true);
  };

  // Render correct route
  const renderCurrentPage = () => {
    if (!settings) return null;

    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          developments={developments}
          services={services}
          settings={settings}
          testimonials={testimonials}
          onNavigate={navigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <AboutPage
          settings={settings}
          onNavigate={navigate}
          onOpenLeadModal={() => handleOpenLeadModal()}
        />
      );
    }

    if (currentPath === '/developments') {
      return (
        <DevelopmentsPage
          developments={developments}
          onNavigate={navigate}
          onOpenLeadModal={(devId) => handleOpenLeadModal(devId)}
        />
      );
    }

    if (currentPath.startsWith('/developments/')) {
      const slug = currentPath.replace('/developments/', '');
      const project = developments.find((d) => d.slug === slug || d.id === slug);
      if (project) {
        return (
          <ProjectDetailPage
            development={project}
            allDevelopments={developments}
            settings={settings}
            onNavigate={navigate}
            onOpenLeadModal={handleOpenLeadModal}
          />
        );
      }
      // If project not found, redirect to directory
      return (
        <DevelopmentsPage
          developments={developments}
          onNavigate={navigate}
          onOpenLeadModal={(devId) => handleOpenLeadModal(devId)}
        />
      );
    }

    if (currentPath === '/services') {
      return (
        <ServicesPage
          services={services}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }

    if (currentPath === '/investment') {
      return (
        <InvestmentPage
          developments={developments}
          onNavigate={navigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }

    if (currentPath === '/contact') {
      return <ContactPage settings={settings} />;
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage settings={settings} onNavigate={navigate} />;
    }

    if (currentPath === '/admin') {
      return (
        <AdminPortal
          developments={developments}
          settings={settings}
          testimonials={testimonials}
          onRefreshData={loadData}
          onNavigatePublic={navigate}
        />
      );
    }

    // Default fallback
    return (
      <HomePage
        developments={developments}
        services={services}
        settings={settings}
        testimonials={testimonials}
        onNavigate={navigate}
        onOpenLeadModal={handleOpenLeadModal}
      />
    );
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-[#0B1930] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#102342] border border-[#C8A45D]/60 flex items-center justify-center mx-auto animate-pulse">
            <span className="font-serif-title text-[#C8A45D] font-bold text-2xl">O</span>
          </div>
          <div className="text-sm font-bold tracking-tight text-white uppercase">
            OASIS RAY DEVELOPMENTS
          </div>
          <div className="text-xs text-[#C8A45D] italic">The Calm Side of Smart Investing</div>
        </div>
      </div>
    );
  }

  const isAdminView = currentPath === '/admin';

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-[#0B1930] text-slate-100 selection:bg-[#C8A45D]/30 selection:text-[#C8A45D]">
        {/* Navigation */}
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenLeadModal={() => handleOpenLeadModal()}
          settings={settings}
        />

        {/* Main Content */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Global Footer (hidden on admin view for distraction-free workspace) */}
        {!isAdminView && <Footer onNavigate={navigate} settings={settings} />}

        {/* Global Lead Capture Modal */}
        <LeadModal
          isOpen={leadModalOpen}
          onClose={() => setLeadModalOpen(false)}
          initialDevelopmentId={leadInitialDevId}
          initialPlotSize={leadInitialPlotSize}
          initialEnquiryType={leadInitialEnquiryType}
          developments={developments}
          settings={settings}
        />
      </div>
    </ToastProvider>
  );
}
