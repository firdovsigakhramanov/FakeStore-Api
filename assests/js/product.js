const url = new URL(window.location.href);
const params1 = url.search.slice(1, 3);
const card = document.querySelector(".card");
console.log(url);
fetch(`https://fakestoreapi.com/products/${params1}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    card.innerHTML += `
      <div class="card-img">
          <img
            src="${data.image}"
            alt=""
          />
        </div>
        <div class="card-content">
          <h1 class="card-title">
          ${data.title}
          </h1>
          <button class="card-button">Add to cart</button>
          <p class="card-price">$${data.price}</p>
          <div class="card-raiting">
            <p>${data.rating.rate}</p>
            <div class="card-raiting__img">
              <img src="./assests/images/star-solid.svg" alt="" />
            </div>
          </div>
          <p class="card-description">
          ${data.description}
          </p>
        </div>
      `;
  });
