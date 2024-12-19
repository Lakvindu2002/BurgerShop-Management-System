const products = [
    {
      id: "B1016",
      name: "Crispy Chicken Submarine",
      price: 2000.0,
      discount: 0,
      category: "Submarines",
      portion: "Large",
      image: "img/crispychickensubmarine.png",
    },
    {
      id: "B1017",
      name: "Crispy Chicken Submarine",
      price: 1500.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/crispychickensubmarine.png",
    },
    {
      id: "B1018",
      name: "Chicken Submarine",
      price: 1800.0,
      discount: 3,
      category: "Submarines",
      portion: "Large",
      image: "img/chickenSubmarine.png",
    },
    {
      id: "B1019",
      name: "Chicken Submarine",
      price: 1400.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/chickenSubmarine.png",
    },
    {
      id: "B1020",
      name: "Grinder Submarine",
      price: 2300.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/GrinderSubmarine.png",
    },
    {
      id: "B1021",
      name: "Cheese Submarine",
      price: 2200.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/cheeseSubmarine.png",
    },
    {
      id: "B1022",
      name: "Double Cheese n Chicken Submarine",
      price: 1900.0,
      discount: 16,
      category: "Submarines",
      portion: "Regular",
      image: "img/doubleCheeseSubmarine.png",
    },
    {
      id: "B1023",
      name: "Special Horgie Submarine",
      price: 2800.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/specialHorgie.png",
    },
    {
      id: "B1024",
      name: "MOS Special Submarine",
      price: 3000.0,
      discount: 0,
      category: "Submarines",
      portion: "Regular",
      image: "img/MOSspecial.png",
    },
  ];
  
  function addItemToList() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);
    const portion = document.getElementById("portion").value;
    const image = "images/products/item_images/submarine/2.webp";
  
    if (id && name && !isNaN(price) && !isNaN(discount) && portion) {
      const newProduct = {
        id: id,
        name: name,
        price: price,
        discount: discount,
        category: "Submarines",
        portion: portion,
        image: image,
      };
  
      let storedSubmarines =
        JSON.parse(localStorage.getItem("storedSubmarines")) || [];
      storedSubmarines.push(newProduct);
  
      localStorage.setItem("storedSubmarines", JSON.stringify(storedSubmarines));
  
      displayProducts();
    } else {
      alert("Please fill in all fields correctly.");
    }
  }
  
  function deleteProduct(productId) {
    let storedSubmarines =
      JSON.parse(localStorage.getItem("storedSubmarines")) || [];
    storedSubmarines = storedSubmarines.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("storedSubmarines", JSON.stringify(storedSubmarines));
  
    displayProducts();
  }
  
  function displayProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    const storedBurgers =
      JSON.parse(localStorage.getItem("storedSubmarines")) || [];
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
      ...(JSON.parse(localStorage.getItem("storedSubmarines")) || []),
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
  