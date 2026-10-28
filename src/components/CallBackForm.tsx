import { useState } from 'react';
import { User, Phone, Clock, MessageSquare, Check, Send } from 'lucide-react';
import { contactTimes } from '@/data/company';

export default function CallBackForm() {
  const [data, setData] = useState({
    fullName: '',
    phone: '',
    callBackTime: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const update = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSending(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'Call-back request' }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.');
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your request. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const canSubmit = data.fullName.trim() && data.phone.trim() && data.callBackTime;

  return (
    <section id="call-back" className="py-20 lg:py-28 bg-white">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-gold-600 mb-4">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Request a Call Back
              </span>
            </div>
            <h2 className="section-title mb-6">
              Let Us Help You{' '}
              <span className="text-gold-600">Understand Your Options</span>
            </h2>
            <p className="text-ink-500 text-lg leading-relaxed mb-8">
              Prefer to have a consultant call you? Simply fill in the form and
              we will contact you at your preferred time. There is no
              obligation — this is an opportunity to ask questions and explore
              what might work for your situation.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold-600" />
                </div>
                <p className="text-sm text-ink-500">
                  No pressure — just a conversation about your circumstances.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold-600" />
                </div>
                <p className="text-sm text-ink-500">
                  Your details are kept confidential at all times.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold-600" />
                </div>
                <p className="text-sm text-ink-500">
                  We will call at a time that suits you.
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="card-luxe p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gold-50 border-2 border-gold-500 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <Check className="w-10 h-10 text-gold-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink-900 mb-3">
                    Thank You
                  </h3>
                  <p className="text-ink-500 leading-relaxed mb-6">
                    Your call back request has been received. A Mpohlo Holdings
                    consultant will contact you at your preferred time.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setData({ fullName: '', phone: '', callBackTime: '', message: '' });
                    }}
                    className="text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/mpohlo-holdings-logo.png" alt="Mpohlo Holdings" className="h-12 w-auto max-w-[150px] object-contain" />
                    <div className="h-9 w-px bg-ink-200" />
                    <div className="text-xs text-ink-500">Confidential<br />Call-back Request</div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
                    Request Your Call Back
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
                      Preferred Call Back Time{' '}
                      <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <select
                        value={data.callBackTime}
                        onChange={(e) => update('callBackTime', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none bg-white"
                      >
                        <option value="">Select a preferred time</option>
                        {contactTimes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Short Message{' '}
                      <span className="text-ink-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-ink-300" />
                      <textarea
                        value={data.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="Tell us briefly how we can help"
                        rows={3}
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                  {submitError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || sending}
                    className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Send className="w-5 h-5" />
                    {sending ? 'Sending securely…' : 'Request Call Back'}
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
