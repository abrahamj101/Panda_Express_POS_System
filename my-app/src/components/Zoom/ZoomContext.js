// ZoomContext.js
import React, { createContext, useContext, useState } from "react";

const ZoomContext = createContext();

/**
 * A context provider that manages the zoom level state and provides zoom functionality.
 * 
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the ZoomProvider.
 * @returns {JSX.Element} A context provider for managing zoom level state.
 */
export const ZoomProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  /**
   * Increases the zoom level by 0.1, up to a maximum of 2.
   */
  const zoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));

  /**
   * Decreases the zoom level by 0.1, down to a minimum of 1.
   */
  const zoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));

  return (
    <ZoomContext.Provider value={{ zoomLevel, zoomIn, zoomOut }}>
      {children}
    </ZoomContext.Provider>
  );
};

/**
 * Custom hook to access the zoom context, including the current zoom level and zoom controls.
 * 
 * @returns {Object} An object containing the zoom level (`zoomLevel`), and functions to zoom in (`zoomIn`) and zoom out (`zoomOut`).
 */
export const useZoom = () => useContext(ZoomContext);
