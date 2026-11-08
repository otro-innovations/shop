/**
 * Product imagery placeholder.
 * No external image hosts, no binary assets: a deterministic brand gradient plus
 * the product's initials. Replace with <Image> once real photography exists.
 */
const GRADIENTS = [
  'from-brand-navy via-brand-blue to-brand-sky',
  'from-brand-ink via-brand-navy to-brand-blue',
  'from-brand-blue via-brand-sky to-brand-mist',
  'from-brand-navy via-brand-ink to-brand-sky',
  'from-brand-blue via-brand-navy to-brand-ink',
];

function pickGradient(seed: string): string {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}

function initials(name: string): string {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
  return words.slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
}

interface Props {
  name: string;
  category?: string;
  /** Tailwind sizing classes, e.g. "h-44 w-full" or "h-16 w-16". */
  className?: string;
  /** Compact mode for cart thumbnails: hides the category label, smaller type. */
  compact?: boolean;
}

export default function ProductMedia({ name, category, className = '', compact = false }: Props) {
  return (
    <div
      role="img"
      aria-label={`${name}${category ? `, ${category}` : ''} — illustrative placeholder`}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${pickGradient(name)} ${className}`}
    >
      {/* Decorative shapes: purely visual, hidden from assistive tech. */}
      <span aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <span aria-hidden="true" className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
      <span
        aria-hidden="true"
        className={`relative font-display font-bold tracking-tight text-white/85 ${compact ? 'text-lg' : 'text-4xl'}`}
      >
        {initials(name)}
      </span>
      {category && !compact && (
        <span aria-hidden="true" className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
          {category}
        </span>
      )}
    </div>
  );
}
