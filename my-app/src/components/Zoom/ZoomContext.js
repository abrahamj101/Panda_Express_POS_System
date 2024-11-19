// ZoomContext.js
import React, { createContext, useContext, useState } from "react";

const ZoomContext = createContext();

export const ZoomProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
  const zoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));

  return (
    <ZoomContext.Provider value={{ zoomLevel, zoomIn, zoomOut }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => useContext(ZoomContext);
