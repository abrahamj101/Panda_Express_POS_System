import { useState, useEffect } from 'react';

/**
 * This function handles the creation of the Text to Speech button. 
 * It uses the window.speechSynthesis API to speak text based on the user's interaction with the page.
 * @param {boolean} ttsEnabled - The initial enabled state of Text to Speech functionality.
 * @param {function} onToggle - The callback function triggered when the Text to Speech functionality is toggled.
 * @returns {JSX.Element} The Text to Speech toggle button component.
 */
const TTSButton = ({ ttsEnabled, onToggle }) => {
  const [enabled, setEnabled] = useState(ttsEnabled); // State to track if TTS is enabled
  const [currentUtterance, setCurrentUtterance] = useState(null); // State to track the current speech utterance

  // Update the enabled state whenever the ttsEnabled prop changes
  useEffect(() => {
    setEnabled(ttsEnabled);
  }, [ttsEnabled]);

  // Add or remove the mouseover event listener based on the enabled state
  useEffect(() => {
    const handleMouseOver = (event) => {
      if (enabled) {
        if (currentUtterance) {
          window.speechSynthesis.cancel(); // Cancel ongoing speech if any
        }
        const target = event.target;

        // Speak alt text for images, text content for other elements
        if (target.tagName === 'IMG' && target.alt) {
          speak(target.alt);
        } else if (
          target.tagName === 'P' ||
          target.tagName === 'SPAN' ||
          target.tagName === 'H1' ||
          target.tagName === 'H2' ||
          target.tagName === 'H3' ||
          target.tagName === 'H4' ||
          target.tagName === 'H5' ||
          target.tagName === 'H6' ||
          target.tagName === 'B' ||
          target.tagName === 'DIV' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'TD' ||
          target.tagName === 'TH'
        ) {
          speak(target.textContent);
        }
      }
    };

    if (enabled) {
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      document.removeEventListener('mouseover', handleMouseOver);
    }

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, currentUtterance]);

  /**
   * Speaks the provided text using the Web Speech API.
   * @param {string} text - The text to be spoken aloud.
   */
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    setCurrentUtterance(utterance);
    utterance.onend = () => {
      setCurrentUtterance(null); // Clear the current utterance after speech ends
    };
    window.speechSynthesis.speak(utterance); // Speak the text
  };

  /**
   * Toggles the Text to Speech functionality on or off.
   * Updates the enabled state and triggers the onToggle callback.
   */
  const toggleTTS = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onToggle(newEnabled);

    // Provide auditory feedback for enabling or disabling TTS
    if (!newEnabled) {
      speak("Text to speech disabled");
    } else {
      speak("Text to speech enabled");
    }
  };

  return (
    <button
      className="zoom-btn"
      onClick={toggleTTS}
    >
      {enabled ? 'Disable Text to Speech' : 'Enable Text to Speech'}
    </button>
  );
};

export default TTSButton;
