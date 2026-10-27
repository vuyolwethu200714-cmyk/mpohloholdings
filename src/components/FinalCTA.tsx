import { ArrowRight } from 'lucide-react';
import { company } from '@/data/company';

type FinalCTAProps = {
  onQualifyClick: () => void;
};

export default function FinalCTA({ onQualifyClick }: FinalCTAProps) {
  const whatsappHref = `https://wa.me/${company.whatsappRaw}?text=${encodeURIComponent(company.whatsappMessage)}`;

  return (
    <section className="py-24 lg:py-32 bg-ink-900 relative overflow-hidden">
      {/* Decorative gold elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />

      {/* Gold border accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="container-luxe relative z-10">
        <div className="reveal text-center max-w-3xl mx-auto">
          {/* Decorative icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/30 mb-8">
            <svg
              className="w-8 h-8 text-gold-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h8M12 8v8M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            A More Manageable Financial Future
            <br />
            Can Start With{' '}
            <span className="text-gold-gradient">One Conversation</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Contact Mpohlo Holdings for confidential guidance tailored to your
            circumstances. There is no obligation — just a conversation to help
            you understand your options.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onQualifyClick} className="btn-gold">
              Start My Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-gold-500 text-gold-500 font-semibold rounded-lg transition-all duration-300 hover:bg-gold-500 hover:text-ink-900 hover:shadow-xl hover:shadow-gold-500/20 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1 1.016-1 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
