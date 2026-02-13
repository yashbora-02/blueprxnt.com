export const metadata = { title: 'Medical Disclaimer — Blueprxnt' };

export default function DisclaimerPage() {
  return (
    <>
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-5xl text-white mb-2">Medical Disclaimer</h1>
          <p className="text-secondary">Important Notice</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-secondary text-lg">
            Blueprxnt provides education and coaching related to health and performance. We are not a medical provider and do not diagnose, treat, cure, or prevent disease.
          </p>
          {[
            { heading: 'Educational Purpose Only', content: 'All information provided through the website, coaching services, communications, and materials is for educational and informational purposes only.' },
            { heading: 'No Medical Relationship', content: 'Participation in coaching does not establish a doctor-patient or healthcare provider relationship. Clients should consult a licensed physician or qualified healthcare professional before making any changes related to nutrition, exercise, supplements, sleep, or lifestyle habits.' },
            { heading: 'Personal Responsibility', content: 'By engaging with Blueprxnt, you acknowledge that you assume full responsibility for your health decisions, understand the inherent risks associated with physical activity and lifestyle changes, and release Blueprxnt from liability related to outcomes.' },
            { heading: 'Emergency Situations', content: 'If you are experiencing a medical emergency, seek immediate care from a qualified medical professional.' },
            { heading: 'Acceptance', content: 'By using this website or participating in coaching, you acknowledge and accept this Medical Disclaimer.' },
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
