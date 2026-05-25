import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Yeti Peptides'

interface OrderItem {
  name: string
  variant?: string
  quantity: number
  price: number
}

interface OrderConfirmationProps {
  orderId?: string
  customerName?: string
  items?: OrderItem[]
  subtotal?: number
  shipping?: number
  total?: number
  currency?: string
  paymentMethod?: string
}

const fmt = (amount: number, currency: string) =>
  `${currency === 'GBP' ? '£' : '$'}${amount.toFixed(2)}`

const OrderConfirmationEmail = ({
  orderId = 'XXXXXXXX',
  customerName,
  items = [],
  subtotal = 0,
  shipping = 65,
  total = 0,
  currency = 'USD',
  paymentMethod = 'Crypto / Bank Transfer',
}: OrderConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} order {orderId} has been received</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>YETI PEPTIDES</Heading>
        <Text style={tagline}>Research-grade peptides · For research use only</Text>

        <Hr style={hr} />

        <Heading as="h2" style={h2}>
          {customerName ? `Thanks, ${customerName}!` : 'Thanks for your order!'}
        </Heading>
        <Text style={text}>
          We've received your order <strong>#{orderId}</strong>. This email
          confirms your order details. Once your payment has cleared, you'll
          receive a separate confirmation from us with shipping information.
        </Text>

        <Section style={card}>
          <Heading as="h3" style={h3}>Order summary</Heading>
          {items.map((item, i) => (
            <Section key={i} style={lineItem}>
              <Text style={itemName}>
                {item.name}{item.variant ? ` — ${item.variant}` : ''}
              </Text>
              <Text style={itemMeta}>
                Qty {item.quantity} · {fmt(item.price * item.quantity, currency)}
              </Text>
            </Section>
          ))}

          <Hr style={hrLight} />
          <Section style={totalsRow}>
            <Text style={totalsLabel}>Subtotal</Text>
            <Text style={totalsValue}>{fmt(subtotal, currency)}</Text>
          </Section>
          <Section style={totalsRow}>
            <Text style={totalsLabel}>Shipping</Text>
            <Text style={totalsValue}>{fmt(shipping, currency)}</Text>
          </Section>
          <Section style={totalsRow}>
            <Text style={totalLabelBold}>Total</Text>
            <Text style={totalValueBold}>{fmt(total, currency)}</Text>
          </Section>
        </Section>

        <Section style={card}>
          <Heading as="h3" style={h3}>Payment</Heading>
          <Text style={text}>
            Method selected: <strong>{paymentMethod}</strong>
          </Text>
          <Text style={textMuted}>
            If you haven't sent payment yet, please follow the instructions
            provided at checkout. Your order ships once payment is confirmed.
          </Text>
        </Section>

        <Text style={footer}>
          Questions? Just reply to this email.
          <br />
          — The {SITE_NAME} Team
        </Text>

        <Text style={disclaimer}>
          All products are sold strictly for laboratory research purposes only
          and are not intended for human or animal consumption.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Your Yeti Peptides Order #${data?.orderId ?? ''}`.trim(),
  displayName: 'Order confirmation',
  previewData: {
    orderId: 'A1B2C3D4',
    customerName: 'Jane',
    items: [
      { name: 'Retatrutide', variant: '10mg', quantity: 2, price: 45 },
      { name: 'BPC-157', variant: '5mg', quantity: 1, price: 25 },
    ],
    subtotal: 115,
    shipping: 65,
    total: 180,
    currency: 'USD',
    paymentMethod: 'USDT (TRC20)',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
}
const container = { padding: '24px', maxWidth: '600px' }
const brand = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  letterSpacing: '4px',
  color: '#0a1a2a',
  margin: '0',
}
const tagline = {
  fontSize: '11px',
  color: '#6b7280',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  margin: '4px 0 0',
}
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const hrLight = { borderColor: '#f1f5f9', margin: '12px 0' }
const h2 = { fontSize: '22px', color: '#0a1a2a', margin: '16px 0 8px' }
const h3 = { fontSize: '14px', color: '#0a1a2a', margin: '0 0 12px', textTransform: 'uppercase' as const, letterSpacing: '1px' }
const text = { fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0 0 12px' }
const textMuted = { fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: '8px 0 0' }
const card = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
  backgroundColor: '#f9fafb',
}
const lineItem = { margin: '8px 0' }
const itemName = { fontSize: '14px', color: '#0a1a2a', fontWeight: '600' as const, margin: '0' }
const itemMeta = { fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }
const totalsRow = { display: 'flex', justifyContent: 'space-between', margin: '4px 0' }
const totalsLabel = { fontSize: '13px', color: '#6b7280', margin: '0' }
const totalsValue = { fontSize: '13px', color: '#374151', margin: '0' }
const totalLabelBold = { fontSize: '15px', color: '#0a1a2a', fontWeight: 'bold' as const, margin: '4px 0 0' }
const totalValueBold = { fontSize: '15px', color: '#0a1a2a', fontWeight: 'bold' as const, margin: '4px 0 0' }
const footer = { fontSize: '13px', color: '#374151', margin: '24px 0 0', lineHeight: '1.6' }
const disclaimer = { fontSize: '11px', color: '#9ca3af', margin: '24px 0 0', lineHeight: '1.5', fontStyle: 'italic' as const }
