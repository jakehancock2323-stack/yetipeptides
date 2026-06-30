import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FaqItem } from '@/data/productFaqs';
import { HelpCircle } from 'lucide-react';

interface Props {
  faqs: FaqItem[];
  productName: string;
}

export default function ProductFAQ({ faqs, productName }: Props) {
  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section className="mt-14 border-t border-border/30 pt-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex items-center gap-2 mb-5">
        <HelpCircle className="w-4 h-4 text-ice-blue" />
        <h2 className="text-xl md:text-2xl font-bold">{productName} — Frequently Asked</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
            <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:text-ice-blue">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
