import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/carousel.css";

const carouselItems = [
  {
    src: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png",
    alt: "Orange Chicken",
    legend: "Orange Chicken",
  },
  {
    src: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BeijingBeef.png",
    alt: "Beijing Beef",
    legend: "Beijing Beef",
  },
  {
    src: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Seafood_HoneyWalnutShrimp.png",
    alt: "Honey Walnut Shrimp",
    legend: "Honey Walnut Shrimp",
  },
  {
    src: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_MushroomChicken.png",
    alt: "Mushroom Chicken",
    legend: "Mushroom Chicken",
  },
  {
    src: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_ShanghaiAngusSteak.png",
    alt: "Black Pepper Sirloin Steak",
    legend: "Black Pepper Sirloin Steak",
  },
];

function ImageCarousel() {
  return (
    <div
      className="carousel-wrapper"
      aria-label="Image carousel showcasing popular menu items"
    >
      <Carousel
        className="carousel-container"
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={3000}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        aria-roledescription="carousel"
        stopOnHover={true}
        aria-live="polite"
      >
        {carouselItems.map((item, index) => (
          <div className="image-box" key={index}>
            <img className="carousel-image" src={item.src} alt={item.alt} />
            <p className="legend" aria-hidden="true">
              {item.legend}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
