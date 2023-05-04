import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { useParams } from "react-router-dom";
import CloudinaryImage from "../components/CloudinaryImage";
import PlusSign from "../assets/plus-square.svg";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ProductPage = (elem) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [review, SetReview] = useState("");

  //   Toggle Function
  const useToggle = (initialState) => {
    const [toggle, setToggle] = useState(initialState);
    const toggler = () => {
      setToggle(!toggle);
    };
    return [toggle, toggler];
  };
  const [toggle, setToggle] = useToggle();
  //

  // Modal Popup Reviews
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  const onChange = (e) => {
    SetReview(e.target.value);
  };
  console.log(review);

  const addReview = async (id) => {
    try {
      const postReview = await axios.post(`${DEV_API_URL}/reviews/`, {
        text: review,
        product: id,
      });
      const res = await axios.get(`${DEV_API_URL}/products/${id}/`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
    SetReview("");

    console.log(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios
          .get(`${DEV_API_URL}/products/${id}`)
          .then((res) => setProduct(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="product-indv">
      <div className="indv-layout">
        <div className="left-product">
          <CloudinaryImage className="indv-img" img_url={product.img_url} />
        </div>
        <div className="right-product">
          <span className="product-header">
            <h1>{product.title}</h1>
            <h3>{product.price}$</h3>
          </span>
          <p>{product.description}</p>
        </div>
      </div>
      <Tab.Container
        className="review-container"
        id="left-tabs-example"
        defaultActiveKey="first"
      >
        <Row>
          <Col sm={1}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="review-section">
                <Nav.Link onClick={setToggle} eventKey="first">
                  Reviews
                </Nav.Link>
                <Button
                  className="plus-sign"
                  variant="primary"
                  onClick={handleShow}
                >
                  <img src={PlusSign}></img>
                </Button>
              </Nav.Item>
              <span className="line-break"></span>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="first">
                {toggle &&
                  product.reviews &&
                  product.reviews.map((review, idx) => (
                    <li key={idx} className="reviews-posted">
                      <p>{review.text}</p>
                      <p>Posted by {review.owner.username}</p>
                    </li>
                  ))}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addReview(id);
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                placeholder="Write your review"
                value={review}
                onChange={onChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button onClick={handleClose} type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ProductPage;
