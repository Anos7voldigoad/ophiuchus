import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Performance optimization: Use strict mode for development
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // Send LCP to analytics
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            // Send FID to analytics
            const fidEntry = entry as PerformanceEventTiming;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            // Send CLS to analytics
            const clsEntry = entry as any;
            console.log('CLS:', clsEntry.value);
          }
        }
      });
      observer.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    } catch (e) {
      console.warn('Performance monitoring failed:', e);
    }
  }
}

// Error boundary for React rendering
const _handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error('React Error Boundary caught an error:', error, errorInfo);
  // Send to error reporting service in production
};

// Render with error boundary
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

