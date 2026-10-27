import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '@/data/company';

type FAQProps = {
  onQualifyClick: () => void;
};

export default function FAQ({ onQualifyClick }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="section-title">
            Questions? <span className="text-gold-600">We Have Answers</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" />
          <p className="section-subtitle mx-auto">
            Here are answers to some of the most common questions about debt
            review. If you have a question that is not listed, please contact
            us — we are happy to help.
          </p>
        </div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal card-luxe overflow-hidden"
              style={{ transitionDelay: `${(i % 4) * 50}ms` }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-serif text-base lg:text-lg font-semibold text-ink-900">
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === i
                      ? 'bg-gold-500 text-ink-900 rotate-180'
                      : 'bg-ink-50 text-ink-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <div className="h-px bg-ink-100 mb-4" />
                  <p className="text-ink-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <p className="text-ink-400 mb-4">
            Still have questions? We are here to help.
          </p>
          <button onClick={onQualifyClick} className="btn-gold-outline">
            Speak to a Consultant
          </button>
        </div>
      </div>
    </section>
  );
}
