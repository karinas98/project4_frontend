import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DEV_API_URL,
  REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} from "../consts-data";
import { getLoggedInUser } from "../helpers/getloggedinuse";
import UserProductCard from "../components/UserProductCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Profile = () => {
  const loggedInUser = getLoggedInUser();

  const [profileData, setProfileData] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState({});
  const [getCategories, setGetCategories] = useState([]);
  const [file, setFile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerprofile = await axios
          .post(`${DEV_API_URL}/auth/${loggedInUser}/`)
          .then((res) => setProfileData(res.data));

        const getProducts = await axios
          .get(`${DEV_API_URL}/products/`)
          .then((res) => setUserProducts(res.data));

        const categories = await axios
          .get(`${DEV_API_URL}/categories/`)
          .then((res) => setGetCategories(res.data));
      } catch (err) {
        setErrors(err.response.data.detail);
        console.log(err);
      }
    };

    fetchData();
  }, [loggedInUser, isSubmitting]);

  //Cloudinary
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const handleUpdateProduct = async (e) => {
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
    } catch (e) {
      console.log(e);
    }
  };
  //Get products of owner
  const userItems = {
    ...userProducts,
    owner: userProducts.filter((i) => i.owner.id === profileData.id),
  };

  //Remove Product
  const removeItem = async (e) => {
    try {
      const selectProduct = parseInt(e.target.value);
      const findProduct = userProducts.filter(
        (item) => item.id === selectProduct
      );
      const res = await axios.delete(
        `${DEV_API_URL}/products/${selectProduct}`
      );
      setIsSubmitting(!isSubmitting);
    } catch (err) {
      console.log(err);
    }
  };

  //Update
  const selectProductToUpdate = async (e) => {
    handleShow();
    const selectProduct = parseInt(e.target.value);
    const productInfo = userProducts.filter((i) => i.id === selectProduct);
    setProductToUpdate(productInfo[0]);
  };

  const onChange = (e) => {
    const changeDetails = {
      ...productToUpdate,
      [e.target.name]: e.target.value,
    };
    setProductToUpdate(changeDetails);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const apiData = {
      ...productToUpdate,
      owner: productToUpdate.owner.id,
      category: [productToUpdate.category[0].id],
      price: parseFloat(productToUpdate.price),
    };
    const res = await axios.put(
      `${DEV_API_URL}/products/${productToUpdate.id}/`,
      apiData
    );
    setIsSubmitting(!isSubmitting);
  };

  return (
    <div className="profile">
      <h1 className="profile-title">
        Welcome Back <strong>{profileData.username}!</strong>
      </h1>
      <h3 className="profile-subtitle">My Products</h3>
      <ul className="profile-grid">
        {userItems.owner.map((elem) => (
          <div>
            <UserProductCard elem={elem} key={elem.id} />
            <div className="alteration">
              <Button
                className="form-btn btn-info modify-btn "
                variant="info"
                onClick={selectProductToUpdate}
                value={elem.id}
              >
                Update
              </Button>
              <Button
                onClick={removeItem}
                value={elem.id}
                className="form-btn modify-btn "
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </ul>
      {/* Update Modal  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Product Title"
              name="title"
              onChange={onChange}
              value={productToUpdate.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              onChange={onChange}
              value={productToUpdate.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              onChange={onChange}
              value={productToUpdate.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Select
              placeholder="Category"
              name="category"
              value={productToUpdate.category}
              onChange={onChange}
            >
              {getCategories.map((elem, idx) => (
                <option key={idx}>{elem.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Control
              type="file"
              onChange={handleFileChange}
              placeholder="Upload Image"
              name="img_url"
              value=""
            />
          </Form.Group>

          <div className="btn-nav">
            <Button
              className="form-btn"
              variant="success"
              type="submit"
              size="lg"
              onClick={onSubmit}
            >
              Save
            </Button>

            <Button
              className="form-btn"
              variant="secondary"
              type="submit"
              size="lg"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Form>
        <Modal.Footer>
          <p className="error">{errors}</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
