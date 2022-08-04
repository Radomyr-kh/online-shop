const shoppingCart = document.querySelector(".shopping-cart-box");
let basket = JSON.parse(localStorage.getItem("data")) || [];

// 1 - Generating cart items
const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((storageItem) => {
        let search = shopItemsData.map((x) => {
          return x.find((el) => el.id === storageItem.id) || [];
        });
        search = search.find((el) => el.id === storageItem.id) || [];
        return `
        <div class="item-box" id=${search.id}>
          <img src=${search.img}>
          <div class="item-box-info">
            <i onclick="removeItem('${search.id}')" class="bi bi-x-lg"></i>
            <p>${search.name} </p>
            <div><span class="price">${search.price}</span><span>$</span></div>
            <input id="input-${search.id}" type="number" min="1" value=${storageItem.item} class="cart-item-quantity" name="cart-item" onchange = "updateItem('${search.id}')" form="userInfo">
          </div>
        </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = `<h2> Cart is empty! </h2>`;
    // disable submit button if the cart is empty
    document.getElementById("submit-btn").setAttribute("disabled", true);
  }
};
generateCartItems();

// 2 - Calculate total
const TotalAmount = () => {
  let totalPriceBox = document.querySelector("#total-price span");
  if (basket.length !== 0) {
    let amount = basket
      .map((storageItem) => {
        let search = shopItemsData.map((x) => {
          return x.find((el) => el.id === storageItem.id) || [];
        });
        search = search.find((el) => el.id === storageItem.id) || [];
        return storageItem.item * search.price;
      })
      .reduce((current, total) => current + total, 0);

    // display total
    totalPriceBox.innerHTML = `${amount.toFixed(2)} $`;
  } else {
    totalPriceBox.innerHTML = `0.00 $`;
  }
};

TotalAmount();

// 3 - Update item quantity
function updateItem(targetId) {
  let targetInput = document.getElementById(`input-${targetId}`);

  if (targetInput.value < 1 || targetInput.value[0] === "0") {
    targetInput.value = 1;
  }
  if (Number.isInteger(targetInput.value) === false) {
    targetInput.value = Math.round(targetInput.value);
  }

  let search = basket.find((item) => {
    return item.id === targetId;
  });
  search.item = +targetInput.value;
  localStorage.setItem("data", JSON.stringify(basket));

  // refresh total
  TotalAmount();
  getTotalCartItems();
}

// Remove item from Cart
const removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  TotalAmount();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  getTotalCartItems();
};

// clear cart after purchase
const clearCart = () => {
  if (basket.length !== 0) {
    alert("Thank you for your purchase!");
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount();
  }
};

// ********Send user order in a form*********
const myLocalStorage = localStorage.getItem("data");
document.getElementById("user-order").value = myLocalStorage;

// Show number of items in a cart
const getTotalCartItems = () => {
  let cartIcon = document.getElementById("cart-items-number");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  console.log(basket);
};

getTotalCartItems();
