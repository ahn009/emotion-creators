import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout';
import { Container, SEO } from '@/components/common';
import { Heart, HeartHandshake, Sun, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    slug: '/blog/love-messages-for-her',
    title: 'Heartfelt Love Messages for Her',
    description:
      'Discover beautiful love messages for your girlfriend or wife. Express your feelings with romantic, heartfelt words she will treasure forever.',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-500/10 to-purple-500/10',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-500',
    tag: 'Love & Romance',
  },
  {
    slug: '/blog/sorry-messages',
    title: 'How to Say Sorry: Sincere Apology Messages',
    description:
      'Learn how to apologize sincerely with heartfelt sorry messages. Find the right words to mend relationships and express genuine remorse.',
    icon: HeartHandshake,
    color: 'blue',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-500',
    tag: 'Apologies & Forgiveness',
  },
  {
    slug: '/blog/good-morning-messages',
    title: 'Sweet Good Morning Messages',
    description:
      'Find beautiful good morning messages for your loved ones. Sweet, romantic, and thoughtful texts to brighten their morning and show you care.',
    icon: Sun,
    color: 'amber',
    gradient: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-500',
    tag: 'Morning Greetings',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EmotionCreator Blog - Message Guides & Inspiration',
    description:
      'Explore guides on writing heartfelt messages for every occasion. Love messages, apology guides, morning greetings, and more.',
    url: 'https://emotion-creators.vercel.app/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://emotion-creators.vercel.app${post.slug}`,
        name: post.title,
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://emotion-creators.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://emotion-creators.vercel.app/blog' },
    ],
  },
];

const BlogIndexPage = () => {
  return (
    <PageShell>
      <SEO
        title="Blog - Message Guides & Inspiration | EmotionCreator"
        description="Explore guides on writing heartfelt messages for every occasion. Love messages, apology guides, morning greetings, and more."
        canonical="/blog"
        structuredData={structuredData}
      />

      <Container>
        <div className="max-w-4xl mx-auto py-16 px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Guides & Inspiration
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              EmotionCreator Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Practical guides to help you find the right words for every emotion.
              Learn how to express love, craft sincere apologies, and brighten
              someone&apos;s day with thoughtful messages.
            </p>
          </header>

          {/* Blog Post Cards */}
          <div className="space-y-6">
            {blogPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.slug}
                  to={post.slug}
                  className={`block p-6 md:p-8 rounded-2xl bg-gradient-to-br ${post.gradient} border ${post.border} hover:scale-[1.01] transition-transform`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`w-8 h-8 ${post.iconColor} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <span className={`text-xs font-medium ${post.iconColor} uppercase tracking-wider`}>
                        {post.tag}
                      </span>
                      <h2 className="text-2xl font-semibold text-foreground mt-1 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.description}
                      </p>
                      <span className={`inline-flex items-center gap-2 font-medium ${post.iconColor}`}>
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to create your own message?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Create a Message <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 hover:border-primary/60 text-primary rounded-lg font-medium transition-colors"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </PageShell>
  );
};

export default BlogIndexPage;
