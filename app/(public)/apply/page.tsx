'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 7;

type FormData = {
  fullName: string; email: string; phone: string; age: string; height: string; weight: string; occupation: string;
  goals: string; obstacles: string; urgency: string;
  consistency: string;
  priorities: string[];
  commitment: string;
  investment: string;
  readiness: string;
};

const initial: FormData = {
  fullName: '', email: '', phone: '', age: '', height: '', weight: '', occupation: '',
  goals: '', obstacles: '', urgency: '',
  consistency: '',
  priorities: [],
  commitment: '',
  investment: '',
  readiness: '',
};

const priorityOptions = [
  { value: 'fat-loss', label: 'Fat loss / body composition' },
  { value: 'muscle-strength', label: 'Muscle & strength' },
  { value: 'fitness', label: 'Fitness & conditioning' },
  { value: 'energy', label: 'Energy levels' },
  { value: 'sleep', label: 'Sleep & recovery' },
  { value: 'stress', label: 'Stress management' },
  { value: 'focus', label: 'Focus & productivity' },
  { value: 'longevity', label: 'Long-term health & aging' },
];

const inputClass = 'w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';
const textareaClass = inputClass + ' resize-none';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const togglePriority = (value: string) => {
    setForm((prev) => {
      const has = prev.priorities.includes(value);
      if (!has && prev.priorities.length >= 3) return prev;
      return { ...prev, priorities: has ? prev.priorities.filter((p) => p !== value) : [...prev.priorities, value] };
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), { ...form, createdAt: serverTimestamp() });
      router.push('/apply/success');
    } catch {
      alert('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const RadioGroup = ({ name, options, value }: { name: keyof FormData; options: { value: string; label: string }[]; value: string }) => (
    <div className="space-y-3">
      {options.map((opt) => (
        <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${value === opt.value ? 'border-accent bg-accent/10' : 'border-border bg-background hover:border-secondary'}`}>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${value === opt.value ? 'border-accent' : 'border-border'}`}>
            {value === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
          </div>
          <span className="text-white text-sm">{opt.label}</span>
          <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => update(name, opt.value)} className="sr-only" />
        </label>
      ))}
    </div>
  );

  return (
    <>
      <section className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-4xl text-white mb-2">Blueprxnt Coaching Application</h1>
            <p className="text-secondary">Complete this application so we can find the right coaching fit for you.</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-secondary mb-2">
              <span>Step {step} of {TOTAL_STEPS}</span>
              <span>{progress}% complete</span>
            </div>
            <div className="h-1.5 bg-card rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-card border border-border rounded-2xl p-8">

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Basic Information</h2>
                  <div>
                    <label className="block text-sm text-secondary mb-2">Full Name *</label>
                    <input type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required placeholder="John Doe" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-secondary mb-2">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="john@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm text-secondary mb-2">Phone Number *</label>
                      <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="+1 (555) 000-0000" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-secondary mb-2">Age *</label>
                      <input type="number" value={form.age} onChange={(e) => update('age', e.target.value)} required placeholder="35" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm text-secondary mb-2">Height *</label>
                      <input type="text" value={form.height} onChange={(e) => update('height', e.target.value)} required placeholder="5ft 10 / 178cm" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm text-secondary mb-2">Weight (lbs) *</label>
                      <input type="number" value={form.weight} onChange={(e) => update('weight', e.target.value)} required placeholder="180" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-2">Occupation / Where do you live? *</label>
                    <textarea value={form.occupation} onChange={(e) => update('occupation', e.target.value)} required rows={3} placeholder="E.g., Software Engineer, remote, based in Austin, TX" className={textareaClass} />
                  </div>
                </div>
              )}

              {/* Step 2: Goals */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Goals & Readiness</h2>
                  <div>
                    <label className="block text-sm text-secondary mb-2">What are your main health/fitness goals right now? *</label>
                    <textarea value={form.goals} onChange={(e) => update('goals', e.target.value)} required rows={4} placeholder="Describe your health and performance goals..." className={textareaClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-2">What&apos;s been the biggest obstacle holding you back? *</label>
                    <textarea value={form.obstacles} onChange={(e) => update('obstacles', e.target.value)} required rows={4} placeholder="What has prevented you from reaching your goals?" className={textareaClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-2">Why is solving this important to you now? *</label>
                    <textarea value={form.urgency} onChange={(e) => update('urgency', e.target.value)} required rows={4} placeholder="What's driving you to make a change right now?" className={textareaClass} />
                  </div>
                </div>
              )}

              {/* Step 3: Current State */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Current State</h2>
                  <label className="block text-sm text-secondary mb-4">How would you describe your current nutrition & training consistency? *</label>
                  <RadioGroup name="consistency" value={form.consistency} options={[
                    { value: 'very-consistent', label: 'Very consistent' },
                    { value: 'somewhat-consistent', label: 'Somewhat consistent' },
                    { value: 'inconsistent', label: 'Inconsistent' },
                    { value: 'just-starting', label: 'Just getting started' },
                  ]} />
                </div>
              )}

              {/* Step 4: Priorities */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-2">Priorities</h2>
                  <p className="text-secondary text-sm mb-6">Select up to 3 areas that matter most to you right now. ({form.priorities.length}/3 selected)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {priorityOptions.map((opt) => {
                      const selected = form.priorities.includes(opt.value);
                      const disabled = !selected && form.priorities.length >= 3;
                      return (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selected ? 'border-accent bg-accent/10' : disabled ? 'border-border bg-background opacity-40 cursor-not-allowed' : 'border-border bg-background hover:border-secondary'}`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-accent bg-accent' : 'border-border'}`}>
                            {selected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth={3} /></svg>}
                          </div>
                          <span className="text-white text-sm">{opt.label}</span>
                          <input type="checkbox" checked={selected} onChange={() => !disabled && togglePriority(opt.value)} className="sr-only" />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Commitment */}
              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Commitment</h2>
                  <label className="block text-sm text-secondary mb-4">How serious are you about improving your health right now? *</label>
                  <RadioGroup name="commitment" value={form.commitment} options={[
                    { value: '10', label: '10/10 — ready to take action immediately' },
                    { value: '7-8', label: '7–8/10 — motivated but need structure/accountability' },
                    { value: '5-6', label: '5–6/10 — interested but still exploring' },
                    { value: 'not-sure', label: 'Not sure yet' },
                  ]} />
                </div>
              )}

              {/* Step 6: Investment */}
              {step === 6 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Investment & Path</h2>
                  <label className="block text-sm text-secondary mb-4">What level of investment are you prepared to make in your health? *</label>
                  <RadioGroup name="investment" value={form.investment} options={[
                    { value: 'foundational', label: 'Foundational — building fundamentals' },
                    { value: 'performance', label: 'Performance — next level execution' },
                    { value: 'elite', label: 'Elite — full system, no compromises' },
                    { value: 'maintenance', label: 'Maintenance — sustaining strong results' },
                    { value: 'not-sure', label: 'Not sure — help me figure it out' },
                  ]} />
                </div>
              )}

              {/* Step 7: Final Readiness */}
              {step === 7 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Final Readiness Check</h2>
                  <label className="block text-sm text-secondary mb-4">If accepted, are you ready to start within the next 2 weeks? *</label>
                  <RadioGroup name="readiness" value={form.readiness} options={[
                    { value: 'yes', label: 'Yes — ready to go' },
                    { value: 'need-2-4-weeks', label: 'Need 2–4 weeks' },
                    { value: 'month-plus', label: 'A month or more' },
                    { value: 'exploring', label: 'Still exploring options' },
                  ]} />
                </div>
              )}

              {/* Navigation */}
              <div className={`flex mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                {step > 1 && (
                  <button type="button" onClick={back} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-secondary border border-border hover:text-white hover:border-secondary transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
                {step < TOTAL_STEPS ? (
                  <button type="button" onClick={next} className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={submitting} className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Application'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
