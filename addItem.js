

let items = [
   
    {
      itemCode: "B1003",
      itemName: "Turkey Burger",
      price: 1600.0,
      discount: 0,
      img: "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1004",
      itemName: "Chicken Burger",
      price: 1400.0,
      discount: 0,
      img: "https://images.pexels.com/photos/15832879/pexels-photo-15832879/free-photo-of-cheeseburger-with-french-fries-and-three-dipping-sauces.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1005",
      itemName: "Chicken Burger",
      price: 800.0,
      discount: 20,
      img: "https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1006",
      itemName: "Cheese Burger",
      price: 1000.0,
      discount: 0,
      img: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1007",
      itemName: "Cheese Burger",
      price: 600.0,
      discount: 0,
      img: "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1008",
      itemName: "Bacon Burger",
      price: 650.0,
      discount: 15,
      img: "https://images.pexels.com/photos/15146310/pexels-photo-15146310/free-photo-of-burgere-on-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    
    {
      itemCode: "B1010",
      itemName: "Olive Burger",
      price: 1800.0,
      discount: 0,
      img: "https://images.pexels.com/photos/11401287/pexels-photo-11401287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1012",
      itemName: "Cheese Burger",
      price: 1250.0,
      discount: 20,
      img: "https://images.pexels.com/photos/10922927/pexels-photo-10922927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1013",
      itemName: "Crispy Burger",
      price: 1200.0,
      discount: 0,
      img: "https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1014",
      itemName: "Chicken Burger",
      price: 1600.0,
      discount: 10,
      img: "https://images.pexels.com/photos/5474640/pexels-photo-5474640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      itemCode: "B1015",
      itemName: "Paneer Burger",
      price: 900.0,
      discount: 0,
      img: "https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    
    {
      itemCode: "B1045",
      itemName: "Coca-Cola",
      price: 1230.0,
      discount: 0,
      img: "https://i.pinimg.com/originals/99/af/9c/99af9cd03aaf6a856fdfea9d27802f24.jpg",
    },
    {
      itemCode: "B1046",
      itemName: "Sprite",
      price: 1500.0,
      discount: 3,
      img: "https://i.pinimg.com/736x/da/29/54/da29549b7fd367669b7d8502d9d0028c.jpg",
    },
    {
      itemCode: "B1047",
      itemName: "Mirinda",
      price: 850.0,
      discount: 7,
      img: "https://i.pinimg.com/736x/99/0b/46/990b466538fbdc1f4b6722a6a393e908.jpg",
    },
    {
      itemCode: "B1038",
      itemName: "Fried Chicken",
      price: 1200.0,
      discount: 0,
      img: "https://christieathome.com/wp-content/uploads/2020/10/Facetune_06-10-2020-15-37-58-scaled.jpg",
    },
    {
      itemCode: "B1039",
      itemName: "Fried Chicken",
      price: 2300.0,
      discount: 10,
      img: "https://www.therusticelk.com/wp-content/uploads/2018/09/Southern-fried-chicken-2.jpg",
    },
    {
      itemCode: "B1040",
      itemName: "Fried Chicken",
      price: 3100.0,
      discount: 5,
      img: "https://airfryermom.com/wp-content/uploads/2022/05/Cook-Fried-Chicken-in-Air-Fryer.jpg",
    },
    
    {
      itemCode: "B1043",
      itemName: "BBQ Chicken",
      price: 2100.0,
      discount: 0,
      img: "https://poshjournal.com/wp-content/uploads/2021/02/thai-bbq-chicken-wings-8.jpg",
    },
  ];
  
  function loadTable() {
    
  
    let tblBody = document.getElementById("tblBody");
    let body = ``;
  
    items.forEach((element, index) => {
      body += `
          <tr>
            <td>${element.itemCode}</td>
            <td>${element.itemName}</td>
          
            <td>${element.price}</td>
            <td><img src="${element.img}" alt="${element.itemName}" class="item-image"></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editItem(${index})">✏️</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${index})">🗑️</button>
                </td>
                </tr>    
      `;
    });
    tblBody.innerHTML = body;

    changeImageSize(150, 150);

  }

  function changeImageSize(width, height) {
    const images = document.querySelectorAll(".item-image");
    images.forEach(img => {
      img.style.width = width + "px";
      img.style.height = height + "px";
    });
  }
  

  loadTable();
  
  function addItem() {
    let itemId = document.getElementById("ItemId").value;
    let itemName = document.getElementById("ItemName").value;
    let itemPrice = parseFloat(document.getElementById("ItemPrice").value);
    let itemImageInput = document.getElementById("Itemimage").files[0];
  
    if (!itemId || !itemName || isNaN(itemPrice)) {
      alert("Please fill out all fields correctly.");
      return;
    }
  
    // Convert image
    let itemImage = itemImageInput ? URL.createObjectURL(itemImageInput) : "";
  
    let newItem = {
      itemCode: itemId,
      itemName: itemName,
      price: itemPrice,
      discount: 0,
      img: itemImage,
    };
    items.push(newItem);
  
    console.log(newItem);
    loadTable();
  
    // get inputs
    document.getElementById("ItemId").value = "";
    document.getElementById("ItemName").value = "";
    document.getElementById("ItemPrice").value = "";
    document.getElementById("Itemimage").value = "" ;
  }
  //  delete item
  function deleteItem(index) {
    items.splice(index, 1);
    loadTable();
  }
  
  //  Update item
  
  function editItem(index) {
    let item = items[index];
  
    document.getElementById("ItemId").value = item.itemCode;
    document.getElementById("ItemName").value = item.itemName;
    document.getElementById("ItemPrice").value = item.price;
    document.getElementById("Itemimage").value = "";
  
    let addButton = document.getElementById("addButton");
    addButton.innerText = "Save Changes";
  
    addButton.onclick = function () {
      updateItem(index);
    };
  }
  
  function updateItem(index) {
    let itemId = document.getElementById("ItemId").value.trim();
    let itemName = document.getElementById("ItemName").value.trim();
    let itemPrice = parseFloat(document.getElementById("ItemPrice").value);
    let itemImageInput = document.getElementById("Itemimage").files[0];
  
    if (!itemId || !itemName || isNaN(itemPrice)) {
      alert("Please fill out all fields correctly.");
      return;
    }
  
    let itemImage = itemImageInput
      ? URL.createObjectURL(itemImageInput)
      : items[index].img;
  
    // Update array
    items[index] = {
      itemCode: itemId,
      itemName: itemName,
      price: itemPrice,
      discount: 0,
      img: itemImage,
    };
  
    console.log(`Item updated at index ${index}:`, items[index]);
  
    let addButton = (document.getElementById("addButton").innerText =
      "Update Item");
    addButton.onclick = addItem;
  
    document.getElementById("ItemId").value = "";
    document.getElementById("ItemName").value = "";
    document.getElementById("ItemPrice").value = "";
    document.getElementById("Itemimage").value = "";
  
    loadTable();
  }
  
  