import { useState } from 'react';
import { MessageSquare, Send, Star } from 'lucide-react';
import { company } from '@/data/company';

export default function ShareYourStory() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const canSubmit = name.trim() && message.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    const stars = '★'.repeat(rating);
    const text = `Hello Mpohlo Holdings, I would like to share my testimonial.\n\nName: ${name}\nRating: ${stars} (${rating}/5)\n\nMy experience:\n${message}`;
    const url = `https://wa.me/${company.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="share-your-story" className="py-20 lg:py-28 bg-gold-50/40">
      <div className="container-luxe">
        <div className="max-w-2xl mx-auto reveal">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
              <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Share Your Story
              </span>
            </div>
            <h2 className="section-title">
              Tell Us About Your <span className="text-gold-600">Experience</span>
            </h2>
            <div className="gold-divider mx-auto mt-6" />
            <p className="section-subtitle mx-auto">{company.testimonialIntro}</p>
          </div>

          <div className="card-luxe p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">
                  Your Name <span className="text-gold-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">
                  How would you rate us?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                      aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          n <= (hoverRating || rating)
                            ? 'fill-gold-500 text-gold-500'
                            : 'text-ink-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">
                  Your Testimonial <span className="text-gold-600">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-ink-300" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share how Mpohlo Holdings helped you..."
                    rows={5}
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
                Send Testimonial via WhatsApp
              </button>

              <p className="text-xs text-ink-400 text-center leading-relaxed">
                Your testimonial will be sent to Mpohlo Holdings via WhatsApp.
                We will contact you before publishing your story on our website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
