// Marketing Landing Page - with scrollable sections and GSAP animations

import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Hero } from '@/components/hero';
import { Container, Section, SEO } from '@/components/common';
import { Reveal } from '@/components/motion';
import { AboutSection, TestimonialsSection, StatsSection, FAQSection, CTASection } from '@/components/sections';
import { TEMPLATES } from '@/features/templates/constants';
import { Heart, Zap, Shield, Share2 } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Express Authentically',
    description: 'Choose from curated templates designed to convey your emotions perfectly.',
  },
  {
    icon: Zap,
    title: 'Create Instantly',
    description: 'No signup, no friction. Create your message in under 2 minutes.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No ads, no data selling. Your message content stays private to your link.',
  },
  {
    icon: Share2,
    title: 'Share Easily',
    description: 'Get a unique link to share with anyone, anywhere.',
  },
];

const HomePage = () => {
  const homepageStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'EmotionCreator',
      url: 'https://emotion-creators.vercel.app',
      description: 'EmotionCreator is a free, privacy-focused web application that enables users to create beautifully designed digital messages for nine emotions: love, apology, birthday, gratitude, congratulations, encouragement, missing someone, friendship, and get well wishes. Each message gets a unique shareable URL. No signup, download, or payment required.',
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
      },
      featureList: [
        '9 handcrafted emotion templates',
        'Unique shareable URL per message',
        'No signup or account required',
        'No app download needed',
        '100% free with no hidden fees',
        'Privacy-first — no ads and no data selling',
        'Fully responsive on mobile, tablet, and desktop',
        'Anonymous or named messages',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need an account to create a message?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. You can create and share messages without signing up. Creating an account helps you manage and delete your messages later from your dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long do shared links last?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shared links remain accessible until they are deleted. If you sign in, you can manage and delete your links from your dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customize the templates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Currently, you can choose from our curated templates and add your personal message. Each template is designed to perfectly express specific emotions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my data private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "We don't sell your data or use your message content for ads. Access is link-based, so share links only with people you trust.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can recipients see who sent the message?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only if you include your name in the "From" field. Otherwise, it can be completely anonymous. You control what information is shared.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I create a free digital apology card online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With EmotionCreator, you can create a free digital apology card in under 2 minutes. Choose the "Sorry" template, write your heartfelt message, and share it via a unique link. No signup, no payment, no app download required.',
          },
        },
        {
          '@type': 'Question',
          name: "What's a private way to send a heartfelt message without signing up?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "EmotionCreator lets you create and share beautiful digital messages without creating an account. Your message is shared only through its unique link. Just pick a template, write your message, and share the link.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can I send a digital birthday message for free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes! EmotionCreator's Birthday template lets you create a vibrant, beautifully designed birthday message completely free. Add your personal wishes, get a unique shareable link, and send it via text, email, or social media.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I send a get well soon message online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EmotionCreator has a dedicated "Get Well" template with gentle, nurturing design elements. Write your comforting words, and your recipient gets a full-page, beautifully presented message they can view on any device — no app needed.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the best tool for long-distance relationship messages?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EmotionCreator is ideal for long-distance relationships. Use the "Love" or "Miss You" template to create a shareable page with your personal message. It\'s more meaningful than a text and works across any distance — just share the link.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is EmotionCreator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EmotionCreator is a free, privacy-focused web application that lets you create beautifully designed digital messages for nine emotions: love, apology, birthday, gratitude, congratulations, encouragement, missing someone, friendship, and get well wishes. Each message gets a unique shareable URL. No signup, download, or payment required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many templates does EmotionCreator have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EmotionCreator offers 9 unique emotion templates: Love, Sorry, Birthday, Gratitude, Congratulations, Encouragement, Miss You, Friendship, and Get Well. Each template has its own color palette, typography, and design elements tailored to that specific emotion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is EmotionCreator free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, EmotionCreator is 100% free. You can create unlimited messages using any of the 9 templates without paying anything. There are no hidden fees, no premium tiers, and no feature locks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to download an app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "No. EmotionCreator works entirely in your web browser — on desktop, tablet, or mobile. There's nothing to install or download. Just visit the site, create your message, and share the link.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does my message work on mobile devices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Every EmotionCreator message page is fully responsive and optimized for mobile devices. Your recipient can view the beautifully designed message on any smartphone, tablet, or computer with a web browser.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Create and Share an Emotional Message',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Choose Template',
          text: 'Pick the perfect emotion template that matches your feelings.',
        },
        {
          '@type': 'HowToStep',
          name: 'Write Message',
          text: 'Pour your heart into words that truly matter.',
        },
        {
          '@type': 'HowToStep',
          name: 'Share Link',
          text: 'Send a beautiful page with one unique shareable link.',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://emotion-creators.vercel.app',
        },
      ],
    },
  ];

  return (
    <PageShell>
      <SEO
        title="EmotionCreator — Free Digital Message Templates"
        description="Create beautiful shareable message pages for love, apologies, birthdays and more. Free, private, no signup needed."
        canonical="/"
        structuredData={homepageStructuredData}
      />
      <div>
        <Hero />
        
        {/* How it works */}
        <Section id="how-it-works" className="bg-gradient-to-b from-background to-background/50">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  ✨ Simple & Fast
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                  Three simple steps to share your heart
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Choose Template', 'Write Message', 'Share Link'].map((step, i) => (
                <Reveal key={step} delay={i * 0.15}>
                  <motion.div 
                    className="text-center group"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-glow group-hover:shadow-glow-sm transition-shadow">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">{step}</h3>
                    <p className="text-text-muted leading-relaxed">
                      {i === 0 && 'Pick the perfect emotion template that matches your feelings'}
                      {i === 1 && 'Pour your heart into words that truly matter'}
                      {i === 2 && 'Send a beautiful page with one unique shareable link'}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* About Section - citable definition for AI */}
        <AboutSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Templates showcase */}
        <Section className="gsap-section">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  🎨 Crafted with Care
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Beautiful Templates
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                  Each template is crafted to express a specific emotion
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEMPLATES.map((template, i) => (
                <Reveal key={template.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="glass-card p-10 rounded-3xl text-center group cursor-pointer"
                  >
                    <motion.div 
                      className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-5xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {template.icon}
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold mb-3">
                      {template.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {template.description}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Features */}
        <Section className="bg-gradient-to-b from-background/50 to-background">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border text-sm text-primary mb-4">
                  💪 Powerful & Private
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Why EmotionCreator?
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.1}>
                  <motion.div 
                    className="glass-card p-8 rounded-3xl h-full group"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <CTASection />

      </div>
    </PageShell>
  );
}

export default HomePage;
