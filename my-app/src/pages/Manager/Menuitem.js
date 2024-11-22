import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerTable";

function MenuItemPage(){
    return (

        <div className="employeePage">
            <Header/>
            <ManagerTable dataType="menuitem" />
            <Footer/>
        </div>
    );
}

export default MenuItemPage;