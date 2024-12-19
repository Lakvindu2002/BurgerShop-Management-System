
const users = {
    'admin': 'admin123',
};


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] === password) {
        if (username === 'admin') {
            window.location.href = './admin_interface.html';
        } else {
            window.location.href = './cashier_interface.html';
        }
    } else {
        alert('Invalid credentials');
    }
}

function btnHomeOnAction(){
    window.location.assign('./index.html');

  
}

function btnAddCustomerOnAction(){
    window.location.assign('./add_customer_form.html');
}


function btnUpdateCustomerOnAction(){
    window.location.assign('./update_customer.html');
}

function btnDeleteCustomerOnAction(){
    window.location.assign('./delete_customer_form.html');
}

function btnAddNewCustomerOnAction(){
    window.location.assign('./add_customer_form.html');
}

function btnNewCustomerOnAction(){
    window.location.assign('./Menu_Burger.html');
}

function btnCustomerManagementOnAction(){
    window.location.assign('./add_customers.html');
}

function btnOrderManagementOnAction(){
    window.location.assign('./place_order.html');
}


function PaymentOnAction(){
    window.location.assign('./order_list.html');
}





