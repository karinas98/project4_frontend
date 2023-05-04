import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { getLoggedInUser } from "../helpers/getloggedinuse";
import Button from "react-bootstrap/Button";
import CloudinaryImage from "../components/CloudinaryImage";

const Favorites = () => {
  const [myList, setMyList] = useState([]);
  const [products, setProducts] = useState([]);
  const loggedInUser = getLoggedInUser();
  const [profileData, setProfileData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userItems = {
    ...myList,
    owner: myList.filter((i) => i.owner.id === profileData.id),
  };

  const cartItems = {
    ...products,
    product: products.filter((i) => i.id === myList.id),
  };

  //Remove From Favorite
  const removeFromList = async (e) => {
    try {
      const selectProduct = parseInt(e.target.value);
      const findProduct = products.filter((item) => item.id === selectProduct);
      console.log(findProduct);
      const res = await axios.delete(
        `${DEV_API_URL}/favorites/${selectProduct}`
      );
      setIsSubmitting(!isSubmitting);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerprofile = await axios
          .post(`${DEV_API_URL}/auth/${loggedInUser}/`)
          .then((res) => setProfileData(res.data));

        const getProducts = await axios
          .get(`${DEV_API_URL}/products/`)
          .then((res) => setProducts(res.data));

        const getFavorites = await axios
          .get(`${DEV_API_URL}/favorites/`)
          .then((res) => setMyList(res.data));
      } catch (err) {
        setErrors(err.response.data.detail);
        console.log(err);
      }
    };
    fetchData();
  }, [loggedInUser]);
  console.log(myList);
  return (
    <div className="favorites">
      <ul className="list">
        {products.map((elem) => (
          <div className="container-list">
            <CloudinaryImage img_url={elem.img_url} />
            <p>{elem.title}</p>
            <Button value={elem.id} className="form-btn" variant="danger">
              Remove
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
