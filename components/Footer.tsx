import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display font-bold text-xl text-white tracking-widest mb-4">BLUEPRXNT</h3>
            <p className="text-secondary text-sm leading-relaxed mb-4">
              A performance health operating system built in elite sport and engineered for real life.
            </p>
            <p className="text-accent text-xs font-medium uppercase tracking-widest">Performance Health</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'The System', href: '/system' },
                { label: 'Coaching', href: '/coaching' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Disclaimer', href: '/disclaimer' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get Started</h4>
            <p className="text-secondary text-sm mb-4">
              Ready to transform your performance?
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity"
            >
              Apply for Coaching
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary text-sm">&copy; 2026 Blueprxnt. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-secondary hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-secondary hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-secondary hover:text-white text-sm transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
