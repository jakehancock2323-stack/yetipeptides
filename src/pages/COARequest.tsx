import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FileText, ShieldCheck } from 'lucide-react';
import { products } from '@/data/products';

export default function COARequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || selectedProducts.length === 0) {
      toast.error('Please fill in all required fields and select at least one product');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-coa-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          products: selectedProducts
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send COA request");
      }

      toast.success('COA request submitted successfully! We will email you shortly.');
      setFormData({ name: '', email: '', message: '' });
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error submitting COA request:", error);
      toast.error("Failed to submit request. Please try again or email us directly at yetipeptides@protonmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProductToggle = (productName: string) => {
    setSelectedProducts(prev => 
      prev.includes(productName) 
        ? prev.filter(p => p !== productName)
        : [...prev, productName]
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="COA Request - Certificate of Analysis | Research Peptides"
        description="Request Certificates of Analysis (COA) for Yeti Peptides research-grade compounds. HPLC, MS, and analytical data available for all products."
        keywords="COA request, certificate of analysis, peptide COA, research peptide verification, HPLC analysis, peptide purity testing"
        canonical="https://yetipeptides.com/coa-request"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-background" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
              Certificate of Analysis Request
            </h1>
            <p className="text-lg text-muted-foreground">
              Certificates of Analysis (COAs) are available on request for all products. Submit the form below and we will email the COA to you.
            </p>
          </div>

          <div className="frosted-glass rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 p-4 bg-[hsl(var(--ice-blue))]/10 rounded-lg border border-[hsl(var(--ice-blue))]/20">
              <ShieldCheck className="w-6 h-6 text-[hsl(var(--ice-blue))] flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                All our products are tested and verified for purity and quality. COAs typically contain HPLC, MS, and other analytical data.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label className="mb-3 block">Select Products * (one or more)</Label>
                <div className="max-h-[300px] overflow-y-auto space-y-2 p-4 rounded-md border border-input bg-background">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={product.id}
                        checked={selectedProducts.includes(product.name)}
                        onCheckedChange={() => handleProductToggle(product.name)}
                      />
                      <label
                        htmlFor={product.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {product.name}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedProducts.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedProducts.join(', ')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Any additional details or questions..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Request COA'}
              </Button>
            </form>
          </div>

          <div className="frosted-glass rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Response Time:</strong> COA requests are typically processed within 24-48 hours during business days.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
