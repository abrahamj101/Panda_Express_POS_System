import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";
import BackButton from "../../components/Navigation/BackButton";
import "../../styles/Pages/Inventory.css";
import { Link } from "react-router-dom";

function InventoryPage() {
  const { zoomLevel } = useZoom();

  const handleAddItemClick = () => {
    // implement this next
    console.log("Add Item button clicked");
  };

  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="main-content">
        <BackButton location="/manager" />
        <div className="inventory-header">
          <h2>Inventory List</h2>
          <button className="add-item-button" onClick={handleAddItemClick}>
            Add Items
          </button>
        </div>
        <ManagerTable dataType="inventory" />
      </div>
      <Footer />
    </div>
  );
}

export default InventoryPage;
