import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "About — Pratik Patel | Blueprxnt",
  description: "I didn't start healthy. I earned it. The story of Blueprxnt and its founder.",
};

const stats = [
  { num: '2', label: 'NFL All-Pros' },
  { num: '8', label: 'Pro Bowlers' },
  { num: '33', label: 'NFL Draft Picks (7 First-Rounders)' },
  { num: '7', label: 'NBA Draft Picks' },
  { num: '3', label: 'PGA Tour Players' },
  { num: '3', label: 'USATF Olympians' },
  { num: '18', label: 'Conference Championships' },
  { num: '11', label: 'National Championships' },
];

const certs = [
  { title: 'Registered Dietitian (RD)', org: 'Academy of Nutrition and Dietetics' },
  { title: 'Certified Strength & Conditioning Specialist (CSCS)', org: 'NSCA' },
  { title: "Bachelor's in Dietetics", org: 'Kansas State University' },
  { title: "Master's in Kinesiology", org: 'Kansas State University' },
];

const workedItems = [
  'Simple, consistent training',
  'Daily walks',
  'Prioritizing sleep and recovery',
  'Tracking data, not chasing trends',
  'Mastering my environment and mindset',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-display font-black text-5xl lg:text-6xl text-white mb-6 leading-tight">
                I Didn&apos;t Start Healthy.{' '}
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  I Earned It.
                </span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed">
                I wasn&apos;t always fit, confident, or comfortable in my own body. As a first-generation Indian-American, I grew up overweight, struggling with self-esteem, and constantly comparing myself to others. No matter how hard I trained or how disciplined I tried to be, my &ldquo;skinny-fat&rdquo; build and genetics always seemed to hold me back. The gap between where I was and where I wanted to be — physically, mentally, and socially — stuck with me for years.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-border">
                <Image src="/images/Headshot.jpg" alt="Pratik Patel" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing Up */}
      <section className="py-24 bg-card/30 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-6">Growing Up Indian in America</h2>
          <p className="text-secondary text-lg mb-6">
            Sports were my passion, but I rarely saw anyone who looked like me succeed at the highest level. Professional athletics weren&apos;t in the cards, so I chose a different path: coaching. I earned two performance degrees from Kansas State University and worked my way into elite environments — Michigan State, the University of Oregon (competing for a National Championship), and the New York Giants in the NFL.
          </p>
          <p className="text-secondary text-lg mb-10">
            What set me apart wasn&apos;t just credentials. It was my drive to see the whole system, not just the parts, and to challenge conventional thinking long before it was mainstream.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/Skinny Fat.jpeg', caption: 'Skinny Fat' },
              { src: '/images/Dislocated Elbow.JPG', caption: 'Dislocated Elbow' },
              { src: '/images/Progress.jpeg', caption: 'Progress' },
              { src: '/images/Progress 2.jpeg', caption: 'Progress 2' },
            ].map((img) => (
              <div key={img.caption} className="rounded-xl overflow-hidden border border-border">
                <div className="relative aspect-square">
                  <Image src={img.src} alt={img.caption} fill className="object-cover" />
                </div>
                <p className="text-secondary text-xs text-center py-2">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-12">Credentials & Recognition</h2>

          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-6">Athletes I&apos;ve Worked With</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center">
                <p className="font-display font-black text-4xl text-accent mb-1">{s.num}</p>
                <p className="text-secondary text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 mb-12">
            <p className="text-white text-lg">
              During my time with the New York Giants, the team achieved a historic milestone:{' '}
              <strong className="text-accent">the fewest games lost to injury.</strong>
            </p>
          </div>

          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-6">Recognition</p>
          <ul className="space-y-3 mb-12">
            {[
              'Featured in ESPN, USA Today, and Outside Magazine',
              'Appeared on 75+ podcasts — one of the most featured health and performance coaches on the planet',
              'Delivered presentations to Fortune 500 companies',
              'Consulted with elite college and NFL teams',
              'Authored 4 peer-reviewed scientific publications',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <span className="text-secondary">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-6">Education & Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-white font-semibold mb-1">{c.title}</h3>
                <p className="text-secondary text-sm">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facing Myself */}
      <section className="py-24 bg-card/30 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-6">Facing Myself</h2>
          <p className="text-secondary text-lg mb-6">
            Despite all my incredible success working in elite sport, I felt like a fraud. I wasn&apos;t living it. In 2019, after accepting an alumni award, I found myself alone in a hotel room, 225 pounds and 30% body fat — strong, but metabolically unhealthy. I had become something I never thought I would nor wanted to — another unhealthy Indian, adding to the statistics.
          </p>
          <p className="font-display font-bold text-2xl text-accent mb-10">That was my turning point.</p>
          <div className="grid grid-cols-3 gap-4">
            {['/images/Fat Boy 1.JPG', '/images/Fat Boy 2.JPG', '/images/Fat Boy 3.jpg'].map((src, i) => (
              <div key={src} className="rounded-xl overflow-hidden border border-border">
                <div className="relative aspect-square">
                  <Image src={src} alt={`Fat Boy ${i + 1}`} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Actually Worked */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-white mb-6">What Actually Worked</h2>
          <p className="text-secondary text-lg mb-8">Over the next year, I focused on fundamentals:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {workedItems.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-white text-lg font-semibold">
            I stabilized, then optimized. <span className="text-accent">I lived the Blueprxnt process.</span>
          </p>
        </div>
      </section>

      {/* Why I Built Blueprxnt */}
      <section className="py-24 bg-card/30 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-8">Why I Built Blueprxnt</h2>
          <p className="text-secondary text-xl mb-6">
            I had no mentors for my health — especially as an Indian. I learned everything the hard way. Blueprxnt exists so others don&apos;t have to.
          </p>
          <p className="text-secondary text-xl mb-10">
            It&apos;s the system I wish I had at 15: one that respects genetics, culture, reality, and ambition. It&apos;s about building capacity, not burnout.
          </p>
          <div className="border-l-4 border-accent pl-8 text-left max-w-2xl mx-auto">
            <p className="text-white text-lg font-semibold italic">
              Elite performance thinking shouldn&apos;t be reserved for elite sport — it belongs to anyone ready to operate at a high level in real life.
            </p>
          </div>
        </div>
      </section>

      {/* What I Believe */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-8">What I Believe</h2>
          <p className="text-secondary text-lg mb-10">
            Everyone deserves to master their health and performance — for themselves, their families, and their communities.
          </p>
          <div className="bg-card border border-border rounded-2xl p-10">
            <p className="text-white text-xl font-semibold mb-3">Health is leverage.</p>
            <p className="text-white text-xl font-semibold mb-3">Performance is responsibility.</p>
            <p className="font-display font-bold text-2xl bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              With the right system, both are sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">Ready to build your system?</h2>
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
