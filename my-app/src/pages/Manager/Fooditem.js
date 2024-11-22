import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";

function FoodItemPage() {
  const { zoomLevel } = useZoom();
  return (
    <div
      className="foodItemPage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <main>
        <ManagerTable dataType="fooditem" />
      </main>
      <Footer />
    </div>
  );
}

export default FoodItemPage;
