const products = [
    {
      id: "B1031",
      name: "Chicken n Cheese Pasta",
      price: 1600.0,
      discount: 15,
      category: "Pasta",
      portion: "Regular",
      image: "img/chickenCheesePasta.png",
    },
    {
      id: "B1032",
      name: "Chicken Penne Pasta",
      price: 1700.0,
      discount: 0,
      category: "Pasta",
      portion: "Regular",
      image: "img/chickenPane.png",
    },
    {
      id: "B1033",
      name: "Ground Turkey Pasta Bake",
      price: 2900.0,
      discount: 10,
      category: "Pasta",
      portion: "Regular",
      image: "img/groundTurkey.png",
    },
    {
      id: "B1034",
      name: "Creamy Shrimp Pasta",
      price: 2000.0,
      discount: 0,
      category: "Pasta",
      portion: "Regular",
      image: "img/creamyShrip.png",
    },
    {
      id: "B1035",
      name: "Lemon Butter Pasta",
      price: 1950.0,
      discount: 0,
      category: "Pasta",
      portion: "Regular",
      image: "img/lemonButter.png",
    },
    {
      id: "B1036",
      name: "Tagliatelle Pasta",
      price: 2400.0,
      discount: 1,
      category: "Pasta",
      portion: "Regular",
      image: "img/tagliatellePasta.png",
    },
    {
      id: "B1037",
      name: "Baked Ravioli",
      price: 2000.0,
      discount: 1,
      category: "Pasta",
      portion: "Regular",
      image: "img/BakedRavioli.png",
    },
  ];
  
  function addItemToList() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);
    const portion = document.getElementById("portion").value;
    const image = "images/products/item_images/pasta/5.png";
  
    if (id && name && !isNaN(price) && !isNaN(discount) && portion) {
      const newProduct = {
        id: id,
        name: name,
        price: price,
        discount: discount,
        category: "Pasta",
        portion: portion,
        image: image,
      };
  
      let storedPasta = JSON.parse(localStorage.getItem("storedPasta")) || [];
      storedPasta.push(newProduct);
  
      localStorage.setItem("storedPasta", JSON.stringify(storedPasta));
  
      displayProducts();
    } else {
      alert("Please fill in all fields correctly.");
    }
  }
  
  function deleteProduct(productId) {
    let storedPasta = JSON.parse(localStorage.getItem("storedPasta")) || [];
    storedPasta = storedPasta.filter((product) => product.id !== productId);
    localStorage.setItem("storedPasta", JSON.stringify(storedPasta));
  
    displayProducts();
  }
  
  
  function displayProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    const storedPasta = JSON.parse(localStorage.getItem("storedPasta")) || [];
    [...products, ...storedPasta].forEach((product) => {
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
      ...(JSON.parse(localStorage.getItem("storedPasta")) || []),
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
  
  // romove item from cart
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
  