// TODO: Copy functionality for all buttons in cart and cart items from passing.js
document.addEventListener('DOMContentLoaded', () => {

    const validCoupons = {
        SAVE10: 0.1, // 10% discount
        SAVE20: 0.2, // 20% discount
      };

    let total = 0;
    let discount = 0;
    
    // Toggle sidebar visibility
    const toggleBar =  document.getElementById("cartSidebar")
    const toggleSidebar = () => toggleBar.classList.toggle("open");
    const closeSidebar = document.getElementById('closeSidebar');
    const cartIcon = document.getElementById("cartIcon");
  
    cartIcon.addEventListener("click", toggleSidebar);
    closeSidebar.addEventListener("click", toggleSidebar);

    updateOrderSummary();
    updateCartCount();
    updateCartSidebar();
});

// Update the cart count displayed on the cart icon
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("totalItems").textContent = `Total Flights: ${totalItems}`;
}
  
// Function to update the order summary (total price)
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = `Total: $${total.toFixed(2)}`;
}
  
function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <div class="item-pic">
                <div id="item_descrip">
                    <h3>${item.destination_city}</h3>
                    <p>Flight ID: ${item.flight_id}</p>
                    <p>Departure: ${item.departure_city}</p>
                    <p>Price: $${item.price}</p>
                    <div class="cart-item-actions">
                        <button onclick="changeQuantity('${item.flight_id}', -1)">-</button>
                        <span>Quantity: ${item.quantity}</span>
                        <button onclick="changeQuantity('${item.flight_id}', 1)">+</button>
                    </div>
                </div>
                <div id="car_img">
                    <img src="./assets/images/${item.image_name}" alt="Cart" width="150" height="90">
                </div>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeItemFromCart('${item.flight_id}')">Remove</button>
            </div>
      </div>
    `).join("");
};

// Remove item from cart (called when the user clicks the "Remove" button)
function removeItemFromCart(flight_id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.flight_id !== flight_id); // Remove the item from the cart array
    console.log("removeItemFromCart - cart: ", cart)
    updateCartCount(); // Update the cart count
    updateCartSidebar(); // Update the cart UI
    updateOrderSummary(); // Update the order summary (total price)
    saveCartToLocalStorage(); // Save chnages to Local Storage
}