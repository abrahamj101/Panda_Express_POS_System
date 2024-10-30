import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

function ImageCarousel() {
  const [carouselData, setCarouselData] = useState([]);

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
      {carouselData.length === 0 ? (
        <p>Loading carousel...</p>
      ) : (
        <Carousel>
          {carouselData.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.image_url}
                alt={`Slide ${index + 1}`}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ImageCarousel;
