import { useState, useEffect } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { getLoggedInUser } from "../helpers/getloggedinuse";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const [myCart, setMyCart] = useState([]);
  const [products, setProducts] = useState([]);
  const loggedInUser = getLoggedInUser();
  const [profileData, setProfileData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userItems = {
    ...myCart,
    owner: myCart.filter((i) => i.owner.id === profileData.id),
  };

  const cartItems = {
    ...products,
    product: products.filter((i) => i.id === myCart.id),
  };

  //Total Calculation
  const result = products.reduce(
    (total, currentValue) => (total = total + parseInt(currentValue.price)),
    0
  );

  //Remove From Cart
  const removeFromCart = async (e) => {
    try {
      const selectProduct = parseInt(e.target.value);
      const findProduct = products.filter((item) => item.id === selectProduct);

      console.log(findProduct);
      const res = await axios.delete(`${DEV_API_URL}/cart/${findProduct}`);
      setProducts(myCart);
      setIsSubmitting(!isSubmitting);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(products);
  console.log(myCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerprofile = await axios
          .post(`${DEV_API_URL}/auth/${loggedInUser}/`)
          .then((res) => setProfileData(res.data));

        const getProducts = await axios
          .get(`${DEV_API_URL}/products/`)
          .then((res) => setProducts(res.data));

        const getCart = await axios
          .get(`${DEV_API_URL}/cart/`)
          .then((res) => setMyCart(res.data));
      } catch (err) {
        setErrors(err.response.data.detail);
        console.log(err);
      }
    };

    fetchData();
  }, [loggedInUser]);

  return (
    <div className="cart">
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <ul className="cart-card">
          {products.map((elem) => (
            <div className="item-header">
              <p>{elem.title}</p>

              <Button
                value={elem.id}
                className="form-btn"
                onClick={removeFromCart}
                variant="danger"
              >
                Remove
              </Button>
            </div>
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <ul className="cart-card">
          {products.map((elem) => (
            <div className="item-header">
              <p>{elem.title}</p>
              <p>{elem.price}$</p>
            </div>
          ))}
          <div className="result">
            <p>
              <strong>Total</strong>
            </p>
            <p>
              <strong>{result}$</strong>
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
