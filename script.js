// Global cart array
let cart = [];
let currentProduct = null;
let currentQuantity = 1;

// Enhanced Product data with features and specifications
const products = [
    {
        id: 1,
        name: "Mt5 to Telegram signal sender",
        description: "An excellent and intuitive tool for traders to broadcast signals directly from MT5 to Telegram channels or groups. Streamline your signal distribution process with this powerful automation tool.",
        price: 49.99,
        category: "Trading Tools",
        image: "images/mt5-to-telegram.png",
        features: [
            "Direct MT5 to Telegram integration",
            "Real-time signal broadcasting",
            "Customizable message templates",
            "Multiple channel support",
            "Easy setup and configuration",
            "24/7 reliable operation"
        ],
        specifications: {
            "Platform": "MT4/MT5",
            "Delivery": "Instant Digital Download",
            "Updates": "Free Lifetime Updates",
            "Support": "Premium 24/7 Support",
            "Format": ".ex5 File",
            "Requirements": "Windows OS, MT4/MT5"
        }
    },
    {
        id: 2,
        name: "Telegram to Mt5 signal receiver",
        description: "Highly efficient tool that allows traders to receive and execute trading signals instantly from Telegram directly in MT5. Never miss a trading opportunity with automatic execution.",
        price: 69.99,
        category: "Trading Tools",
        image: "images/telegram-to-mt5-executer.png",
        features: [
            "Instant signal execution",
            "Multiple signal format support",
            "Risk management controls",
            "Trade confirmation alerts",
            "Error handling and logging",
            "Custom execution rules"
        ],
        specifications: {
            "Platform": "MT4/MT5",
            "Delivery": "Instant Digital Download",
            "Updates": "Free Lifetime Updates",
            "Support": "Premium 24/7 Support",
            "Format": ".ex5 File",
            "Requirements": "Windows OS, MT4/MT5, Internet"
        }
    },
    {
        id: 3,
        name: "Golden Stream EA",
        description: "Advanced gold trading Expert Advisor with exceptional performance and sophisticated algorithms designed specifically for XAUUSD trading.",
        price: 1499.99,
        category: "Expert Advisors",
        image: "images/golden-stream.png",
        features: [
            "Specialized for Gold trading",
            "Advanced risk management",
            "Multiple timeframe analysis",
            "Auto lot size calculation",
            "Drawdown protection",
            "24/5 automated trading"
        ],
        specifications: {
            "Platform": "MT5 Only",
            "Pair": "XAUUSD (Gold)",
            "Timeframe": "M5, M15, H1",
            "Delivery": "Instant Digital Download",
            "Updates": "Free Lifetime Updates",
            "Support": "Premium 24/7 Support"
        }
    },
    {
        id: 4,
        name: "Market Analysis Reports",
        description: "Weekly in-depth market analysis and trend predictions prepared by professional analysts. Stay ahead of the market with comprehensive technical and fundamental analysis.",
        price: 19.99,
        category: "Research & Education",
        image: "images/reports.jpg",
        features: [
            "Weekly comprehensive reports",
            "Technical analysis charts",
            "Fundamental analysis insights",
            "Key support/resistance levels",
            "Trading opportunities highlighted",
            "Market sentiment analysis"
        ],
        specifications: {
            "Format": "PDF Report",
            "Delivery": "Weekly Email",
            "Pages": "15-20 pages weekly",
            "Charts": "30+ technical charts",
            "Coverage": "Forex, Stocks, Crypto",
            "Updates": "Weekly"
        }
    },
    {
        id: 5,
        name: "Trading Journal Pro",
        description: "Digital trading journal with advanced performance analytics and trade analysis tools. Improve your trading strategy by understanding your performance patterns.",
        price: 39.99,
        category: "Trading Tools",
        image: "images/journal.jpg",
        features: [
            "Trade performance analytics",
            "Win/loss ratio tracking",
            "Risk-reward analysis",
            "Custom reporting",
            "Data export capabilities",
            "Mobile app access"
        ],
        specifications: {
            "Platform": "Web + Mobile App",
            "Data Import": "MT4, MT5, CSV",
            "Reports": "Customizable",
            "Storage": "Cloud Sync",
            "Support": "Email & Chat",
            "Backup": "Automatic Cloud"
        }
    },
    {
        id: 6,
        name: "SMC Manoeuvre EA",
        description: "High performance Gold trading Expert Advisor using Smart Money Concepts (SMC) strategy. Advanced algorithmic trading for sophisticated market participants.",
        price: 299.99,
        category: "Expert Advisors",
        image: "images/smc-manoeuvre.png",
        features: [
            "Smart Money Concepts strategy",
            "Gold market specialized",
            "Liquidity zone detection",
            "Order block analysis",
            "Advanced entry/exit logic",
            "Professional risk management"
        ],
        specifications: {
            "Platform": "MT5 Only",
            "Strategy": "Smart Money Concepts",
            "Pair": "XAUUSD (Gold)",
            "Timeframe": "M15, H1, H4",
            "Delivery": "Instant Digital Download",
            "Support": "Premium 24/7 Support"
        }
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
    
    // Add keyboard event listeners for modals
    document.addEventListener('keydown', handleKeyboardEvents);
});

