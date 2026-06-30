import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, type Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ChevronLeft, ShoppingCart, Truck, ShieldCheck, FlaskConical, Clock } from 'lucide-react';
import { getProductImage } from '@/lib/productImages';
import { pushRecentlyViewed } from '@/lib/recentlyViewed';
import { isLowStock } from '@/lib/lowStock';
import { getProductFaqs } from '@/data/productFaqs';
import ProductFAQ from '@/components/ProductFAQ';
import ProductReviews from '@/components/ProductReviews';
import RelatedGuides from '@/components/RelatedGuides';
import RelatedProducts from '@/components/RelatedProducts';
import RecentlyViewed from '@/components/RecentlyViewed';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = useMemo<Product | undefined>(
    () => products.find((p) => p.id === slug),
    [slug]
  );

  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (product) pushRecentlyViewed(product.id);
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Snowfall />
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">This product is no longer in our UK catalogue.</p>
          <Button onClick={() => navigate('/products')}>Back to products</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const variant = product.variants[variantIndex];
  const productImage = getProductImage(product);
  const isOutOfStock =
    product.outOfStock ||
    product.comingSoon ||
    product.variants.every((v) => v.outOfStock) ||
    variant.outOfStock;
  const isPreOrder = !!product.preOrder;
  const canonical = `https://yetipeptides.com/products/${product.id}`;
  const seoTitle = `${product.name} ${product.variants[0].specification} – UK Research Peptide`;
  const description = `Buy ${product.name} (${product.variants
    .map((v) => v.specification)
    .join(', ')}) for UK research. Posted from West Yorkshire via Royal Mail Tracked or InPost. Crypto checkout.`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Yeti Peptides' },
    image: 'https://yetipeptides.com/og-image.png',
    offers: product.variants.map((v) => ({
      '@type': 'Offer',
      name: v.specification,
      priceCurrency: product.currency ?? 'GBP',
      price: v.price.toFixed(2),
      availability: v.outOfStock
        ? 'https://schema.org/OutOfStock'
        : product.preOrder
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
      url: canonical,
      seller: { '@type': 'Organization', name: 'Yeti Peptides' },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yetipeptides.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://yetipeptides.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonical },
    ],
  };

  const handleAddToCart = () => {
    const ok = addToCart(product, variant, quantity);
    if (ok) {
      toast.success(`Added ${quantity} × ${product.name} to cart`);
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Snowfall />
      <SEO
        title={seoTitle}
        description={description}
        canonical={canonical}
        type="product"
        keywords={`${product.name} UK, buy ${product.name}, ${product.name} research peptide, UK peptide supplier`}
        schema={productSchema}
      />
      {/* Breadcrumb JSON-LD (second schema script) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ice-blue">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-ice-blue">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ice-blue mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-2xl border border-ice-blue/20 bg-card/30 p-8 flex items-center justify-center min-h-[360px]">
            <img
              src={productImage}
              alt={`${product.name} research peptide vial — UK domestic`}
              className="max-h-[280px] object-contain"
            />
            {(() => {
              const { low, count } = isLowStock(product);
              if (low && count !== null) {
                return (
                  <span className="absolute top-4 right-4 text-[11px] uppercase tracking-wider font-bold text-amber-300 bg-amber-500/15 border border-amber-400/40 px-2.5 py-1 rounded animate-pulse">
                    Only {count} left
                  </span>
                );
              }
              return product.stockBadge ? (
                <span className="absolute top-4 right-4 text-[11px] uppercase tracking-wider font-bold text-ice-blue bg-ice-blue/10 border border-ice-blue/20 px-2.5 py-1 rounded">
                  {product.stockBadge}
                </span>
              ) : null;
            })()}
          </div>

          {/* Buy box */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-4xl font-bold text-ice-blue">£{variant.price}</span>
              <span className="text-sm text-muted-foreground">{variant.specification}</span>
            </div>

            {product.ingredients && (
              <div className="mb-5">
                <h2 className="text-sm font-semibold mb-2">Blend ingredients</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.ingredients.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.variants.length > 1 && (
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Variant</label>
                <Select value={variantIndex.toString()} onValueChange={(v) => setVariantIndex(parseInt(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {product.variants.map((v, i) => (
                      <SelectItem key={i} value={i.toString()} disabled={v.outOfStock}>
                        {v.specification} — £{v.price}{v.outOfStock ? ' (Out of Stock)' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2 mb-6">
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20"
                disabled={isOutOfStock && !isPreOrder}
              />
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock && !isPreOrder}
                className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold gap-2"
              >
                {isOutOfStock && !isPreOrder ? (
                  product.comingSoon ? <>Coming Soon</> : <>Out of Stock</>
                ) : (
                  <>
                    {isPreOrder ? <Clock className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    {isPreOrder ? 'Pre-Order Now' : 'Add to Cart'}
                  </>
                )}
              </Button>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border/20 bg-card/30">
                <Truck className="w-4 h-4 text-ice-blue" />
                <span className="font-semibold">Royal Mail Tracked</span>
                <span className="text-muted-foreground">~2 day delivery</span>
              </div>
              <div className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border/20 bg-card/30">
                <ShieldCheck className="w-4 h-4 text-ice-blue" />
                <span className="font-semibold">Discreet</span>
                <span className="text-muted-foreground">Plain packaging</span>
              </div>
              <div className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border/20 bg-card/30">
                <FlaskConical className="w-4 h-4 text-ice-blue" />
                <span className="font-semibold">Research grade</span>
                <span className="text-muted-foreground">UK dispatched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Long-form SEO body */}
        <section className="mt-16 prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-ice-blue">
          <h2>About {product.name}</h2>
          <p>
            {product.name} is supplied as a UK-domestic research-grade peptide, posted from West Yorkshire via Royal Mail Tracked (~2 day delivery) or InPost Locker. All orders are sent in plain, discreet packaging with a 14:00 GMT dispatch cutoff.
          </p>

          <h2>Specifications</h2>
          <ul>
            {product.variants.map((v) => (
              <li key={v.specification}>{v.specification} — £{v.price}{v.outOfStock ? ' (out of stock)' : ''}</li>
            ))}
          </ul>

          <h2>Shipping & payment</h2>
          <p>
            UK shipping is a flat £6 via Royal Mail Tracked, with InPost Locker available for fully anonymous pickup. We accept crypto only (USDT, USDC, BTC). Full instructions on our <Link to="/how-to-pay-crypto">How to Pay with Crypto</Link> page.
          </p>

          <h2>Reconstitution</h2>
          <p>
            See our <Link to="/guides/how-to-reconstitute-peptides-uk">reconstitution guide</Link> for step-by-step instructions, or use the <Link to="/calculator">peptide dosing calculator</Link> to work out your research volume.
          </p>

          <p className="text-xs italic">
            For in-vitro research use only. Not for human or animal consumption. By purchasing you agree to our <Link to="/research-disclaimer">research disclaimer</Link>.
          </p>
        </section>

        <ProductReviews productId={product.id} productName={product.name} />
        <ProductFAQ faqs={getProductFaqs(product)} productName={product.name} />
        <RelatedGuides productId={product.id} />
        <RelatedProducts current={product} />
        <RecentlyViewed excludeId={product.id} />
      </main>


      <Footer />
    </div>
  );
}
