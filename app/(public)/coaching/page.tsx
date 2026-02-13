'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const tiers = [
  {
    name: 'Foundational Coaching',
    subtitle: 'Build the base. Stabilize health. Create momentum.',
    desc: 'This tier focuses on the fundamentals that drive 80% of long-term results.',
    focus: { label: 'Core focus:', items: ['Intake', 'Physical Activity', 'Recovery'] },
    delivers: {
      label: 'What it delivers:', items: ['Clear nutrition & movement systems', 'Habit structure that sticks', 'Recovery and sleep optimization', 'Simple accountability & check-ins', 'Foundational testing where appropriate'],
    },
    bestFor: 'Building consistency, energy, body composition, and resilience without overwhelm.',
    highlight: false,
  },
  {
    name: 'Performance Coaching',
    subtitle: 'From healthy to high performing.',
    desc: 'This tier layers data, precision, and environmental design on top of the foundation.',
    focus: { label: 'Expanded focus:', items: ['Intake', 'Physical Activity', 'Recovery', 'Environment'] },
    delivers: {
      label: 'What it delivers:', items: ['Advanced diagnostics and data interpretation', 'Higher performance training systems', 'Lifestyle and workload optimization', 'Tighter feedback loops and adjustments', 'Deeper personalization'],
    },
    bestFor: 'People ready to operate at a consistently higher level physically, mentally, and professionally.',
    highlight: false,
  },
  {
    name: 'Elite Coaching',
    subtitle: 'The full performance department.',
    desc: 'This is not a program. It\'s a partnership.',
    focus: { label: 'All five domains fully integrated:', items: ['Intake', 'Physical Activity', 'Recovery', 'Environment', 'Inner Self'] },
    delivers: {
      label: 'What it delivers:', items: ['Comprehensive testing & continuous monitoring', 'Weekly system refinement', 'Unlimited communication', 'Performance strategy calls', 'Travel, workload, and life integration', 'Advanced diagnostics as needed'],
    },
    bestFor: 'Elite coaching mirrors how professional athletes are supported inside elite sport. Intentionally limited to protect quality and outcomes.',
    highlight: true,
  },
  {
    name: 'Maintenance & Optimization',
    subtitle: 'For high performers who have strong foundations and want to sustain results long-term.',
    desc: '',
    focus: { label: 'Focus:', items: ['Consistency without burnout', 'Ongoing accountability', 'Data-driven adjustments', 'Simple, sustainable execution'] },
    delivers: {
      label: 'Includes:', items: ['Monthly data & progress review', 'Simplified training & nutrition systems', 'Light check-ins', 'Ongoing optimization as life changes'],
    },
    bestFor: 'Goal: Keep performance high while life gets busy.',
    highlight: false,
  },
];

const chooseOptions = [
  { condition: 'Need structure and consistency', tier: 'Foundational' },
  { condition: 'Want higher output and precision', tier: 'Performance' },
  { condition: 'Want nothing left unexamined', tier: 'Elite' },
  { condition: 'Already doing well but need accountability', tier: 'Maintenance' },
];

