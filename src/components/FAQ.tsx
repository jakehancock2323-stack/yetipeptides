import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from 'react-helmet-async';

const faqs = [
  // Ordering & Payment
  {
    question: "How do I complete payment?",
    answer: "After placing your order, you will receive an email with detailed payment instructions including the cryptocurrency wallet address and exact amount to send. Once payment is confirmed, your order will be processed and shipped."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments including Bitcoin (BTC), USDT, and USDC. Payment instructions will be provided after checkout. Crypto payments ensure secure, private transactions for our customers."
  },
  {
    question: "Is there a minimum order value?",
    answer: "There is no minimum order value. You can order any quantity of products. However, please note that all orders are subject to a flat $65 USD delivery charge which covers worldwide tracked shipping."
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Orders can be modified or cancelled within 24 hours of placement. After this time, orders are processed and cannot be changed. Please contact us immediately via email or Telegram if you need to modify your order."
  },
  {
    question: "Do you offer any discounts or promotions?",
    answer: "Yes, we occasionally offer promotional discount codes. Follow us on our Discord community to stay updated on any special offers. Discount codes can be applied at checkout."
  },
  // Shipping & Delivery
  {
    question: "What are shipping costs?",
    answer: "A flat delivery charge of $65 USD is applied to all orders, regardless of size or destination. This covers secure, discreet packaging and worldwide shipping with tracking."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 7-14 business days for domestic orders and 14-21 business days for international orders. All orders include tracking information sent to your email."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide to most countries. Please note that import regulations vary by country and customers are responsible for ensuring compliance with local laws regarding research peptides."
  },
  {
    question: "How is my order packaged?",
    answer: "All orders are shipped in plain, unmarked packaging with no external branding or indication of contents. Products are securely packed with appropriate temperature protection to maintain integrity during transit."
  },
  {
    question: "Will I receive tracking information?",
    answer: "Yes, once your order is dispatched, you will receive an email with full tracking details. You can monitor your shipment's progress from our facility to your delivery address."
  },
  // Products & Quality
  {
    question: "What purity are your peptides?",
    answer: "All our peptides are manufactured to a minimum purity of 99%+ as verified by HPLC analysis. Certificate of Analysis (COA) documentation is available upon request for any product."
  },
  {
    question: "How should I store the peptides?",
    answer: "Lyophilised (freeze-dried) peptides should be stored at -20°C and protected from light. After reconstitution, store at 2-8°C and use within 14 days. Avoid repeated freeze-thaw cycles."
  },
  {
    question: "What is lyophilised powder?",
    answer: "Lyophilisation (freeze-drying) is a process that removes water from the peptide while preserving its structure and stability. This results in a powder form that has excellent long-term stability when stored correctly."
  },
  {
    question: "How do I request a Certificate of Analysis (COA)?",
    answer: "You can request a COA through our dedicated COA Request page. Simply select the product(s) you need documentation for and submit your details. We typically respond within 24-48 hours with the relevant analytical data."
  },
  {
    question: "Are your products tested?",
    answer: "Yes, all products undergo rigorous quality control testing including HPLC for purity verification and mass spectrometry for molecular weight confirmation. This data is documented in our Certificates of Analysis."
  },
  // Research & Compliance
  {
    question: "Are these peptides for human use?",
    answer: "No. All products sold by Yeti Peptides are strictly for laboratory and research purposes only. They are not intended for human or veterinary use, and should only be handled by qualified researchers in appropriate settings."
  },
  {
    question: "Do I need any qualifications to order?",
    answer: "Our products are sold for research purposes. By placing an order, you confirm that you are purchasing for legitimate research use only and that you understand these products are not for human consumption."
  },
  // Support
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via email at yetipeptides@protonmail.com or through our Contact page. We also have an active Discord community where you can connect with our team and other researchers."
  },
  {
    question: "What if my order arrives damaged?",
    answer: "In the rare event that your order arrives damaged, please contact us immediately with photos of the damage. We will work with you to resolve the issue promptly, which may include replacement or refund depending on the circumstances."
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
