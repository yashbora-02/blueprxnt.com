import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Blueprxnt System — Performance Health Operating System',
  description: 'Built on how elite athletes are developed inside professional sport. Five integrated domains run as one system.',
};

const healthItems = ['Strength and fitness', 'Fast recovery', 'Clear thinking', 'Stable energy', 'Emotional resilience', 'Long-term durability'];
const domains = [
  { num: '1', title: 'Intake', desc: 'Nutrition, hydration, and supplementation — everything entering your system', sub: 'Built for your physiology, culture, and lifestyle' },
  { num: '2', title: 'Physical Activity', desc: 'Training, daily movement, and mobility', sub: 'Designed to build capacity without unnecessary fatigue' },
  { num: '3', title: 'Recovery', desc: 'Sleep, stress regulation, and nervous system balance', sub: 'Where adaptation and progress actually happen' },
  { num: '4', title: 'Environment', desc: 'Your exposure landscape — home, work, social life, travel, routines, light, toxins, stress', sub: 'Designed to make execution easier, not harder' },
  { num: '5', title: 'Inner Self', desc: 'Mindset, identity, emotional regulation, and behavior patterns', sub: 'The foundation of consistency' },
];
const phases = [
  { num: 'Phase 1', title: 'Fundamentals', domains: 'Intake • Physical Activity • Recovery', points: ['Stabilize energy', 'Restore capacity', 'Build momentum'] },
  { num: 'Phase 2', title: 'Context', domains: 'Environment', points: ['Reduce friction', 'Design routines', 'Make progress automatic'] },
  { num: 'Phase 3', title: 'Identity', domains: 'Inner Self', points: ['Health becomes who you are — not something you try to do'] },
];
const leads = [
  { title: 'Clarity', desc: 'instead of confusion' },
  { title: 'Structure', desc: 'instead of guesswork' },
  { title: 'Capacity', desc: 'instead of burnout' },
  { title: 'A system', desc: 'instead of another attempt' },
];

