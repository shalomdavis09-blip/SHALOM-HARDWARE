// Sample products data
const products = [
    // Locks & Latches
    { id: 'yale-night-latch', name: 'Yale Night Latch', price: 2500, emoji: '🔐' },
    { id: 'union-key-locks', name: 'Union Key Locks', price: 1800, emoji: '🔒' },
    { id: 'moment-locks', name: 'Moment Locks', price: 1000, emoji: '🔒' },
    { id: 'gjs-key-locks', name: 'GJS Key Locks', price: 1200, emoji: '🔒' },
    { id: 'moment-night-latch', name: 'Moment Night Latch', price: 1000, emoji: '🔐' },
    { id: 'wista-steel-locks', name: 'Wista Steel Locks', price: 2500, emoji: '🔐' },
    
    // Hinges & Padlocks
    { id: 'hydraulic-malpha-hinges', name: 'Hydraulic Malpha Hinges', price: 150, emoji: '🔗' },
    { id: 'mindy-40-padlocks', name: 'Mindy 40 Padlocks', price: 500, emoji: '🔐' },
    { id: 'padlock-50', name: 'Padlock 50', price: 600, emoji: '🔐' },
    { id: 'padlock-60', name: 'Padlock 60', price: 700, emoji: '🔐' },
    { id: 'padlock-70', name: 'Padlock 70', price: 800, emoji: '🔐' },
    
    // Rolls & Abrasives
    { id: 'lipping-rolls', name: 'Lipping Rolls', price: 1000, emoji: '🔄' },
    { id: 'sand-paper-rolls', name: 'Sand Paper Rolls', price: 1500, emoji: '📋' },
    { id: 'flap-discs', name: 'Flap Discs', price: 100, emoji: '💿' },
    { id: 'diamond-disc-4', name: 'Diamond Disc 4"', price: 400, emoji: '💿' },
    { id: 'diamond-disc-9', name: 'Diamond Cutting Disc 9"', price: 1000, emoji: '💿' },
    
    // PPR Pipes
    { id: 'ppr-pipes-4-heavy', name: 'PPR Pipes 4" Heavy', price: 1100, emoji: '🔶' },
    { id: 'ppr-pipes-3', name: 'PPR Pipes 3"', price: 500, emoji: '🔶' },
    { id: 'ppr-pipes-2', name: 'PPR Pipes 2"', price: 400, emoji: '🔶' },
    { id: 'ppr-pipes-1-5', name: 'PPR Pipes 1½"', price: 350, emoji: '🔶' },
    { id: 'ppr-pipes-1-25', name: 'PPR Pipes 1¼"', price: 300, emoji: '🔶' },
    { id: 'ppr-pipes-pn16', name: 'PPR Pipes PN 16', price: 0, emoji: '🔶' },
    { id: 'ppr-pipes-pn20', name: 'PPR Pipes PN 20', price: 0, emoji: '🔶' },
    { id: 'hdpe-pipes-fittings', name: 'HDPE Pipes & Fittings (All Sizes)', price: 0, emoji: '🔶' }
];

