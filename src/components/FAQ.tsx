import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments including USDT and USDC. Payment instructions will be provided after checkout. Crypto payments ensure secure, private transactions for our customers."
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
    <section className="py-20 px-4 border-t border-border/20">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto max-w-3xl">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">
            Find answers to common questions about ordering, shipping, and payments
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll delay={150} animation="scale-in">
          <div className="frosted-glass rounded-xl p-5 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/20">
                  <AccordionTrigger className="text-left hover:text-ice-blue transition-colors text-sm py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
