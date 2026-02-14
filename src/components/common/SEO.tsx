import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://emotion-creators.vercel.app';
const SITE_NAME = 'EmotionCreator';
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData,
}: SEOProps) => {
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  const structuredDataArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredDataArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
