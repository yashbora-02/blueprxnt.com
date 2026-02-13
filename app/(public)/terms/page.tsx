export const metadata = { title: 'Terms & Conditions — Blueprxnt' };

export default function TermsPage() {
  return (
    <>
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-5xl text-white mb-2">Terms & Conditions</h1>
          <p className="text-secondary">Effective Date: February 7, 2026</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-secondary text-lg">
            These Terms & Conditions govern your use of the Blueprxnt website and services. By accessing or using this site, you agree to these terms.
          </p>
          {[
            { heading: 'Coaching Services', content: 'Blueprxnt provides educational and coaching services related to health, fitness, and performance. We do not guarantee specific outcomes. Results vary based on individual factors including effort, consistency, and circumstances.' },
            { heading: 'No Medical Advice', content: 'All content and coaching provided by Blueprxnt is for educational purposes only and does not constitute medical advice. Clients are responsible for consulting qualified healthcare professionals before making changes to diet, exercise, supplementation, or lifestyle.' },
            { heading: 'User Responsibility', content: 'You agree to provide accurate information, take responsibility for your decisions and actions, and use the information provided at your own discretion.' },
            { heading: 'Intellectual Property', content: 'All content on this site, including text, graphics, and systems, is the intellectual property of Blueprxnt and may not be copied or reproduced without written permission.' },
            { heading: 'Limitation of Liability', content: 'Blueprxnt is not liable for any direct or indirect damages resulting from use of this website or services.' },
            { heading: 'Termination', content: 'We reserve the right to refuse or discontinue services at our discretion.' },
            { heading: 'Governing Law', content: 'These Terms & Conditions are governed by the laws of the applicable jurisdiction.' },
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
