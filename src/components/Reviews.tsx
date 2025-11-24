import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Dr. Marcus Chen",
    location: "California, USA",
    rating: 5,
    text: "Outstanding quality and purity. COA verification matches perfectly with our lab testing. Yeti Peptides has become our primary supplier for all research compounds.",
    date: "2 weeks ago"
  },
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    rating: 5,
    text: "Fast international shipping and excellent customer service. The packaging is discreet and professional. Highly recommend for serious researchers.",
    date: "1 month ago"
  },
  {
    name: "Alex Rodriguez",
    location: "Texas, USA",
    rating: 5,
    text: "Been ordering for 6 months now. Consistent quality every single time. The Discord community is also incredibly helpful and responsive.",
    date: "3 weeks ago"
  },
  {
    name: "Emma Thompson",
    location: "Sydney, Australia",
    rating: 5,
    text: "Impressed with the product range and competitive pricing. The Tirzepatide quality is exceptional. Will definitely be a repeat customer.",
    date: "2 months ago"
  },
  {
    name: "James Wilson",
    location: "Toronto, Canada",
    rating: 5,
    text: "Professional operation from start to finish. Payment process was smooth, shipping was tracked, and products arrived exactly as described.",
    date: "1 week ago"
  },
  {
    name: "Lisa Kumar",
    location: "Mumbai, India",
    rating: 5,
    text: "Reliable worldwide shipping even to India. Products are pharmaceutical grade and properly stored. The research community trusts them for good reason.",
    date: "3 months ago"
  }
];

export default function Reviews() {
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent">
            Trusted by Researchers Worldwide
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="frosted-glass rounded-lg p-4 sm:p-6 hover:ice-glow transition-all duration-300 flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-[hsl(var(--ice-blue))] text-[hsl(var(--ice-blue))]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 flex-1 leading-relaxed">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-border pt-3 sm:pt-4">
                <p className="font-semibold text-sm sm:text-base">{review.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="frosted-glass rounded-lg p-4 sm:p-6 max-w-2xl mx-auto border border-[hsl(var(--ice-blue))]/30">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-[hsl(var(--ice-blue))] text-[hsl(var(--ice-blue))]" />
              <span className="text-2xl sm:text-3xl font-bold">5.0</span>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-[hsl(var(--ice-blue))] text-[hsl(var(--ice-blue))]" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Average rating from <span className="font-semibold text-foreground">500+</span> verified researchers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
