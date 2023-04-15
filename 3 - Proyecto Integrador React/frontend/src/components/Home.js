import React from "react";
import { Link } from "react-router-dom";
import swal2 from "sweetalert2";
import axios from "axios";

import "./Home.css";
import mainImage from "../img/mainImage3.jpg";

const Home = () => {
  //axios para traer los productos from api

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getProducts = async () => {
      const url = "https://643a093390cd4ba563f1ef3d.mockapi.io/products";
      const response = await axios.get(url);
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="mainImage">
        <img className="img-fluid" src={mainImage} alt="" />
      </div>
      <div className="d-flex align-items-center justify-content-center flex-column mt-3 mb-3">
        <form className="d-flex">
          <input
            id="searchInput"
            class="form-control me-1"
            type="search"
            placeholder="Busca tu producto"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>

      <h3>Nuestros Productos</h3>
      <div className="card-container row">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card">
              <div className="imgContainer">
                <img src={product.imageUrl} className="card-imgUrl" alt="..." />
              </div>
              <div className="card-title">
                <p>{product.title}</p>
              </div>
              <div className="card-description">
                <p>{product.description}</p>
              </div>
              <div className="card-price">
                <p>${product.price}</p>
              </div>
              <div className="card-button">
                <Link to={`/product/${product.id}`}>
                  <button className="btn btn-primary">Ver más</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
