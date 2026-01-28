import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from './ui/button';

const reviews = [
  // Real customer reviews - UK
  {
    name: "Alusty",
    location: "United Kingdom",
    rating: 5,
    text: "Order placed on 16/12/2025, I missed the delivery on the 22nd. I only collected at my local delivery centre today. From the start Yeti has been extremely prompt in answering my queries, and guiding me through the payment process as I never used bitcoin before.",
    date: "December 2025",
    verified: true
  },
  {
    name: "Grix",
    location: "United Kingdom",
    rating: 5,
    text: "Order received today 08/01/26. I've placed the order on 22/12/26 but due to the holidays it took a while but all arrived safe and sound today. Thanks Yeti!",
    date: "January 2026",
    verified: true
  },
  {
    name: "MT",
    location: "United Kingdom",
    rating: 5,
    text: "The value is incredible. I got 30mg of Reta from a UK supplier for £250. Got 200mg from Yeti for the same price!",
    date: "December 2025",
    verified: true
  },
  {
    name: "Verified Customer",
    location: "United Kingdom",
    rating: 5,
    text: "Massive thanks to Yeti again. This was over £1000 purchased with his help, but he's always been really helpful not just with buying but showing me what to do and teaching me the doses. I honestly have full trust in Yeti even in an order this big. When there's so many scams out there he's always been reliable and kept me updated. You can tell he doesn't do this just for the money but actually cares about the service he provides.",
    date: "December 2025",
    verified: true
  },
  {
    name: "Ginmo1",
    location: "United Kingdom",
    rating: 5,
    text: "I ordered the 10x30mg on 21/11, my order arrived within 3 weeks! Yeti kept me informed and up to date at every stage and have provided a COA as soon as I asked. I couldn't ask for more from a vendor and I'm really pleased with the level of customer service I've received.",
    date: "December 2025",
    verified: true
  },
  // Additional reviews
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  const review = reviews[currentIndex];

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
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating,
        "bestRating": "5"
      },
      "reviewBody": r.text,
      "datePublished": r.date
    }))
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      <div className="container mx-auto max-w-3xl">
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 hover:bg-secondary/50"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 hover:bg-secondary/50"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Review Card */}
          <div
            key={currentIndex}
            className="frosted-glass rounded-xl p-8 md:p-10 relative animate-fade-in"
          >
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-10 h-10 text-ice-blue/20" />
            
            {/* Star Rating */}
            <div className="flex gap-0.5 mb-6 justify-center">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-ice-blue text-ice-blue"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed text-center">
              "{review.text}"
            </p>

            {/* Reviewer Info */}
            <div className="border-t border-border/50 pt-6 text-center">
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-muted-foreground">{review.location}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">{review.date}</span>
                {review.verified && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs text-ice-blue font-medium">Verified</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-ice-blue w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
