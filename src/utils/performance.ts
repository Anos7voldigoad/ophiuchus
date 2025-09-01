// Performance monitoring and optimization utilities

export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
}

export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  domContentLoaded: number;
  loadComplete: number;
}

/**
 * Monitor Core Web Vitals and other performance metrics
 */
export class PerformanceMonitor {
  private observer: PerformanceObserver | null = null;
  private metrics: Partial<PerformanceMetrics> = {};
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor() {
    this.initObserver();
  }

  private initObserver() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      this.observer.observe({
        entryTypes: [
          'largest-contentful-paint',
          'first-input',
          'layout-shift',
          'first-contentful-paint',
          'navigation'
        ]
      });
    } catch (e) {
      console.warn('Performance monitoring failed:', e);
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'largest-contentful-paint':
        this.metrics.lcp = entry.startTime;
        break;
      case 'first-input':
        const fidEntry = entry as PerformanceEventTiming;
        this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
        break;
      case 'layout-shift':
        const clsEntry = entry as LayoutShift;
        this.metrics.cls = (this.metrics.cls || 0) + clsEntry.value;
        break;
      case 'first-contentful-paint':
        this.metrics.fcp = entry.startTime;
        break;
      case 'navigation':
        const navEntry = entry as PerformanceNavigationTiming;
        this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
        this.metrics.domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
        this.metrics.loadComplete = navEntry.loadEventEnd - navEntry.loadEventStart;
        break;
    }

    // Check if we have all metrics
    if (this.isComplete()) {
      this.notifyCallbacks();
    }
  }

  private isComplete(): boolean {
    return !!(this.metrics.lcp && this.metrics.fid && this.metrics.cls !== undefined);
  }

  private notifyCallbacks() {
    const completeMetrics = this.metrics as PerformanceMetrics;
    this.callbacks.forEach(callback => callback(completeMetrics));
  }

  /**
   * Subscribe to performance metrics updates
   */
  onMetrics(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    
    // If metrics are already complete, call immediately
    if (this.isComplete()) {
      callback(this.metrics as PerformanceMetrics);
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Clean up observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

/**
 * Performance optimization utilities
 */
export class PerformanceOptimizer {
  /**
   * Preload critical resources
   */
  static preloadResource(href: string, as: string, type?: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }

  /**
   * Prefetch non-critical resources
   */
  static prefetchResource(href: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  /**
   * Lazy load images with intersection observer
   */
  static lazyLoadImages(selector: string = 'img[data-src]') {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.loadAllImages(selector);
      return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  }

  /**
   * Fallback for older browsers
   */
  private static loadAllImages(selector: string) {
    document.querySelectorAll(selector).forEach((img: Element) => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src!;
      imgElement.classList.remove('lazy');
    });
  }

  /**
   * Debounce function calls for performance
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function calls for performance
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Optimize animations for performance
   */
  static optimizeAnimations() {
    // Add will-change to elements that will animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.willChange = 'transform, opacity';
    });
  }

  /**
   * Remove will-change after animation
   */
  static cleanupAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.willChange = 'auto';
    });
  }
}

/**
 * Performance analytics and reporting
 */
export class PerformanceAnalytics {
  /**
   * Send performance metrics to analytics
   */
  static sendMetrics(metrics: PerformanceMetrics, endpoint?: string) {
    if (!endpoint) {
      // Log to console in development
      console.log('Performance Metrics:', metrics);
      return;
    }

    // Send to analytics endpoint
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: window.location.href,
        timestamp: Date.now(),
        metrics,
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType || 'unknown'
      })
    }).catch(console.error);
  }

  /**
   * Get performance score based on Core Web Vitals
   */
  static getPerformanceScore(metrics: PerformanceMetrics): number {
    let score = 100;

    // LCP scoring (0-25 points)
    if (metrics.lcp <= 2500) score -= 0;
    else if (metrics.lcp <= 4000) score -= 10;
    else score -= 25;

    // FID scoring (0-25 points)
    if (metrics.fid <= 100) score -= 0;
    else if (metrics.fid <= 300) score -= 10;
    else score -= 25;

    // CLS scoring (0-25 points)
    if (metrics.cls <= 0.1) score -= 0;
    else if (metrics.cls <= 0.25) score -= 10;
    else score -= 25;

    // TTFB scoring (0-25 points)
    if (metrics.ttfb <= 800) score -= 0;
    else if (metrics.ttfb <= 1800) score -= 10;
    else score -= 25;

    return Math.max(0, score);
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const {
  preloadResource,
  prefetchResource,
  lazyLoadImages,
  debounce,
  throttle,
  optimizeAnimations,
  cleanupAnimations
} = PerformanceOptimizer;

export const {
  sendMetrics,
  getPerformanceScore
} = PerformanceAnalytics;
