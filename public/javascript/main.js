const shop = document.querySelector('.shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];

// 1 - Generating Shop Cards
const generateShopCards = (index) => {
  return (shop.innerHTML = shopItemsData[index]
    .map((item) => {
      return `
      <div class="item-box" id = ${item.id}>
        <img src=${item.img}>
        <div class="item-box-info">
          <span>${item.name}</span>
          <span>$${item.price}</span>
        </div>
        <button id = "add-btn-${item.id}" class = "btn-item" onclick="addToCart('${item.id}')">Add to Cart</button>
    </div>`;
    })
    .join(''));
};

// 2 - Adding items to Cart
const addToCart = (id) => {
  let clickedItemId = id;
  let dublicate = basket.find((el) => el.id === clickedItemId);
  if (dublicate === undefined) {
    basket.push({
      id: clickedItemId,
      item: 1,
    });
  } else {
    dublicate.item += 1;
  }

  addToCartIndicator(id);
  getTotalCartItems();

  localStorage.setItem('data', JSON.stringify(basket));
  console.log(basket);
};

const addToCartIndicator = (id) => {
  let targetButton = document.getElementById(`add-btn-${id}`);
  targetButton.style.backgroundColor = 'green';
  targetButton.innerHTML = 'Added to Cart';
};

// New function for searching basket
const checkBasket = () => {
  let search;
  basket.map((storageItem) => {
    search =
      shopItemsData
        .map((x) => {
          return x.find((el) => el.id === storageItem.id) || [];
        })
        .find((el) => el.id === storageItem.id) || [];
  });
  return search;
};

console.log(basket);
console.log(checkBasket());

// Show number of items in a cart
const getTotalCartItems = () => {
  let cartIcon = document.getElementById('cart-items-number');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// add active class to selected shop button

const addActiveClass = () => {
  const shopButtons = document.getElementsByClassName('shop-box');

  Array.from(shopButtons).forEach((btn) => {
    btn.addEventListener('click', function () {
      const current = document.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
      this.className += ' active';
    });
  });
};

getTotalCartItems();
generateShopCards(0);
addActiveClass();
