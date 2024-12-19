const products = [
    {
      id: "B1026",
      name: "Steak Fries",
      price: 600.0,
      discount: 0,
      category: "Fries",
      portion: "Medium",
      image: "img/steakFries.png",
    },
    {
      id: "B1027",
      name: "French Fries",
      price: 800.0,
      discount: 0,
      category: "Fries",
      portion: "Large",
      image: "img/frenchFries.png",
    },
    {
      id: "B1028",
      name: "French Fries",
      price: 650.0,
      discount: 0,
      category: "Fries",
      portion: "Medium",
      image: "img/frenchFries.png",
    },
    {
      id: "B1029",
      name: "French Fries (Small)",
      price: 450.0,
      discount: 0,
      category: "Fries",
      portion: "Small",
      image: "img/frenchFries.png",
    },
    {
      id: "B1030",
      name: "Sweet Potato Fries",
      price: 600.0,
      discount: 0,
      category: "Fries",
      portion: "Large",
      image: "img/sweetFries.png",
    },
  ];
  
  function addItemToList() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);
    const portion = document.getElementById("portion").value;
    const image = "images/products/item_images/fries/1.webp";
  
    if (id && name && !isNaN(price) && !isNaN(discount) && portion) {
      const newProduct = {
        id: id,
        name: name,
        price: price,
        discount: discount,
        category: "Fries",
        portion: portion,
        image: image,
      };
  
      let storedFires = JSON.parse(localStorage.getItem("storedFires")) || [];
      storedFires.push(newProduct);
  
      localStorage.setItem("storedFires", JSON.stringify(storedFires));
  
      displayProducts();
    } else {
      alert("Please fill in all fields correctly.");
    }
  }
  
  function deleteProduct(productId) {
    let storedFires = JSON.parse(localStorage.getItem("storedFires")) || [];
    storedFires = storedFires.filter((product) => product.id !== productId);
    localStorage.setItem("storedFires", JSON.stringify(storedFires));
  
    displayProducts();
  }
  
  
  function displayProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    const storedFires = JSON.parse(localStorage.getItem("storedFires")) || [];
    [...products, ...storedFires].forEach((product) => {
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
        <button class="addCart" onclick="addToCart('${
          product.id
        }')">Add to Cart</button>`;
      container.appendChild(productCard);
    });
  
    updateCartCount();
  }
  
  
  function addToCart(productId) {
    const product = [
      ...products,
      ...(JSON.parse(localStorage.getItem("storedFires")) || []),
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
      .filter((product) => product && product.id && product.name && product.price) 
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
  