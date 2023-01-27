const showAllProducts = () => {
  const url = "./productos.json";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const productsContainer =
        document.getElementsByClassName("products-container")[0];

      for (let i = 0; i < data.length; i++) {
        const product = data[i];

        const productDiv = document.createElement("div");
        productDiv.classList.add("card");
        productDiv.style.width = "18rem";

        const productImage = document.createElement("img");
        productImage.classList.add("card-img-top");
        productImage.src = product.image;
        productImage.alt = product.title;

        const productBody = document.createElement("div");
        productBody.classList.add("card-body");

        const productName = document.createElement("h5");
        productName.classList.add("card-title");
        productName.innerHTML = product.title;

        const productDescription = document.createElement("p");
        productDescription.classList.add("card-text");
        productDescription.innerHTML = product.description;

        const productPrice = document.createElement("p");
        productPrice.classList.add("card-price");
        productPrice.innerHTML = "Precio: AR$ " + data[i].price;

        const productButton = document.createElement("button");
        productButton.classList.add("btn");
        productButton.classList.add("btn-primary");
        productButton.innerHTML = "Agregar al carrito";
        productButton.style.marginLeft = "30%";
        productButton.style.marginRight = "30%";
        productButton.style.marginTop = "10px";

        productButton.addEventListener("click", function () {
          addToCart(product);
        });

        const addToCart = (product) => {
          let cart = [];
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        };

        productBody.appendChild(productName);
        productBody.appendChild(productDescription);
        productBody.appendChild(productPrice);
        productBody.appendChild(productButton);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productBody);

        productsContainer.appendChild(productDiv);
      }
    });
};

const searchProduct = () => {
  const url = "./productos.json";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const productsContainer =
        document.getElementsByClassName("products-container")[0];

      for (let i = 0; i < data.length; i++) {
        const product = data[i];

        if (
          product.title.toLowerCase().includes(searchInput.value.toLowerCase())
        ) {
          const productDiv = document.createElement("div");
          productDiv.classList.add("card");
          productDiv.style.width = "18rem";

          const productImage = document.createElement("img");
          productImage.classList.add("card-img-top");
          productImage.src = product.image;
          productImage.alt = product.title;

          const productBody = document.createElement("div");
          productBody.classList.add("card-body");

          const productName = document.createElement("h5");
          productName.classList.add("card-title");
          productName.innerHTML = product.title;

          const productDescription = document.createElement("p");
          productDescription.classList.add("card-text");
          productDescription.innerHTML = product.description;

          const productPrice = document.createElement("p");
          productPrice.classList.add("card-text");
          productPrice.innerHTML = product.price;

          const productButton = document.createElement("button");
          productButton.classList.add("btn");
          productButton.classList.add("btn-primary");
          productButton.innerHTML = "Agregar al carrito";

          productButton.addEventListener("click", function () {
            addToCart(product);
          });

          const addToCart = (product) => {
            let cart = [];
            if (localStorage.getItem("cart")) {
              cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
          };

          productBody.appendChild(productName);
          productBody.appendChild(productDescription);
          productBody.appendChild(productPrice);
          productBody.appendChild(productButton);

          productDiv.appendChild(productImage);
          productDiv.appendChild(productBody);

          productsContainer.appendChild(productDiv);
        }
      }
    });
};

showAllProducts();

// ---------------- Search ----------------

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    document.getElementsByClassName("products-container")[0].innerHTML = "";
    if (searchInput.value == "") {
      showAllProducts();
    } else {
      searchProduct();
    }
  });
}

// ---------------- Cart ----------------
