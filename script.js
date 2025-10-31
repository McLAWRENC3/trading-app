// Global cart array
let cart = [];

// Product data
const products = [
    {
        id: 1,
        name: "Premium Trading Course",
        description: "Complete beginner to advanced trading course with video lessons and eBooks",
        price: 199.99,
        category: "Education",
        icon: "📚"
    },
    {
        id: 2,
        name: "Trading Signals Pro",
        description: "Real-time trading signals and market analysis delivered daily",
        price: 49.99,
        category: "Tools",
        icon: "📊"
    },
    {
        id: 3,
        name: "Risk Management Calculator",
        description: "Advanced risk calculation tool for optimal position sizing",
        price: 29.99,
        category: "Tools",
        icon: "🧮"
    },
    {
        id: 4,
        name: "Market Analysis Reports",
        description: "Weekly in-depth market analysis and trend predictions",
        price: 19.99,
        category: "Research",
        icon: "📈"
    },
    {
        id: 5,
        name: "Trading Journal Pro",
        description: "Digital trading journal with performance analytics",
        price: 39.99,
        category: "Tools",
        icon: "📝"
    },
    {
        id: 6,
        name: "One-on-One Mentorship",
        description: "Personalized coaching sessions with expert traders",
        price: 299.99,
        category: "Education",
        icon: "👨‍🏫"
    },
    {
            "id": 7,
            "name": "The Golden stream pro",
            "description": "High performance Gold trading bot",
            "price": 499.99,
            "category": "Trading Bot",
            "icon": "👨‍🏫"
        },
        {
            "id": 8,
            "name": "SMC manoeuvre",
            "description": "Smart Money concept manoevre ",
            "price": 1499.99,
            "category": "Trading Bot",
            "icon": "👨‍🏫"
        
        }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
});

// Display products in the grid
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Show/hide cart section based on items
    const cartSection = document.getElementById('cart-section');
    if (totalItems > 0) {
        cartSection.style.display = 'block';
        displayCartItems();
    } else {
        cartSection.style.display = 'none';
    }
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-details">
                <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalAmount.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

// Handle checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // In a real application, you would process payment here
    // For this demo, we'll just show a success message
    
    alert(`Thank you for your purchase, ${name}! A confirmation email has been sent to ${email}.`);
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeModal();
    this.reset();
    
    showNotification('Purchase completed successfully!');
});

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add some CSS for the notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);