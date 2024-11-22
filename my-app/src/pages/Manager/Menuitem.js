import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";

function MenuItemPage() {
  const { zoomLevel } = useZoom();
  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <ManagerTable dataType="menuitem" />
      <Footer />
    </div>
  );
}

export default MenuItemPage;
