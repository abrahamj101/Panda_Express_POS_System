import getFoodItems from "../../pages/api/fooditems/getFooditems"
import updateInventoryItemQuantity from "../../pages/api/inventory/updateQuantityOrders";
import getInventoryItems from "../../pages/api/inventory/getInventoryItems";
import updateFoodItemInStock from "../../pages/api/fooditems/updateInStock";
import updateMenuItemInStock from "../../pages/api/menuItems/updateInStock";

/**
 * @file MenuItem 
 * @description Represents a menu item, including its properties, associated food items, 
 * inventory items, and operations to update inventory and stock status.
 */
class MenuItem {
    /**
     * Creates an instance of MenuItem.
     * @param {number} menuitemId - The ID of the menu item.
     * @param {string} menuItemName - The name of the menu item.
     * @param {number} price - The price of the menu item.
     * @param {string} imgLink - The image link for the menu item.
     * @param {number[]} inventoryItemIds - Array of associated inventory item IDs.
     * @param {boolean} inStock - Whether the menu item is in stock.
     * @param {number[]} [foodItemIds=[]] - Array of associated food item IDs.
     */
    constructor(menuitemId, menuItemName, price, imgLink, inventoryItemIds, inStock, foodItemIds=[]) {
        this.menuitemId = menuitemId;
        this.foodItemIds = foodItemIds;
        this.total = price;
        this.name = menuItemName;
        this.imgLink = imgLink;
        this.inventoryItemIds = inventoryItemIds;
        this.inStock = inStock;
    }

    /**
     * @method addFoodItem
     * @param {number} foodItemId - The ID of the food item to add.
     */
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

    /**
     * @method removeFoodItem
     * @param {number} foodItemId - The ID of the food item to remove.
     */
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
    


    /**
     * @method getTotal
     * @returns {number} The total price of the menu item.
     */
    getTotal() {
        return this.total;
    }

    /**
     * @method getName
     * @returns {string} The name of the menu item.
     */
    getName() {
        return this.name;
    }

    /**
     * @method getMenuItemId
     * @returns {number} The ID of the menu item.
     */
    getMenuItemId() {
        return this.menuitemId;
    }

    /**
     * @method getImageLink
     * @returns {string} The image link of the menu item.
     */
    getImageLink() {
        return this.imgLink;
    }

    /**
     * @method getFoodItemIds
     * @returns {number[]} Array of food item IDs associated with the menu item.
     */
    getFoodItemIds() {
        return this.foodItemIds;
    }

    /**
     * @method alterInventory
     * @async
     * @description Updates the inventory and stock status for the menu item and associated food items.
     */
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

    /**
     * @method updateInStockFoodItem
     * @async
     * @param {number} foodItemId - The ID of the food item.
     * @param {number} inventoryId - The ID of the inventory item.
     * @param {number} neededQuantity - The required quantity.
     */
    async updateInStockFoodItem(foodItemId, inventoryId, neededQuantity) {
        const quantity = (await getInventoryItems()).find(item => item.inventoryitem_id === inventoryId).quantity;
        if (quantity < neededQuantity) {
            await updateFoodItemInStock(foodItemId, false);
        }
    }

    /**
     * @method updateInStockMenuItem
     * @async
     * @param {number} menuItemId - The ID of the menu item.
     * @param {number} inventoryId - The ID of the inventory item.
     */
    async updateInStockMenuItem(menuItemId, inventoryId) {
        const quantity = (await getInventoryItems()).find(item => item.inventoryitem_id === inventoryId).quantity;
        if (quantity < 1) {
            await updateMenuItemInStock(menuItemId, false);
        }
    }

    /**
     * @method updateInventoryQuantity
     * @param {number} inventoryId - The ID of the inventory item to update.
     * @param {number} amountToSubtract - The amount to subtract from the inventory item's quantity.
     */
    async updateInventoryQuantity(inventoryId, amountToSubtract) {
            await updateInventoryItemQuantity(inventoryId, amountToSubtract);
    }

    /**
     * @method getFoodInventoryIds
     * @async
     * @param {number} foodItemId - The ID of the food item.
     * @returns {Promise<number[]>} A promise that resolves to an array of inventory item IDs.
     */
    async getFoodInventoryIds(foodItemId) {
        const sql = "SELECT inventoryItem_ids FROM FoodItems WHERE foodItem_id = ?";
        const result = await this.database.query(sql, [foodItemId]);
        if (result.rows.length > 0 && result.rows[0].inventoryItem_ids) {
            return result.rows[0].inventoryItem_ids;
        }
        return [];
    }

    /**
     * @method getMenuInventoryIds
     * @async
     * @param {number} menuItemId - The ID of the menu item.
     * @returns {Promise<number[]>} A promise that resolves to an array of inventory item IDs.
     */
    async getMenuInventoryIds(menuItemId) {
        const sql = "SELECT inventoryitem_ids FROM MenuItems WHERE menuItem_id = ?";
        const result = await this.database.query(sql, [menuItemId]);
        if (result.rows.length > 0 && result.rows[0].inventoryitem_ids) {
            return result.rows[0].inventoryitem_ids;
        }
        return [];
    }

    /**
     * @method getInventoryAmounts
     * @async
     * @param {number} foodItemId - The ID of the food item.
     * @returns {Promise<number[]>} A promise that resolves to an array of inventory amounts.
     */
    async getInventoryAmounts(foodItemId) {
        const sql = "SELECT inventory_amounts FROM FoodItems WHERE foodItem_id = ?";
        const result = await this.database.query(sql, [foodItemId]);
        if (result.rows.length > 0 && result.rows[0].inventory_amounts) {
            return result.rows[0].inventory_amounts;
        }
        return [];
    }

    /**
     * @method isSeason
     * @param {Object} menuItem - The menu item object.
     * @returns {boolean} True if the menu item is in season, otherwise false.
     */
    isSeason(menuItem) {
        return true;
    }

    /**
     * @method getFoodItems
     * @async
     * @returns {Promise<Object[]>} A promise that resolves to an array of food item objects.
     */
    async getFoodItems() {
        try {
            return await getFoodItems();
        } catch (err) {
            console.error("Error fetching food items:", err);
            return [];
        }
    }

    /**
     * @method extractFoodItemData
     * @async
     * @param {string} key - The key to extract from each food item.
     * @returns {Promise<Array<*>>} A promise that resolves to an array of extracted data
     */
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
    
    /**
     * @method getFoodItemInventoryItemIds
     * @async
     * @returns {Promise<number[]>} A promise that resolves to an array of inventory item IDs.
     */
    async getFoodItemInventoryItemIds() {
        return await this.extractFoodItemData("inventoryitem_ids");
    }
    
    /**
     * @method getFoodItemInventoryAmounts
     * @async
     * @returns {Promise<number[]>} A promise that resolves to an array of inventory amounts.
     */
    async getFoodItemInventoryAmounts() {
        return await this.extractFoodItemData("inventory_amounts");
    }
    
    /**
     * @method getFoodItemNames
     * @async
     * @returns {Promise<string[]>} A promise that resolves to an array of food item names.
     */
    async getFoodItemNames() {
        return await this.extractFoodItemData("fooditem_name");
    }
    
    /**
     * Checks for restrictions associated with food items.
     * @method checkRestriction
     * @async
     * @returns {Promise<Object>} - A promise that resolves to a map of food item names and their restrictions.
     */
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