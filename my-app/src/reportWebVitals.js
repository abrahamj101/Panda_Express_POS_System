/**
 * Report Web Vitals
 * This utility function measures and reports key web vitals performance metrics, 
 * such as CLS, FID, FCP, LCP, and TTFB. It dynamically imports the `web-vitals` library 
 * and executes the provided callback function with performance data.
 *
 * @file reportWebVitals.js
 * @module reportWebVitals
 * @requires web-vitals
 *
 * @param {Function} onPerfEntry - A callback function to handle the performance metrics.
 *                                 This function will receive the results of each web vital measurement.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        /**
         * Cumulative Layout Shift (CLS): Measures visual stability.
         */
        getCLS(onPerfEntry);

        /**
         * First Input Delay (FID): Measures interactivity.
         */
        getFID(onPerfEntry);

        /**
         * First Contentful Paint (FCP): Measures time to render the first content.
         */
        getFCP(onPerfEntry);

        /**
         * Largest Contentful Paint (LCP): Measures perceived load speed.
         */
        getLCP(onPerfEntry);

        /**
         * Time to First Byte (TTFB): Measures server response time.
         */
        getTTFB(onPerfEntry);
      }
    );
  }
};

export default reportWebVitals;
