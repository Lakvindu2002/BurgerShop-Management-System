
let customers = [];


const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');


customerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    const customerId = document.getElementById('customerId').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerContact = document.getElementById('customerContact').value;
    
    
    const customer = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        contact: customerContact
    };
    
    
    customers.push(customer);
    
    
    updateCustomerList();
    
    
    customerForm.reset();
});

//  customer list
function updateCustomerList() {
    customerList.innerHTML = '';
    
    customers.forEach((customer, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${customer.id} - ${customer.name} - ${customer.address} - ${customer.contact}</span>
            <button class="place-order-btn" onclick="placeOrder(${index})"><i class="fa fa-shopping-cart"></i> Place Order</button>
            <button class="edit-btn" onclick="editCustomer(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteCustomer(${index})">Delete</button>
        `;
        customerList.appendChild(li);
    });
}

//place order
function placeOrder(index) {
    const customer = customers[index];
    alert(`Placing order for customer: ${customer.name}`);
    window.location.assign('./place_order.html');
}


// Function to edit customer
function editCustomer(index) {
    const customer = customers[index];
    const newName = prompt('Edit Customer Name:', customer.name);
    const newContact = prompt('Edit Customer Contact Number:', customer.contact);
    
    if (newName !== null && newContact !== null) {
        customers[index].name = newName;
        customers[index].contact = newContact;
        updateCustomerList();
    }
}

// Function to delete customer
function deleteCustomer(index) {
    customers.splice(index, 1);
    updateCustomerList();
}
