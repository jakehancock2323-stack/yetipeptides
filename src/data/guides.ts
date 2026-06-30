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
    title: 'How to Reconstitute Lyophilised Peptides: A UK Research Guide',
    description:
      'Evidence-based protocol for reconstituting lyophilised research peptides with bacteriostatic water, covering aseptic technique, dosing maths, and storage backed by stability literature.',
    excerpt:
      'Reconstitution is the single most error-prone step in a peptide workflow. This guide grounds the protocol in stability and aseptic-technique literature instead of folklore.',
    readTime: '8 min read',
    category: 'Lab Basics',
    publishedAt: '2026-06-01',
    keywords: [
      'how to reconstitute peptides',
      'bacteriostatic water UK',
      'lyophilised peptide protocol',
      'peptide dosing calculator',
    ],
    contentHtml: `
      <p>Reconstitution is the process of dissolving a lyophilised (freeze-dried) peptide in a sterile aqueous diluent. The standard diluent for multi-use research vials is <strong>bacteriostatic water containing 0.9% benzyl alcohol</strong>, an antimicrobial preservative that permits repeated needle entries over the in-use period of the vial (USP &lt;1207&gt; multi-dose container guidance).</p>

      <p>The freeze-drying process itself removes ≥95% of water by ice sublimation under reduced pressure, which is why lyophilised peptides are stable at refrigeration temperatures for extended periods — the solvent that enables hydrolysis, deamidation and aggregation pathways has been removed.<sup>[1]</sup> Reintroducing water restarts those degradation kinetics, so technique matters.</p>

      <h2>Materials</h2>
      <ul>
        <li>Sealed peptide vial, stored at 2–8 °C or −20 °C.</li>
        <li>Bacteriostatic water for injection, USP (0.9% benzyl alcohol).</li>
        <li>Sterile single-use insulin syringes (U-100, 1 ml).</li>
        <li>70% isopropyl alcohol swabs.</li>
        <li>Clean, draft-free flat surface; nitrile gloves.</li>
      </ul>

      <h2>Why bacteriostatic water and not sterile water</h2>
      <p>Sterile water for injection (SWFI) contains no preservative and is intended for single-use reconstitution. Bacteriostatic water (BWFI) contains 0.9% benzyl alcohol, which inhibits microbial growth across repeated punctures — the relevant standard for a multi-dose research vial used over several weeks. Saline is not appropriate for peptide reconstitution because chloride ions can accelerate degradation of certain sequences and the absence of preservative defeats the multi-use purpose.</p>

      <h2>Aseptic reconstitution protocol</h2>
      <ol>
        <li>Equilibrate the vial to room temperature for 20–30 minutes. Injecting diluent into a cold vial causes localised condensation and can produce visible cloudiness.</li>
        <li>Wipe both rubber septa (peptide vial and BWFI vial) with a fresh 70% IPA swab and allow to air-dry for ≥30 seconds.</li>
        <li>Draw the chosen volume of BWFI (commonly 1, 2 or 3 ml depending on desired concentration) into a sterile insulin syringe.</li>
        <li>Insert the needle through the peptide vial septum at an angle and discharge the diluent slowly down the inner glass wall — not directly onto the lyophilised cake. Direct impingement creates foam, and the air–liquid interface is a well-documented driver of peptide aggregation.<sup>[2]</sup></li>
        <li><strong>Swirl gently. Do not shake or vortex.</strong> Shear forces and foaming promote both physical aggregation and surface-induced unfolding.</li>
        <li>Allow 1–3 minutes for full dissolution. The solution should be clear and colourless. Any persistent cloudiness or particulates indicates an unsuitable vial — do not use it.</li>
        <li>Transfer immediately to refrigerated storage (2–8 °C). Avoid freeze–thaw of reconstituted material — repeated freeze–thaw cycles measurably increase aggregation in aqueous peptide solutions.<sup>[3]</sup></li>
      </ol>

      <h2>Concentration and dosing maths</h2>
      <p>Concentration after reconstitution:</p>
      <p><strong>Concentration (mg/ml) = vial mass (mg) ÷ diluent volume (ml)</strong></p>
      <p>Volume per research dose on a U-100 insulin syringe:</p>
      <p><strong>Units = (desired dose in mcg ÷ concentration in mcg/ml) × 100</strong></p>
      <p><em>Worked example.</em> A 10 mg vial reconstituted with 2 ml BWFI yields 5 mg/ml (5,000 mcg/ml). A 250 mcg study dose corresponds to (250 ÷ 5,000) × 100 = <strong>5 units</strong> on a 100-unit insulin syringe.</p>
      <p>For instant calculation, use our <a href="/calculator">peptide reconstitution calculator</a>.</p>

      <h2>Common protocol failures</h2>
      <ul>
        <li><strong>Shaking the vial.</strong> Mechanical agitation generates the air–liquid interface that drives aggregation of structured peptides.</li>
        <li><strong>Using non-bacteriostatic diluent in a multi-use vial.</strong> Sterile water and saline have no preservative; microbial ingress over a 28-day use period is a real risk.</li>
        <li><strong>Storing reconstituted vials at room temperature.</strong> Solution-phase degradation follows Arrhenius kinetics — broadly, each 10 °C rise in temperature roughly doubles or quadruples the degradation rate.<sup>[1]</sup></li>
        <li><strong>Re-using syringes between vials.</strong> A documented contamination pathway; always single-use.</li>
        <li><strong>Freezing reconstituted material.</strong> Ice crystal formation and freeze-concentration of solutes drive denaturation and aggregation.<sup>[3]</sup></li>
      </ul>

      <h2>References</h2>
      <ol class="references">
        <li>Manning, M. C. et al. <em>Stability of Protein Pharmaceuticals: An Update.</em> Pharm. Res. 27, 544–575 (2010).</li>
        <li>Wang, W. <em>Protein aggregation and its inhibition in biopharmaceutics.</em> Int. J. Pharm. 289, 1–30 (2005).</li>
        <li>Hawe, A. et al. <em>Forced degradation of therapeutic proteins.</em> J. Pharm. Sci. 101, 895–913 (2012).</li>
      </ol>

      <p class="disclaimer">All Yeti Peptides products are supplied strictly for in-vitro research use only and are not intended for human or animal consumption.</p>
    `,
  },
  {
    slug: 'retatrutide-vs-tirzepatide-research-comparison',
    title: 'Retatrutide vs Tirzepatide: A Clinical Trial Comparison',
    description:
      'Side-by-side comparison of Retatrutide and Tirzepatide grounded in the published NEJM, Lancet and SURPASS/SURMOUNT trial data — receptor activity, weight loss, HbA1c reduction, and safety signals.',
    excerpt:
      'Two of the most-studied incretin-based research peptides. Here is what the registered Phase 2 and Phase 3 datasets actually reported.',
    readTime: '9 min read',
    category: 'Peptide Science',
    publishedAt: '2026-06-10',
    keywords: [
      'retatrutide vs tirzepatide',
      'retatrutide phase 2 NEJM',
      'tirzepatide SURMOUNT SURPASS',
      'GLP-1 GIP glucagon agonist',
    ],
    contentHtml: `
      <p>Retatrutide (LY3437943) and Tirzepatide (LY3298176) are two incretin-based investigational peptides developed by Eli Lilly. Both have generated substantial peer-reviewed clinical literature in the last five years. They are <strong>not interchangeable</strong>: they bind different receptors and the published trial endpoints differ meaningfully.</p>

      <h2>Receptor pharmacology</h2>
      <ul>
        <li><strong>Tirzepatide</strong> — dual agonist of the glucose-dependent insulinotropic polypeptide (GIP) receptor and the glucagon-like peptide-1 (GLP-1) receptor.</li>
        <li><strong>Retatrutide</strong> — triple agonist of the GIP, GLP-1 <em>and</em> glucagon receptors. The addition of glucagon receptor activity is hypothesised to drive additional energy expenditure on top of the appetite suppression and insulinotropic effects of the GLP-1/GIP axis.<sup>[1]</sup></li>
      </ul>

      <h2>Published clinical data — Tirzepatide</h2>
      <p><strong>SURPASS-1</strong> (Rosenstock et al., Lancet 2021) was the first Phase 3 trial of Tirzepatide in adults with type 2 diabetes. After 40 weeks, mean HbA1c reductions from a baseline of ~7.9% were 1.87% (5 mg), 1.89% (10 mg) and 2.07% (15 mg) versus 0.04% with placebo. Mean body weight reductions reached 9.5 kg at the 15 mg dose.<sup>[2]</sup></p>
      <p><strong>SURMOUNT-1</strong> (Jastreboff et al., NEJM 2022) enrolled 2,539 adults with obesity (BMI ≥30, or ≥27 with comorbidity). After 72 weeks, mean percentage weight change was <strong>−15.0% (5 mg), −19.5% (10 mg) and −20.9% (15 mg)</strong> versus −3.1% with placebo. The proportion of participants achieving ≥5% weight reduction was 85–91% across active arms.<sup>[3]</sup></p>

      <h2>Published clinical data — Retatrutide</h2>
      <p><strong>Phase 2 trial</strong> (Jastreboff et al., NEJM 2023; NCT04881760) enrolled 338 adults with obesity (BMI ≥30, or ≥27 with comorbidity) over 48 weeks. The 12 mg dose produced a <strong>mean weight change of −24.2%</strong> versus −2.1% with placebo — the largest reported in any published incretin trial to date.<sup>[1]</sup> All active doses produced dose-dependent reductions and the most common adverse events were gastrointestinal (nausea, diarrhoea, vomiting), generally mild-to-moderate.</p>

      <h2>Head-to-head: what the data shows</h2>
      <table>
        <thead><tr><th>Parameter</th><th>Tirzepatide (SURMOUNT-1)</th><th>Retatrutide (Phase 2)</th></tr></thead>
        <tbody>
          <tr><td>Receptor targets</td><td>GIP + GLP-1</td><td>GIP + GLP-1 + Glucagon</td></tr>
          <tr><td>Trial length</td><td>72 weeks</td><td>48 weeks</td></tr>
          <tr><td>Top-dose weight change</td><td>−20.9% (15 mg)</td><td>−24.2% (12 mg)</td></tr>
          <tr><td>Trial phase published</td><td>Phase 3 (multiple)</td><td>Phase 2 (Phase 3 ongoing)</td></tr>
          <tr><td>Primary adverse events</td><td>GI (mild–moderate)</td><td>GI (mild–moderate)</td></tr>
        </tbody>
      </table>
      <p>The Phase 3 Retatrutide programme (TRIUMPH) is ongoing as of publication and final readouts have not been incorporated here.</p>

      <h2>Handling and reconstitution</h2>
      <p>Both peptides ship as a lyophilised powder and are reconstituted identically with bacteriostatic water. See our <a href="/guides/how-to-reconstitute-peptides-uk">reconstitution guide</a> for protocol and dosing maths.</p>

      <h2>Availability at Yeti Peptides</h2>
      <p>We supply UK-domestic research-grade <a href="/products?product=uk-retatrutide-30mg">Retatrutide 30 mg</a> and <a href="/products?product=uk-tirzepatide-30mg">Tirzepatide 30 mg</a>, posted via Royal Mail Tracked from West Yorkshire.</p>

      <h2>References</h2>
      <ol class="references">
        <li>Jastreboff, A. M. et al. <em>Triple–Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.</em> N. Engl. J. Med. 389, 514–526 (2023). doi:10.1056/NEJMoa2301972.</li>
        <li>Rosenstock, J. et al. <em>Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1).</em> Lancet 398, 143–155 (2021).</li>
        <li>Jastreboff, A. M. et al. <em>Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).</em> N. Engl. J. Med. 387, 205–216 (2022).</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption. This article summarises published clinical literature for educational purposes and is not medical advice.</p>
    `,
  },
  {
    slug: 'ghk-cu-copper-peptide-research-overview',
    title: 'GHK-Cu: A Research Overview of the Copper Tripeptide',
    description:
      'Mechanistic and preclinical evidence for GHK-Cu (copper-binding tripeptide), covering gene-expression modulation, ECM remodelling and the foundational Pickart literature.',
    excerpt:
      'GHK-Cu is one of the most extensively studied small peptides in regenerative research. Here is what the published literature actually shows.',
    readTime: '6 min read',
    category: 'Peptide Science',
    publishedAt: '2026-06-15',
    keywords: [
      'GHK-Cu research',
      'copper peptide UK',
      'GHK gene expression',
      'Pickart copper tripeptide',
    ],
    contentHtml: `
      <p>GHK is a naturally occurring human tripeptide with the sequence <strong>glycyl-L-histidyl-L-lysine</strong> (Gly-His-Lys). It was first isolated from human plasma by Loren Pickart in 1973 and identified as a factor that restored the function of aged hepatocytes in culture. GHK has a high binding affinity for copper(II), and the resulting <strong>GHK-Cu</strong> complex is the bioactive form studied in most of the published regenerative literature.<sup>[1]</sup></p>

      <h2>Concentration and age</h2>
      <p>Plasma GHK concentration declines with age — from roughly 200 ng/ml at age 20 to around 80 ng/ml by age 60 — which is one of the observations that drove early interest in its role in tissue maintenance.<sup>[1]</sup></p>

      <h2>Mechanistic data</h2>
      <p>GHK-Cu's biological activity is best characterised at the level of gene expression. A 2010 Broad Institute Connectivity Map analysis (referenced extensively by Pickart and Margolina) identified GHK as a small molecule capable of modulating the expression of <strong>over 4,000 human genes</strong> — broadly resetting transcription patterns toward those of younger tissue, including upregulation of DNA repair, antioxidant and ubiquitin–proteasome pathway genes.<sup>[2]</sup></p>
      <p>At the tissue level, GHK-Cu has been shown in vitro and in animal models to:</p>
      <ul>
        <li>Stimulate collagen, elastin, glycosaminoglycan and proteoglycan synthesis in dermal fibroblasts.<sup>[3]</sup></li>
        <li>Modulate metalloproteinase activity (MMP-2 upregulation, TIMP-1 and TIMP-2 modulation), supporting extracellular matrix remodelling.<sup>[3]</sup></li>
        <li>Promote angiogenesis in wound models via VEGF-mediated pathways.<sup>[2]</sup></li>
        <li>Exhibit antioxidant activity through copper sequestration, preventing copper-catalysed Fenton-reaction oxidative damage.<sup>[2]</sup></li>
      </ul>

      <h2>Preclinical wound and tissue models</h2>
      <p>GHK-Cu has been studied in rodent and porcine wound models, with reported improvements in granulation tissue formation, angiogenesis and re-epithelialisation rates relative to control.<sup>[3]</sup> It is one of the few research peptides that has crossed into widespread cosmetic and dermatological topical use — though those applications are downstream of the foundational research literature, not the subject of this guide.</p>

      <h2>Status</h2>
      <p>GHK-Cu is not an approved medicine in the UK, US or EU. The body of evidence consists primarily of in vitro mechanistic studies and preclinical animal models, with a smaller number of small-scale human dermatological studies.</p>

      <h2>The KLOW research blend</h2>
      <p>Our <a href="/products?product=uk-klow">KLOW research blend</a> combines GHK-Cu (50 mg) with TB-500, BPC-157 and KPV in a single research vial. Standalone <a href="/products?product=uk-ghk-cu">GHK-Cu 50 mg</a> is also available domestically.</p>

      <h2>Handling notes</h2>
      <p>GHK-Cu solutions are characteristically <strong>blue</strong> due to the copper coordination complex — this is expected and does not indicate degradation. Copper-containing peptides are generally more sensitive to solution-phase degradation than uncomplexed peptides; we recommend a shorter in-use window (14–21 days at 2–8 °C) than the 28-day rule of thumb used for many other peptides. See our <a href="/guides/storing-research-peptides-uk">storage guide</a> for full protocol.</p>

      <h2>References</h2>
      <ol class="references">
        <li>Pickart, L. & Margolina, A. <em>Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data.</em> Int. J. Mol. Sci. 19, 1987 (2018). PMC6073405.</li>
        <li>Pickart, L., Vasquez-Soltero, J. M. & Margolina, A. <em>GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.</em> BioMed Res. Int. 2015, 648108 (2015). PMC4508379.</li>
        <li>Pickart, L. <em>The human tri-peptide GHK and tissue remodeling.</em> J. Biomater. Sci. Polym. Ed. 19, 969–988 (2008).</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption. This article summarises published preclinical literature for educational purposes.</p>
    `,
  },

  {
    slug: 'storing-research-peptides-uk',
    title: 'Storing Research Peptides Correctly: A Stability-Based Guide',
    description:
      'Evidence-based storage protocol for lyophilised and reconstituted research peptides, grounded in published Arrhenius kinetics and freeze–thaw aggregation data.',
    excerpt:
      'Peptide stability is governed by temperature, water activity, light and interface exposure. Here is the storage protocol the literature actually supports.',
    readTime: '6 min read',
    category: 'Lab Basics',
    publishedAt: '2026-06-20',
    keywords: [
      'storing peptides UK',
      'peptide stability Arrhenius',
      'lyophilised peptide shelf life',
      'reconstituted peptide storage',
    ],
    contentHtml: `
      <p>Peptide stability is governed by four primary variables: <strong>temperature, water activity, light exposure, and air–liquid interface contact</strong>. Each maps to a documented degradation pathway — hydrolysis, deamidation (asparagine, glutamine), oxidation (methionine, cysteine, tryptophan) and physical aggregation. Storage protocols are designed to slow all four.</p>

      <h2>Temperature and Arrhenius kinetics</h2>
      <p>Peptide degradation rates broadly follow Arrhenius kinetics: each 10 °C reduction in temperature typically slows the dominant degradation reactions by a factor of 2–4.<sup>[1]</sup> This is why lyophilised peptides stable for ~7 days at +25 °C are typically stable for 6–18 months at −20 °C and several years at −80 °C.<sup>[1]</sup> Asparagine-containing sequences in particular show measurable deamidation within 48 hours at room temperature but no detectable HPLC change after 18 months at −80 °C.</p>

      <h2>Lyophilised (unreconstituted) vials</h2>
      <ul>
        <li><strong>Short term (≤4 weeks):</strong> 2–8 °C in original sealed packaging is adequate.</li>
        <li><strong>Long term (months to years):</strong> −20 °C in a non-frost-free freezer. Frost-free units cycle through warming phases that defeat the purpose.</li>
        <li><strong>Protect from light.</strong> UV and visible light catalyse oxidation of methionine, tryptophan and cysteine residues. Keep vials boxed.</li>
        <li><strong>Avoid moisture ingress.</strong> Water activity is the rate-limiting variable for solid-state degradation; allow vials to equilibrate to room temperature <em>before</em> opening to prevent atmospheric condensation onto the cake.</li>
      </ul>

      <h2>Reconstituted vials</h2>
      <ul>
        <li><strong>Refrigerate at 2–8 °C immediately after reconstitution.</strong></li>
        <li><strong>In-use window:</strong> the standard rule of thumb is 28 days for bacteriostatic-water reconstituted peptides at 2–8 °C, mirroring the in-use period for multi-dose pharmaceutical vials preserved with benzyl alcohol. Sequences with rapid solution-phase degradation (e.g. some GHK-Cu and copper-bound blends) are typically shorter.</li>
        <li><strong>Do not freeze reconstituted material.</strong> Ice formation and freeze-concentration of solutes drive denaturation and aggregation; repeated freeze–thaw cycles measurably increase aggregation in aqueous peptide solutions.<sup>[2][3]</sup></li>
        <li><strong>Minimise headspace agitation.</strong> The air–liquid interface is a documented driver of physical aggregation in peptide solutions.<sup>[4]</sup></li>
      </ul>

      <h2>What actively destroys peptides</h2>
      <ul>
        <li><strong>Heat excursions.</strong> A vial left on a desk over a warm weekend accumulates degradation that cannot be reversed by returning it to the fridge.</li>
        <li><strong>Light, especially UV.</strong> Drives oxidation of Met, Trp, Cys.</li>
        <li><strong>Shaking and vortexing.</strong> Generate foam and shear at the air–liquid interface.</li>
        <li><strong>Repeated needle entries without aseptic technique.</strong> Microbial ingress neutralises the bacteriostatic preservative budget over time.</li>
        <li><strong>Repeated freeze–thaw of aqueous solutions.</strong> See ref [3].</li>
      </ul>

      <h2>Shipping considerations</h2>
      <p>Lyophilised peptides tolerate brief excursions to UK ambient temperatures during Royal Mail Tracked transit; the dry powder format means the dominant solution-phase degradation pathways are not active. On arrival, move vials directly to refrigeration (short-term use) or freezer storage (long-term).</p>

      <h2>References</h2>
      <ol class="references">
        <li>Manning, M. C. et al. <em>Stability of Protein Pharmaceuticals: An Update.</em> Pharm. Res. 27, 544–575 (2010).</li>
        <li>Strickley, R. G. & Lambert, W. J. <em>A review of formulations of commercially available antibodies.</em> J. Pharm. Sci. 110, 2590–2608 (2021).</li>
        <li>Hawe, A. et al. <em>Forced degradation of therapeutic proteins.</em> J. Pharm. Sci. 101, 895–913 (2012).</li>
        <li>Wang, W. <em>Protein aggregation and its inhibition in biopharmaceutics.</em> Int. J. Pharm. 289, 1–30 (2005).</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption.</p>
    `,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
