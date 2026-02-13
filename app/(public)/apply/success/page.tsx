import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Application Received — Blueprxnt',
};

export default function ApplySuccessPage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-4">Application Received</h1>
          <p className="text-secondary text-lg mb-10">Thanks — we&apos;ll send booking instructions shortly.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border border-border hover:border-accent transition-colors"
          >
            Return to Home →
          </Link>
        </div>
      </section>
    </>
  );
}
