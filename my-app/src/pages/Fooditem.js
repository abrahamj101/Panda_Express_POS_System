import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ManagerTable from "../components/ManagerTable";

function FoodItemPage() {
    return (
        <div className="foodItemPage">
            {/* <Header /> */}
            <main>
                <h1>Food Items</h1>
                <ManagerTable dataType="fooditem" />
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default FoodItemPage;
