// Performance monitoring utility for mobile optimization

// Track Core Web Vitals
export const trackCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('📊 LCP:', lastEntry.startTime);
        
        // Track to analytics if LCP is poor
        if (lastEntry.startTime > 2500) {
          trackPerformanceIssue('lcp_slow', {
            value: lastEntry.startTime,
            threshold: 2500,
            url: window.location.pathname
          });
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP tracking failed:', error);
    }
  }

  // Track First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('📊 FID:', entry.processingStart - entry.startTime);
          
          // Track to analytics if FID is poor
          if (entry.processingStart - entry.startTime > 100) {
            trackPerformanceIssue('fid_slow', {
              value: entry.processingStart - entry.startTime,
              threshold: 100,
              url: window.location.pathname
            });
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID tracking failed:', error);
    }
  }

  // Track Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('📊 CLS:', clsValue);
            
            // Track to analytics if CLS is poor
            if (clsValue > 0.1) {
              trackPerformanceIssue('cls_poor', {
                value: clsValue,
                threshold: 0.1,
                url: window.location.pathname
              });
            }
          }
        });
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS tracking failed:', error);
    }
  }
};

// Track mobile-specific performance issues
export const trackMobilePerformance = () => {
  if (typeof window === 'undefined') return;

  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isMobile) return;

  // Track touch response time
  let touchStartTime = 0;
  let touchEndTime = 0;

  document.addEventListener('touchstart', () => {
    touchStartTime = performance.now();
  }, { passive: true });

  document.addEventListener('touchend', () => {
    touchEndTime = performance.now();
    const touchResponseTime = touchEndTime - touchStartTime;
    
    console.log('📱 Touch Response Time:', touchResponseTime);
    
    if (touchResponseTime > 100) {
      trackPerformanceIssue('touch_slow', {
        value: touchResponseTime,
        threshold: 100,
        url: window.location.pathname
      });
    }
  }, { passive: true });

  // Track scroll performance
  let scrollStartTime = 0;
  let scrollEndTime = 0;
  let scrollTimeout;

  document.addEventListener('scroll', () => {
    if (!scrollStartTime) {
      scrollStartTime = performance.now();
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollEndTime = performance.now();
      const scrollDuration = scrollEndTime - scrollStartTime;
      
      console.log('📱 Scroll Duration:', scrollDuration);
      
      if (scrollDuration > 50) {
        trackPerformanceIssue('scroll_slow', {
          value: scrollDuration,
          threshold: 50,
          url: window.location.pathname
        });
      }
      
      scrollStartTime = 0;
    }, 100);
  }, { passive: true });

  // Track memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = performance.memory;
      const usedMemoryMB = memory.usedJSHeapSize / 1024 / 1024;
      
      console.log('📱 Memory Usage (MB):', usedMemoryMB.toFixed(2));
      
      if (usedMemoryMB > 50) {
        trackPerformanceIssue('memory_high', {
          value: usedMemoryMB,
          threshold: 50,
          url: window.location.pathname
        });
      }
    }, 10000); // Check every 10 seconds
  }
};

// Track performance issues to analytics
const trackPerformanceIssue = (issueType, data) => {
  // Import analytics tracking
  import('@/utils/vercelAnalytics').then(({ trackEvent }) => {
    trackEvent('performance_issue', {
      issue_type: issueType,
      ...data,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    });
  }).catch(() => {
    // Fallback if analytics not available
    console.warn('Performance issue:', issueType, data);
  });
};

// Track exam-specific performance
export const trackExamPerformance = () => {
  if (typeof window === 'undefined') return;

  // Track question transition time
  let questionStartTime = 0;
  
  const trackQuestionTransition = () => {
    const transitionTime = performance.now() - questionStartTime;
    console.log('📊 Question Transition Time:', transitionTime);
    
    if (transitionTime > 500) {
      trackPerformanceIssue('exam_transition_slow', {
        value: transitionTime,
        threshold: 500,
        url: window.location.pathname
      });
    }
  };

  // Track option selection time
  const trackOptionSelection = (optionValue) => {
    const selectionTime = performance.now() - questionStartTime;
    console.log('📊 Option Selection Time:', selectionTime, 'Option:', optionValue);
    
    if (selectionTime > 200) {
      trackPerformanceIssue('exam_selection_slow', {
        value: selectionTime,
        option: optionValue,
        threshold: 200,
        url: window.location.pathname
      });
    }
  };

  return {
    startQuestionTimer: () => {
      questionStartTime = performance.now();
    },
    trackQuestionTransition,
    trackOptionSelection
  };
};

// Initialize performance tracking
export const initializePerformanceTracking = () => {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  trackCoreWebVitals();
  
  // Track mobile-specific performance
  trackMobilePerformance();
  
  console.log('🚀 Performance tracking initialized');
};

// Export exam performance tracker
export const examPerformanceTracker = trackExamPerformance(); 