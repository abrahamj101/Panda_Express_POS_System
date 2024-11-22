import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerPage/ManagerTable";
import { useZoom } from "../../components/Zoom/ZoomContext";

function EmployeePage() {
  const { zoomLevel } = useZoom();
  return (
    <div
      className="employeePage"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
    >
      <Header />
      <h1>Employee Data</h1>
      <ManagerTable dataType="employee" />
      <Footer />
    </div>
  );
}

export default EmployeePage;