const testimonialTabs = [
  {
    id: 'nfl',
    label: 'NFL Athletes',
    testimonials: [
      { badge: 'University of Oregon / NFL', text: '"I learned so much from Tik. Learning about my body and learning nutrition has been really beneficial for me coming from college. Learning different techniques to help my body perform better was awesome."', name: 'Shane Lemieux', role: 'University of Oregon / NFL' },
      { badge: '10 years in NFL', text: '"Pratik is hands down the best nutritionist and sport performance coach I\'ve been around in the 10 years I\'ve been in the NFL."', name: 'Rhett Ellison', role: 'NFL' },
      { badge: 'Best shape of career', text: '"I\'ve been working with Tik for over 2 years now. He\'s helped me increase my lean body mass and decrease my body fat percentage. I\'m in the best shape of my career."', name: 'Nate Solder', role: 'NFL' },
    ],
  },
  {
    id: 'college',
    label: 'College Athletes',
    testimonials: [
      { badge: '+14 lbs muscle, -4% body fat', text: '"In 3-4 months: up 14 pounds, down 4% body fat. Working with him gave me confidence—when you\'re working with Pratik, you know what you\'re doing is the right thing."', name: 'George Fulton', role: 'D1 Lacrosse, Virginia' },
      { badge: '3x client, PRs in every metric', text: '"It\'s the best money I spend every month. You have a friend in your corner, not just some coach checking boxes. I recommend you in a heartbeat."', name: 'Nima Movassaghi', role: 'D1 Tennis, Oregon' },
    ],
  },
  {
    id: 'executives',
    label: 'Executives',
    testimonials: [
      { badge: 'Best shape at 43', text: '"Every coach needs a coach. At 43, I\'m in the best shape of my life—12-14% body fat without starving myself. He\'s one of the best at what he does."', name: 'Erik Korem', role: 'CEO of AIM7, Former NFL Performance Director' },
      { badge: 'LDL under 100, no meds', text: '"We got my LDL under 100 without medications. He understands the South Asian environment and the challenges our population uniquely faces."', name: 'Dr. Hirsh Kaveeshvar', role: 'Neurologist & Business Owner' },
    ],
  },
  {
    id: 'south-asians',
    label: 'South Asians',
    testimonials: [
      { badge: 'Results in 4-6 weeks', text: '"He understood exactly what is in Indian cuisine... after about four to six weeks I saw immediate results with just dropping body fat. Things I\'d never been able to do during Iron Man training."', name: 'Shekar Sathyanarayana', role: 'Lawyer & Startup Founder' },
      { badge: 'Reversed diabetes', text: '"I\'m down 15 pounds. I\'m no longer diabetic. My A1C was so good they kicked me out of the office. He gives you straight answers, not the BS answer."', name: 'Robert Shahidi', role: 'Business Owner, Age 60' },
      { badge: '+22 lbs in first month', text: '"In the first month I gained 22 pounds of muscle mass. I went from 125 to 147. In the Indian community, there\'s not a lot of people encouraging us to build muscle—but it\'s possible."', name: 'Sunil Patel', role: 'CEO & Entrepreneur' },
    ],
  },
];

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState('nfl');
  const activeTestimonials = testimonialTabs.find((t) => t.id === activeTab)?.testimonials || [];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Coaching</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-white mb-6 leading-tight">
            The Four Levels of<br />1:1 Coaching
          </h1>
          <p className="text-secondary text-xl">Choose the level that matches where you are today.</p>
        </div>
      </section>

      {/* Coaching Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 border ${
                tier.highlight
                  ? 'bg-gradient-to-br from-accent/10 to-accent-secondary/10 border-accent/40'
                  : 'bg-card border-border'
              }`}
            >
              <h2 className={`font-display font-bold text-3xl mb-2 ${tier.highlight ? 'text-accent' : 'text-white'}`}>
                {tier.name}
              </h2>
              <p className="text-white font-semibold text-lg mb-2">{tier.subtitle}</p>
              {tier.desc && <p className="text-secondary mb-6">{tier.desc}</p>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-secondary text-sm font-semibold uppercase tracking-wide mb-3">{tier.focus.label}</h4>
                  <ul className="space-y-1">
                    {tier.focus.items.map((item) => (
                      <li key={item} className="text-white text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-secondary text-sm font-semibold uppercase tracking-wide mb-3">{tier.delivers.label}</h4>
                  <ul className="space-y-1">
                    {tier.delivers.items.map((item) => (
                      <li key={item} className="text-white text-sm flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-secondary text-sm font-semibold uppercase tracking-wide mb-3">Best for:</h4>
                  <p className="text-secondary text-sm">{tier.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-24 bg-card/30 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-4 text-center">How to Choose Your Level</h2>
          <p className="text-secondary text-lg mb-12 text-center">Start where your foundation is today.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {chooseOptions.map((opt) => (
              <div key={opt.condition} className="bg-card border border-border rounded-xl p-5">
                <p className="text-secondary">
                  {opt.condition} <span className="text-secondary mx-2">→</span>{' '}
                  <span className="text-white font-bold">{opt.tier}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary text-sm">Clients can progress between tiers as capacity and needs evolve.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">Results</p>
          <h2 className="font-display font-bold text-4xl text-white mb-12 text-center">
            Trusted by elite athletes, executives, and high performers
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {testimonialTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-card border border-border text-secondary hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTestimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <span className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-medium mb-4">
                  {t.badge}
                </span>
                <p className="text-secondary text-sm leading-relaxed mb-4 italic">{t.text}</p>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-secondary text-xs mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/30 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-4">Ready to start?</h2>
          <p className="text-secondary text-xl mb-10">Apply for coaching and we&apos;ll help you find the right level.</p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity"
          >
            Apply for Coaching <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
