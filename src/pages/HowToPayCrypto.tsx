import { Wallet, Download, Shield, ArrowRight, Send, Clock, Mail, CheckCircle2, Snowflake, CreditCard } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const cryptoOptions = [
  {
    name: 'Bitcoin (BTC)',
    icon: '₿',
    description: 'The original cryptocurrency. Widely accepted and highly secure.',
    network: 'Bitcoin Network',
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'USDT (Tether)',
    icon: '₮',
    description: 'Stablecoin pegged to USD. Predictable value, no price volatility.',
    network: 'ERC-20 (Ethereum Network)',
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    name: 'USDC',
    icon: '$',
    description: 'USD-backed stablecoin. Regulated and transparent.',
    network: 'ERC-20 (Ethereum Network)',
    color: 'from-blue-400 to-blue-600'
  }
];

const exodusFeatures = [
  'Beautiful, intuitive interface perfect for beginners',
  'Built-in exchange to swap between cryptocurrencies',
  'Supports 260+ assets including BTC, USDT, and USDC',
  'Available on desktop (Windows, Mac, Linux) and mobile',
  'Non-custodial – you control your private keys',
  '24/7 human support team'
];

const setupSteps = [
  {
    step: 1,
    title: 'Download Exodus',
    description: 'Visit exodus.com and download the wallet for your device (Desktop or Mobile). Always download from the official website.',
    icon: Download
  },
  {
    step: 2,
    title: 'Create Your Wallet',
    description: 'Open the app and click "Create New Wallet". The setup wizard will guide you through the process.',
    icon: Wallet
  },
  {
    step: 3,
    title: 'Secure Your Recovery Phrase',
    description: 'Write down your 12-word recovery phrase on paper. Store it safely offline. Never share it with anyone – this is your backup to recover funds.',
    icon: Shield
  }
];

const purchaseSteps = [
  'Open Exodus and navigate to the asset you want to buy (BTC, USDT, or USDC)',
  'Click "Buy" and select your payment method (card, bank transfer, etc.)',
  'Enter the amount – buy slightly more than your order total to cover network fees',
  'Complete the purchase and wait for the crypto to arrive in your wallet',
  'For USDT/USDC: Make sure you have a small amount of ETH for gas fees'
];

const sendingSteps = [
  {
    step: 1,
    title: 'Complete Checkout',
    description: 'Add items to your cart and proceed to checkout. Select your preferred cryptocurrency.',
    icon: CreditCard
  },
  {
    step: 2,
    title: 'Copy Payment Address',
    description: 'After checkout, you\'ll receive a unique wallet address. Copy it exactly – any errors may result in lost funds.',
    icon: Wallet
  },
  {
    step: 3,
    title: 'Send from Exodus',
    description: 'Open Exodus, select your crypto, click "Send", paste the address, enter the exact amount, and confirm.',
    icon: Send
  },
  {
    step: 4,
    title: 'Wait for Confirmation',
    description: 'Network confirmations take time. BTC: 10-60 minutes. USDT/USDC: 1-15 minutes depending on network congestion.',
    icon: Clock
  },
  {
    step: 5,
    title: 'Send Your TXID',
    description: 'After sending, copy your Transaction ID (TXID) from Exodus and email it to yetipeptides@protonmail.com with your order number.',
    icon: Mail
  }
];

const quickRecap = [
  'Choose your crypto: BTC, USDT, or USDC',
  'Download Exodus wallet from exodus.com',
  'Secure your 12-word recovery phrase offline',
  'Buy crypto with a small buffer for fees',
  'For USDT/USDC, keep ETH for gas fees',
  'Copy the payment address exactly at checkout',
  'Send payment and note your TXID',
  'Email TXID + order number to yetipeptides@protonmail.com'
];

