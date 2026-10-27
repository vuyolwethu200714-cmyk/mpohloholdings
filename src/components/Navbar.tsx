import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { navLinks, company } from '@/data/company';

type NavbarProps = {
  onQualifyClick: () => void;
};

export default function Navbar({ onQualifyClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-900/95 backdrop-blur-md shadow-lg shadow-ink-900/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-luxe flex items-center justify-between h-20">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex-shrink-0"
          aria-label="Mpohlo Holdings home"
        >
          <Logo
            variant="light"
            className="h-12 w-auto transition-transform hover:scale-105"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-gray-200 hover:text-gold-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA + phone */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${company.phoneRaw}`}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {company.phone}
          </a>
          <button onClick={onQualifyClick} className="btn-gold text-sm py-2.5 px-5">
            Check If You Qualify
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 bg-ink-900/98 backdrop-blur-md ${
          mobileOpen ? 'max-h-[600px] border-t border-ink-700' : 'max-h-0'
        }`}
      >
        <div className="container-luxe py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-3 px-4 text-gray-200 hover:text-gold-400 hover:bg-ink-800 rounded-lg transition-all font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href={`tel:${company.phoneRaw}`}
            className="flex items-center gap-2 py-3 px-4 text-gray-200 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {company.phone}
          </a>
          <button
            onClick={() => {
              setMobileOpen(false);
              onQualifyClick();
            }}
            className="btn-gold mt-2 w-full"
          >
            Check If You Qualify
          </button>
        </div>
      </div>
    </header>
  );
}
