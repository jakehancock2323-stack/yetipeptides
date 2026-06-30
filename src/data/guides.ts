export interface Guide {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  readTime: string;
  category: string;
  publishedAt: string; // ISO
  keywords: string[];
  // Rendered as HTML — keep it simple, semantic, accessible.
  contentHtml: string;
}

export const guides: Guide[] = [
  {
    slug: 'how-to-reconstitute-peptides-uk',
    title: 'How to Reconstitute Peptides: A UK Researcher’s Guide',
    description:
      'Step-by-step guide for UK researchers on reconstituting lyophilised peptides safely using bacteriostatic water, including dosing math.',
    excerpt:
      'Mixing bacteriostatic water with a fresh vial is the first step in every peptide research workflow. Here is how to do it without contaminating or denaturing your product.',
    readTime: '6 min read',
    category: 'Lab Basics',
    publishedAt: '2026-06-01',
    keywords: [
      'how to reconstitute peptides',
      'bacteriostatic water UK',
      'mix peptide vial',
      'peptide dosing calculator',
    ],
    contentHtml: `
      <p>Reconstitution is the process of dissolving a freeze-dried (lyophilised) peptide with a sterile diluent, almost always bacteriostatic water (BAC water). Doing this carefully preserves the peptide and keeps your vial sterile for the full research period.</p>

      <h2>What you need</h2>
      <ul>
        <li>Sealed peptide vial stored at fridge temperature.</li>
        <li>Bacteriostatic water (0.9% benzyl alcohol).</li>
        <li>Sterile insulin syringes (typically 1ml / 100 units).</li>
        <li>Alcohol swabs, clean flat surface, gloves.</li>
      </ul>

      <h2>Step by step</h2>
      <ol>
        <li>Bring the vial to room temperature for 20–30 minutes — never reconstitute a cold vial.</li>
        <li>Swab the rubber stoppers on both the BAC water and peptide vial.</li>
        <li>Draw your chosen volume of BAC water (commonly 1ml, 2ml or 3ml).</li>
        <li>Inject the water down the side wall of the peptide vial slowly. Do not blast it onto the powder.</li>
        <li>Swirl gently — never shake. Shaking denatures fragile peptide chains.</li>
        <li>Leave 1–2 minutes for the powder to fully dissolve into a clear solution.</li>
        <li>Store reconstituted vials in the fridge (2–8°C). Most peptides are stable for 28 days once mixed.</li>
      </ol>

      <h2>Working out your dose</h2>
      <p>The formula is:</p>
      <p><strong>Units on syringe = (desired dose in mcg ÷ peptide strength per ml in mcg) × 100</strong></p>
      <p>Example: a 10mg vial reconstituted with 2ml of BAC water gives 5mg per ml (5000mcg/ml). A 250mcg research dose is therefore (250 ÷ 5000) × 100 = 5 units on an insulin syringe.</p>
      <p>For zero-maths dosing use our <a href="/calculator">peptide reconstitution calculator</a>.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li>Shaking the vial instead of swirling.</li>
        <li>Using tap water, saline or non-bacteriostatic water for multi-use vials.</li>
        <li>Leaving the vial at room temperature for hours after mixing.</li>
        <li>Reusing syringes between vials — always single-use.</li>
      </ul>

      <p class="disclaimer">All Yeti Peptides products are sold strictly for in-vitro research use only and are not intended for human or animal consumption.</p>
    `,
  },
  {
    slug: 'retatrutide-vs-tirzepatide-research-comparison',
    title: 'Retatrutide vs Tirzepatide: Research Comparison',
    description:
      'A clear, citation-grounded comparison of Retatrutide and Tirzepatide research peptides — receptor activity, structural differences, and what current data shows.',
    excerpt:
      'Both are next-generation GLP-1 derivatives, but their receptor profiles are notably different. Here is the side-by-side researchers actually want.',
    readTime: '7 min read',
    category: 'Peptide Science',
    publishedAt: '2026-06-10',
    keywords: [
      'retatrutide vs tirzepatide',
      'retatrutide research',
      'tirzepatide research',
      'GLP-1 GIP glucagon agonist',
    ],
    contentHtml: `
      <p>Retatrutide and Tirzepatide are two of the most discussed research peptides on the market. Both originated from Eli Lilly's pipeline and both are commonly used in published preclinical and clinical studies, but they are not the same molecule and do not act on the same set of receptors.</p>

      <h2>Receptor activity</h2>
      <ul>
        <li><strong>Tirzepatide</strong> is a dual agonist: GLP-1 + GIP.</li>
        <li><strong>Retatrutide</strong> is a triple agonist: GLP-1 + GIP + glucagon receptor.</li>
      </ul>
      <p>The addition of glucagon receptor activity is what makes Retatrutide structurally distinct and is the main subject of current research interest.</p>

      <h2>Published research summary</h2>
      <p>Phase 2 trial data for Retatrutide (NEJM, 2023) showed dose-dependent effects across 48 weeks of administration in study participants. Tirzepatide's SURPASS and SURMOUNT trial programs are the largest data set available for the dual agonist class.</p>

      <h2>Reconstitution and handling</h2>
      <p>Both peptides are supplied as a freeze-dried powder and reconstitute identically with bacteriostatic water — see our <a href="/guides/how-to-reconstitute-peptides-uk">reconstitution guide</a>.</p>

      <h2>Availability at Yeti Peptides</h2>
      <p>We supply UK-domestic research-grade <a href="/products?product=uk-retatrutide-30mg">Retatrutide 30mg</a> and <a href="/products?product=uk-tirzepatide-30mg">Tirzepatide 30mg</a>, posted via Royal Mail Tracked from West Yorkshire.</p>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption.</p>
    `,
  },
  {
    slug: 'bpc-157-tb-500-research-overview',
    title: 'BPC-157 and TB-500: A Research Overview',
    description:
      'What BPC-157 and TB-500 are, where the research stands, and how the KLOW blend combines them with KPV and GHK-Cu.',
    excerpt:
      'BPC-157 and TB-500 are two of the most-studied regenerative research peptides. Here is a plain-English summary of where the science currently sits.',
    readTime: '5 min read',
    category: 'Peptide Science',
    publishedAt: '2026-06-15',
    keywords: [
      'BPC-157 UK',
      'TB-500 research',
      'KLOW blend',
      'regenerative peptides',
    ],
    contentHtml: `
      <p>BPC-157 ("Body Protective Compound") is a synthetic pentadecapeptide derived from a protective protein found in human gastric juice. TB-500 is a synthetic fragment of Thymosin Beta-4. Both have been the subject of widespread preclinical research into tissue repair models.</p>

      <h2>BPC-157</h2>
      <p>Preclinical models have explored BPC-157 in the context of tendon, ligament and gastrointestinal tissue research. It is one of the most-requested research peptides in our UK catalogue.</p>

      <h2>TB-500</h2>
      <p>TB-500 (the active fragment of Thymosin Beta-4) is studied for actin-binding activity in cellular research contexts.</p>

      <h2>The KLOW blend</h2>
      <p>Our <a href="/products?product=uk-klow">KLOW research blend</a> combines four regenerative-research peptides in a single vial:</p>
      <ul>
        <li>TB-500 — 10mg</li>
        <li>BPC-157 — 10mg</li>
        <li>KPV — 10mg</li>
        <li>GHK-Cu — 50mg</li>
      </ul>
      <p>This blend is currently out of stock; check the product page for restock updates.</p>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption.</p>
    `,
  },
  {
    slug: 'storing-research-peptides-uk',
    title: 'Storing Research Peptides Correctly (UK Guide)',
    description:
      'How long peptides last unmixed and reconstituted, the right fridge and freezer temperatures, and the mistakes that destroy potency.',
    excerpt:
      'Peptides are fragile. Storing them wrong wastes money and skews your data. Here is the no-nonsense storage protocol.',
    readTime: '4 min read',
    category: 'Lab Basics',
    publishedAt: '2026-06-20',
    keywords: [
      'storing peptides UK',
      'peptide fridge temperature',
      'peptide shelf life',
      'reconstituted peptide storage',
    ],
    contentHtml: `
      <p>Peptides are biologically active molecules, and their stability depends entirely on temperature, light exposure and contact with moisture.</p>

      <h2>Unreconstituted (lyophilised) vials</h2>
      <ul>
        <li>Short term (weeks): fridge at 2–8°C is fine.</li>
        <li>Long term (months+): freezer at -20°C in original packaging, away from frost-free defrost cycles.</li>
        <li>Keep out of direct light; the amber glass and packaging are there for a reason.</li>
      </ul>

      <h2>Reconstituted vials</h2>
      <ul>
        <li>Refrigerate at 2–8°C immediately after mixing.</li>
        <li>Use within 28 days for most peptides (some are shorter — GHK-Cu blends in particular).</li>
        <li>Never freeze a reconstituted vial — ice crystal formation damages the peptide chain.</li>
      </ul>

      <h2>What destroys peptides</h2>
      <ul>
        <li>Heat. Leaving a vial on a desk all weekend will degrade it.</li>
        <li>Light. UV is the enemy.</li>
        <li>Shaking. Mechanical agitation breaks fragile chains.</li>
        <li>Contamination. Always swab, always use a new needle.</li>
      </ul>

      <p>Order arriving while you are out? Our Royal Mail Tracked deliveries are insulated for typical UK ambient temperatures. Move them to the fridge as soon as they arrive.</p>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption.</p>
    `,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
