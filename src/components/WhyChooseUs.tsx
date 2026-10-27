import {
  Lock,
  SlidersHorizontal,
  Route,
  MessageSquare,
  MonitorSmartphone,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { whyChooseUs, images } from '@/data/company';

const iconMap: Record<string, LucideIcon> = {
  Lock,
  SlidersHorizontal,
  Route,
  MessageSquare,
  MonitorSmartphone,
  TrendingUp,
};

type WhyChooseUsProps = {
  onQualifyClick: () => void;
};

export default function WhyChooseUs({ onQualifyClick }: WhyChooseUsProps) {
  return (
    <section
      id="why-choose-us"
      className="py-20 lg:py-28 bg-ink-50/50 relative overflow-hidden"
    >
      <div className="container-luxe relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
            <span className="text-sm font-semibold tracking-wide uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="section-title">
            Your Financial Situation Does Not Have to{' '}
            <span className="text-gold-600">Define Your Future</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="section-subtitle mx-auto">
            At Mpohlo Holdings, we are committed to providing debt counselling
            support that is professional, confidential and genuinely focused on
            your individual circumstances.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="reveal card-luxe p-7 group"
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-500 group-hover:border-gold-500">
                    <Icon className="w-6 h-6 text-gold-600 transition-colors duration-300 group-hover:text-ink-900" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image banner */}
        <div className="reveal relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src={images.consultation}
            alt="A professional financial consultation meeting"
            className="w-full h-[300px] lg:h-[360px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-luxe px-8">
              <div className="max-w-lg">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  Speak to a Consultant Who Listens
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Every conversation starts with understanding your situation.
                  There is no pressure and no judgement — just professional
                  guidance to help you move forward.
                </p>
                <button onClick={onQualifyClick} className="btn-gold">
                  Check If You Qualify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
