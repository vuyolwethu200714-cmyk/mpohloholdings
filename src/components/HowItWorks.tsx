import { CheckCircle, ArrowRight } from 'lucide-react';
import { processSteps, images } from '@/data/company';

type HowItWorksProps = {
  onQualifyClick: () => void;
};

export default function HowItWorks({ onQualifyClick }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-ink-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container-luxe relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
            <span className="text-sm font-semibold tracking-wide uppercase">
              The Process
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            How Debt Review Works
          </h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="text-gray-400 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
            Each client's situation is assessed individually. The following
            steps outline the general debt review process — your journey may
            vary based on your specific circumstances.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((step, i) => (
            <div
              key={step.num}
              className="reveal relative bg-ink-800/50 border border-ink-700 rounded-2xl p-7 group hover:border-gold-500/50 transition-all duration-300"
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              {/* Number */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-xl font-bold text-ink-900">
                    {step.num}
                  </span>
                </div>
                <div className="h-px flex-grow bg-gradient-to-r from-gold-500/50 to-transparent" />
              </div>
              {/* Title */}
              <h3 className="font-serif text-lg font-bold text-white mb-3 leading-snug">
                {step.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="reveal mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8 italic">
            Each client's situation is assessed individually. No specific
            outcome is guaranteed — the process and timeline depend on your
            unique financial circumstances.
          </p>
          <button onClick={onQualifyClick} className="btn-gold">
            Start Your Confidential Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
