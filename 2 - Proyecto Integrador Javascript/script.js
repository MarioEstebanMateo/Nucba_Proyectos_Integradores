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
        productButton.classList.add("btn-outline-primary");
        productButton.innerHTML = "Agregar al carrito";
        productButton.style.marginLeft = "30%";
        productButton.style.marginRight = "30%";
        productButton.style.marginTop = "10px";

        productButton.addEventListener("click", function () {
          if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "[]");
          } else {
            const cart = JSON.parse(localStorage.getItem("cart"));
            const productInCart = cart.find(
              (item) => item.title === product.title
            );
            if (productInCart) {
              swal({
                title:
                  "Producto ya agregado al carrito, puede modificar la cantidad en el carrito",
                text: "¿Desea ir al carrito?",
                icon: "error",
                buttons: ["Seguir comprando", "Ir al carrito"],
              }).then((willDelete) => {
                if (willDelete) {
                  window.location.href = "./cart.html";
                }
              });
            } else {
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
            }
          }
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
          productPrice.classList.add("card-price");
          productPrice.innerHTML = "Precio: AR$ " + data[i].price;

          const productButton = document.createElement("button");
          productButton.classList.add("btn");
          productButton.classList.add("btn-outline-primary");
          productButton.innerHTML = "Agregar al carrito";
          productButton.style.marginLeft = "30%";
          productButton.style.marginRight = "30%";
          productButton.style.marginTop = "10px";

          productButton.addEventListener("click", function () {
            if (!localStorage.getItem("cart")) {
              localStorage.setItem("cart", "[]");
            } else {
              const cart = JSON.parse(localStorage.getItem("cart"));
              const productInCart = cart.find(
                (item) => item.title === product.title
              );
              if (productInCart) {
                swal({
                  title:
                    "Producto ya agregado al carrito, puede modificar la cantidad en el carrito",
                  text: "¿Desea ir al carrito?",
                  icon: "error",
                  buttons: ["Seguir comprando", "Ir al carrito"],
                }).then((willDelete) => {
                  if (willDelete) {
                    window.location.href = "./cart.html";
                  }
                });
              } else {
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
              }
            }
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

const showAllProductsLanding = () => {
  const url = "./productos.json";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const productsContainer = document.getElementsByClassName(
        "landing-page-products"
      )[0];

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

        productBody.appendChild(productName);
        productBody.appendChild(productDescription);
        productBody.appendChild(productPrice);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productBody);

        if (productsContainer) {
          productsContainer.appendChild(productDiv);
        }
      }
    });
};

showAllProducts();
showAllProductsLanding();

const ingresarButton = document.getElementById("ingresarButton");
const ingresarButton2 = document.getElementById("ingresarButton2");
if (ingresarButton && ingresarButton2) {
  ingresarButton.addEventListener("click", function () {
    window.location.href = "./register.html";
  });
  ingresarButton2.addEventListener("click", function () {
    window.location.href = "./register.html";
  });
}

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

      let tableDataQuantity = document.createElement("td");
      tableRow.appendChild(tableDataQuantity);

      let quantity = document.createElement("input");
      quantity.type = "number";
      quantity.value = 1;
      quantity.min = 1;
      quantity.classList.add("form-control");
      quantity.style.width = "75px";
      tableDataQuantity.appendChild(quantity);

      let tableDataTotal = document.createElement("td");
      tableDataTotal.innerHTML = cart[i].price;
      tableRow.appendChild(tableDataTotal);

      quantity.addEventListener("change", function () {
        //quantity can not be less than 1
        if (quantity.value < 1) {
          swal({
            title: "Cantidad no válida",
            text: "La cantidad no puede ser menor a 1",
            icon: "warning",
            button: "Aceptar",
          });
          quantity.value = 1;
        }
        tableDataTotal.innerHTML = cart[i].price * quantity.value;
        updateCartTotal();
      });

      let tableDataDelete = document.createElement("td");
      tableRow.appendChild(tableDataDelete);

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.innerHTML = "Borrar";
      tableDataDelete.appendChild(deleteButton);

      // delete item from cart with sweetalert2 validation
      deleteButton.addEventListener("click", function () {
        swal({
          title: "¿Estás seguro?",
          text: "Una vez borrado, no podrás recuperar este producto!",
          icon: "warning",
          buttons: ["Cancelar", "Borrar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            swal("Producto borrado!", {
              icon: "success",
            }).then((willDelete) => {
              if (willDelete) {
                window.location.href = "./cart.html";
              }
            });
          }
        });
      });
    }
  }
}

