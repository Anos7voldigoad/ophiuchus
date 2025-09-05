// SEO utilities and helpers

export interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  language?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

/**
 * SEO management utilities
 */
export class SEOManager {
  private static instance: SEOManager;
  private currentMeta: MetaTags | null = null;

  private constructor() {}

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  /**
   * Update page meta tags
   */
  updateMetaTags(meta: MetaTags): void {
    this.currentMeta = meta;
    
    // Update title
    if (meta.title) {
      document.title = meta.title;
    }

    // Update meta tags
    this.updateMetaTag('name', 'description', meta.description);
    this.updateMetaTag('name', 'keywords', meta.keywords.join(', '));
    if (meta.author) this.updateMetaTag('name', 'author', meta.author);
    if (meta.language) this.updateMetaTag('name', 'language', meta.language);
    if (meta.robots) this.updateMetaTag('name', 'robots', meta.robots);

    // Update Open Graph tags
    this.updateMetaTag('property', 'og:title', meta.ogTitle || meta.title);
    this.updateMetaTag('property', 'og:description', meta.ogDescription || meta.description);
    if (meta.ogImage) this.updateMetaTag('property', 'og:image', meta.ogImage);
    this.updateMetaTag('property', 'og:url', meta.ogUrl || window.location.href);
    this.updateMetaTag('property', 'og:type', 'website');

    // Update Twitter Card tags
    this.updateMetaTag('name', 'twitter:title', meta.twitterTitle || meta.title);
    this.updateMetaTag('name', 'twitter:description', meta.twitterDescription || meta.description);
    this.updateMetaTag('name', 'twitter:image', meta.twitterImage || meta.ogImage);
    this.updateMetaTag('name', 'twitter:card', 'summary_large_image');

    // Update canonical URL
    if (meta.canonical) {
      this.updateCanonical(meta.canonical);
    }
  }

  /**
   * Update individual meta tag
   */
  private updateMetaTag(attribute: string, value: string, content?: string): void {
    if (!content) return;

    let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  }

  /**
   * Update canonical URL
   */
  private updateCanonical(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
  }

  /**
   * Get current meta tags
   */
  getCurrentMeta(): MetaTags | null {
    return this.currentMeta;
  }

  /**
   * Reset meta tags to default
   */
  resetMetaTags(): void {
    const defaultMeta: MetaTags = {
      title: 'Ophiuschus AI - Complete Digital Transformation Solutions',
      description: 'Transform your business online with our complete digital solutions. Full-stack websites, n8n automation, AI voice agents, and ad management.',
      keywords: ['digital transformation', 'website development', 'automation', 'AI', 'business solutions'],
      author: 'Ophiuschus AI',
      language: 'en',
      robots: 'index, follow'
    };
    
    this.updateMetaTags(defaultMeta);
  }
}

/**
 * Structured data utilities
 */
export class StructuredDataManager {
  /**
   * Add structured data to page
   */
  static addStructuredData(data: StructuredData): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Remove structured data by type
   */
  static removeStructuredData(type: string): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === type) {
          script.remove();
        }
      } catch (e) {
        console.warn('Failed to parse structured data:', e);
      }
    });
  }

  /**
   * Update existing structured data
   */
  static updateStructuredData(type: string, newData: StructuredData): void {
    this.removeStructuredData(type);
    this.addStructuredData(newData);
  }

  /**
   * Create organization structured data
   */
  static createOrganizationData(data: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    foundingDate?: string;
    contactPoint?: {
      email: string;
      contactType: string;
    };
    sameAs?: string[];
    serviceArea?: {
      latitude: number;
      longitude: number;
      radius: number;
    };
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      ...(data.logo && { logo: data.logo }),
      ...(data.description && { description: data.description }),
      ...(data.foundingDate && { foundingDate: data.foundingDate }),
      ...(data.contactPoint && {
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: data.contactPoint.contactType,
          email: data.contactPoint.email
        }
      }),
      ...(data.sameAs && { sameAs: data.sameAs }),
      ...(data.serviceArea && {
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: data.serviceArea.latitude,
            longitude: data.serviceArea.longitude
          },
          geoRadius: data.serviceArea.radius
        }
      })
    };
  }

  /**
   * Create service structured data
   */
  static createServiceData(data: {
    name: string;
    description: string;
    provider: string;
    category: string;
    url?: string;
    price?: string;
    priceCurrency?: string;
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: data.provider
      },
      category: data.category,
      ...(data.url && { url: data.url }),
      ...(data.price && {
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: data.priceCurrency || 'USD'
        }
      })
    };
  }

  /**
   * Create FAQ structured data
   */
  static createFAQData(questions: Array<{ question: string; answer: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    };
  }
}

/**
 * SEO optimization utilities
 */
export class SEOOptimizer {
  /**
   * Generate meta description from content
   */
  static generateDescription(content: string, maxLength: number = 160): string {
    // Remove HTML tags and extra whitespace
    const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    // Truncate at word boundary
    const truncated = cleanContent.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  }

  /**
   * Extract keywords from content
   */
  static extractKeywords(content: string, maxKeywords: number = 10): string[] {
    // Remove HTML tags and convert to lowercase
    const cleanContent = content.replace(/<[^>]*>/g, '').toLowerCase();
    
    // Common stop words to exclude
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);
    
    // Extract words and count frequency
    const words = cleanContent.match(/\b[a-z]{3,}\b/g) || [];
    const wordCount: { [key: string]: number } = {};
    
    words.forEach(word => {
      if (!stopWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Sort by frequency and return top keywords
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word);
  }

  /**
   * Optimize heading structure
   */
  static validateHeadingStructure(): { valid: boolean; issues: string[] } {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues: string[] = [];
    let h1Count = 0;
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim();
      
      // Check for multiple H1 tags
      if (level === 1) {
        h1Count++;
        if (h1Count > 1) {
          issues.push(`Multiple H1 tags found: "${text}"`);
        }
      }
      
      // Check heading hierarchy
      if (index > 0 && level > previousLevel + 1) {
        issues.push(`Heading hierarchy skipped: "${text}" (H${level} after H${previousLevel})`);
      }
      
      previousLevel = level;
    });
    
    if (h1Count === 0) {
      issues.push('No H1 tag found on the page');
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Check for missing alt text on images
   */
  static checkImageAltText(): { total: number; missing: number; images: HTMLImageElement[] } {
    const images = Array.from(document.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '');
    
    return {
      total: images.length,
      missing: missingAlt.length,
      images: missingAlt
    };
  }

  /**
   * Generate sitemap entry for current page
   */
  static generateSitemapEntry(): {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
  } {
    return {
      loc: window.location.href,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    };
  }
}

// Export singleton instances
export const seoManager = SEOManager.getInstance();

// Export utility functions
export const {
  addStructuredData,
  removeStructuredData,
  updateStructuredData,
  createOrganizationData,
  createServiceData,
  createFAQData
} = StructuredDataManager;

export const {
  generateDescription,
  extractKeywords,
  validateHeadingStructure,
  checkImageAltText,
  generateSitemapEntry
} = SEOOptimizer;
