import React, { useState, useEffect } from 'react';
import { Development, ServiceItem, SiteSettings, Testimonial } from './types';
import { api } from './services/api';
import { INITIAL_DEVELOPMENTS, INITIAL_SERVICES, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from './data/initialData';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { FloatingHelp } from './components/FloatingHelp';
import { ScrollBackground } from './components/ScrollBackground';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DevelopmentsPage } from './pages/DevelopmentsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminPortal } from './pages/AdminPortal';
import { AdvisoryPage } from './pages/AdvisoryPage';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { theme } = useTheme();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeadModal = (initialDevId?: string, initialPlotSize?: string, initialEnquiryType?: string) => {
    setLeadInitialDevId(initialDevId);
    setLeadInitialPlotSize(initialPlotSize);
    setLeadInitialEnquiryType(initialEnquiryType);
    navigate('/advisory');
  };

  // Render correct route
  const renderCurrentPage = () => {
    if (!settings) return null;

    if (currentPath === '/advisory') {
      return (
        <AdvisoryPage
          developments={developments}
          settings={settings}
          onNavigate={navigate}
          initialDevId={leadInitialDevId}
          initialPlotSize={leadInitialPlotSize}
        />
      );
    }

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
    <div className={`relative min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#0B1930] text-slate-100 selection:bg-[#C8A45D]/30 selection:text-[#C8A45D]'
        : 'bg-slate-50 text-slate-900 selection:bg-[#C8A45D]/30 selection:text-[#0B1930]'
    }`}>
      {/* Full-Page Scroll-Driven Cinematic Background */}
      {!isAdminView && <ScrollBackground />}

      {/* Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenLeadModal={() => handleOpenLeadModal()}
        settings={settings}
      />

      {/* Main Content with Animated Page Transitions */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
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

      {/* Persistent Floating Help & Advisory Desk */}
      {!isAdminView && (
        <FloatingHelp whatsappNumber={settings.whatsappNumber} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
