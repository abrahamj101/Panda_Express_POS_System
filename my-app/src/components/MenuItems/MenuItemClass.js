import getFoodItems from "../../pages/api/fooditems/getFooditems"
import { useState } from "react";

class MenuItem {
    constructor(menuitemId, menuItemName, price, imgLink) {
        this.menuitemId = menuitemId;
        this.foodItemIds = [];
        this.total = price;
        this.name = menuItemName;
        this.imgLink = imgLink;
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
        console.log(this.imgLink)
        return this.imgLink;
    }

    // Alters the inventory quantities based on the food items associated with this menu item
    async alterInventory() {
        for (const foodItemId of this.foodItemIds) {
            const inventoryIds = await this.getFoodInventoryIds(foodItemId);
            const inventoryAmounts = await this.getInventoryAmounts(foodItemId);

            for (let j = 0; j < inventoryIds.length; j++) {
                const inventoryId = inventoryIds[j];
                const amountToSubtract = inventoryAmounts[j];

                await this.updateInventoryQuantity(inventoryId, amountToSubtract);
                await this.updateInStockFoodItem(foodItemId, inventoryId, amountToSubtract);
            }
        }

        const menuInventoryIds = await this.getMenuInventoryIds(this.menuitemId);
        for (const inventoryId of menuInventoryIds) {
            await this.updateInventoryQuantity(inventoryId, 1);
            await this.updateInStockMenuItem(this.menuitemId, inventoryId);
        }
    }

    // Updates the stock status of a food item based on inventory quantity
    async updateInStockFoodItem(foodItemId, inventoryId, neededQuantity) {
        const quantity = await this.database.getInventoryQuantity(inventoryId);
        if (quantity < neededQuantity) {
            const sql = "UPDATE foodItems SET in_stock = ? WHERE foodItem_id = ?";
            await this.database.query(sql, [false, foodItemId]);
            return false;
        }
        return true;
    }

    // Updates the stock status of a menu item based on inventory quantity
    async updateInStockMenuItem(menuItemId, inventoryId) {
        const quantity = await this.database.getInventoryQuantity(inventoryId);
        if (quantity < 1) {
            const sql = "UPDATE MenuItems SET in_stock = ? WHERE menuItem_id = ?";
            await this.database.query(sql, [false, menuItemId]);
            return false;
        }
        return true;
    }

    // Updates the quantity of a specific inventory item by subtracting a given amount
    async updateInventoryQuantity(inventoryId, amountToSubtract) {
        const sql = "UPDATE inventoryitems SET quantity = quantity - ? WHERE inventoryItem_id = ?";
        await this.database.query(sql, [amountToSubtract, inventoryId]);
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

    async getFoodItemNames() {
        const returnValue = [];
        try {
            const foodItems = await getFoodItems();
            if (foodItems) {
                for (const foodItemId of this.foodItemIds) {
                    const foodItem = foodItems.find(item => item.fooditem_id === foodItemId);
                    if (foodItem) {
                        returnValue.push(foodItem.fooditem_name);
                    }
                }
            }
        } catch (err) {
            console.error("Error fetching food items:", err);
        }
        return returnValue;
    }
    
    

}


export default MenuItem;