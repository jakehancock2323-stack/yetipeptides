
INSERT INTO public.email_templates (template_key, subject, body)
VALUES (
  'payment_confirmation_uk',
  'Payment Received ✅ — Order #{order_id} (Shipping Next Day)',
  E'Hi {customer_name},\n\nPAYMENT RECEIVED ✅\nYour payment for order #{order_id} totalling {total} has been successfully confirmed — thank you.\n\nYour order will be dispatched the next working day via Royal Mail 24 (Tracked, next-day delivery).\n\nOnce it''s shipped, you''ll receive a separate email with your tracking number so you can follow it all the way to your door.\n\nItems:\n{items_list}\n\nShipping to:\n{address}\n\nIf anything looks off, just reply to this email and we''ll sort it.\n\n— Yeti Peptides\nResearch Use Only'
)
ON CONFLICT (template_key) DO NOTHING;

INSERT INTO public.email_templates (template_key, subject, body)
VALUES (
  'payment_confirmation_intl',
  'Payment Received ✅ — Order #{order_id} (Preparing International Shipment)',
  E'Hi {customer_name},\n\nPAYMENT RECEIVED ✅\nYour payment for order #{order_id} totalling {total} has been successfully confirmed — thank you.\n\nYour order is now being prepared for discreet international dispatch. Packaging is plain and unbranded for privacy.\n\nEstimated transit time is typically 7–14 business days depending on your country and local customs. Once your parcel is dispatched, you''ll receive a separate email with your tracking number so you can follow it the whole way.\n\nPlease note: any local import duties or taxes (if applicable) are the recipient''s responsibility.\n\nItems:\n{items_list}\n\nShipping to:\n{address}\n\nIf anything looks off, just reply to this email and we''ll sort it.\n\n— Yeti Peptides\nResearch Use Only'
)
ON CONFLICT (template_key) DO NOTHING;
