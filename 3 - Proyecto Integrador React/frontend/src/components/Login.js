import React from "react";
import { Link } from "react-router-dom";
import swal2 from "sweetalert2";

import "./Login.css";

const Login = () => {
  const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    if (!email || !password) {
      swal2.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      swal2.fire({
        icon: "error",
        title: "Oops...",
        text: "El email no es valido",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      swal2.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Te has logueado correctamente",
      });
      window.location.href = "/";
    } else {
      swal2.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario no existe",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="myform form ">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Login</h1>
              </div>
            </div>
            <form action="" method="post" name="login">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="emailLogin"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="passwordLogin"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                />
              </div>
              <div className="col-md-12 text-center ">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={login}
                >
                  Login
                </button>
              </div>
              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">or</span>
                </div>
              </div>
              <div className="form-group">
                <p className="text-center">
                  Don't have account?{" "}
                  <Link to="/register" id="signup">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
