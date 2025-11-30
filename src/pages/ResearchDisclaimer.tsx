import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { AlertTriangle } from 'lucide-react';

export default function ResearchDisclaimer() {
  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Research Use Disclaimer - Laboratory Peptides Only"
        description="Important disclaimer: All peptides are for research use only. Not for human consumption. Read safety information and legal compliance requirements."
        keywords="research use only, laboratory peptides, research disclaimer, peptide safety information"
        canonical="https://yetipeptides.com/research-disclaimer"
      />
      <Snowfall />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 max-w-4xl">
        <div className="frosted-glass rounded-xl p-6 sm:p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <h1 className="text-3xl md:text-4xl font-bold">Research Use Disclaimer</h1>
          </div>
          
          <div className="space-y-6 text-muted-foreground">
            <div className="p-6 rounded-lg border-2 border-destructive bg-destructive/10">
              <p className="text-lg font-bold text-destructive mb-2">
                FOR RESEARCH USE ONLY – NOT FOR HUMAN CONSUMPTION
              </p>
              <p className="text-sm">
                All products sold by Yeti Peptides are strictly intended for laboratory research purposes only. 
                These products are NOT intended for human or animal consumption, diagnostic use, or therapeutic applications.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Legal Compliance</h2>
              <p>
                By purchasing products from Yeti Peptides, you confirm and agree that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>You are a qualified researcher, scientist, or authorized representative of a research institution</li>
                <li>You will use these products solely for in vitro research and laboratory studies</li>
                <li>You understand these products are not approved for human consumption or clinical use</li>
                <li>You comply with all applicable local, state, federal, and international laws and regulations</li>
                <li>You will not resell, redistribute, or misuse these products in any way</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Product Safety</h2>
              <p>
                All products should be handled with appropriate safety precautions:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Use proper personal protective equipment (PPE) when handling</li>
                <li>Store products according to specified conditions</li>
                <li>Dispose of materials in accordance with laboratory safety protocols</li>
                <li>Keep products out of reach of children and unauthorized individuals</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">No Medical Claims</h2>
              <p>
                Yeti Peptides makes no medical claims about any of our products. The information provided on our website, 
                product descriptions, and documentation is for research reference only and should not be construed as 
                medical advice or endorsement for any particular use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
              <p>
                Yeti Peptides shall not be held liable for any misuse of products, adverse effects, legal violations, 
                or any other consequences resulting from the purchase or use of our products. The buyer assumes all 
                responsibility and risk associated with the use, handling, and storage of these research compounds.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Age Requirement</h2>
              <p>
                You must be at least 18 years of age to purchase products from Yeti Peptides. By placing an order, 
                you confirm that you meet this age requirement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Acknowledgment</h2>
              <p>
                By proceeding with a purchase, you acknowledge that you have read, understood, and agree to comply 
                with this Research Use Disclaimer. If you do not agree with any part of this disclaimer, you must 
                not purchase or use any products from Yeti Peptides.
              </p>
            </section>

            <div className="pt-6 border-t border-border">
              <p className="text-sm">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm mt-4">
                For questions regarding this disclaimer, please contact us at{' '}
                <a href="mailto:yetipeptides@protonmail.com" className="text-[hsl(var(--ice-blue))] hover:underline">
                  yetipeptides@protonmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