export default function SystemPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">The Blueprxnt System</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-white mb-6 leading-tight">
            Not wellness.<br />Not medicine.
          </h1>
          <p className="text-secondary text-xl mb-6">Those models focus on managing risk and optimizing markers.</p>
          <div className="inline-block bg-card border border-border rounded-2xl p-8 text-left max-w-2xl mx-auto">
            <p className="text-white font-semibold text-lg mb-4">
              Blueprxnt is built on how elite athletes are actually developed and sustained inside professional sport.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Integrated performance departments', 'Continuous assessment', 'System-level execution'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-border text-secondary text-sm">{tag}</span>
              ))}
            </div>
          </div>
          <p className="text-secondary text-lg mt-8">This is the missing layer no one else has applied to real life.</p>
        </div>
      </section>

      {/* Core Principle */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-8">The Core Principle</h2>
          <p className="text-2xl text-white font-semibold mb-6">You don&apos;t earn optimization until fundamentals are solid.</p>
          <p className="text-secondary text-lg mb-4">In elite performance environments, advanced tools come after the base is built — never before.</p>
          <p className="text-secondary text-lg mb-10">Most people skip fundamentals chasing faster results. That shortcut is exactly why progress doesn&apos;t last.</p>
          <div className="bg-card border border-accent/20 rounded-2xl p-8">
            <p className="text-white text-xl font-semibold mb-2">Health without performance is fragile.</p>
            <p className="text-accent text-xl font-bold">Performance without health doesn&apos;t last.</p>
          </div>
        </div>
      </section>

      {/* Foundational Equation */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-8">The Foundational Equation</h2>
          <div className="bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/30 rounded-2xl p-8 mb-8">
            <p className="font-display font-bold text-2xl lg:text-3xl text-white">
              Health = Capacity for Adaptation − Stressors
            </p>
          </div>
          <p className="text-secondary text-lg mb-12">Health isn&apos;t the absence of stress. It&apos;s your ability to adapt to it.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border rounded-2xl p-8 text-left">
              <h3 className="font-display font-bold text-2xl text-accent mb-3">Capacity</h3>
              <p className="text-secondary">Your ability to recover, respond, and grow stronger</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-left">
              <h3 className="font-display font-bold text-2xl text-white mb-3">Stressors</h3>
              <p className="text-secondary mb-3">The cumulative load from:</p>
              <ul className="space-y-1">
                {['Training and physical demands', 'Work and psychological stress', 'Poor sleep and recovery', 'Inflammation and metabolic strain', 'Environmental exposures', 'Travel and lifestyle pressures'].map((s) => (
                  <li key={s} className="text-secondary text-sm flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-white text-lg mb-4">When stress exceeds capacity, symptoms appear: fatigue, brain fog, stalled progress, injury, burnout.</p>
          <p className="text-secondary text-lg">Blueprxnt increases capacity while strategically reducing unnecessary stressors. That&apos;s sustainable health.</p>
        </div>
      </section>

      {/* Performance Framework */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-12">The Performance Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="font-display font-bold text-xl text-white mb-3">Performance = Capacity − Fatigue</p>
              <p className="text-secondary">Build what you can do. Reduce what holds you back.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="font-display font-bold text-xl text-white mb-3">Growth = Stress + Recovery</p>
              <p className="text-secondary">Stress drives adaptation. Recovery makes it stick.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 text-center">
              <p className="text-white font-semibold">Stress without recovery</p>
              <p className="text-red-400 font-bold mt-1">= breakdown</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 text-center">
              <p className="text-white font-semibold">Recovery without stress</p>
              <p className="text-amber-400 font-bold mt-1">= stagnation</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
              <p className="text-white font-semibold">Together</p>
              <p className="text-accent font-bold mt-1">= progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Performance Health Means */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">What Performance Health Means</h2>
          <p className="text-secondary text-lg mb-12">Performance Health isn&apos;t about chasing lab markers. It&apos;s about functioning at a high level in real life:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {healthItems.map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-5 flex items-center gap-3">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-white text-lg font-semibold">
            This is what elite athletes are engineered for — and what Blueprxnt brings to real life.
          </p>
        </div>
      </section>

      {/* The Five Domains */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-bold text-4xl text-white mb-4 text-center">The Five Domains</h2>
          <p className="text-secondary text-lg mb-12 text-center">The Blueprxnt System is built across five integrated areas:</p>
          <div className="space-y-4">
            {domains.map((d) => (
              <div key={d.num} className="bg-card border border-border rounded-2xl p-7">
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  <span className="text-accent mr-2">{d.num}.</span>{d.title}
                </h3>
                <p className="text-secondary mb-2">{d.desc}</p>
                <p className="text-secondary/70 text-sm italic">{d.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white font-semibold text-lg mt-10">
            These aren&apos;t separate.<br />They function as one integrated system.
          </p>
        </div>
      </section>

      {/* Sequencing */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-bold text-4xl text-white mb-4 text-center">How the System Is Sequenced</h2>
          <p className="text-secondary text-lg mb-12 text-center">Just like elite athletes, not everything is optimized at once.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((p) => (
              <div key={p.num} className="bg-card border border-border rounded-2xl p-7">
                <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-bold tracking-widest uppercase mb-4">
                  {p.num}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{p.title}</h3>
                <p className="text-accent text-sm font-medium mb-4">{p.domains}</p>
                <ul className="space-y-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-secondary text-sm flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where This Leads */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Where This Leads</h2>
          <p className="text-secondary text-lg mb-12">Blueprxnt gives you:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {leads.map((l) => (
              <div key={l.title} className="bg-card border border-border rounded-2xl p-6 text-center">
                <h3 className="font-display font-bold text-xl text-white mb-2">{l.title}</h3>
                <p className="text-secondary text-sm">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">
            Ready to see how coaching runs the system in real life?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/coaching" className="px-8 py-4 rounded-xl text-base font-semibold text-white border border-border hover:border-accent transition-colors">
              Explore Coaching
            </Link>
            <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity">
              Apply for Coaching <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
