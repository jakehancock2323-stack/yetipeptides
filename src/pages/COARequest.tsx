import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FileText, ShieldCheck } from 'lucide-react';
import { products } from '@/data/products';

export default function COARequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    batchNumber: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.product) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('COA request submitted! We will email you shortly.');
      setFormData({ name: '', email: '', product: '', batchNumber: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pb-20">
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
                <Label htmlFor="product">Product *</Label>
                <Select value={formData.product} onValueChange={(value) => handleChange('product', value)}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="batchNumber">Batch Number (Optional)</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => handleChange('batchNumber', e.target.value)}
                  placeholder="If known, enter batch number"
                />
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
