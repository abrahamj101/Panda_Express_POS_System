import React, { useState, useEffect } from "react";
import axios from "axios";

function MenuItemGrid() {

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/carousel")
      .then((response) => {
        console.log("Fetched Carousel Data:", response.data);
        setCarouselData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching carousel data:", error);
      });
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default MenuItemGrid;
