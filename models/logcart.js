// stores product data into cart object
module.exports = function logCart(oldlogCart) {
    this.items = oldlogCart.items || {};
    this.totalQty = oldlogCart.totalQty || 0;
    this.totalPrice = oldlogCart.totalPrice || 0;
    // add elements into cart
    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        storedItem.quantity++;
        storedItem.price = storedItem.item.price * storedItem.quantity;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    // generates an array for cart to be stored
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};