// Display products in the grid
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Clear existing
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/300x200/3498db/ffffff?text=Product+Image'">
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description.substring(0, 100)}...</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        
        // Add click event to show product details
        productCard.addEventListener('click', () => showProductDetail(product.id));
        
        productsGrid.appendChild(productCard);
    });
}

// Show product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    currentQuantity = 1;
    
    // Update modal content
    document.getElementById('detail-product-image').src = product.image;
    document.getElementById('detail-product-image').alt = product.name;
    document.getElementById('detail-product-category').textContent = product.category;
    document.getElementById('detail-product-title').textContent = product.name;
    document.getElementById('detail-product-description').textContent = product.description;
    document.getElementById('detail-product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detail-quantity').textContent = currentQuantity;
    
    // Update features list
    const featuresList = document.getElementById('detail-product-features');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update specifications
    const specsGrid = document.getElementById('detail-product-specs');
    specsGrid.innerHTML = '';
    if (product.specifications) {
        for (const [key, value] of Object.entries(product.specifications)) {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <div class="spec-label">${key}:</div>
                <div class="spec-value">${value}</div>
            `;
            specsGrid.appendChild(specItem);
        }
    }
    
    // Update total price in button
    updateDetailTotalPrice();
    
    // Show modal
    document.getElementById('product-detail-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close product detail modal
function closeProductDetail() {
    document.getElementById('product-detail-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    currentProduct = null;
    currentQuantity = 1;
}

// Change quantity in product detail
function changeQuantity(change) {
    currentQuantity += change;
    if (currentQuantity < 1) currentQuantity = 1;
    if (currentQuantity > 99) currentQuantity = 99;
    document.getElementById('detail-quantity').textContent = currentQuantity;
    updateDetailTotalPrice();
}

// Update total price in product detail modal
function updateDetailTotalPrice() {
    if (!currentProduct) return;
    
    const totalPrice = currentProduct.price * currentQuantity;
    document.getElementById('detail-total-price').textContent = totalPrice.toFixed(2);
}

// Add to cart from product detail
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: currentQuantity
        });
    }
    
    updateCartCount();
    showNotification(`${currentProduct.name} (${currentQuantity}) added to cart!`);
    closeProductDetail();
}

// Add product to cart from main grid
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
    showNotification('Item removed from cart');
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

// Close checkout modal
function closeModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

// Handle checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    
    if (!payment) {
        alert('Please select a payment method');
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // In a real application, you would process payment here
    // For this demo, we'll just show a success message
    alert(`Thank you for your purchase, ${name}!\n\nOrder Total: $${total.toFixed(2)}\nPayment Method: ${getPaymentMethodName(payment)}\nA confirmation email has been sent to ${email}.\n\nYour order will be delivered to:\n${address}`);
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeModal();
    this.reset();
    
    showNotification('Purchase completed successfully!');
});

// Get payment method name for display
function getPaymentMethodName(paymentCode) {
    const paymentMethods = {
        'credit': 'Credit Card',
        'paypal': 'PayPal',
        'crypto': 'Cryptocurrency'
    };
    return paymentMethods[paymentCode] || paymentCode;
}

// Show notification
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('[data-notification]');
    existingNotifications.forEach(notification => notification.remove());
    
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
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: bold;
    `;
    notification.setAttribute('data-notification', 'true');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Handle keyboard events
function handleKeyboardEvents(event) {
    // Escape key to close modals
    if (event.key === 'Escape') {
        if (document.getElementById('product-detail-modal').style.display === 'block') {
            closeProductDetail();
        }
        if (document.getElementById('checkout-modal').style.display === 'block') {
            closeModal();
        }
    }
    
    // Plus/Minus keys for quantity in product detail modal
    if (document.getElementById('product-detail-modal').style.display === 'block') {
        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            changeQuantity(1);
        }
        if (event.key === '-' || event.key === '_') {
            event.preventDefault();
            changeQuantity(-1);
        }
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const productDetailModal = document.getElementById('product-detail-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    
    if (event.target === productDetailModal) {
        closeProductDetail();
    }
    if (event.target === checkoutModal) {
        closeModal();
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
