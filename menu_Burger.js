const products = [
  {
    id: "B1001",
    name: "Classic Burger",
    price: 750,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/Classicburger.png",
  },
  {
    id: "B1002",
    name: "Classic Burger",
    price: 1500,
    discount: 15,
    category: "Burgers",
    portion: "Large",
    image: "img/Classicburger.png",
  },
  {
    id: "B1003",
    name: "Turkey Burger",
    price: 1600,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/turkeyburger.png",
  },
  {
    id: "B1004",
    name: "Chicken Burger",
    price: 1400,
    discount: 0,
    category: "Burgers",
    portion: "Large",
    image: "img/chickenburger.png",
  },
  {
    id: "B1005",
    name: "Chicken Burger",
    price: 800,
    discount: 20,
    category: "Burgers",
    portion: "Regular",
    image: "img/chickenburger.png",
  },
  {
    id: "B1006",
    name: "Cheese Burger",
    price: 1000,
    discount: 0,
    category: "Burgers",
    portion: "Large",
    image: "img/cheese.png",
  },
  {
    id: "B1007",
    name: "Cheese Burger",
    price: 600,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/cheese.png",
  },
  {
    id: "B1008",
    name: "Bacon Burger",
    price: 650,
    discount: 15,
    category: "Burgers",
    portion: "Regular",
    image: "img/bacon.png",
  },
  {
    id: "B1009",
    name: "Shawarma Burger",
    price: 800,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/shawarma.png",
  },
  {
    id: "B1010",
    name: "Olive Burger",
    price: 1800,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/oliveBurger.png",
  },
  {
    id: "B1012",
    name: "Double-Cheese Burger",
    price: 1250,
    discount: 20,
    category: "Burgers",
    portion: "Regular",
    image: "img/doublecheese.png",
  },
  {
    id: "B1013",
    name: "Crispy Chicken Burger",
    price: 1200,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/crispychicken.png",
  },
  {
    id: "B1014",
    name: "Crispy Chicken Burger",
    price: 1600,
    discount: 10,
    category: "Burgers",
    portion: "Large",
    image: "img/crispychicken.png",
  },
  {
    id: "B1015",
    name: "Paneer Burger",
    price: 900,
    discount: 0,
    category: "Burgers",
    portion: "Regular",
    image: "img/paneer.png",
  },
];

//===============================================


function addItemToList() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const discount = parseFloat(document.getElementById("discount").value);
  const portion = document.getElementById("portion").value;
  const image = "images/products/item_images/burger/9.png"; 

  if (id && name && !isNaN(price) && !isNaN(discount) && portion) {
    const newProduct = {
      id,
      name,
      price,
      discount,
      category: "Burgers",
      portion,
      image,
    };

    let storedBurgers = JSON.parse(localStorage.getItem("newBurger")) || [];
    storedBurgers.push(newProduct);

    localStorage.setItem("newBurger", JSON.stringify(storedBurgers));
    displayProducts();
  } else {
    alert("Please fill in all fields correctly.");
  }
}

//delete prod
function deleteProduct(productId) {
  let storedBurgers = JSON.parse(localStorage.getItem("newBurger")) || [];
  storedBurgers = storedBurgers.filter((product) => product.id !== productId);
  localStorage.setItem("newBurger", JSON.stringify(storedBurgers));
  displayProducts();
}

// Function  display products 
function displayProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; 

  const storedBurgers = localStorage.getItem("newBurger") || [];
  [...products, ...storedBurgers].forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("item");
    productCard.dataset.id = product.id;

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="img-fluid">
      <h2>${product.name}</h2>
      <div class="discount">${
        product.discount > 0 ? `${product.discount}%` : "No discount"
      }</div>
      <div class="portion">${product.portion}</div>
      <div class="price">Rs.${product.price}</div>
      <button class="addCart" onclick="addToCart('${product.id}')">Add to Cart</button>`;
    container.appendChild(productCard);
  });

  updateCartCount();
}


function addToCart(productId) {
  const product = [
    ...products,
    ...(JSON.parse(localStorage.getItem("newBurger")) || []),
  ].find((p) => p.id === productId);

  if (product && product.id && product.name && product.price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((p) => p.id === productId);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity =
        (cart[existingProductIndex].quantity || 0) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(); 
    showToast(`${product.name} added to cart!`);
  }
}


function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".listCart");
  cartContainer.innerHTML = ""; 

  let totalPackingCharge = 0;
  let totalDiscount = 0;
  let totalPrice = 0;

  cart
    .filter((product) => product && product.id && product.name && product.price) // Ensure the item is valid
    .forEach((product) => {
      const itemTotal = product.price * (product.quantity || 1);
      const itemDiscount = (itemTotal * (product.discount || 0)) / 100;
      const itemPriceAfterDiscount = itemTotal - itemDiscount;

      totalPackingCharge += itemTotal;
      totalDiscount += itemDiscount;
      totalPrice += itemPriceAfterDiscount;

      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      cartItem.innerHTML = `
      <div class="cart-item-content">
          <span class="cart-item-name">${product.name}</span>
          <span class="cart-item-price">Rs.${product.price} x ${product.quantity}</span>
          <button class="btn-danger btn-remove" onclick="removeFromCart('${product.id}')"><i class="bi bi-trash3"></i></button>
      </div>`;

      cartContainer.appendChild(cartItem);
    });

  document.getElementById("val_1").innerText = `Rs.${totalPackingCharge.toFixed(
    2
  )}`;
  document.getElementById("val_2").innerText = `Rs.${totalDiscount.toFixed(2)}`;

  document.getElementById(
    "Payment"
  ).innerHTML = `Payment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. ${totalPrice.toFixed(
    2
  )}`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

// Function  remove cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}

function updateCart() {
  displayCart();
  updateCartCount();
}

function showToast(message) {
  const toastBox = document.getElementById("toastBox");
  toastBox.innerHTML = `<div class="toast">${message}</div>`;
  setTimeout(() => {
    toastBox.innerHTML = "";
  }, 3000);
}

window.onload = function () {
  displayProducts();
  displayCart();
};

function redirectToPage(pageUrl) {
  window.location.href = pageUrl;
}
