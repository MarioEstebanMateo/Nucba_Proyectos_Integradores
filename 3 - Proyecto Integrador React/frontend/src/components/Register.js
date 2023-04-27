import React from "react";
import { Link } from "react-router-dom";
import swal2 from "sweetalert2";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const register = async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordLogin"
    ).value;

    //todos los campos son obligatorios

    if (email === "" || password === "" || confirmPassword === "") {
      swal2.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    //validar que el email sea un email valido
    else if (!/\S+@\S+\.\S+/.test(email)) {
      swal2.fire({
        title: "Error",
        text: "El email no es valido",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    //validar que las contraseñas sean iguales
    else if (password === confirmPassword) {
      await axios
        .post("https://643a093390cd4ba563f1ef3d.mockapi.io/users", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          swal2.fire({
            title: "Usuario registrado",
            text: "Usuario registrado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        });
    } else {
      swal2.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Aceptar",
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
                  id="confirmPasswordLogin"
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
