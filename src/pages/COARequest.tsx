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
import { FileText, ShieldCheck, Clock, Mail } from 'lucide-react';
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

      toast.success('COA request submitted successfully! We will email you within 24-48 hours.');
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

  const coaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "COA Request - Certificate of Analysis",
    "description": "Request Certificates of Analysis for Yeti Peptides research compounds. COA provided for research-use verification.",
    "url": "https://yetipeptides.com/coa-request"
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="COA Request - Certificate of Analysis | Yeti Peptides"
        description="Request Certificates of Analysis (COA) for research peptide verification. HPLC, MS, and analytical data available for all Yeti Peptides products."
        keywords="COA request, certificate of analysis, peptide COA, research peptide verification, HPLC analysis, peptide purity testing, laboratory documentation"
        canonical="https://yetipeptides.com/coa-request"
        schema={coaSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ice-blue to-glacier flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-background" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ice-blue to-frost bg-clip-text text-transparent">
              Certificate of Analysis Request
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              COA provided on request for research-use verification. Complete the form below and we will 
              email the relevant documentation to you.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="frosted-glass rounded-lg p-4 text-center">
              <ShieldCheck className="w-8 h-8 text-ice-blue mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Verified Data</h3>
              <p className="text-xs text-muted-foreground">HPLC & MS analysis</p>
            </div>
            <div className="frosted-glass rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-ice-blue mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Quick Response</h3>
              <p className="text-xs text-muted-foreground">24-48 hour processing</p>
            </div>
            <div className="frosted-glass rounded-lg p-4 text-center">
              <Mail className="w-8 h-8 text-ice-blue mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Email Delivery</h3>
              <p className="text-xs text-muted-foreground">PDF documentation</p>
            </div>
          </div>

          {/* Form */}
          <div className="frosted-glass rounded-xl p-6 md:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Your full name"
                    className="mt-1.5 bg-secondary/30"
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
                    className="mt-1.5 bg-secondary/30"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Select Product(s) *</Label>
                <div className="max-h-[280px] overflow-y-auto space-y-2 p-4 rounded-lg border border-border bg-secondary/20">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 py-1">
                      <Checkbox
                        id={product.id}
                        checked={selectedProducts.includes(product.name)}
                        onCheckedChange={() => handleProductToggle(product.name)}
                      />
                      <label
                        htmlFor={product.id}
                        className="text-sm font-medium leading-none cursor-pointer hover:text-ice-blue transition-colors flex-1"
                      >
                        {product.name}
                      </label>
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                    </div>
                  ))}
                </div>
                {selectedProducts.length > 0 && (
                  <p className="text-sm text-ice-blue mt-2">
                    Selected ({selectedProducts.length}): {selectedProducts.join(', ')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Any additional details, questions, or specific requirements..."
                  className="min-h-[100px] mt-1.5 bg-secondary/30"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold"
                size="lg"
              >
                {isSubmitting ? 'Submitting Request...' : 'Submit COA Request'}
              </Button>
            </form>
          </div>

          {/* Info Box */}
          <div className="frosted-glass rounded-xl p-6">
            <h3 className="font-semibold mb-3">What's Included in a COA?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong className="text-foreground">HPLC Analysis:</strong> Purity verification and impurity profiling</li>
              <li>• <strong className="text-foreground">Mass Spectrometry:</strong> Molecular weight confirmation</li>
              <li>• <strong className="text-foreground">Quality Specifications:</strong> Appearance, solubility, peptide content</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Response Time:</strong> COA requests are processed within 24-48 hours during business days. 
                For urgent requests, please email us directly at yetipeptides@protonmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}