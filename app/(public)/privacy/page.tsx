export const metadata = { title: 'Privacy Policy — Blueprxnt' };

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-5xl text-white mb-2">Privacy Policy</h1>
          <p className="text-secondary">Effective Date: February 7, 2026</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-secondary text-lg">
            Blueprxnt (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or interact with our services.
          </p>
          {[
            { heading: 'Information We Collect', content: 'We may collect personal information you voluntarily provide, including name, email address, phone number, and information submitted through forms or applications. We may also collect limited non-personal data such as browser type, device information, and website usage analytics.' },
            { heading: 'How We Use Information', content: 'We use collected information to respond to inquiries, review coaching applications, provide coaching-related communication, and improve website functionality. We do not sell, rent, or trade your personal information.' },
            { heading: 'Data Protection', content: 'We take reasonable measures to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.' },
            { heading: 'Third-Party Services', content: 'We may use third-party tools for website analytics, email communication, and form submission management. These providers have their own privacy policies governing the use of your information.' },
            { heading: 'Your Rights', content: 'You may request access to, correction of, or deletion of your personal information by contacting us directly.' },
            { heading: 'Updates', content: 'This Privacy Policy may be updated periodically. Continued use of the website constitutes acceptance of any changes.' },
            { heading: 'Contact', content: 'If you have questions regarding this Privacy Policy, please contact us through the website contact form.' },
          ].map((s) => (
            <div key={s.heading}>
              <h2 className="font-display font-bold text-2xl text-white mb-3">{s.heading}</h2>
              <p className="text-secondary leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
