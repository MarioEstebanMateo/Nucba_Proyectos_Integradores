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
  if (searchInput.value == "") {
    showAllProducts();
  } else {
    searchProduct();
  }
});

// ---------------- Cart ----------------

// get cart from local storage and show it in table body with id "tableDataRows"

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = [];
} else {
  for (let i = 0; i < cart.length; i++) {
    let tableDataRows = document.getElementById("tableDataRows");
    let tableRow = document.createElement("tr");
    tableDataRows.appendChild(tableRow);

    let imgRow = document.createElement("td");
    imgRow.innerHTML = `<img src="${cart[i].image}" width="100px" height="100px">`;
    tableRow.appendChild(imgRow);

    let titleRow = document.createElement("td");
    titleRow.innerHTML = cart[i].title;
    tableRow.appendChild(titleRow);

    let priceRow = document.createElement("td");
    priceRow.innerHTML = cart[i].price;
    tableRow.appendChild(priceRow);

    let deleteItem = document.createElement("td");
    deleteItem.innerHTML = `<button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button>`;
    tableRow.appendChild(deleteItem);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    document.getElementById("totalPrice").innerHTML = total;
  }
}

// delete item from cart

function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  swal("Bien!", "Producto eliminado del carrito!", "success");
  location.reload();
}

// ---------------- Register ----------------

// Path: script.js
const buttonRegister = document.getElementById("buttonRegister");
buttonRegister.addEventListener("click", function () {
  let users = JSON.parse(localStorage.getItem("users"));
  if (users == null) {
    users = [];
  }

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    password2: document.getElementById("password2").value,
  };

  if (user.email == "" || user.password == "") {
    swal("Error!", "Complete todos los campos!", "error");
  } else if (user.password.length < 8) {
    swal("Error!", "La contraseña debe tener al menos 8 caracteres!", "error");
  } else if (user.email.includes("@") == false) {
    swal("Error!", "Ingrese un email válido!", "error");
  } else if (user.password.toLowerCase == user.password2.toLowerCase) {
    swal("Error!", "Las contraseñas no coinciden!", "error");
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    swal("Bien!", "Usuario registrado!", "success");
    console.log(users);
  }
});

// ---------------- Login ----------------

// Path: script.js

const buttonLogin = document.getElementById("loginbutton");
buttonLogin.addEventListener("click", function () {
  let users = JSON.parse(localStorage.getItem("users"));
  if (users == null) {
    users = [];
  }

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (
      user.email.toLowerCase() == users[i].email.toLowerCase() &&
      user.password == users[i].password
    ) {
      userFound = true;
      swal("Bien!", "Usuario logueado!", "success");
      console.log(users);
      window.location.href = "index.html";
    }
  }
  if (userFound == false) {
    swal("Error!", "Usuario o contraseña incorrectos!", "error");
  }
});

// ---------------- Logout ----------------

// Path: script.js

const buttonLogout = document.getElementById("logoutButton");
buttonLogout.addEventListener("click", function () {
  swal("Bien!", "Usuario deslogueado!", "success");
  window.location.href = "index.html";
});
