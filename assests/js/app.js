let cardContainer = document.querySelector(".card-container");
let categoryItem = document.querySelectorAll(".category-item");
let cartClose = document.querySelector(".cart__close-icon");
let cartButton = document.querySelector(".top-bar__cart");
let aside = document.querySelector("aside");
let cartContainer = document.querySelector(".cart-container");

window.onload = function () {
  categoryItem[0].classList.add("active");
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
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
                  <img src="./assests/images/star-solid.svg" alt="" />
                </div>
              </div>
              <button class="card-button" onclick="addtoCart(this,${
                card.price
              })" >Add to cart</button>
            </div>
      </div>
    `;
      });
    });
};

categoryItem.forEach((category) => {
  category.addEventListener("click", () => {
    categoryItem.forEach((category) => {
      category.classList.remove("active");
    });
    category.classList.add("active");
  });
});

categoryItem.forEach((category) => {
  category.addEventListener("click", () => {
    let x = category.textContent.toLowerCase();
    if (category !== categoryItem[0]) {
      fetch("https://fakestoreapi.com/products/category/" + x)
        .then((res) => res.json())
        .then((data) => {
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
                <img src="./assests/images/star-solid.svg" alt="" />
              </div>
            </div>
            <button class="card-button">Add to cart</button>
          </div>
       </div>
        `;
          });
        });
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
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
                  <img src="./assests/images/star-solid.svg" alt="" />
                </div>
              </div>
              <button class="card-button">Add to cart</button>
            </div>
         </div>
            `;
          });
        });
    }
  });
});

cartButton.addEventListener("click", function (e) {
  aside.classList.add("cart-active");
});

cartClose.addEventListener("click", function (e) {
  aside.classList.remove("cart-active");
});

function addtoCart(item, price) {
  let itemCard = item.parentElement.parentElement;
  let itemImg = itemCard.querySelector(".card-img>img").src;
  let itemTitle = itemCard.querySelector(".card-title").textContent;
  cartContainer.innerHTML += `
        <div class="cart-item">
          <div class="cart-image">
            <img src="${itemImg}" alt="" />
          </div>
          <div class="cart-content">
            <p>${itemTitle}</p>
            <label for="">
              <b>$${price}</b>
              <input type="number" class="cart__item-count" value="1" onchange="updateCart(this,${price})" />
            </label>
          </div>
        </div>
  `;
}

function updateCart(input, price) {
  let totalPrice = input.parentElement.querySelector("b");
  let count = input.value;
  totalPrice.innerHTML = "$" + (count * price).toFixed(2);
}

function totalCart() {
  cartContainer.forEach((cart) => {
    console.log(cart); 
  });
}
