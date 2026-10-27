import {
  ShieldCheck,
  UserCog,
  Compass,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react';
import { trustItems } from '@/data/company';

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  UserCog,
  Compass,
  ClipboardCheck,
};

export default function TrustStrip() {
  return (
    <section className="bg-white py-12 border-b border-ink-100">
      <div className="container-luxe">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="reveal flex flex-col items-center text-center group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gold-500 group-hover:border-gold-500">
                  <Icon className="w-6 h-6 text-gold-600 transition-colors duration-300 group-hover:text-ink-900" />
                </div>
                <h3 className="font-semibold text-ink-900 text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
