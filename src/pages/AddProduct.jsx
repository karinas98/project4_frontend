import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DEV_API_URL,
  REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} from "../consts-data";
import { getLoggedInUser } from "../helpers/getloggedinuse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddProduct = () => {
  const loggedInUser = getLoggedInUser();
  console.log(loggedInUser);
  const [createProduct, setCreateProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    img_url: "",
    owner: loggedInUser,
  });
  const [errors, setErrors] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const [getCategories, setGetCategories] = useState([]);
  const [file, setFile] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await axios
          .get(`${DEV_API_URL}/categories/`)
          .then((res) => setGetCategories(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    console.log(getCategories);

    fetchData();
  }, []);

  const navigate = useNavigate();
  const onChange = (e) => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value });
    setButtonActive(true);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    try {
      // if success, we get back info about the stored image

      delete axios.defaults.headers.common["Authorization"];

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );

      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      )
        ? `Bearer ${localStorage.getItem("token")}`
        : "";

      const apiData = {
        ...createProduct,
        price: parseFloat(createProduct.price),
        category: [
          getCategories.find((i) => i.name === createProduct.category).id,
        ],
        img_url: cloudinaryResponse.data.public_id,
      };
      console.log("CALLING API", apiData);
      await axios.post(`${DEV_API_URL}/products/`, apiData);
      navigate("/feed");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main-form-create">
      <h1 className="create-title">Ready to show the world ?</h1>
      <form className="create-form" onSubmit={handleCreateUser}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            className="input"
            type="text"
            placeholder="Product Title"
            name="title"
            onChange={onChange}
            value={createProduct.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            className="input"
            type="number"
            placeholder="Price"
            name="price"
            onChange={onChange}
            value={createProduct.price}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            placeholder="Description"
            name="description"
            className="create-description input"
            onChange={onChange}
            value={createProduct.description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Select
            className="input"
            placeholder="Category"
            name="category"
            value={createProduct.category}
            onChange={onChange}
          >
            {getCategories.map((elem, idx) => (
              <option key={idx}>{elem.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Control
            className="input"
            type="file"
            onChange={handleFileChange}
            placeholder="Upload Image"
            name="img_url"
            value={createProduct.img_url}
          />
        </Form.Group>

        <div className="btn-nav">
          {buttonActive ? (
            <Button
              className="form-btn create-btn"
              variant="btn-outline-primary"
              type="submit"
              size="lg"
              active
            >
              Create & Launch
            </Button>
          ) : (
            <Button
              className="form-btn"
              variant="secondary"
              type="submit"
              size="lg"
              disabled
            >
              Create & Launch
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
