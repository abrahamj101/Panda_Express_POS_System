import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    let timeoutId;

    // Function to initialize Google Translate widget
    const initializeGoogleTranslate = () => {
      try {
        if (window.google && window.google.translate && !window.googleTranslateElement) {
          window.googleTranslateElement = new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        }
      } catch (error) {
        console.error("Error initializing Google Translate widget:", error);
      }
    };

    // Function to load the Google Translate script
    const loadScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        // Create and append the Google Translate script
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;

        // Attach the initialization callback to the window object
        script.onload = initializeGoogleTranslate;
        script.onerror = () => {
          console.error("Failed to load Google Translate script.");
        };

        window.googleTranslateElementInit = initializeGoogleTranslate;

        document.body.appendChild(script);
      } else {
        // Script already exists, directly initialize the widget
        initializeGoogleTranslate();
      }
    };

    // Debounce or throttle script loading
    timeoutId = setTimeout(loadScript, 500);

    // Cleanup function to remove the widget and script
    return () => {
      clearTimeout(timeoutId);

      try {
        // Remove the Google Translate widget
        const widgetFrame = document.querySelector(".goog-te-banner-frame");
        if (widgetFrame && widgetFrame.parentNode) {
          widgetFrame.parentNode.removeChild(widgetFrame);
        }

        // Clear any widget-related content
        const translateContainer = document.querySelector("#google_translate_element");
        if (translateContainer) {
          translateContainer.innerHTML = "";
        }

        // Remove the Google Translate script
        const script = document.querySelector("#google-translate-script");
        if (script) {
          script.remove();
        }

        // Clean up global variables
        delete window.googleTranslateElementInit;
        delete window.googleTranslateElement;
      } catch (error) {
        console.warn("Error during cleanup of Google Translate widget:", error);
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

// Global error handler to suppress repetitive errors caused by Google Translate
window.onerror = function (message, source, lineno, colno, error) {
  if (source && source.includes("translate.google.com")) {
    // Suppress errors related to Google Translate
    return true;
  }
  return false;
};

export default React.memo(GoogleTranslate);
