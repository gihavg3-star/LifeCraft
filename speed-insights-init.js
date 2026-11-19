/**
 * Vercel Speed Insights Initialization
 * This module initializes Vercel Speed Insights for performance monitoring
 */

import { injectSpeedInsights } from './vendor/speed-insights.mjs';

// Initialize Speed Insights
// This will automatically track web vitals and performance metrics
injectSpeedInsights({
  debug: false, // Set to true for development debugging
  framework: 'vanilla-js'
});
