import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";
import BackButton from "../../components/Navigation/BackButton";

function MenuItemPage() {
  const { zoomLevel } = useZoom();
  return (
    <div
      className="menuitemPage" //"employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location="/manager" />
        <ManagerTable dataType="menuitem" />
      </div>
      <Footer />
    </div>
  );
}

export default MenuItemPage;
