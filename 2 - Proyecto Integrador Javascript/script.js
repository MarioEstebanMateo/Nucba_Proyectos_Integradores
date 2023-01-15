const showAllProducts = () => {
  const url = "https://fakestoreapi.com/products";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        //   console.log(data[i].title);
        //   console.log(data[i].price);
        //   console.log(data[i].image);
        //   console.log(data[i].description);

        let products = document.createElement("div");
        products.classList.add("card");
        products.style.width = "18rem";

        let productImage = document.createElement("img");
        productImage.classList.add("card-img-top");
        productImage.src = data[i].image;
        products.appendChild(productImage);

        let productBody = document.createElement("div");
        productBody.classList.add("card-body");
        products.appendChild(productBody);

        let productName = document.createElement("h5");
        productName.classList.add("card-title");
        productName.innerHTML = data[i].title;
        productBody.appendChild(productName);

        let productDescription = document.createElement("p");
        productDescription.classList.add("card-text");
        productDescription.innerHTML = data[i].description;
        productBody.appendChild(productDescription);

        let productPrice = document.createElement("p");
        productPrice.classList.add("card-price");
        productPrice.innerHTML = "Price: AR$ " + data[i].price;
        productBody.appendChild(productPrice);

        let productButton = document.createElement("button");
        productButton.classList.add("btn", "btn-primary");
        productButton.innerHTML = "Add to cart";
        productBody.appendChild(productButton);
        //center productButton
        productButton.style.marginLeft = "30%";
        productButton.style.marginRight = "30%";
        productButton.style.marginTop = "10px";

        productButton.addEventListener("click", function () {
          let cart = JSON.parse(localStorage.getItem("cart"));
          if (cart == null) {
            cart = [];
          }
          cart.push(data[i]);
          localStorage.setItem("cart", JSON.stringify(cart));
          swal("Bien!", "Producto agregado al carrito!", "success");
          console.log(cart);
        });

        document
          .getElementsByClassName("products-container")[0]
          .appendChild(products);
      }
    });
};

const searchProduct = () => {
  const url = "https://fakestoreapi.com/products";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(searchInput.value)) {
          let products = document.createElement("div");
          products.classList.add("card");
          products.style.width = "18rem";

          let productImage = document.createElement("img");
          productImage.classList.add("card-img-top");
          productImage.src = data[i].image;
          products.appendChild(productImage);

          let productBody = document.createElement("div");
          productBody.classList.add("card-body");
          products.appendChild(productBody);

          let productName = document.createElement("h5");
          productName.classList.add("card-title");
          productName.innerHTML = data[i].title;
          productBody.appendChild(productName);

          let productDescription = document.createElement("p");
          productDescription.classList.add("card-text");
          productDescription.innerHTML = data[i].description;
          productBody.appendChild(productDescription);

          let productPrice = document.createElement("p");
          productPrice.classList.add("card-price");
          productPrice.innerHTML = "Price: AR$ " + data[i].price;
          productBody.appendChild(productPrice);

          let productButton = document.createElement("button");
          productButton.classList.add("btn", "btn-primary");
          productButton.innerHTML = "Add to cart";
          productBody.appendChild(productButton);
          //center productButton
          productButton.style.marginLeft = "30%";
          productButton.style.marginRight = "30%";
          productButton.style.marginTop = "10px";

          productButton.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart == null) {
              cart = [];
            }
            cart.push(data[i]);
            localStorage.setItem("cart", JSON.stringify(cart));
            swal("Bien!", "Producto agregado al carrito!", "success");
            console.log(cart);
          });

          document
            .getElementsByClassName("products-container")[0]
            .appendChild(products);
        }
      }
    });
};

showAllProducts();

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  document.getElementsByClassName("products-container")[0].innerHTML = "";
  searchProduct();
});