// Initialize products grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>High-quality hardware product from Shalom Hardware</p>
                <div class="product-price">${product.price > 0 ? 'KES ' + product.price.toLocaleString() : 'Price on Request'}</div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Search products function
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Update price based on product selection and quantity
function updatePrice() {
    const productSelect = document.getElementById('productSelect');
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    if (!productSelect.value) {
        document.getElementById('productPrice').textContent = '0';
        document.getElementById('subtotal').textContent = '0';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = parseInt(selectedOption.dataset.price) || 0;
    const subtotal = price * quantity;

    document.getElementById('productPrice').textContent = price.toLocaleString();
    document.getElementById('quantityDisplay').textContent = quantity;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
    document.getElementById('totalPrice').textContent = subtotal.toLocaleString();
}

// Select payment method
function selectPayment(method) {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(m => m.classList.remove('active'));
    
    event.target.closest('.payment-method').classList.add('active');
    document.getElementById('selectedPaymentMethod').value = method;
    
    showPaymentDetails(method);
}

// Show payment details based on selected method
function showPaymentDetails(method) {
    const detailsDiv = document.getElementById('paymentDetails');
    let details = '';

    switch(method) {
        case 'mpesa':
            details = `
                <h4>M-Pesa Payment</h4>
                <p><strong>Till Number:</strong> 4482676</p>
                <p><strong>Business Name:</strong> Shalom Hardware</p>
                <p>Send payment to the till number above and provide your reference number in the order confirmation email.</p>
                <p><strong>Email confirmation to:</strong> shajoshardware@gmail.com</p>
            `;
            break;
        case 'bank':
            details = `
                <h4>Bank Transfer Details</h4>
                <p><strong>Bank:</strong> (To be provided)</p>
                <p><strong>Account Name:</strong> Shalom Hardware</p>
                <p><strong>Account Number:</strong> (To be provided)</p>
                <p>Send your bank slip to shalomdavis@gmail.com with order details.</p>
            `;
            break;
        case 'paypal':
            details = `
                <h4>PayPal Payment</h4>
                <p><strong>Email:</strong> shalomdavis@gmail.com</p>
                <p>Click the PayPal link in your confirmation email to complete the payment.</p>
                <p>You will receive an invoice with payment instructions.</p>
            `;
            break;
        case 'crypto':
            details = `
                <h4>Cryptocurrency Payment</h4>
                <p><strong>Accepted:</strong> Bitcoin (BTC), Ethereum (ETH)</p>
                <p>Contact shalomdavis@gmail.com for crypto payment details.</p>
                <p>We will provide wallet addresses for secure transactions.</p>
            `;
            break;
        case 'cod':
            details = `
                <h4>Cash on Delivery</h4>
                <p><strong>Available:</strong> Nairobi area only (Kayole & Koma branches)</p>
                <p>Pay directly upon delivery of your order.</p>
                <p>Verification of order details required at delivery.</p>
            `;
            break;
    }

    detailsDiv.innerHTML = details;
}

// Handle order submission
function handleOrderSubmit(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const shippingAddress = document.getElementById('shippingAddress').value;
    const country = document.getElementById('country').value;
    const productSelect = document.getElementById('productSelect');
    const quantity = document.getElementById('quantity').value;
    const selectedPaymentMethod = document.getElementById('selectedPaymentMethod').value;
    const totalPrice = document.getElementById('totalPrice').textContent;

    if (!productSelect.value) {
        alert('Please select a product');
        return;
    }

    // Validate form
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress) {
        alert('Please fill in all required fields');
        return;
    }

    // Create order summary
    const orderSummary = `
========== ORDER CONFIRMATION ==========
Order ID: ${generateOrderID()}
Date: ${new Date().toLocaleString()}

CUSTOMER INFORMATION:
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Address: ${shippingAddress}
Country: ${country}

PRODUCT DETAILS:
Product: ${productSelect.options[productSelect.selectedIndex].text}
Quantity: ${quantity}
Total Price: KES ${totalPrice}

PAYMENT METHOD: ${selectedPaymentMethod.toUpperCase()}

BUSINESS DETAILS:
Owner: shalomdavis@gmail.com
Locations: Kayole Junction & Koma, Nairobi, Kenya
Nationwide Delivery: Available (Negotiable fees)

=========================================
    `;

    console.log(orderSummary);

    // Show confirmation
    alert(`Order submitted successfully!\n\n${orderSummary}\n\nA confirmation email will be sent to ${customerEmail}`);

    // Send email notification (simulated)
    sendOrderNotification(customerEmail, customerName, orderSummary);

    // Reset form
    document.getElementById('orderForm').reset();
    updatePrice();
}

// Generate unique order ID
function generateOrderID() {
    return 'SH' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Simulate sending order notification email
function sendOrderNotification(email, name, orderDetails) {
    console.log(`Email sent to ${email}`);
    console.log(`Order notification:\n${orderDetails}`);
    
    // In a real application, this would send to a backend server
    // Example: fetch('/api/send-order-email', { method: 'POST', body: JSON.stringify({ email, orderDetails }) })
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();

    const formInputs = event.target.querySelectorAll('input, textarea');
    const name = formInputs[0].value;
    const email = formInputs[1].value;
    const message = formInputs[2].value;

    const contactMessage = `
New Contact Message from Shalom Hardware Website
==============================================
Name: ${name}
Email: ${email}
Message: ${message}
Submitted at: ${new Date().toLocaleString()}
    `;

    console.log(contactMessage);
    alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
    
    // Send to admin email
    sendContactEmail(contactMessage);
    
    event.target.reset();
}

// Simulate sending contact email
function sendContactEmail(message) {
    console.log(`Contact message to be sent to shalomdavis@gmail.com:\n${message}`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updatePrice();
    
    // Initialize first payment method
    showPaymentDetails('mpesa');

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Kenya format)
function validatePhoneNumber(phone) {
    const ke_phone_re = /^(\+254|0)[0-9]{9}$/;
    return ke_phone_re.test(phone);
}