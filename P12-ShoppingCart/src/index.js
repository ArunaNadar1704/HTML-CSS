let shop = document.getElementById("shop");

/**
 * ! we are creating this shopItemsData to store the cart detail , so that we dont have to change manually all the carts
 */

let basket = JSON.parse(localStorage.getItem("data")) || []; // if we dont have any data in local storage then we return an empty array

/**
 * ! generateShop will generate the cart one by one using the data that was in shopItemsData
 */
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map(
      (
        x // map() calls a function once for each element in an array.
      ) => {
        let { id, name, price, desc, img } = x; // we are creating this so that we dont have to use x.<anything> again n again instead we can use name,id etc directly

        let search = basket.find((x) => x.id === id) || []; // if we find something in local storage then store or else return empty array
        return `<div id="product-id-${id}"class="items">
        <img width="220" src="${img}" alt="img-1" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}"class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
      }
    )
    .join(""));
};

generateShop();

/**
 * ! creating increament and decrement
 */

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

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation(); // everytime the application loads this will be called ....so that the cart number is updated everytime
