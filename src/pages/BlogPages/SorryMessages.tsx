import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Container, SEO } from '@/components/common';
import { HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Say Sorry – Sincere Apology Messages That Actually Work',
    description:
      'Learn how to apologize sincerely with heartfelt sorry messages. Find the right words to mend relationships and express genuine remorse.',
    author: { '@type': 'Organization', name: 'EmotionCreator' },
    publisher: {
      '@type': 'Organization',
      name: 'EmotionCreator',
      url: 'https://emotion-creators.vercel.app',
      logo: { '@type': 'ImageObject', url: 'https://emotion-creators.vercel.app/og-image.png' },
    },
    datePublished: '2026-02-15',
    dateModified: '2026-02-15',
    mainEntityOfPage: 'https://emotion-creators.vercel.app/blog/sorry-messages',
    image: 'https://emotion-creators.vercel.app/og-image.png',
    keywords: 'sorry messages, how to apologize, apology messages, sincere apology, how to say sorry',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://emotion-creators.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://emotion-creators.vercel.app/blog' },
      { '@type': 'ListItem', position: 3, name: 'Sorry Messages', item: 'https://emotion-creators.vercel.app/blog/sorry-messages' },
    ],
  },
];

const SorryMessages = () => {
  return (
    <PageShell>
      <SEO
        title="How to Say Sorry – Sincere Apology Messages That Work | EmotionCreator"
        description="Learn how to apologize sincerely with heartfelt sorry messages. Find the right words to mend relationships and express genuine remorse."
        canonical="/blog/sorry-messages"
        ogType="article"
        structuredData={structuredData}
      />

      <Container>
        <article className="max-w-3xl mx-auto py-16 px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>Sorry Messages</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <HeartHandshake className="w-8 h-8 text-blue-500" />
              <span className="text-sm font-medium text-blue-500 uppercase tracking-wider">
                Apologies & Forgiveness
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              How to Say Sorry: Sincere Apology Messages
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Saying sorry is never easy, but the right words at the right time can
              heal wounds and rebuild trust. Whether you need to apologize to a
              partner, friend, family member, or colleague, a genuine apology starts
              with understanding what went wrong and taking responsibility.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Why a Genuine Apology Matters
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                An apology is not just about saying the word &quot;sorry.&quot; It is
                about acknowledging the pain you caused and showing that you understand
                its impact. When done sincerely, an apology can be one of the most
                powerful acts of emotional connection. It tells the other person that
                their feelings matter to you and that you are willing to be vulnerable
                enough to admit your mistakes. Studies in relationship psychology show
                that sincere apologies activate empathy in the person receiving them,
                making forgiveness more likely and strengthening the bond between both
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                The Anatomy of a Meaningful Apology
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A truly effective apology has several key elements. First, acknowledge
                specifically what you did wrong. Vague apologies like &quot;sorry if I
                upset you&quot; can feel dismissive. Instead, name the action and its
                impact. Second, express genuine remorse without making excuses. Phrases
                like &quot;I was wrong&quot; carry more weight than &quot;I am sorry
                but...&quot; Third, explain what you will do differently going forward.
                This shows that your apology is not just words but a commitment to
                change. Finally, give the other person space to process. Pushing for
                immediate forgiveness can feel like pressure rather than care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Sorry Messages for Your Partner
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you have hurt someone you love, the stakes feel especially high.
                Start by reflecting on what happened from their perspective. What did
                they feel? What did they need from you that they did not get? Use these
                insights to craft a message that shows you truly understand. Avoid
                deflecting blame or minimizing their feelings. A message to your partner
                should feel safe and reassuring, reminding them that your relationship
                is more important than your pride.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sometimes the best approach is to be direct and simple. Tell them you
                know what you did, that you understand why it hurt, and that you are
                committed to doing better. You can pair this with a specific action,
                like suggesting a conversation to talk things through or planning
                something meaningful to show you care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Apologizing to a Friend or Family Member
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Friendships and family relationships can sometimes be taken for
                granted, which makes apologies in these contexts especially important.
                When you have let down a friend or family member, they may not always
                tell you directly that they are hurt. Pay attention to changes in their
                behaviour and do not wait too long to address the issue. A timely
                apology shows that you value the relationship enough to initiate a
                difficult conversation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Keep your message warm but honest. Acknowledge what happened, take
                responsibility, and let them know their friendship or family bond is
                something you do not want to lose. If the situation is complex, suggest
                meeting in person or having a phone call to talk things through more
                fully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Common Mistakes When Apologizing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Many apologies fail not because the person does not mean them, but
                because of how they are delivered. Avoid conditional language that
                shifts blame, such as &quot;I am sorry you feel that way.&quot; Do not
                rush to explain your side before acknowledging theirs. Avoid
                apologizing multiple times without changing the behaviour, as repeated
                apologies without follow-through can erode trust further. And never
                use an apology as a way to reopen an argument or defend yourself. The
                purpose is to repair, not to relitigate.
              </p>
            </section>

            {/* CTA */}
            <section className="my-12 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold text-foreground m-0">
                  Send a Heartfelt Apology Message
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Sometimes a beautifully presented message can convey what a quick text
                cannot. Create a sincere apology with our thoughtful templates and
                send it as a private, shareable link. No signup needed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create an Apology <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-blue-500/30 hover:border-blue-500/60 text-blue-400 rounded-lg font-medium transition-colors"
                >
                  Browse Templates
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground">
                Going Beyond Words
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                An apology is a starting point, not a finish line. After you have said
                sorry, follow through with your actions. Consistent behaviour over time
                is what truly rebuilds trust. But the first step, finding the courage
                and the right words to apologize, is often the hardest part. If you are
                struggling to find the right way to express yourself, a thoughtfully
                designed digital message can help you communicate with care and
                intention. With EmotionCreator, you can choose a template that matches
                the tone of your apology and create something that feels personal and
                sincere, delivered through a private link that only they can see.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <footer className="mt-16 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/blog/love-messages-for-her"
                className="text-primary hover:underline"
              >
                Love Messages for Her &rarr;
              </Link>
              <Link
                to="/blog/good-morning-messages"
                className="text-primary hover:underline"
              >
                Sweet Good Morning Messages &rarr;
              </Link>
            </div>
          </footer>
        </article>
      </Container>
    </PageShell>
  );
};

export default SorryMessages;
