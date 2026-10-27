import { ShieldCheck, PhoneCall, ArrowRight } from 'lucide-react';
import { company, images } from '@/data/company';

type HeroProps = {
  onQualifyClick: () => void;
  onCallBackClick: () => void;
};

export default function Hero({ onQualifyClick, onCallBackClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-ink-900"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.heroFamily}
          alt="A South African family sharing a joyful moment together at home"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/30" />
      </div>

      {/* Decorative gold accents */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container-luxe relative z-10 pt-12 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/15 border border-gold-500/30 rounded-full mb-8"
            style={{ animation: 'fadeInDown 0.8s ease-out forwards' }}
          >
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-200">
              Registered Debt Counsellor · {company.ncrNumber}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.15s forwards', opacity: 0 }}
          >
            Regain Control of
            <br />
            <span className="text-gold-gradient">Your Finances</span>
          </h1>

          {/* Supporting text */}
          <p
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.3s forwards', opacity: 0 }}
          >
            Mpohlo Holdings provides confidential and professional debt solutions
            designed to help South Africans reduce financial pressure and work
            towards a more secure future.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.45s forwards', opacity: 0 }}
          >
            <button onClick={onQualifyClick} className="btn-gold">
              Check If You Qualify
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onCallBackClick} className="btn-gold-outline">
              <PhoneCall className="w-5 h-5" />
              Request a Call Back
            </button>
          </div>

          {/* Trust line */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 text-sm text-gray-400"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', opacity: 0 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              Confidential & Professional
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              Personalised Solutions
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              No Obligation Assessment
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
