import { useEffect, useState } from "react";
import getOrders from "../../pages/api/orders/getCustomerOrders";

const Favorites = ({ menuItemId, customerId }) => {

    const [orders, setOrders] = useState([]);


    const fetchOrders = async () => {
        try {
            const customerOrders = await getOrders(customerId);
            
            
        } catch (err) {
            console.error("Could not get customer's orders")
        }
        
    }

    useEffect(() => {
        fetchOrders();
    }, []);
    

    return (
        <>
            <h1 className='type'>Favorites</h1>
            {}
        </>
    );
}

export default Favorites;