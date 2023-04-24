import React from "react";
import { Link } from "react-router-dom";
import swal2 from "sweetalert2";

import "./Register.css";

const Register = () => {
  const register = (e) => {
    e.preventDefault();
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordRegister"
    ).value;

    if (!email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      swal2.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === email);
    if (user) {
      swal2.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario ya existe",
      });
      return;
    }

    const newUser = {
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    swal2.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Te has registrado correctamente",
    });
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="myform form ">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Register</h1>
              </div>
            </div>
            <form action="" method="post" name="login">
              <div className="form-group">
                <label className="mt-3" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-2"
                  id="emailLogin"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label className="mt-3" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="passwordLogin"
                  className="form-control mt-2"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group">
                <label className="mt-3" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control mt-2"
                  aria-describedby="emailHelp"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="col-md-12 text-center ">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm mt-3"
                  onClick={register}
                >
                  Register
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
                  Have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
