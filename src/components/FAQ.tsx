import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments including Bitcoin (BTC), USDT, and USDC. Payment instructions will be provided after checkout. Crypto payments ensure secure, private transactions for our customers."
  },
  {
    question: "What are shipping costs and delivery times?",
    answer: "A flat delivery charge of $65 USD is applied to all orders worldwide. Shipping typically takes 7-14 business days for domestic orders and 14-21 business days for international orders. All orders include tracking information."
  },
  {
    question: "What purity are your peptides?",
    answer: "All our peptides are manufactured to a minimum purity of 99%+ as verified by HPLC analysis. Certificate of Analysis (COA) documentation is available upon request for any product."
  },
  {
    question: "How should I store the peptides?",
    answer: "Lyophilised (freeze-dried) peptides should be stored at -20°C and protected from light. After reconstitution, store at 2-8°C and use within 14 days. Avoid repeated freeze-thaw cycles."
  },
  {
    question: "Are these peptides for human use?",
    answer: "No. All products sold by Yeti Peptides are strictly for laboratory and research purposes only. They are not intended for human or veterinary use, and should only be handled by qualified researchers."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via email at yetipeptides@protonmail.com or through our Contact page. We also have an active Discord community where you can connect with our team."
  }
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 sm:py-20 px-4 border-t border-border">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
          Find answers to common questions about ordering, shipping, and payments
        </p>
        
        <div className="frosted-glass rounded-lg p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-[hsl(var(--ice-blue))] transition-colors text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
