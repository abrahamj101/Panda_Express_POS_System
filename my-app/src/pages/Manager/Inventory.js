import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";

import addInventoryItem from "../api/inventory/addInventoryItems.js";
import removeInventoryItem from "../api/inventory/removeInventoryItems.js";

function InventoryPage() {
  const { zoomLevel } = useZoom();

  const handleAdd = async () => {
    const newItem = {
      name: "New Item",
      quantity: 10,
      last_restocked: new Date().toISOString(),
    };
    try {
      await addInventoryItem(newItem);
      alert("Item added successfully");
    } catch (error) {
      alert("Error adding item");
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeInventoryItem(id);
      alert("Item removed successfully");
    } catch (error) {
      alert("Error removing item");
    }
  };

  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <div className="inventory-actions">
        <button onClick={handleAdd} className="add-button">
          Add Item
        </button>
        {/* figure this out next */}
        <button onClick={() => handleRemove(1)} className="remove-button">
          Remove Item
        </button>
      </div>
      <ManagerTable dataType="inventory" />
      <Footer />
    </div>
  );
}

export default InventoryPage;
