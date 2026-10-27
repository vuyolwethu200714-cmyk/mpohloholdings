import { useState, useCallback, useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';
import LogoLoader from '@/components/LogoLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import NotAlone from '@/components/NotAlone';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import CallBackForm from '@/components/CallBackForm';
import WhyChooseUs from '@/components/WhyChooseUs';
import ShareYourStory from '@/components/ShareYourStory';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import QualificationForm from '@/components/QualificationForm';
import LegalPage from '@/pages/LegalPage';

function App() {
  const [qualifyOpen, setQualifyOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<string | null>(null);

  useReveal(legalPage);

  const openQualify = useCallback(() => setQualifyOpen(true), []);
  const closeQualify = useCallback(() => setQualifyOpen(false), []);

  const scrollToCallBack = useCallback(() => {
    const el = document.querySelector('#call-back');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goToLegal = useCallback((id: string) => {
    setLegalPage(id);
  }, []);

  const goHome = useCallback(() => {
    setLegalPage(null);
  }, []);

  useEffect(() => {
    if (legalPage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [legalPage]);

  if (legalPage) {
    return (
      <>
        <LegalPage activeId={legalPage} onBack={goHome} />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <LogoLoader />
      <Navbar onQualifyClick={openQualify} />

      <main>
        <Hero onQualifyClick={openQualify} onCallBackClick={scrollToCallBack} />
        <TrustStrip />
        <NotAlone onQualifyClick={openQualify} />
        <Services onQualifyClick={openQualify} />
        <HowItWorks onQualifyClick={openQualify} />
        <CTASection
          title="Let Us Help You Understand Your Options"
          subtitle="Take the first step with a confidential, no obligation assessment. A consultant will guide you through what is possible for your situation."
          primaryLabel="Check If You Qualify"
          primaryOnClick={openQualify}
          variant="dark"
        />
        <CallBackForm />
        <WhyChooseUs onQualifyClick={openQualify} />
        <ShareYourStory />
        <FAQ onQualifyClick={openQualify} />
        <Contact />
        <FinalCTA onQualifyClick={openQualify} />
      </main>

      <Footer onQualifyClick={openQualify} onLegalClick={goToLegal} />
      <WhatsAppButton />

      <QualificationForm open={qualifyOpen} onClose={closeQualify} />
    </>
  );
}

export default App;
