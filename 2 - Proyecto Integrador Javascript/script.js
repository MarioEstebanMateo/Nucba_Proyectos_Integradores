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
          swal({
            title: "Producto agregado al carrito",
            text: "¿Desea ir al carrito?",
            icon: "success",
            buttons: ["Seguir comprando", "Ir al carrito"],
          }).then((willDelete) => {
            if (willDelete) {
              window.location.href = "./cart.html";
            }
          });
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

        if (productsContainer) {
          productsContainer.appendChild(productDiv);
        }
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
            swal({
              title: "Producto agregado al carrito",
              text: "¿Desea ir al carrito?",
              icon: "success",
              buttons: ["Seguir comprando", "Ir al carrito"],
            }).then((willDelete) => {
              if (willDelete) {
                window.location.href = "./cart.html";
              }
            });
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

          if (productsContainer) {
            productsContainer.appendChild(productDiv);
          }
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

// show cart items from local storage in the table body

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = [];
} else {
  for (let i = 0; i < cart.length; i++) {
    let tableDataRows = document.getElementById("tableDataRows");
    if (tableDataRows) {
      let tableRow = document.createElement("tr");
      tableDataRows.appendChild(tableRow);

      let tableDataImage = document.createElement("td");
      tableRow.appendChild(tableDataImage);

      let image = document.createElement("img");
      image.src = cart[i].image;
      image.style.width = "50px";
      image.style.height = "50px";
      image.style.objectFit = "contain";
      tableDataImage.appendChild(image);

      let tableDataTitle = document.createElement("td");
      tableDataTitle.innerHTML = cart[i].title;
      tableRow.appendChild(tableDataTitle);

      let tableDataPrice = document.createElement("td");
      tableDataPrice.innerHTML = cart[i].price;
      tableRow.appendChild(tableDataPrice);

      let tableDataDelete = document.createElement("td");
      tableRow.appendChild(tableDataDelete);

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.innerHTML = "Borrar";
      tableDataDelete.appendChild(deleteButton);

      deleteButton.addEventListener("click", function () {
        deleteItem(i);
      });
    }
  }
}

// calculate total price

let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
  totalPrice += cart[i].price;
}
if (document.getElementById("totalPrice")) {
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

// clear cart

const clearCart = document.getElementById("clearCart");
if (clearCart) {
  clearCart.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
}

// delete item from cart

function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ---------- button seguir comprando ----------
const seguirComprando = document.getElementById("seguirComprando");
if (seguirComprando) {
  seguirComprando.addEventListener("click", function () {
    window.location.href = "./index.html";
  });
}
