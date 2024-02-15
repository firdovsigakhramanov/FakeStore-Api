let cardContainer = document.querySelector(".card-container");
let categoryItem = document.querySelectorAll(".category-item");
let cartClose = document.querySelector(".cart__close-icon");
let cartButton = document.querySelector(".top-bar__cart");
let aside = document.querySelector("aside");
let cartContainer = document.querySelector(".cart-container");
let searchInput = document.querySelector(".top-bar__search-bar > input");
let cardButton = document.querySelector("card-button");
let cartDelete = document.querySelector(".cart-delete");
let allData;
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
let prices = 0;

console.log(prices);

function fetchData() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      getData(data);
      allData = data;
    });
}

fetchData();

function getData(data) {
  cardContainer.innerHTML = "";

  data.forEach((card) => {
    cardContainer.innerHTML += `
              <div class="card">
                <a href="./product.html?${card.id}">
                  <div class="card-img">
                    <img src="${card.image}" alt="" />
                  </div>
                  <div class="card-body">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-price">$${card.price}</p>
                    <p>${card.description.substring(0, 90).concat("...")}</p>
                  </div>
                </a>
              <div class="card-footer">
                <div class="card-raiting">
                  <p>${card.rating.rate}</p>
                  <div class="card-raiting__img">
                    <img src="./assets/images/star-solid.svg" alt="" />
                  </div>
                </div>
                <button onclick="addToCart(${card.id});totalPrice(this,${
      card.price
    })" class="card-button">Add to cart</button>
              </div>
           </div>
              `;
  });
}

function getCategory(category) {
  if (category !== categoryItem[0]) {
    fetch(
      "https://fakestoreapi.com/products/category/" +
        category.textContent.toLowerCase()
    )
      .then((res) => res.json())
      .then((data) => {
        getData(data);
      });
  } else {
    fetchData();
  }
}

searchInput.addEventListener("keyup", function (e) {
  let searchProduct = allData.filter((product) => {
    return product.title.toLowerCase().includes(e.target.value.toLowerCase());
  });
  getData(searchProduct);
});

categoryItem.forEach((category) => {
  category.addEventListener("click", () => {
    getCategory(category);
    categoryItem.forEach((category) => {
      category.classList.remove("active");
    });
    category.classList.add("active");
  });
});

cartButton.addEventListener("click", (e) => {
  aside.classList.add("cart-active");
});

cartClose.addEventListener("click", function (e) {
  aside.classList.remove("cart-active");
});

function addToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      cartData.push(data);
      getCartData(cartData);
      localStorage.setItem("cartData", JSON.stringify(cartData));
    });
}

function getCartData(x) {
  cartContainer.innerHTML = "";
  x.map((data) => {
    cartContainer.innerHTML += `
    <div class="cart-item">
    <div class="cart-image">
      <img src="${data.image}" alt="" />
    </div>
    <div class="cart-content">
      <p>${data.title.substring(0, 40).concat("...")}</p>
      <label for="">
        <b class="cart-price">$${data.price}</b>
        <input type="number" class="cart__item-count" value="1" onchange="updateCart(this,${
          data.price
        })" />
      </label>
    </div>
      <div class="cart-delete" onclick="deleteCart(${data.id})">
        <img src="./assets/images/trash-solid.svg">
      </div>
    </div>
`;
  });
}
getCartData(cartData);

function deleteCart(id) {
  cartData = JSON.parse(localStorage.getItem("cartData"));
  let deleteData = cartData.filter((item) => item.id != id);
  getCartData(deleteData);
  console.log();
  localStorage.setItem("cartData", JSON.stringify(deleteData));
}

function totalPrice(input, price) {
  console.log(input * price);
  console.log((prices += price));
}

console.log(prices);

function updateCart(input, price) {
  let totalPrice = input.parentElement.querySelector("b");
  let count = input.value;
  totalPrice.innerHTML = "$" + (count * price).toFixed(2);
  console.log(input.value);
}

