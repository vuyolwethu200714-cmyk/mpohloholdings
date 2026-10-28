import { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Coins,
  CreditCard,
  MessageSquare,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  provinces,
  employmentStatuses,
  contactMethods,
  contactTimes,
  company,
} from '@/data/company';

type QualificationFormProps = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  employment: string;
  income: string;
  debtRepayments: string;
  contactMethod: string;
  bestTime: string;
  consent: boolean;
};

const initialData: FormData = {
  fullName: '',
  phone: '',
  email: '',
  province: '',
  employment: '',
  income: '',
  debtRepayments: '',
  contactMethod: '',
  bestTime: '',
  consent: false,
};

const steps = [
  { title: 'About You', icon: User },
  { title: 'Your Situation', icon: Briefcase },
  { title: 'Contact Preferences', icon: MessageSquare },
];

export default function QualificationForm({ open, onClose }: QualificationFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!open) return null;

  const update = (field: keyof FormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return data.fullName.trim() && data.phone.trim() && data.email.trim();
    if (step === 1) return data.province && data.employment && data.income && data.debtRepayments;
    if (step === 2) return data.contactMethod && data.bestTime && data.consent;
    return false;
  };

  const handleSubmit = async () => {
    setSending(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'Confidential qualification assessment' }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not send your assessment. Please try again.');
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your assessment. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    setData(initialData);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-ink-900 px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/mpohlo-holdings-logo.png" alt="Mpohlo Holdings" className="h-10 w-auto max-w-[125px] object-contain" />
            <div className="h-9 w-px bg-white/20" />
            <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Check If You Qualify
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Confidential, no obligation assessment
            </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full bg-gold-50 border-2 border-gold-500 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <Check className="w-10 h-10 text-gold-600" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-ink-900 mb-4">
                Thank You
              </h4>
              <p className="text-ink-500 leading-relaxed mb-8">
                Your confidential assessment has been received. A Mpohlo
                Holdings consultant will contact you shortly.
              </p>
              <button onClick={handleClose} className="btn-dark">
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="px-6 pt-5 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center flex-1">
                      <div
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          i <= step ? 'text-gold-600' : 'text-ink-300'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            i < step
                              ? 'bg-gold-500 border-gold-500 text-ink-900'
                              : i === step
                                ? 'border-gold-500 text-gold-600'
                                : 'border-ink-200 text-ink-300'
                          }`}
                        >
                          {i < step ? <Check className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className="text-xs font-medium hidden sm:block">
                          {s.title}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`h-0.5 flex-grow mx-2 rounded-full transition-all duration-300 ${
                            i < step ? 'bg-gold-500' : 'bg-ink-100'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form body */}
            <div className="px-6 pb-6 overflow-y-auto flex-grow">
              {step === 0 && (
                <div className="space-y-5 animate-fade-in">
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
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Province <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <select
                        value={data.province}
                        onChange={(e) => update('province', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none bg-white"
                      >
                        <option value="">Select your province</option>
                        {provinces.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Employment Status <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <select
                        value={data.employment}
                        onChange={(e) => update('employment', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none bg-white"
                      >
                        <option value="">Select your status</option>
                        {employmentStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Approximate Monthly Income{' '}
                      <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <input
                        type="text"
                        value={data.income}
                        onChange={(e) => update('income', e.target.value)}
                        placeholder="e.g. R 15,000"
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Approximate Total Monthly Debt Repayments{' '}
                      <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <input
                        type="text"
                        value={data.debtRepayments}
                        onChange={(e) => update('debtRepayments', e.target.value)}
                        placeholder="e.g. R 8,000"
                        className="w-full pl-11 pr-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Preferred Contact Method{' '}
                      <span className="text-gold-600">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactMethods.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => update('contactMethod', m)}
                          className={`py-3 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            data.contactMethod === m
                              ? 'border-gold-500 bg-gold-50 text-gold-700'
                              : 'border-ink-200 text-ink-500 hover:border-gold-300'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700 mb-2">
                      Best Time to Contact You{' '}
                      <span className="text-gold-600">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
                      <select
                        value={data.bestTime}
                        onChange={(e) => update('bestTime', e.target.value)}
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
                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-ink-50 rounded-lg border border-ink-100 hover:border-gold-300 transition-all">
                      <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="mt-0.5 w-5 h-5 accent-gold-500 flex-shrink-0"
                      />
                      <span className="text-sm text-ink-600 leading-relaxed">
                        I consent to Mpohlo Holdings contacting me about my
                        enquiry. My information will be handled confidentially
                        and in accordance with POPIA.
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-400">
                    <ShieldCheck className="w-4 h-4 text-gold-500" />
                    Your information is kept confidential and used only for the
                    purpose of your enquiry.
                  </div>
                </div>
              )}
            </div>

            {submitError && <div role="alert" className="mx-6 mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>}
            {/* Footer buttons */}
            <div className="px-6 py-4 border-t border-ink-100 flex items-center justify-between flex-shrink-0 bg-ink-50/50">
              <button
                onClick={() => (step > 0 ? setStep(step - 1) : handleClose())}
                className="flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {step > 0 ? 'Back' : 'Cancel'}
              </button>
              {step < 2 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || sending}
                  className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {sending ? 'Sending securely…' : 'Submit Assessment'}
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
