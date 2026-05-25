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
  processingFee?: number
  discount?: number
  total?: number
  currency?: string
  paymentMethod?: string
  walletAddress?: string
  paymentInstructions?: string
  shippingAddress?: string
  orderDate?: string
}

const fmt = (amount: number, currency: string) =>
  `${currency === 'GBP' ? '£' : '$'}${Number(amount || 0).toFixed(2)}`

const OrderConfirmationEmail = ({
  orderId = 'XXXXXXXX',
  customerName,
  items = [],
  subtotal = 0,
  shipping = 65,
  processingFee = 0,
  discount = 0,
  total = 0,
  currency = 'USD',
  paymentMethod = 'Crypto',
  walletAddress,
  paymentInstructions,
  shippingAddress,
  orderDate,
}: OrderConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} order {orderId} — payment instructions inside</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>YETI PEPTIDES</Heading>
        <Text style={tagline}>Research-grade peptides · For research use only</Text>

        <Hr style={hr} />

        <Heading as="h2" style={h2}>
          {customerName ? `Thanks, ${customerName}!` : 'Thanks for your order!'}
        </Heading>
        <Text style={text}>
          We've received your order <strong>#{orderId}</strong>
          {orderDate ? ` on ${orderDate}` : ''}. Please follow the payment
          instructions below. Once payment is confirmed we'll send tracking
          details separately.
        </Text>

        <Section style={card}>
          <Heading as="h3" style={h3}>Payment instructions</Heading>
          <Text style={text}>
            Method: <strong>{paymentMethod}</strong>
          </Text>
          <Text style={text}>
            Amount due: <strong>{fmt(total, currency)}</strong>
          </Text>
          {walletAddress ? (
            <>
              <Text style={textMuted}>Send payment to:</Text>
              <Text style={walletBox}>{walletAddress}</Text>
            </>
          ) : null}
          {paymentInstructions ? (
            <Text style={text}>{paymentInstructions}</Text>
          ) : (
            <Text style={textMuted}>
              After sending payment, reply to this email with the transaction
              hash / reference so we can confirm and dispatch your order.
            </Text>
          )}
        </Section>

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
          {processingFee > 0 ? (
            <Section style={totalsRow}>
              <Text style={totalsLabel}>Processing fee</Text>
              <Text style={totalsValue}>{fmt(processingFee, currency)}</Text>
            </Section>
          ) : null}
          {discount > 0 ? (
            <Section style={totalsRow}>
              <Text style={totalsLabel}>Discount</Text>
              <Text style={totalsValue}>- {fmt(discount, currency)}</Text>
            </Section>
          ) : null}
          <Section style={totalsRow}>
            <Text style={totalLabelBold}>Total</Text>
            <Text style={totalValueBold}>{fmt(total, currency)}</Text>
          </Section>
        </Section>

        {shippingAddress ? (
          <Section style={card}>
            <Heading as="h3" style={h3}>Shipping to</Heading>
            <Text style={{ ...text, whiteSpace: 'pre-line' }}>{shippingAddress}</Text>
          </Section>
        ) : null}

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
    `Your Yeti Peptides Order #${data?.orderId ?? ''} — Payment Instructions`.trim(),
  displayName: 'Order confirmation',
  previewData: {
    orderId: 'A1B2C3D4',
    customerName: 'Jane',
    orderDate: new Date().toLocaleDateString(),
    items: [
      { name: 'Retatrutide', variant: '10mg', quantity: 2, price: 45 },
      { name: 'BPC-157', variant: '5mg', quantity: 1, price: 25 },
    ],
    subtotal: 115,
    shipping: 65,
    processingFee: 0,
    discount: 0,
    total: 180,
    currency: 'USD',
    paymentMethod: 'USDT (ERC-20)',
    walletAddress: 'USDT (ERC-20): 0x804ec5D58F8B1643c0706c95e0064bBb5E970624',
    shippingAddress: '123 Lab Way\nLondon, SW1 1AA\nUnited Kingdom',
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
const textMuted = { fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: '8px 0 4px' }
const card = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
  backgroundColor: '#f9fafb',
}
const walletBox = {
  fontFamily: "'SF Mono', Menlo, Consolas, monospace",
  fontSize: '13px',
  color: '#0a1a2a',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  padding: '10px 12px',
  margin: '4px 0 8px',
  wordBreak: 'break-all' as const,
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
