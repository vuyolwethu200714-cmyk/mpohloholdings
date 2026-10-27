import { HeartHandshake, ArrowRight } from 'lucide-react';
import { images } from '@/data/company';

type NotAloneProps = {
  onQualifyClick: () => void;
};

export default function NotAlone({ onQualifyClick }: NotAloneProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-ink-50/50">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={images.familySofa}
                alt="A happy family relaxing together at home"
                className="w-full h-[400px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent" />
            </div>
            {/* Gold frame accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500 rounded-br-2xl" />
          </div>

          {/* Content */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
              <HeartHandshake className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                You Are Not Alone
              </span>
            </div>
            <h2 className="section-title mb-6">
              Asking for Help Is the First Step Towards{' '}
              <span className="text-gold-600">Taking Back Control</span>
            </h2>
            <p className="text-ink-500 text-lg leading-relaxed mb-6">
              Many South Africans find it difficult to keep up with monthly
              repayments at some point in their lives. Whether the cause is
              unexpected expenses, changes in income, or simply the rising cost
              of living, financial pressure can affect anyone.
            </p>
            <p className="text-ink-500 text-lg leading-relaxed mb-8">
              Reaching out for support is not a sign of failure — it is a
              practical, responsible decision. At Mpohlo Holdings, we provide
              confidential guidance to help you understand your options and
              take meaningful steps towards a more manageable financial future.
            </p>
            <button onClick={onQualifyClick} className="btn-gold-outline">
              Take the First Step Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
