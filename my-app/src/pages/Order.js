
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ManagerTable from "../components/ManagerTable";

function OrderPage(){
    return (

        <div className="employeePage">
            <Header/>
            <ManagerTable dataType="order" />
            <Footer/>
        </div>
    );
}

export default OrderPage;