export default function HowToPayCrypto() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="How to Pay with Crypto | Yeti Peptides"
        description="Step-by-step guide to paying with cryptocurrency at Yeti Peptides. Learn how to use Bitcoin, USDT, or USDC for secure checkout."
        keywords="crypto payment, bitcoin payment, USDT payment, cryptocurrency checkout, how to pay crypto"
        canonical="https://yetipeptides.com/how-to-pay-crypto"
      />
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ice-blue/10 border border-ice-blue/20 mb-6">
              <Snowflake className="w-4 h-4 text-ice-blue" />
              <span className="text-sm text-ice-blue">Crypto Payment Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to Pay with Crypto
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple step-by-step guide for secure and smooth checkout. Perfect for beginners.
            </p>
          </div>
        </section>

        {/* Frosty Divider */}
        <div className="flex justify-center gap-2 py-6">
          {[...Array(5)].map((_, i) => (
            <Snowflake 
              key={i} 
              className="w-4 h-4 text-ice-blue/40" 
              style={{ opacity: 1 - Math.abs(i - 2) * 0.25 }}
            />
          ))}
        </div>

        {/* Section 1: Choose Your Crypto */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">1</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Choose Your Crypto</h2>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-3xl">
              We accept three popular cryptocurrencies. Each has its own benefits – choose the one that works best for you.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {cryptoOptions.map((crypto) => (
                <Card key={crypto.name} className="frosted-glass border-border/50 hover:border-ice-blue/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${crypto.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl font-bold text-white">{crypto.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{crypto.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{crypto.description}</p>
                    <div className="text-xs px-2 py-1 bg-secondary/50 rounded inline-block">
                      {crypto.network}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Frosty Divider */}
        <div className="flex justify-center gap-2 py-6">
          {[...Array(3)].map((_, i) => (
            <Snowflake key={i} className="w-3 h-3 text-ice-blue/30" />
          ))}
        </div>

        {/* Section 2: Recommended Wallet */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">2</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Recommended Wallet: Exodus</h2>
            </div>

            <div className="frosted-glass rounded-2xl p-8 border border-ice-blue/20">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-muted-foreground mb-6">
                    If you're new to crypto, we recommend <strong className="text-foreground">Exodus Wallet</strong>. 
                    It's designed with beginners in mind while still offering powerful features for experienced users.
                  </p>
                  <ul className="space-y-3">
                    {exodusFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-ice-blue shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 flex items-center justify-center">
                    <Wallet className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50">
                <a 
                  href="https://www.exodus.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ice-blue hover:underline"
                >
                  Download Exodus <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How to Set Up Exodus */}
        <section className="px-4 py-12 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">3</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">How to Set Up Exodus</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {setupSteps.map((step) => (
                <Card key={step.step} className="bg-card/60 border-border/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-ice-blue/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-ice-blue" />
                    </div>
                    <div className="text-sm text-ice-blue font-medium mb-2">Step {step.step}</div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-center">
                <strong className="text-destructive">⚠️ Important:</strong> Never share your recovery phrase. 
                Anyone with access to these words can steal your funds. Store it offline in a secure location.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: How to Purchase Crypto */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">4</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">How to Purchase Crypto in Exodus</h2>
            </div>

            <div className="frosted-glass rounded-2xl p-8 border border-border/50">
              <p className="text-muted-foreground mb-6">
                Exodus makes it easy to buy crypto directly within the app. Follow these steps:
              </p>
              <ol className="space-y-4">
                {purchaseSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-ice-blue/20 flex items-center justify-center shrink-0">
                      <span className="text-sm text-ice-blue font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 p-4 rounded-xl bg-ice-blue/10 border border-ice-blue/20">
                <p className="text-sm text-center">
                  <strong className="text-ice-blue">💡 Tip:</strong> Buy 5-10% more than your order total to ensure 
                  you have enough to cover network transaction fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: How to Send Payment */}
        <section className="px-4 py-12 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">5</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">How to Send Payment After Checkout</h2>
            </div>

            <div className="space-y-6">
              {sendingSteps.map((step) => (
                <div key={step.step} className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-ice-blue" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-ice-blue/20 text-ice-blue rounded">Step {step.step}</span>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-center">
                <strong className="text-amber-400">⚡ Network Rules:</strong> For USDT and USDC, always use the <strong>ERC-20 network</strong>. 
                Sending on the wrong network will result in permanent loss of funds.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Waiting for Confirmation */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">6</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Waiting for Network Confirmation</h2>
            </div>

            <div className="frosted-glass rounded-2xl p-8 border border-border/50">
              <p className="text-muted-foreground mb-6">
                After sending payment, the blockchain network needs to verify your transaction. This is automatic and cannot be sped up.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <h4 className="font-semibold text-orange-400 mb-2">Bitcoin (BTC)</h4>
                  <p className="text-sm text-muted-foreground">
                    Typically 10-60 minutes. Requires 1-3 network confirmations depending on amount.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-400 mb-2">USDT / USDC (ERC-20)</h4>
                  <p className="text-sm text-muted-foreground">
                    Usually 1-15 minutes. May take longer during high network congestion.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                You can track your transaction status using the TXID on a blockchain explorer like{' '}
                <a href="https://blockchair.com" target="_blank" rel="noopener noreferrer" className="text-ice-blue hover:underline">
                  blockchair.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Sending TXID */}
        <section className="px-4 py-12 bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-ice-blue/20 flex items-center justify-center">
                <span className="text-ice-blue font-bold">7</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Send Your TXID to Confirm</h2>
            </div>

            <div className="frosted-glass rounded-2xl p-8 border border-ice-blue/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">
                    After sending your payment, you'll receive a <strong className="text-foreground">Transaction ID (TXID)</strong> – 
                    a unique code that proves your payment. Email this to us so we can match it with your order.
                  </p>
                  <div className="p-4 rounded-xl bg-card border border-border/50 mb-4">
                    <p className="text-sm font-medium mb-1">Send to:</p>
                    <a href="mailto:yetipeptides@protonmail.com" className="text-ice-blue font-mono hover:underline">
                      yetipeptides@protonmail.com
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Include in your email:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Your order number</li>
                    <li>• The cryptocurrency used (BTC, USDT, or USDC)</li>
                    <li>• Your TXID (Transaction ID)</li>
                    <li>• Amount sent</li>
                  </ul>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-ice-blue/10 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-ice-blue" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Recap */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <Snowflake className="w-8 h-8 text-ice-blue mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold">Quick Recap</h2>
              <p className="text-muted-foreground mt-2">Everything you need in a nutshell</p>
            </div>

            <div className="frosted-glass rounded-2xl p-8 border border-ice-blue/20">
              <ul className="grid md:grid-cols-2 gap-4">
                {quickRecap.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ice-blue shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help.
              </p>
              <a 
                href="mailto:yetipeptides@protonmail.com" 
                className="inline-flex items-center gap-2 text-ice-blue hover:underline"
              >
                Contact Support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
