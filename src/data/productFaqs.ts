import type { Product } from './products';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generate a baseline of FAQ items shared by every UK product,
 * plus category- and product-specific Q&A grounded in published
 * research and our own operating policy. All content is factual
 * and tied to existing site policy / public literature.
 */
export function getProductFaqs(product: Product): FaqItem[] {
  const shared: FaqItem[] = [
    {
      question: 'How quickly do UK orders ship?',
      answer:
        'Orders placed before 14:00 GMT are despatched the same working day from West Yorkshire. Royal Mail 24 Tracked typically arrives in around 2 working days, but Royal Mail does not guarantee a 24-hour delivery window.',
    },
    {
      question: 'What shipping options are available?',
      answer:
        'Royal Mail 24 Tracked is a flat £6 to any UK address. InPost Locker pickup is also supported for fully anonymous collection — you set up the locker and pay InPost separately, and we send to the QR code you provide in your order notes.',
    },
    {
      question: 'How do I pay?',
      answer:
        'We accept crypto only: USDT (ERC-20), USDC (ERC-20) or BTC. BTC carries a 4% processing fee to cover network and conversion costs. Full step-by-step instructions are on the How to Pay with Crypto page.',
    },
    {
      question: 'Is this product for human use?',
      answer:
        'No. All Yeti Pep products are supplied strictly for in-vitro laboratory research use only. They are not intended, labelled, or sold for human or veterinary consumption.',
    },
  ];

  const categorySpecific: FaqItem[] =
    product.category === 'Pep'
      ? [
          {
            question: 'How should this peptide be stored?',
            answer:
              'Lyophilised (freeze-dried) vials are stable at 2–8°C in the original packaging. Once reconstituted with bacteriostatic water, store at 2–8°C and use within the in-use period of the diluent (typically up to 28 days for 0.9% benzyl alcohol BWFI per USP <1207> guidance). Do not freeze reconstituted material.',
          },
          {
            question: 'How do I reconstitute this peptide?',
            answer:
              'Use sterile bacteriostatic water (BWFI, 0.9% benzyl alcohol). Equilibrate the vial to room temperature, swab both septa with 70% IPA, inject the diluent slowly down the inner glass wall, and swirl gently — never shake. Full protocol is in our Reconstitution Guide.',
          },
        ]
      : [];

  const productSpecific: Record<string, FaqItem[]> = {
    'uk-retatrutide': [
      {
        question: 'What is Retatrutide?',
        answer:
          'Retatrutide (LY-3437943) is a triple receptor agonist of GLP-1, GIP and the glucagon receptor. Phase 2 data published in the New England Journal of Medicine (Jastreboff et al., 2023) reported up to 24.2% mean placebo-adjusted body-weight reduction at 48 weeks at the 12 mg dose in adults with obesity — the highest weight-loss signal of any published incretin compound to date.',
      },
    ],
    'uk-tirzepatide-30mg': [
      {
        question: 'What is Tirzepatide?',
        answer:
          'Tirzepatide is a dual GLP-1 / GIP receptor agonist. The SURMOUNT-1 trial (Jastreboff et al., NEJM 2022) reported approximately 20.9% mean body-weight reduction at the 15 mg dose over 72 weeks in adults with obesity, alongside HbA1c reductions of ~2.0–2.3% in the SURPASS diabetes programme.',
      },
    ],
    'uk-ghkcu-100mg': [
      {
        question: 'What is GHK-Cu used for in research?',
        answer:
          'GHK-Cu is a naturally-occurring copper-binding tripeptide (glycyl-L-histidyl-L-lysine). Pickart & Margolina (BioMed Research International, 2018) review its role in extracellular matrix remodeling, modulation of inflammatory and antioxidant gene expression, and in-vitro effects on fibroblast and keratinocyte activity.',
      },
    ],
    'uk-mt2-10mg': [
      {
        question: 'What is Melanotan II?',
        answer:
          'Melanotan II is a synthetic non-selective melanocortin receptor agonist (MC1R-MC5R). It was originally investigated for photoprotection via melanogenesis (Dorr et al., 1996) and for off-target effects on libido (Wessells et al., 2000) and feeding behaviour in melanocortin pathway research.',
      },
    ],
    'uk-tesamorelin-10mg': [
      {
        question: 'What is Tesamorelin?',
        answer:
          'Tesamorelin is a stabilised analogue of growth hormone-releasing hormone (GHRH). Falutz et al. (NEJM 2007) reported a mean ~15% reduction in visceral adipose tissue at 26 weeks in adults with HIV-associated lipodystrophy at 2 mg/day subcutaneous.',
      },
    ],
    'uk-klow': [
      {
        question: 'What is in the KLOW blend?',
        answer:
          'Each KLOW vial contains TB-500 10mg, BPC-157 10mg, KPV 10mg and GHK-Cu 50mg. The blend is supplied as a single lyophilised vial for in-vitro research convenience — reconstitute with the BWFI volume that suits your intended working concentration.',
      },
    ],
    'frostskin-serum': [
      {
        question: 'What is in Ice Elixir?',
        answer:
          'A 3.33% GHK-Cu copper-tripeptide facial serum in a base of sodium hyaluronate, niacinamide, N-acetyl glucosamine, panthenol, hydrolyzed silk protein, ectoin and propanediol. Apply 1–2 droppers to face & neck and massage in.',
      },
    ],
  };

  return [...(productSpecific[product.id] ?? []), ...categorySpecific, ...shared];
}
