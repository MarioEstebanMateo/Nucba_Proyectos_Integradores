import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import mainImage from "../img/mainImage3.jpg";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const getProducts = async () => {
    await axios.get("http://localhost:8000/api/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = async () => {
    await axios
      .get(
        `http://localhost:8000/api/products?title=${search}&description=${search}&price=${search}`
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
  };

  const searchButton = (e) => {
    e.preventDefault();
    filteredProducts();
  };

  useEffect(() => {
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
            value={search}
            placeholder="Busca tu producto"
            aria-label="Search"
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-primary"
            type="submit"
            onClick={searchButton}
          >
            Buscar
          </button>
        </form>
      </div>

      <h3>Nuestros Productos</h3>
      <div className="card-container row">
        {products.map((product, index) => (
          <div className="col" key={index}>
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
                <Link to={`/product/${product._id}`}>
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
