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
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_MushroomChicken.png"
            alt="Menu Item 4"
          />
          <p className="legend">Mushroom Chicken</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_ShanghaiAngusSteak.png"
            alt="Menu Item 5"
          />
          <p className="legend">Black Pepper Sirloin Steak</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_GrilledTeriyakiChicken.png"
            alt="Menu Item 6"
          />
          <p className="legend">Grilled Teriyaki Chicken</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_KungPaoChicken.png"
            alt="Menu Item 7"
          />
          <p className="legend">Kung Pao Chicken</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_HoneySesameChickenBreast.png"
            alt="Menu Item 8"
          />
          <p className="legend">Honey Sesame Chicken Breast</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_SweetFireChickenBreast.png"
            alt="Menu Item 9"
          />
          <p className="legend">SweetFire Chicken Breast</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/ChickenBreast_StringBeanChickenBreast.png"
            alt="Menu Item 10"
          />
          <p className="legend">String Bean Chicken Breast</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BroccoliBeef.png"
            alt="Menu Item 11"
          />
          <p className="legend">Broccoli Beef</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_BlackPepperChicken.png"
            alt="Menu Item 12"
          />
          <p className="legend">Black Pepper Chicken</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Vegetables_SuperGreens.png"
            alt="Menu Item 13"
          />
          <p className="legend">Super Greens</p>
        </div>
        <div className="image-box">
          <img
            className="carousel-image"
            src="https://nomnom-files.pandaexpress.com/global/assets/modifiers/Hot+Bourbon+Chicken_5_24_OLO_2.png"
            alt="Menu Item 14"
          />
          <p className="legend">Hot Ones Blazing Bourbon Chicken</p>
        </div>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;