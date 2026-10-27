import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  ShieldCheck,
  Star,
} from 'lucide-react';
import Logo from './Logo';
import {
  company,
  navLinks,
  footerLegalLinks,
} from '@/data/company';

type FooterProps = {
  onQualifyClick: () => void;
  onLegalClick: (id: string) => void;
};

export default function Footer({ onQualifyClick, onLegalClick }: FooterProps) {
  const socialIcons = [
    { Icon: Facebook, href: company.social.facebook, label: 'Facebook' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-950 text-gray-400 pt-14 sm:pt-16 pb-8">
      <div className="container-luxe">
        {/* Top section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-12 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" className="h-14 sm:h-16 w-auto max-w-[140px] object-contain mb-4" />
            <p className="text-sm leading-7 max-w-xs mb-5">
              {company.tagline}. Confidential, professional debt solutions for
              South Africans.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-800 border border-ink-700 rounded-full">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-medium text-gray-300">
                NCR {company.ncrNumber}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onQualifyClick}
                  className="text-sm text-gold-400 hover:text-gold-300 transition-colors font-medium"
                >
                  Check If You Qualify
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-5">
              Contact Details
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1 1.016-1 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp: {company.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                {company.address}
              </li>
            </ul>
          </div>

          {/* Hours + Social */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-5">
              Business Hours
            </h4>
            <div className="flex items-start gap-3 text-sm text-gray-400 mb-6">
              <Clock className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
              <div>
                <p>{company.hoursDays}</p>
                <p>{company.hours}</p>
              </div>
            </div>

            <h4 className="font-serif text-sm font-bold text-white mb-3">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-5">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500 hover:bg-ink-700 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <a
              href={company.social.trustpilot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink-800 border border-ink-700 rounded-lg text-sm font-medium text-gray-300 hover:text-gold-400 hover:border-gold-500 hover:bg-ink-700 transition-all duration-300"
            >
              <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
              Review Us on Trustpilot
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="border-t border-white/10 pt-6 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6">
            {footerLegalLinks.map((link) => {
              const id = link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => onLegalClick(id)}
                  className="text-xs text-gray-500 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed text-center max-w-4xl mx-auto mb-4">
            Disclaimer: Mpohlo Holdings is a registered debt counsellor
            (NCR {company.ncrNumber}). The information on this website is
            provided for general informational purposes only and does not
            constitute legal or financial advice. Outcomes depend on each
            client's individual circumstances, and no specific result is
            guaranteed. Please consult with one of our consultants to discuss
            your specific situation.
          </p>
          <p className="text-xs text-gray-600 text-center">
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </p>
          <p className="mt-2 text-center text-[10px] text-gray-600">
            Website by{" "}
            <a
              href="https://visibleweb.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline decoration-gray-700 underline-offset-2 transition-colors hover:text-gold-400"
              aria-label="Website designed by VisibleWeb"
            >
              VisibleWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