// update cart total

let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
  totalPrice += cart[i].price;
}
if (document.getElementById("totalPrice")) {
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

const updateCartTotal = () => {
  const totalPrice = document.getElementById("totalPrice");
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * document.querySelectorAll("input")[i].value;
  }
  totalPrice.innerHTML = total;
};

// clear cart with sweetalert2 validation

const clearCart = document.getElementById("clearCart");
if (clearCart) {
  clearCart.addEventListener("click", function () {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez borrado, no podrás recuperar tu carrito!",
      icon: "warning",
      buttons: ["Cancelar", "Borrar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("cart");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        swal("Tu carrito ha sido borrado!", {
          icon: "success",
        }).then((willDelete) => {
          if (willDelete) {
            window.location.href = "./cart.html";
          }
        });
      }
    });
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
    window.location.href = "./productos.html";
  });
}

// ---------------------- Register ----------------------

// register form with local storage and sweetalert2 validation

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let users = [];
    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    let user = {
      emailRegister: document.getElementById("emailRegister").value,
      passwordRegister: document.getElementById("passwordRegister").value,
      passwordRegister2: document.getElementById("passwordRegister2").value,
    };
    // validation for empty fields and password confirmation match with sweetalert2 validation and local storage

    if (
      user.emailRegister == "" ||
      user.passwordRegister == "" ||
      user.passwordRegister2 == ""
    ) {
      swal("Todos los campos son obligatorios");
    } else if (user.passwordRegister != user.passwordRegister2) {
      swal("Las contraseñas no coinciden");
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      swal("Registro exitoso!", {
        icon: "success",
      }).then((value) => {
        window.location.href = "./login.html";
      });
    }
  });
}

// ---------------------- Login ----------------------

// login form with local storage and sweetalert2 validation

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;
    if (emailLogin == "" || passwordLogin == "") {
      swal("Todos los campos son obligatorios");
    } else {
      let userFound = false;
      for (let i = 0; i < users.length; i++) {
        if (
          emailLogin == users[i].emailRegister &&
          passwordLogin == users[i].passwordRegister
        ) {
          userFound = true;
          swal("Bienvenido!", "Has iniciado sesión", "success").then(
            (value) => {
              cart = [];
              localStorage.setItem("cart", JSON.stringify(cart));
              window.location.href = "./productos.html";
            }
          );
        }
      }
      if (!userFound) {
        swal("Usuario no encontrado");
      }
    }
  });
}

// ---------------------- Cerrar Sesión ----------------------

// when click on logout dropdown menu swal validation, clear cart from local storage and redirect to index.html

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez cerrada la sesión, no podrás recuperar tu carrito!",
      icon: "warning",
      buttons: ["Cancelar", "Cerrar sesión"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("cart");
        swal("Sesión cerrada!", {
          icon: "success",
        }).then((willDelete) => {
          if (willDelete) {
            window.location.href = "./index.html";
          }
        });
      }
    });
  });
}

// ---------------------- Finalizar Compra ----------------------

// when click on finalizar compra show swal validation and redirect to productos.html

const finalizarCompra = document.getElementById("finalizarCompra");
if (finalizarCompra) {
  finalizarCompra.addEventListener("click", function () {
    const total = document.getElementById("totalPrice").innerHTML;
    swal({
      title: "Gracias por tu compra!",
      text:
        "Tu pedido será enviado a la brevedad. El total de tu compra es de $" +
        total +
        ". Gracias por elegirnos!",
      icon: "success",
      button: "Seguir comprando",
    }).then((value) => {
      localStorage.removeItem("cart");
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "./productos.html";
    });
  });
}

// -------------- boton imprimir --------------

// when click on imprimir button print the page on a pdf file

const imprimir = document.getElementById("imprimir");
if (imprimir) {
  imprimir.addEventListener("click", function () {
    window.print();
  });
}
