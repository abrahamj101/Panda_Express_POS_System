import { useEffect, useState } from "react";
import getNutition from "../../pages/api/fooditems/getNutition";

const Nutrition = ({ foodItemId }) => {
    const [nutrition, setNutrition] = useState({})

    const fetchNutrition = async () => {
        try {
            const items = await getNutition();
            setNutrition(items);
        } catch (err) {
            console.error('Error fetching nutrition values:', err);
        }
    };

    useEffect(() => {
        fetchNutrition(foodItemId);
    }, []);

    return (
        <>
            
        </>
    );
}

export default Nutrition;