import { Star, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const reviews = [
  {
    name: "Dr. R. Thompson",
    location: "Research Institute, USA",
    rating: 5,
    text: "Exceptional quality peptides with comprehensive COA documentation. The purity levels match exactly what's stated, and the cold-chain shipping ensured product integrity. Will continue ordering for our research programs.",
    date: "November 2024",
    verified: true
  },
  {
    name: "Laboratory Services UK",
    location: "Manchester, UK",
    rating: 5,
    text: "We've been sourcing from Yeti Peptides for our research facility. Consistent batch quality, reliable delivery times, and responsive technical support. The COA verification process is straightforward.",
    date: "November 2024",
    verified: true
  },
  {
    name: "Anonymous Researcher",
    location: "Germany",
    rating: 5,
    text: "Professional service from start to finish. Ordering process was simple, payment was secure, and the peptides arrived in excellent condition. Documentation was thorough and met our compliance requirements.",
    date: "October 2024",
    verified: true
  },
  {
    name: "Oliver M.",
    location: "Edinburgh, UK",
    rating: 5,
    text: "Ordered Retatrutide for research purposes. Product arrived within 10 days, well packaged with cold packs. The quality is excellent and analytical results match the COA. Reliable supplier.",
    date: "October 2024",
    verified: true
  },
  {
    name: "BioResearch Labs",
    location: "Netherlands",
    rating: 5,
    text: "Yeti Peptides has become our preferred supplier for GLP-1 compounds. Competitive pricing, consistent quality, and the customer service team is knowledgeable and helpful with enquiries.",
    date: "September 2024",
    verified: true
  },
  {
    name: "F. Schmidt",
    location: "Austria",
    rating: 5,
    text: "Third order with this supplier. Each time the products have been exactly as described, properly packaged, and delivered within the estimated timeframe. Highly recommend for research applications.",
    date: "September 2024",
    verified: true
  }
];

export default function Reviews() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Yeti Peptides Research-Grade Peptides",
    "description": "Premium research-grade peptide compounds for laboratory use",
    "brand": {
      "@type": "Brand",
      "name": "Yeti Peptides"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "4"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "reviewBody": review.text,
      "datePublished": review.date
    }))
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reviews & Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback from researchers and laboratories worldwide
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-ice-blue text-ice-blue" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">5.0 average from {reviews.length} reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 flex flex-col relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-ice-blue/20" />
              
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-ice-blue text-ice-blue"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                    {review.verified && (
                      <span className="text-xs text-ice-blue font-medium">Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}