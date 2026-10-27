import { useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import { company, legalDocuments } from '@/data/company';

type LegalPageProps = {
  activeId: string;
  onBack: () => void;
};

export default function LegalPage({ activeId, onBack }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeId]);

  const active =
    legalDocuments.find((d) => d.id === activeId) ?? legalDocuments[0];

  return (
    <div className="min-h-screen bg-ink-950 text-gray-300">
      {/* Header */}
      <header className="bg-ink-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-ink-800">
        <div className="container-luxe flex items-center justify-between h-20">
          <Logo variant="light" className="h-12 w-auto" />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="container-luxe py-16 lg:py-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 self-start">
            <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-500 mb-5">
              Legal &amp; Compliance
            </h2>
            <nav className="flex flex-col gap-1">
              {legalDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    const el = document.getElementById(doc.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active.id === doc.id
                      ? 'bg-ink-800 text-gold-400 border-l-2 border-gold-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-ink-800/50'
                  }`}
                >
                  {doc.title}
                </button>
              ))}
            </nav>

            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 bg-ink-800 border border-ink-700 rounded-full">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span className="text-xs font-medium text-gray-300">
                NCR {company.ncrNumber}
              </span>
            </div>
          </aside>

          {/* Document */}
          <article className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {active.title}
            </h1>
            <div className="h-1 w-20 bg-gold-500 rounded-full mb-8" />
            <p className="text-base sm:text-lg leading-relaxed text-gray-400 mb-12">
              {active.text}
            </p>

            {/* All sections for scroll navigation */}
            <div className="space-y-12">
              {legalDocuments
                .filter((d) => d.id !== active.id)
                .map((doc) => (
                  <section
                    key={doc.id}
                    id={doc.id}
                    className="scroll-mt-28 border-t border-ink-800 pt-8"
                  >
                    <button
                      onClick={() => {
                        const el = document.getElementById(doc.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="font-serif text-xl font-bold text-white hover:text-gold-400 transition-colors mb-3 text-left"
                    >
                      {doc.title}
                    </button>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {doc.text}
                    </p>
                  </section>
                ))}
            </div>

            <div className="mt-16 pt-8 border-t border-ink-800">
              <button
                onClick={onBack}
                className="btn-gold-outline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t border-ink-800 py-8">
        <div className="container-luxe text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
