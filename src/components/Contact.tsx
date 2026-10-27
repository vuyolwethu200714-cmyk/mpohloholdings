import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  User,
  MessageSquare,
  BadgeCheck,
} from 'lucide-react';
import { company } from '@/data/company';

export default function Contact() {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Demo submission — ready for future integration with email, WhatsApp, or Supabase.
    console.log('Contact form submission:', data);
    setSubmitted(true);
  };

  const canSubmit = data.fullName.trim() && data.email.trim() && data.phone.trim() && data.message.trim();

  const contactItems = [
    {
      icon: Phone,
      label: 'Telephone',
      value: company.phone,
      href: `tel:${company.phoneRaw}`,
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: company.whatsapp,
      href: `https://wa.me/${company.whatsappRaw}?text=${encodeURIComponent(company.whatsappMessage)}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: MapPin,
      label: 'Service Area',
      value: company.address,
      href: '#map',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-ink-50/50">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
            <span className="text-sm font-semibold tracking-wide uppercase">
              Contact Us
            </span>
          </div>
          <h2 className="section-title">
            Get in Touch <span className="text-gold-600">Today</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="section-subtitle mx-auto">
            Whether you are ready to start your assessment or simply have a
            question, we are here to help. Reach out through whichever method
            suits you best.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div className="reveal space-y-6">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith('http');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="card-luxe p-5 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-50 border border-gold-200 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-gold-500 group-hover:border-gold-500">
                      <Icon className="w-5 h-5 text-gold-600 transition-colors duration-300 group-hover:text-ink-900" />
                    </div>
                    <div className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-ink-900">
                      {item.value}
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Business hours */}
            <div className="card-luxe p-5">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-gold-600" />
                <span className="text-sm font-semibold text-ink-900">
                  Business Hours
                </span>
              </div>
              <p className="text-sm text-ink-500">
                {company.hoursDays} · {company.hours}
              </p>
            </div>

            {/* NCR registration */}
            <div className="card-luxe p-5 bg-ink-900 border-ink-900">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-gold-500" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    NCR Registered
                  </div>
                  <div className="text-sm text-gray-400">
                    Registration Number: {company.ncrNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div id="map" className="card-luxe overflow-hidden">
              <div className="relative h-56 bg-ink-100 flex items-center justify-center">
                <iframe
                  title="Mpohlo Holdings location map"
                  src="https://www.google.com/maps?q=Pietermaritzburg,KwaZulu-Natal,South+Africa&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="card-luxe p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gold-50 border-2 border-gold-500 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <Check className="w-10 h-10 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink-900 mb-3">
                    Message Sent
                  </h3>
                  <p className="text-ink-500 leading-relaxed mb-6">
                    Thank you for reaching out. A Mpohlo Holdings consultant
                    will respond to your enquiry shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setData({ fullName: '', email: '', phone: '', message: '' });
                    }}
                    className="text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
                    Send Us a Message
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Full Name <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Email Address <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Phone Number <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="e.g. 082 123 4567"
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Message <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-ink-300" />
                      <textarea
                        value={data.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
