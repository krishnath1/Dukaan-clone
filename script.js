let currentIndex = 0;

function showAlert() {
    alert("Welcome to Dukaan Clone! Let's start building your store.");
}

const swipeWrapper = document.querySelector('.swipe-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showNextSlide() {
    const totalSlides = document.querySelectorAll('.feature').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    swipeWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showPrevSlide() {
    const totalSlides = document.querySelectorAll('.feature').length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    swipeWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);
// script.js

let products = [];
let editIndex = -1;

// Open modal to add/edit product
function openModal(product = {}) {
    document.getElementById('productModal').style.display = 'block';
    document.getElementById('modalTitle').innerText = product.name ? 'Edit Product' : 'Add New Product';
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productInventory').value = product.inventory || '';
    document.getElementById('productIndex').value = editIndex;
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    resetForm();
}

// Reset the form
function resetForm() {
    document.getElementById('productForm').reset();
    editIndex = -1;
}

// Add/Edit Product
document.getElementById('productForm').onsubmit = function(event) {
    event.preventDefault();
    const product = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        inventory: parseInt(document.getElementById('productInventory').value),
    };

    if (editIndex >= 0) {
        // Edit existing product
        products[editIndex] = product;
    } else {
        // Add new product
        products.push(product);
    }

    closeModal();
    renderProducts();
};

// Render product list
function renderProducts() {
    const productTableBody = document.querySelector('#productTable tbody');
    productTableBody.innerHTML = ''; // Clear existing rows

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.inventory}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

// Edit product
function editProduct(index) {
    editIndex = index;
    openModal(products[index]);
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeModal();
    }
};
// Sample Orders Data
let orders = [
    { id: 1, customerName: "John Doe", product: "T-shirt", quantity: 2, status: "Pending" },
    { id: 2, customerName: "Jane Smith", product: "Mug", quantity: 1, status: "Shipped" },
];

// Render Orders
function renderOrders() {
    const ordersTableBody = document.querySelector('#ordersTable tbody');
    ordersTableBody.innerHTML = ''; // Clear existing rows

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.status}</td>
            <td>
                <button class="btn-delete" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Delete Order
function deleteOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    renderOrders();
}

// Call renderOrders on page load
document.addEventListener('DOMContentLoaded', renderOrders);
// Sample Customers Data
let customers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "098-765-4321" },
];

// Render Customers
function renderCustomers() {
    const customersTableBody = document.querySelector('#customersTable tbody');
    customersTableBody.innerHTML = ''; // Clear existing rows

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button class="btn-delete" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
        customersTableBody.appendChild(row);
    });
}

// Delete Customer
function deleteCustomer(customerId) {
    customers = customers.filter(customer => customer.id !== customerId);
    renderCustomers();
}

// Call renderCustomers on page load
document.addEventListener('DOMContentLoaded', renderCustomers);
// Save Settings
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const storeName = document.getElementById('storeName').value;
    const businessLocation = document.getElementById('businessLocation').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Here you would typically save this data to a server or local storage
    console.log('Settings Saved:', {
        storeName,
        businessLocation,
        email,
        phone
    });

    alert('Settings have been saved!');
    
    // Optionally, you can reset the form
    document.getElementById('settingsForm').reset();
});