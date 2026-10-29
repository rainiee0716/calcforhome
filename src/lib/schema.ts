import { SITE_NAME } from './site';

export type JsonLd = Record<string, any>;

export function softwareApplicationSchema(
  name: string,
  path: string,
  siteUrl: URL,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    url: new URL(path, siteUrl).href,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  siteUrl: URL,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

/**
 * A chart or diagram meant to be copied onto other sites. ImageObject is what
 * Google Images reads to decide the picture is worth indexing on its own.
 */
export function imageObjectSchema(opts: {
  path: string;
  name: string;
  description: string;
  width: number;
  height: number;
  licensePage: string;
  siteUrl: URL;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: new URL(opts.path, opts.siteUrl).href,
    name: opts.name,
    description: opts.description,
    width: { '@type': 'QuantitativeValue', value: opts.width, unitCode: 'E37' },
    height: { '@type': 'QuantitativeValue', value: opts.height, unitCode: 'E37' },
    creator: { '@type': 'Organization', name: SITE_NAME, url: opts.siteUrl.href },
    creditText: SITE_NAME,
    copyrightNotice: `${SITE_NAME} ${new Date().getFullYear()}`,
    license: new URL(opts.licensePage, opts.siteUrl).href,
    acquireLicensePage: new URL(opts.licensePage, opts.siteUrl).href,
  };
}

export function websiteSchema(siteUrl: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl.href,
  };
}
