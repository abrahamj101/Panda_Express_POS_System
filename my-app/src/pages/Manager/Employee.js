import Header from "../../components/Navigation/Header";
import Footer from "../../components/Navigation/Footer";
import ManagerTable from "../../components/ManagerTable";

function EmployeePage() {
    return (
        <div className="employeePage">
            <Header />
            <h1>Employee Data</h1>
            <ManagerTable dataType="employee" />
            <Footer />
        </div>
    );
}

export default EmployeePage;
