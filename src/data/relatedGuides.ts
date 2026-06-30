/**
 * Map each product id to guide slugs that are directly relevant.
 * Used by ProductDetail to surface internal links (SEO + UX).
 */
export const RELATED_GUIDES: Record<string, string[]> = {
  'uk-retatrutide-30mg': [
    'retatrutide-vs-tirzepatide-research-comparison',
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'uk-tirzepatide-30mg': [
    'retatrutide-vs-tirzepatide-research-comparison',
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'uk-tesamorelin-10mg': [
    'tesamorelin-research-overview',
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'uk-mt2-10mg': [
    'melanotan-2-research-overview',
    'how-to-reconstitute-peptides-uk',
    'choosing-bacteriostatic-water-uk',
  ],
  'uk-ghkcu-100mg': [
    'ghk-cu-copper-peptide-research-overview',
    'how-to-reconstitute-peptides-uk',
  ],
  'uk-klow': [
    'ghk-cu-copper-peptide-research-overview',
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'frostskin-serum': ['ghk-cu-copper-peptide-research-overview'],
  'hospira-bac-water': [
    'choosing-bacteriostatic-water-uk',
    'how-to-reconstitute-peptides-uk',
  ],
  'uk-cjc-ipamorelin-10mg': [
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'uk-motsc-10mg': [
    'how-to-reconstitute-peptides-uk',
    'storing-research-peptides-uk',
  ],
  'uk-mt1-10mg': [
    'melanotan-2-research-overview',
    'choosing-bacteriostatic-water-uk',
  ],
};
