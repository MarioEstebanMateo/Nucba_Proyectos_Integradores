const showAllProducts = () => {
  const url = "./productos.json";

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
        productButton.innerHTML = "Agregar al carrito";
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
  const url = "./productos.json";

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
          productButton.innerHTML = "Agregar al carrito";
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

// get cart from local storage and show it in table body with id "tableDataRows"

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = [];
} else {
  for (let i = 0; i < cart.length; i++) {
    let tableDataRows = document.getElementById("tableDataRows");
    console.log(tableDataRows);
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

  // calculate total price

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
  }
  document.getElementById("totalPrice").innerHTML = totalPrice;

  // clear cart

  const clearCart = document.getElementById("clearCart");
  clearCart.addEventListener("click", function () {
    localStorage.removeItem("cart");
    location.reload();
  });
}

// delete item from cart

function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ----------------- Register -----------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
      users = [];
    }

    let user = {
      emailRegister: document.getElementById("emailRegister").value,
      passwordRegister: document.getElementById("passwordRegister").value,
      passwordRegister2: document.getElementById("passwordRegister2").value,
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    swal("Bien!", "Usuario registrado!", "success");
    console.log(users);
  });
}

// ----------------- Login -----------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
      users = [];
    }

    let emailLogin = document.getElementById("email").value;
    let passwordLogin = document.getElementById("password").value;

    let user = users.find(function (user) {
      return user.emailRegister == emailLogin && user.passwordRegister == passwordLogin;
    });

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      swal("Bien!", "Usuario logueado!", "success");
      location.href = "index.html";
    } else {
      swal("Error!", "Usuario o contraseña incorrectos!", "error");
    }
  });
}