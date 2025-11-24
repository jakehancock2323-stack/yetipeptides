import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Rush",
    location: "USA",
    rating: 5,
    text: "Absolutely impressed with this vendor! The product quality was amazing and exactly as described. Shipping was convenient and fast, and the tracking updates were clear and consistent the entire way. Customer service was easily the best I've experienced—they responded quickly and were super helpful with all questions. Highly recommend and will for sure order again!",
    date: "November 2024"
  },
  {
    name: "Anonymous",
    location: "USA",
    rating: 5,
    text: "This vendor was recommended to me and, my word, was it a good recommendation! I had no prior knowledge of peptides so I learnt a lot there, but I also lacked any experience with crypto. To be honest, I found it a bit daunting. But Yeti was there to 'hold my hand' every step of the way and I'm now competent to send and receive crypto, which was bonus! The goods arrived exactly as described, with tracking provided, and the delivery time was faster than expected. So, a great introduction, and I will be back to buy more. Many thanks indeed.",
    date: "November 2024"
  },
  {
    name: "HB",
    location: "USA",
    rating: 5,
    text: "Yeti...provided OUTSTANDING CUSTOMER SERVICE, very knowledgeable and professional. Response to communications in a timely manner. Truly 5 STARS",
    date: "November 2024"
  },
  {
    name: "Oliver",
    location: "Manchester, UK",
    rating: 5,
    text: "Ordered Retatrutide for research purposes and couldn't be happier. Product arrived within 10 days to the UK, well packaged and temperature controlled. The quality is excellent and results match the COA perfectly. Will definitely be ordering again.",
    date: "2 weeks ago"
  },
  {
    name: "Fiona",
    location: "Edinburgh, UK",
    rating: 5,
    text: "Been researching with their Retatrutide for the past 3 months. Consistently high quality, no issues whatsoever. Customer support answered all my questions about storage and reconstitution. Best supplier I've found for UK delivery.",
    date: "1 month ago"
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
      </div>
    </section>
  );
}
