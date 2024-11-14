class Cart {
    constructor() {
        this.total = 0;
        this.tax = 0;
        this.menuItems = [];
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
        this.total += menuItem.getTotal();
        this.tax = this.total * 0.0825;
    }


    removeMenuItem(menuItemIndex) {
        this.total -= this.menuItems[menuItemIndex].getTotal();
        this.tax = this.total * 0.0825;
        this.menuItems.splice(menuItemIndex, 1);
    }

    
    getTotal() {
        this.total = this.menuItems.reduce((acc, item) => acc + item.getTotal(), 0);
        return this.total;
    }

    
    getTax() {
        return this.tax;
    }

    
    async completeOrder() {
        for (let menuItem of this.menuItems) {
            await menuItem.alterInventory(); // Assuming alterInventory is async
        }
        this.emptyCart();
        return this.menuItems;
    }

    
    emptyCart() {
        this.tax = 0;
        this.total = 0;
        this.menuItems = [];
    }

    
    getMenuIds() {
        return this.menuItems.map(item => item.getMenuItemId());
    }

    
    async printCart() {
        console.log("Menu Item Name                  Price");
        console.log("------------------------------------");

        for (let menuItem of this.menuItems) {
            console.log(`${menuItem.getName().padEnd(30)} $${menuItem.getTotal().toFixed(2)}`);
            
            try {
                let foodItemNames = await menuItem.getFoodItemNames(); // Assuming getFoodItemNames is async
                for (let foodItemName of foodItemNames) {
                    console.log(`  - ${foodItemName}`);
                }
            } catch (error) {
                console.error("Error retrieving food item names:", error.message);
            }
        }

        console.log("------------------------------------");
        console.log(`Total                           $${this.total.toFixed(2)}`);
        console.log(`Tax (8.25%)                     $${this.tax.toFixed(2)}`);
        console.log(`Grand Total                     $${(this.total + this.tax).toFixed(2)}`);
    }
}

export default Cart;