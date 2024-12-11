import React, { useEffect } from "react";

/**
 * A React component that integrates the Google Translate widget into a web page.
 * It dynamically loads the Google Translate script and initializes the translation widget.
 * The widget allows users to translate the page content into different languages.
 * @returns {JSX.Element} A container element for the Google Translate widget.
 */
const GoogleTranslate = () => {
  useEffect(() => {
    let timeoutId;

    /**
     * Initializes the Google Translate widget by creating a new TranslateElement instance.
     * Ensures the widget is attached to the `google_translate_element` container.
     */
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

    /**
     * Loads the Google Translate script dynamically into the document.
     * Attaches a callback function for widget initialization upon script load.
     */
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

    /**
     * Cleanup function to remove the Google Translate widget and related script.
     * Ensures proper cleanup of DOM elements and global variables when the component is unmounted.
     */
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
