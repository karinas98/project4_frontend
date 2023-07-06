import { useEffect, useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard";

const Feed = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const defaultData = () => {
    return setFilteredProducts(products);
  };

  //Filter by Category
  const onClick = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    const filteredData = products.filter((item) =>
      item.category.some((category) => category.id === selectedCategory)
    );
    setFilteredProducts(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DEV_API_URL}/products/`);
        setProducts(res.data);
        setFilteredProducts(res.data);
        const categories = await axios
          .get(`${DEV_API_URL}/categories/`)
          .then((res) => setCategories(res.data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="feed">
      <section className="feed-header">
        <h1 className="feed-title">Create what inspires you.</h1>
        <Button className="form-btn" variant="primary" type="button" size="lg">
          <Link className="button" to="/addproduct">
            Create Ad
          </Link>
        </Button>
      </section>
      <div className="feed-body">
        <section className="categories">
          <h4>
            <strong>Explore By Category</strong>
          </h4>
          <ul className="list">
            <li className="category-list" onClick={defaultData}>
              All
            </li>
            {categories.map((elem) => (
              <li
                className="category-list"
                value={elem.id}
                key={elem.id}
                onClick={onClick}
              >
                {elem.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <ul className="feed-grid">
              {filteredProducts.map((elem) => (
                <ProductCard elem={elem} key={elem.id} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Feed;
