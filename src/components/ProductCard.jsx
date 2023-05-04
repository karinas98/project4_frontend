import { useState, useEffect } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloudinaryImage from "./CloudinaryImage";
import Heart from "react-animated-heart";

const ProductCard = ({ elem }) => {
  const [addCart, setAddCart] = useState([]);
  const [addToList, setAddToList] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClick, setClick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getProducts = await axios
          .get(`${DEV_API_URL}/products/`)
          .then((res) => setProducts(res.data));
      } catch (err) {
        setErrors(err.response.data.detail);
        console.log(err);
      }
    };

    fetchData();
  }, [isSubmitting]);

  //Favorites
  const addToMyList = async (e) => {
    setClick(!isClick);
    try {
      const selectProduct = parseInt(e.target.value);
      const findProduct = products.filter((elem) => elem.id === selectProduct);
      setAddToList(findProduct);
      const res = await axios.post(`${DEV_API_URL}/favorites/`, {
        ...addCart,
        product: selectProduct,
      });
      const res1 = await axios.get(`${DEV_API_URL}/favorites/`);
      setAddToList(res1.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Add to Cart
  const addToCart = async (e) => {
    try {
      const selectProduct = parseInt(e.target.value);
      const findProduct = products.filter((item) => item.id === selectProduct);
      setAddCart(findProduct);
      const res = await axios.post(`${DEV_API_URL}/cart/`, {
        ...addCart,
        product: selectProduct,
      });
      const res1 = await axios.get(`${DEV_API_URL}/cart/`);
      setAddCart(res1.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className="card" style={{ width: "20rem" }}>
        <Link to={`/products/${elem.id}`}>
          <CloudinaryImage img_url={elem.img_url} />
        </Link>
        <Card.Body>
          <div className="card-title">
            <Link to={`/products/${elem.id}`}>
              <Card.Title>{elem.title}</Card.Title>
            </Link>
          </div>
          <Card.Text>{`${elem.price} $`}</Card.Text>

          <Card.Text>{`Created by ${elem.owner.username}`}</Card.Text>
          <div className="card-buttons">
            <Button
              className="form-btn"
              value={elem.id}
              onClick={addToCart}
              variant="primary"
            >
              Add to Cart
            </Button>
            <Button
              value={elem.id}
              onClick={addToMyList}
              className="list-icon favorite-icon"
            >
              Add
              <Heart isClick={isClick} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
