import {
  FileText,
  RefreshCw,
  LogOut,
  Award,
  FileBarChart,
  Scale,
  Gavel,
  Headset,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { services } from '@/data/company';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  RefreshCw,
  LogOut,
  Award,
  FileBarChart,
  Scale,
  Gavel,
  Headset,
};

type ServicesProps = {
  onQualifyClick: () => void;
};

export default function Services({ onQualifyClick }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
            <span className="text-sm font-semibold tracking-wide uppercase">
              Our Services
            </span>
          </div>
          <h2 className="section-title">
            Professional Debt Solutions,{' '}
            <span className="text-gold-600">Tailored to You</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="section-subtitle mx-auto">
            From debt review applications to clearance certificates, Mpohlo
            Holdings offers a full range of debt counselling services designed
            to support you at every stage of your journey.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className="reveal card-luxe p-7 flex flex-col group"
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-ink-900 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-gold-500">
                  <Icon className="w-7 h-7 text-gold-500 transition-colors duration-300 group-hover:text-ink-900" />
                </div>
                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-ink-900 mb-3 leading-snug">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-ink-400 leading-relaxed mb-5 flex-grow">
                  {service.desc}
                </p>
                {/* Learn More */}
                <button
                  onClick={onQualifyClick}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
