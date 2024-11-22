import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";

function InventoryPage() {
  const { zoomLevel } = useZoom();
  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <ManagerTable dataType="inventory" />
      <Footer />
    </div>
  );
}

export default InventoryPage;
