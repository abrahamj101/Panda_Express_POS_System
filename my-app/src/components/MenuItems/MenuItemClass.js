import getFoodItems from "../../pages/api/fooditems/getFooditems"
import updateInventoryItemQuantity from "../../pages/api/inventory/updateQuantityOrders";
import getInventoryItems from "../../pages/api/inventory/getInventoryItems";
import updateFoodItemInStock from "../../pages/api/fooditems/updateInStock";
import updateMenuItemInStock from "../../pages/api/menuItems/updateInStock";

class MenuItem {
    constructor(menuitemId, menuItemName, price, imgLink, inventoryItemIds, inStock) {
        this.menuitemId = menuitemId;
        this.foodItemIds = [];
        this.total = price;
        this.name = menuItemName;
        this.imgLink = imgLink;
        this.inventoryItemIds = inventoryItemIds;
        this.inStock = inStock;
    }

    // Adds a food item ID to the foodItemIds array and updates the total price if needed
    addFoodItem(foodItemId) {
        this.foodItemIds.push(foodItemId);
        if (foodItemId === 8 || foodItemId === 9) {
            if ([1, 2, 3, 8].includes(this.menuitemId)) {
                this.total += 1.5;
            } else if (this.menuitemId === 5) {
                this.total += 4.5;
            } else if (this.menuitemId === 4) {
                this.total += 1.0;
            }
        }
        this.foodItemIds.sort()
    }

    removeFoodItem(foodItemId) {
        for (let i = 0; i < this.foodItemIds.length; ++i) {
            if (this.foodItemIds[i] === foodItemId) {
                this.foodItemIds.splice(i, 1);
                if (foodItemId === 8 || foodItemId === 9) {
                    if ([1, 2, 3, 8].includes(this.menuitemId)) {
                        this.total -= 1.5;
                    } else if (this.menuitemId === 5) {
                        this.total -= 4.5;
                    } else if (this.menuitemId === 4) {
                        this.total -= 1.0;
                    }
                }
                break;
            }
        }
    }
    

    // Returns the total price of the menu item
    getTotal() {
        return this.total;
    }

    // Returns the name of the menu item
    getName() {
        return this.name;
    }

    // Returns the menu item ID
    getMenuItemId() {
        return this.menuitemId;
    }

    getImageLink() {
        return this.imgLink;
    }

    getFoodItemIds() {
        return this.foodItemIds;
    }

    // Alters the inventory quantities based on the food items associated with this menu item
    async alterInventory() {

        const inventoryIds = await this.getFoodItemInventoryItemIds();
        const inventoryAmounts = await this.getFoodItemInventoryAmounts();
        let foodItemIndex = 0;
        for (let i = 0; i < inventoryIds.length; i++){
            const amountToSubtractArray = inventoryAmounts[i]
            const inventoryIdArray = inventoryIds[i]
            for (let j = 0; j < amountToSubtractArray.length; j++) {
                const inventoryId = inventoryIdArray[j];
                const amountToSubtract = amountToSubtractArray[j];
                await this.updateInventoryQuantity(inventoryId, amountToSubtract);
                await this.updateInStockFoodItem(this.foodItemIds[foodItemIndex], inventoryId, amountToSubtract);
            }
            foodItemIndex++;
        }


        for (const inventoryId of this.inventoryItemIds) {
            await this.updateInventoryQuantity(inventoryId, 1);
            
            await this.updateInStockMenuItem(this.menuitemId, inventoryId);
        }
    }

    // Updates the stock status of a food item based on inventory quantity
    async updateInStockFoodItem(foodItemId, inventoryId, neededQuantity) {
        const quantity = (await getInventoryItems()).find(item => item.inventoryitem_id === inventoryId).quantity;
        if (quantity < neededQuantity) {
            await updateFoodItemInStock(foodItemId, false);
        }
    }

    // Updates the stock status of a menu item based on inventory quantity
    async updateInStockMenuItem(menuItemId, inventoryId) {
        const quantity = (await getInventoryItems()).find(item => item.inventoryitem_id === inventoryId).quantity;
        if (quantity < 1) {
            await updateMenuItemInStock(menuItemId, false);
        }
    }

    // Updates the quantity of a specific inventory item by subtracting a given amount
    async updateInventoryQuantity(inventoryId, amountToSubtract) {
        await updateInventoryItemQuantity(inventoryId, amountToSubtract);
    }

    // Retrieves the inventory IDs associated with a specified food item
    async getFoodInventoryIds(foodItemId) {
        const sql = "SELECT inventoryItem_ids FROM FoodItems WHERE foodItem_id = ?";
        const result = await this.database.query(sql, [foodItemId]);
        if (result.rows.length > 0 && result.rows[0].inventoryItem_ids) {
            return result.rows[0].inventoryItem_ids;
        }
        return [];
    }

    // Retrieves the inventory IDs associated with a specified menu item
    async getMenuInventoryIds(menuItemId) {
        const sql = "SELECT inventoryitem_ids FROM MenuItems WHERE menuItem_id = ?";
        const result = await this.database.query(sql, [menuItemId]);
        if (result.rows.length > 0 && result.rows[0].inventoryitem_ids) {
            return result.rows[0].inventoryitem_ids;
        }
        return [];
    }

    // Retrieves the inventory amounts associated with a specified food item
    async getInventoryAmounts(foodItemId) {
        const sql = "SELECT inventory_amounts FROM FoodItems WHERE foodItem_id = ?";
        const result = await this.database.query(sql, [foodItemId]);
        if (result.rows.length > 0 && result.rows[0].inventory_amounts) {
            return result.rows[0].inventory_amounts;
        }
        return [];
    }

    isSeason(menuItem) {
        return true;
    }

    async getFoodItems() {
        try {
            return await getFoodItems();
        } catch (err) {
            console.error("Error fetching food items:", err);
            return [];
        }
    }

    async extractFoodItemData(key) {
        const returnValue = [];
        try {
            const foodItems = await this.getFoodItems();
            if (foodItems) {
                for (const foodItemId of this.foodItemIds) {
                    const foodItem = foodItems.find(item => item.fooditem_id === foodItemId);
                    if (foodItem && foodItem[key] !== undefined) {
                        returnValue.push(foodItem[key]);
                    }
                }
            }
        } catch (err) {
            console.error(`Error extracting ${key} from food items:`, err);
        }
        return returnValue;
    }
    
    async getFoodItemInventoryItemIds() {
        return await this.extractFoodItemData("inventoryitem_ids");
    }
    
    async getFoodItemInventoryAmounts() {
        return await this.extractFoodItemData("inventory_amounts");
    }
    
    async getFoodItemNames() {
        return await this.extractFoodItemData("fooditem_name");
    }
    
    
    async checkRestriction() {
        const restrictions = await this.extractFoodItemData("restriction");
        const foodItemNames = await this.extractFoodItemData("fooditem_name");
        let restrictionMap = {};
    
        for (let i = 0; i < this.foodItemIds.length; ++i) {
            const restriction = restrictions[i];
            const foodItemName = foodItemNames[i];
    
            if (restriction) {
                restrictionMap[foodItemName] = restriction;
            }
        }
    
        return restrictionMap;
    }
    
    

}


export default MenuItem;