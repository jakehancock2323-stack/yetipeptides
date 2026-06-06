
INSERT INTO public.email_templates (template_key, subject, body)
VALUES (
  'order_confirmation_uk',
  'Your Yeti Peptides Order #{order_id} — Awaiting Bank Transfer',
  E'Hi {customer_name},\n\nThanks for your order with Yeti Peptides. Here''s your summary:\n\nOrder #{order_id}\nDate: {order_date}\n\n{items_list}\n\nSubtotal: {subtotal}\nDelivery: {delivery_fee}\nTotal: {total}\n\nShipping to:\n{address}\n\nPAYMENT — UK BANK TRANSFER\nPlease send the total of {total} via UK bank transfer using the details below:\n\nAccount Name: [your account name]\nSort Code: [your sort code]\nAccount Number: [your account number]\nReference: {order_id}\n\nIMPORTANT — use the order number above as the payment reference so we can match it to your order. Faster Payments typically clear within minutes; once received we''ll dispatch your order the next working day via Royal Mail 24 (Tracked, next-day delivery).\n\nOnce payment has been sent, please reply to this email to let us know so we can confirm and move your order into processing.\n\nIf you have any questions or need assistance, feel free to reply or message me on Discord — we''re happy to help.\n\n— Yeti Peptides\nResearch Use Only'
)
ON CONFLICT (template_key) DO NOTHING;

INSERT INTO public.email_templates (template_key, subject, body)
VALUES (
  'order_confirmation_intl',
  'Your Yeti Peptides Order #{order_id} — Awaiting Crypto Payment',
  E'Hi {customer_name},\n\nThanks for your order with Yeti Peptides. Here''s your summary:\n\nOrder #{order_id}\nDate: {order_date}\n\n{items_list}\n\nSubtotal: {subtotal}\nDelivery: {delivery_fee}\nTotal: {total}\n\nShipping to:\n{address}\n\nPAYMENT — CRYPTO ({payment_method})\nPlease send the total of {total} in {payment_method} to the wallet address below:\n\nWallet Address:\n{wallet_address}\n\nIMPORTANT:\n- Send the exact amount in {payment_method}.\n- Double-check the network before sending (BEP20 / TRC20 / ERC20 as advised).\n- BTC orders include a 4% processing fee.\n\nOnce payment has been sent, please reply to this email with either a screenshot or the TXID of the transaction so we can confirm and move your order into processing. International orders are then dispatched discreetly and typically arrive within 7–14 business days.\n\nIf you have any questions or need assistance, feel free to reply or message me on Discord — we''re happy to help.\n\n— Yeti Peptides\nResearch Use Only'
)
ON CONFLICT (template_key) DO NOTHING;
