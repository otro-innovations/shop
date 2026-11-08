/** Page section wrapper with consistent rhythm + accessible heading anchor. */
export default function Section({ id, eyebrow, title, lead, children, tone = 'light', headingLevel = 'h2' }: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  tone?: 'light' | 'mist' | 'navy';
  /** Use 'h1' for the lead section of a page so each page has one h1. */
  headingLevel?: 'h1' | 'h2';
}) {
  const tones = { light: 'bg-white', mist: 'bg-brand-mist/60', navy: 'bg-brand-navy text-white' };
  const Heading = headingLevel;
  const headingSize = headingLevel === 'h1' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-3xl sm:text-4xl';
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20 py-16 sm:py-20`}>
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {(eyebrow || title) && (
          <header className="max-w-3xl">
            {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-brand-amber">{eyebrow}</p>}
            {title && <Heading className={`mt-2 font-display font-bold ${headingSize} ${tone === 'navy' ? 'text-white' : 'text-brand-navy'}`}>{title}</Heading>}
            {lead && <p className={`mt-4 text-lg ${tone === 'navy' ? 'text-white/80' : 'text-brand-ink/70'}`}>{lead}</p>}
          </header>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
