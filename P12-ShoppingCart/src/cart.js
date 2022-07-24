let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
        <img width="100" src=${search.img} alt="">
        <div class="details">

        <div class="title-price-x">
         <h4 class="title-price">
         <p>${search.name}</p>
         <p class="cart-item-price">$ ${search.price}</p>
         </h4>
         <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>

            <div class="buttons">
                <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
                <div id="${id}"class="quantity">${item}</div>
                <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
                </div>
        <h3>$ ${item * search.price}</h3>
        </div>
        </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCart();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id == selectedItem.id); // we are searching for the Id so that if it already exists we only incre the item

  if (search == undefined) {
    // when we select a cart with new id then we push into the basket
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item++; // else if we have already selected it then we will just increment
  }
  generateCart();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id == selectedItem.id);

  if (search === undefined) return;
  else if (search.item == 0)
    return; // if we try to decrement more than 0 then we just return
  else {
    search.item--; // else keep on decrementing
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0); // select the item that does not have 0 items
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCart();
  calculation();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class="Checkout">Check Out</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
  } else return;
};

TotalAmount();

let clearCart = () => {
  basket = [];
  generateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
