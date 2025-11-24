import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I complete payment?",
    answer: "After placing your order, you will receive an email with detailed payment instructions including the cryptocurrency wallet address and exact amount to send. Once payment is confirmed, your order will be processed and shipped."
  },
  {
    question: "What are shipping costs?",
    answer: "A flat delivery charge of $65 USD is applied to all orders, regardless of size or destination. This covers secure, discreet packaging and worldwide shipping with tracking."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 7-14 business days for domestic orders and 14-21 business days for international orders. All orders include tracking information sent to your email."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments including Bitcoin (BTC), Ethereum (ETH), and USDT. Payment instructions will be provided after checkout."
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Orders can be modified or cancelled within 24 hours of placement. After this time, orders are processed and cannot be changed. Please contact us immediately via email or Telegram if you need to modify your order."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide to most countries. Please note that import regulations vary by country and customers are responsible for ensuring compliance with local laws regarding research peptides."
  }
];

export default function FAQ() {
  return (
    <section className="py-12 sm:py-20 px-4 border-t border-border">
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
