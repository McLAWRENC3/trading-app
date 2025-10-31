// Global cart array
let cart = [];

// Product data
const products = [
    {
        id: 1,
        name: "Mt5 to Telegram signal sender",
        description: "An excellent and intuitive tool for traders to broadcast signals directly from MT5 to Telegram",
        price: 49.99,
        category: "Tools",
        image: "images/MT5-TO-TELEGRAM-V2.png"
    },
    {
        id: 2,
        name: "Telegram to Mt5 signal receiver(Executor)",
        description: "Highly efficient tool that allows traders to receive and execute trading signals instantly from Telegram directly in MT5",
        price: 69.99,
        category: "Tools",
        image: "images/telegram-to-mt5-executer.png"
    },
    {
        id: 3,
        name: "Golden Stream",
        description: "Advanced gold trading Bot with exceptional performance",
        price: 1499.99,
        category: "Bots",
        image: "images/golden-stream-official-logo-2.png"
    },
    {
        id: 4,
        name: "Market Analysis Reports",
        description: "Weekly in-depth market analysis and trend predictions",
        price: 19.99,
        category: "Research",
        image: "images/reports.jpg"
    },
    {
        id: 5,
        name: "Trading Journal Pro",
        description: "Digital trading journal with performance analytics",
        price: 39.99,
        category: "Tools",
        image: "images/journal.jpg"
    },
    {
        id: 6,
        name: "SMC manoeuvre",
        description: "High performance Gold trading Bot",
        price: 299.99,
        category: "Bots",
        image: "images/Smc-manoeuvre-logo.png",
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
                <img src="${product.image}" alt="${product.name}" class="product-img">
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
