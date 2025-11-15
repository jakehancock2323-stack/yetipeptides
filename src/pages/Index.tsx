import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import { Activity, Brain, Dumbbell, Heart, Plus, Sparkles } from 'lucide-react';

export default function Index() {
  const categories = [
    { name: 'Weight Loss', icon: Activity, color: 'from-blue-400 to-cyan-400' },
    { name: 'Muscle Growth & Recovery', icon: Dumbbell, color: 'from-purple-400 to-pink-400' },
    { name: 'Cognitive Enhancement', icon: Brain, color: 'from-green-400 to-emerald-400' },
    { name: 'Sexual Health', icon: Heart, color: 'from-red-400 to-rose-400' },
    { name: 'General Health', icon: Plus, color: 'from-yellow-400 to-amber-400' },
    { name: 'Other / Speciality', icon: Sparkles, color: 'from-indigo-400 to-violet-400' }
  ];

  return (
    <div className="min-h-screen">
      <Snowfall />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 winter-gradient">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
            Power. Precision. Performance.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Premium Research Peptides & Advanced Wellness Compounds
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="frosted-glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Yeti Peptides</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>✓ High-quality COA-verified research peptides</p>
              <p>✓ Worldwide delivery with discreet packaging</p>
              <p>✓ Strong vendor reputation in the research community</p>
              <p>✓ Friendly, reliable customer service</p>
              <p>✓ Community-driven brand focused on quality and transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
