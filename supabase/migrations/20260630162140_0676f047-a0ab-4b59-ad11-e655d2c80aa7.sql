CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT NOT NULL,
  verified_purchase BOOLEAN NOT NULL DEFAULT true,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_reviews TO anon, authenticated;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published reviews"
  ON public.product_reviews FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage reviews"
  ON public.product_reviews FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_product_reviews_product ON public.product_reviews(product_id, published, created_at DESC);