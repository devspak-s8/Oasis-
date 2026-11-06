import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  schemaType?: 'Organization' | 'RealEstateAgent' | 'WebSite' | 'WebPage' | 'FAQPage' | 'Article';
  schemaData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogImage = '/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg',
  schemaType = 'Organization',
  schemaData
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Canonical URL
    const domain = window.location.origin;
    const fullCanonical = `${domain}${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // 4. OpenGraph Tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullCanonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${domain}${ogImage}` },
      { property: 'og:site_name', content: 'OASIS RAY DEVELOPMENTS LTD.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${domain}${ogImage}` }
    ];

    ogTags.forEach((tag) => {
      const attr = tag.property ? 'property' : 'name';
      const attrVal = (tag.property || tag.name)!;
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // 5. JSON-LD Structured Data
    const scriptId = 'seo-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const defaultOrgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'OASIS RAY DEVELOPMENTS LTD.',
      alternateName: 'Oasis Ray Developments',
      url: domain,
      logo: `${domain}/assets/aistudio/IMG-20261104-WA0020_35405fe2.jpg`,
      founder: {
        '@type': 'Person',
        name: 'Oluwayemi James Damilare',
        jobTitle: 'Founder & Lead Visionary'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3rd Floor, Goldcrest Plaza, Ikota, Lekki',
        addressLocality: 'Lagos State',
        addressCountry: 'NG'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+2348171731525',
        contactType: 'customer service',
        areaServed: 'NG',
        availableLanguage: ['English']
      },
      sameAs: [
        'https://instagram.com/oasisraydevelopments',
        'https://linkedin.com/company/oasis-ray-developments',
        'https://facebook.com/oasisraydevelopments'
      ]
    };

    const finalSchema = schemaData || defaultOrgSchema;
    scriptTag.text = JSON.stringify(finalSchema);

    return () => {
      // Clean up script if unmounted
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogImage, schemaType, schemaData]);

  return null;
};
