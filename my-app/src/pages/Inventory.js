
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ManagerTable from "../components/ManagerTable";

function InventoryPage(){
    return (

        <div className="employeePage">
            <Header/>
            <ManagerTable dataType="inventory" />
            <Footer/>
        </div>
    );
}

export default InventoryPage;