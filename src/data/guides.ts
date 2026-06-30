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

  {
    slug: 'choosing-bacteriostatic-water-uk',
    title: 'Choosing the Right Bacteriostatic Water for Peptide Reconstitution',
    description:
      'Why bacteriostatic water with 0.9% benzyl alcohol is the standard diluent for multi-dose peptide vials, and how it compares to sterile water for injection and saline.',
    excerpt:
      'Not all "water" is the same diluent. This guide explains why bacteriostatic water — and specifically 0.9% benzyl alcohol formulations — is the standard for multi-dose research peptide vials.',
    readTime: '6 min read',
    category: 'Lab Basics',
    publishedAt: '2026-06-22',
    keywords: [
      'bacteriostatic water UK',
      'benzyl alcohol diluent',
      'peptide reconstitution water',
      'BWFI vs SWFI',
    ],
    contentHtml: `
      <p>The choice of diluent is one of the few reconstitution variables that the published literature is genuinely consistent on. For multi-dose research peptide vials punctured repeatedly over days or weeks, the standard diluent is <strong>bacteriostatic water for injection (BWFI) containing 0.9% benzyl alcohol</strong>. This article explains why, and where the alternatives belong.</p>

      <h2>Bacteriostatic water (BWFI) — 0.9% benzyl alcohol</h2>
      <p>BWFI is sterile water containing 0.9% w/v benzyl alcohol as an antimicrobial preservative. Benzyl alcohol is bacteriostatic against the common ingress organisms (<em>Staphylococcus aureus</em>, <em>Escherichia coli</em>, <em>Pseudomonas aeruginosa</em>, <em>Candida albicans</em>) at this concentration.<sup>[1]</sup> Crucially, its preservative capacity is what allows USP &lt;1207&gt; to designate BWFI-reconstituted multi-dose vials with an in-use period of up to 28 days under refrigeration, depending on entry frequency.<sup>[2]</sup></p>

      <p>For a research vial punctured every 1–3 days for several weeks, no other commonly available diluent provides the same antimicrobial budget without introducing other problems.</p>

      <h2>Sterile water for injection (SWFI) — no preservative</h2>
      <p>SWFI contains no preservative. It is intended for <strong>single-use</strong> reconstitution where the entire vial is used immediately or discarded. Using SWFI in a multi-dose research workflow creates a measurable microbial-growth risk after the first puncture, because there is nothing in solution to inhibit organisms introduced by needle or air contact.</p>

      <p>SWFI has a legitimate niche — single-dose vials, ultra-short reconstituted lifetimes, or peptides with documented benzyl alcohol incompatibility (rare; mostly highly hydrophobic sequences where solubility behaviour changes). For routine multi-dose research peptide work, it is the wrong default.</p>

      <h2>Saline (0.9% NaCl) — usually unsuitable</h2>
      <p>Sodium chloride solutions are not appropriate for general peptide reconstitution. Chloride ions can accelerate degradation of certain sequences (oxidation- and hydrolysis-sensitive residues), the ionic strength can shift solubility for some peptides, and saline contains no preservative. The pharmacological convention of saline as a diluent applies to small-molecule injectables, not lyophilised peptide vials intended for multi-day use.</p>

      <h2>What "0.9%" actually means and why it matters</h2>
      <p>0.9% benzyl alcohol is the standard pharmacopoeial concentration. Some products are sold at higher concentrations (1.5–2%) for specific compounding workflows — these are not interchangeable with standard BWFI and can be unnecessarily harsh on more sensitive peptides. When buying BWFI, check the label states <strong>"0.9% benzyl alcohol"</strong> and is from a recognised pharmaceutical-grade manufacturer (Hospira/Pfizer being the most common reference product in the UK and US markets).</p>

      <h2>Practical buying checklist</h2>
      <ul>
        <li><strong>Diluent:</strong> Bacteriostatic water for injection, USP.</li>
        <li><strong>Preservative:</strong> 0.9% benzyl alcohol — not 1.5%, not "preservative-free".</li>
        <li><strong>Vial size:</strong> 10 ml or 30 ml — match it to your weekly throughput so you finish a vial inside its 28-day in-use window.</li>
        <li><strong>Sealed sterile packaging</strong> with intact septum and visible expiry date.</li>
        <li><strong>Cold-chain shipping not required.</strong> BWFI is stable at room temperature until the seal is broken.</li>
      </ul>

      <h2>In-use stability and the 28-day rule</h2>
      <p>Once punctured, a multi-dose BWFI vial has a documented in-use period of up to 28 days at 2–8 °C. The same window applies as a sensible upper bound to most BWFI-reconstituted peptides — but the rate-limiting factor becomes the peptide's own stability, not the diluent's preservative budget. Copper peptides (GHK-Cu) and some growth-hormone secretagogue blends degrade faster than 28 days; check the peptide-specific guidance.</p>

      <h2>Cautions and contraindications</h2>
      <p>Benzyl alcohol has well-documented toxicity in neonates ("gasping syndrome") at the doses used in clinical practice — this is why BWFI is not used in neonatal pharmacy. The doses involved in research peptide reconstitution are several orders of magnitude lower, but the toxicology context is worth knowing.</p>

      <h2>References</h2>
      <ol class="references">
        <li>Meyer, B. K. et al. <em>Antimicrobial preservative use in parenteral products.</em> J. Pharm. Sci. 96, 3155–3167 (2007).</li>
        <li>United States Pharmacopeia. <em>USP &lt;1207&gt; Package Integrity Evaluation — Sterile Products.</em></li>
        <li>Manning, M. C. et al. <em>Stability of Protein Pharmaceuticals: An Update.</em> Pharm. Res. 27, 544–575 (2010).</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption.</p>
    `,
  },

  {
    slug: 'melanotan-2-research-overview',
    title: 'Melanotan II (MT-2): A Research Overview',
    description:
      'Research-grade overview of Melanotan II — melanocortin receptor pharmacology, the published peer-reviewed clinical data on pigmentation and erectile function, and documented adverse-event profile.',
    excerpt:
      'MT-2 has a small but real peer-reviewed evidence base spanning melanocortin pharmacology, pigmentation studies, and erectile-function trials. Here is what the literature actually shows.',
    readTime: '9 min read',
    category: 'Peptide Research',
    publishedAt: '2026-06-25',
    keywords: [
      'Melanotan 2 research',
      'MT-2 mechanism',
      'melanocortin receptor agonist',
      'MT-2 clinical data',
    ],
    contentHtml: `
      <p>Melanotan II (MT-2) is a synthetic cyclic heptapeptide analogue of α-melanocyte-stimulating hormone (α-MSH), originally developed at the University of Arizona in the 1980s as a non-selective melanocortin receptor agonist.<sup>[1]</sup> This article summarises the published pharmacology, the clinical trial record, and the adverse-event profile recorded in the peer-reviewed literature.</p>

      <h2>Structure and pharmacology</h2>
      <p>MT-2 is a cyclic peptide (Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH₂) that binds with high affinity to all five human melanocortin receptors (MC1R–MC5R). It is non-selective, in contrast to its linear cousin afamelanotide (Scenesse), which targets MC1R more selectively. Receptor activation drives:<sup>[1][2]</sup></p>
      <ul>
        <li><strong>MC1R</strong> — eumelanin synthesis in cutaneous melanocytes (pigmentation).</li>
        <li><strong>MC3R / MC4R</strong> — central nervous system effects on appetite, sexual function and energy expenditure.</li>
        <li><strong>MC5R</strong> — exocrine gland function (sebum, sweat).</li>
      </ul>

      <h2>Published clinical data — pigmentation</h2>
      <p>The early pigmentation studies were small Phase I/II trials in healthy volunteers conducted in the 1990s. Repeated subcutaneous administration produced measurable, dose-dependent increases in cutaneous melanin density assessed by reflectance spectrophotometry, with skin darkening visible across all Fitzpatrick types and most pronounced in II–III.<sup>[3]</sup> Pigmentation was not uniform: nevi, freckles and pre-existing pigmented lesions darkened disproportionately — a finding that recurs in the adverse-event record (see below).</p>

      <h2>Published clinical data — erectile function</h2>
      <p>Two randomised placebo-controlled crossover trials by Wessells et al. (1998, 2000) evaluated MT-2 in men with psychogenic and organic erectile dysfunction. Both reported statistically significant increases in penile rigidity (RigiScan-measured) and subjective erectile response versus placebo, mediated centrally via MC4R rather than peripherally.<sup>[4][5]</sup> Development as an ED therapeutic did not advance, in large part because of the adverse-event profile.</p>

      <h2>Documented adverse-event profile</h2>
      <p>The published trials and subsequent case-report literature consistently describe:</p>
      <ul>
        <li><strong>Nausea and facial flushing</strong> — dose-related, especially during titration, and the most common reason participants discontinued in early trials.<sup>[3][4]</sup></li>
        <li><strong>Spontaneous penile erections</strong> in male participants — frequently dose-limiting in the pigmentation studies.</li>
        <li><strong>Darkening and proliferation of melanocytic nevi.</strong> Multiple case reports and dermatology case series have documented new or changing pigmented lesions in MT-2 users, including reports of melanoma in young users; causation is debated but the signal is consistent enough that dermatology consensus recommends pre- and post-use mole mapping.<sup>[6]</sup></li>
        <li><strong>Posterior reversible encephalopathy syndrome (PRES)</strong> and rhabdomyolysis have been reported in isolated cases of high-dose unsupervised use.<sup>[7]</sup></li>
      </ul>

      <h2>Regulatory status</h2>
      <p>MT-2 is not approved as a medicine in the UK, EU or US. The only licensed melanocortin agonist in clinical practice is <strong>afamelanotide (Scenesse)</strong>, a more MC1R-selective linear analogue, approved by the EMA and FDA for erythropoietic protoporphyria. MT-2 itself is sold only as a research compound.</p>

      <h2>What the literature does not support</h2>
      <ul>
        <li>"Sunless" tanning without any UV exposure — published pigmentation protocols pair MT-2 with controlled UV exposure to stimulate melanogenesis, and pigmentation regresses over weeks once dosing stops.</li>
        <li>Weight-loss claims — MC4R agonism has anorectic effects, but no controlled trial has evaluated MT-2 as a weight-loss agent in humans, and the adverse-event profile makes this a dead end.</li>
        <li>Long-term safety — no clinical study has followed MT-2 users for more than weeks-to-months. The dermatology case-report literature is the only long-term signal available.</li>
      </ul>

      <h2>References</h2>
      <ol class="references">
        <li>Dorr, R. T. et al. <em>Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide.</em> Life Sci. 58, 1777–1784 (1996).</li>
        <li>Hadley, M. E. & Dorr, R. T. <em>Melanocortin peptide therapeutics: historical milestones, clinical studies and commercialization.</em> Peptides 27, 921–930 (2006).</li>
        <li>Levine, N. et al. <em>Induction of skin tanning by subcutaneous administration of a potent synthetic melanotropin.</em> JAMA 266, 2730–2736 (1991).</li>
        <li>Wessells, H. et al. <em>Synthetic melanotropic peptide initiates erections in men with psychogenic erectile dysfunction.</em> J. Urol. 160, 389–393 (1998).</li>
        <li>Wessells, H. et al. <em>Effect of an alpha-melanocyte stimulating hormone analog on penile erection and sexual desire in men with organic erectile dysfunction.</em> Urology 56, 641–646 (2000).</li>
        <li>Cardones, A. R. G. & Grichnik, J. M. <em>α-Melanocyte-stimulating hormone-induced eruptive nevi.</em> Arch. Dermatol. 145, 441–444 (2009).</li>
        <li>Devoto, M. et al. <em>Posterior reversible encephalopathy syndrome associated with Melanotan II.</em> Case reports, Neurology 2018–2022.</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption. The information above is a summary of published clinical literature, not medical or dosing advice.</p>
    `,
  },

  {
    slug: 'tesamorelin-research-overview',
    title: 'Tesamorelin: A Research Overview',
    description:
      'Evidence-based overview of tesamorelin — GHRH analogue pharmacology, the pivotal Phase III trials in HIV-associated lipodystrophy, and the published metabolic and cognitive outcomes.',
    excerpt:
      'Tesamorelin is one of the few GHRH analogues with FDA-approved Phase III evidence. This guide summarises the pivotal trial data and what the literature shows beyond visceral fat reduction.',
    readTime: '8 min read',
    category: 'Peptide Research',
    publishedAt: '2026-06-28',
    keywords: [
      'Tesamorelin research',
      'GHRH analogue',
      'tesamorelin clinical trials',
      'visceral adipose tissue reduction',
    ],
    contentHtml: `
      <p>Tesamorelin is a synthetic analogue of growth hormone-releasing hormone (GHRH) — specifically, a 44-amino-acid peptide with an N-terminal trans-3-hexenoyl moiety that resists DPP-IV degradation, giving it a meaningfully longer plasma half-life than native GHRH.<sup>[1]</sup> Unlike direct GH or IGF-1 administration, tesamorelin works <em>upstream</em>: it stimulates the pituitary to release endogenous GH in a pulsatile pattern that preserves negative-feedback regulation.</p>

      <h2>Regulatory and clinical context</h2>
      <p>Tesamorelin (brand name Egrifta) was approved by the US FDA in 2010 for the treatment of <strong>excess abdominal fat in HIV-infected patients with lipodystrophy</strong> — making it one of the very few GHRH analogues to clear a full Phase III programme. It is not approved in the UK or EU but remains widely studied as a research peptide.</p>

      <h2>The pivotal Phase III trials</h2>
      <p>Two multicentre, randomised, double-blind, placebo-controlled trials — Falutz et al. (2007) and Falutz et al. (2010) — established the efficacy and safety profile.<sup>[2][3]</sup> Combined design:</p>
      <ul>
        <li>~800 HIV-positive adults with lipodystrophy and excess visceral adipose tissue (VAT).</li>
        <li>2 mg subcutaneous tesamorelin daily vs placebo for 26 weeks, with a 26-week extension.</li>
        <li>Primary endpoint: % change in CT-measured VAT.</li>
      </ul>
      <p>Results:</p>
      <ul>
        <li><strong>~15–18% reduction in VAT</strong> at 26 weeks vs ~5% with placebo (statistically significant, p&lt;0.001).<sup>[2][3]</sup></li>
        <li>Improvement in patient-reported body image and trunk-to-limb fat ratio.</li>
        <li>Reductions in triglycerides and total cholesterol; modest improvement in adiponectin.</li>
        <li>IGF-1 rose into the upper end of the age-adjusted reference range — pharmacologically expected and the basis for monitoring.</li>
        <li>VAT regained on cessation, indicating ongoing therapy is required to sustain effect.</li>
      </ul>

      <h2>Beyond visceral fat — published secondary outcomes</h2>
      <p>Subsequent investigator-initiated studies have evaluated tesamorelin in non-HIV populations and reported the following peer-reviewed findings:</p>
      <ul>
        <li><strong>Hepatic steatosis (NAFLD).</strong> A randomised trial in HIV-positive adults with NAFLD (Stanley et al., 2014) reported a statistically significant reduction in liver fat fraction measured by MRS after 12 months of tesamorelin.<sup>[4]</sup></li>
        <li><strong>Cognitive endpoints.</strong> A 20-week randomised trial in older adults (Baker et al., 2012) reported modest improvements in executive function and verbal memory, hypothesised to be mediated by restored physiological GH/IGF-1 signalling.<sup>[5]</sup></li>
        <li><strong>Body composition in healthy older adults.</strong> Smaller open-label work has documented reductions in trunk fat and preservation of lean mass, consistent with the HIV trial signal.</li>
      </ul>

      <h2>Adverse-event profile from the Phase III record</h2>
      <ul>
        <li><strong>Injection-site reactions</strong> — most common; usually mild erythema and pruritus.</li>
        <li><strong>Arthralgia and peripheral oedema</strong> — typical class effects of restored GH signalling; usually dose-related and self-limiting.</li>
        <li><strong>Glucose dysregulation.</strong> A modest reduction in insulin sensitivity was observed; HbA1c rose by ~0.1–0.2 percentage points across the trial population.<sup>[2][3]</sup> Patients with pre-existing diabetes require monitoring.</li>
        <li><strong>IGF-1 elevation.</strong> Sustained IGF-1 above the age-adjusted reference range is the principal contraindication for ongoing therapy; the trial protocol included scheduled IGF-1 monitoring with dose adjustment.</li>
        <li><strong>Contraindicated in active malignancy</strong> — the theoretical concern that elevated IGF-1 could accelerate occult tumour growth is the basis for the formal exclusion.</li>
      </ul>

      <h2>Pharmacokinetics and dosing in the trials</h2>
      <ul>
        <li>Subcutaneous 2 mg once daily (abdominal injection) was the dose used across both Phase III trials.</li>
        <li>Plasma half-life: ~25–40 minutes (the GH pulse it triggers is the pharmacologically relevant signal, not the parent compound's residence time).</li>
        <li>Steady-state effect on VAT requires 12–26 weeks of continuous administration; effect regresses on cessation.</li>
      </ul>

      <h2>What the literature does <em>not</em> support</h2>
      <ul>
        <li>Tesamorelin as a general-population weight-loss agent — the Phase III population was specifically HIV lipodystrophy.</li>
        <li>Replacement for incretin therapies (Tirzepatide / Retatrutide) for obesity — different mechanism, different magnitude of effect.</li>
        <li>Performance enhancement claims — the IGF-1 signal is real but the published evidence in healthy young adults is thin.</li>
      </ul>

      <h2>References</h2>
      <ol class="references">
        <li>Ferdinandi, E. S. et al. <em>Non-clinical pharmacology and safety evaluation of TH9507, a human growth hormone-releasing factor analogue.</em> Basic Clin. Pharmacol. Toxicol. 100, 49–58 (2007).</li>
        <li>Falutz, J. et al. <em>Metabolic effects of a growth hormone-releasing factor in patients with HIV.</em> N. Engl. J. Med. 357, 2359–2370 (2007).</li>
        <li>Falutz, J. et al. <em>Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in HIV-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials.</em> J. Clin. Endocrinol. Metab. 95, 4291–4304 (2010).</li>
        <li>Stanley, T. L. et al. <em>Reduction in visceral adiposity is associated with an improved metabolic profile in HIV-infected patients receiving tesamorelin.</em> Clin. Infect. Dis. 54, 1642–1651 (2012); follow-up NAFLD work, JAMA 2014.</li>
        <li>Baker, L. D. et al. <em>Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults.</em> Arch. Neurol. 69, 1420–1429 (2012).</li>
      </ol>

      <p class="disclaimer">For in-vitro research use only. Not for human consumption. This is a summary of published clinical literature, not medical or dosing advice.</p>
    `,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
