// import React, { useState, useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import axios from "axios";

// function ImageCarousel() {
//   const [carouselData, setCarouselData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/carousel")
//       .then((response) => {
//         console.log("Fetched Carousel Data:", response.data);
//         setCarouselData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching carousel data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       {carouselData.length === 0 ? (
//         <p>Loading carousel...</p>
//       ) : (
//         <Carousel>
//           {carouselData.map((item, index) => (
//             <Carousel.Item key={index}>
//               <img
//                 className="d-block w-100"
//                 src={item.image_url}
//                 alt={`Slide ${index + 1}`}
//               />
//               <Carousel.Caption>
//                 <h3>{item.title}</h3>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       )}
//     </div>
//   );
// }

// export default ImageCarousel;


import { Carousel } from "react-responsive-carousel";
import "../../styles/carousel.css"

function ImageCarousel() {
  

  return (
    <div className="carousel-wrapper">
          <Carousel
            className="carousel-container"
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            interval={3000}
          >
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png"
                alt="Menu Item 1"
              />
              <p className="legend">Orange Chicken</p>
            </div>
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BeijingBeef.png"
                alt="Menu Item 2"
              />
              <p className="legend">Beijing Beef</p>
            </div>
            <div className="image-box">
              <img
                className="carousel-image"
                src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Seafood_HoneyWalnutShrimp.png"
                alt="Menu Item 3"
              />
              <p className="legend">Honey Walnut Shrimp</p>
            </div>
          </Carousel>
        </div>
  );
}

export default ImageCarousel;
