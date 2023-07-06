import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import backgroundImage from "../assets/Mural-stock.png";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setButtonActive(true);
    setErrors("");
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("CALLING API", registerData);
      const res = await axios.post(
        `${DEV_API_URL}/auth/register/`,
        registerData
      );
      navigate("/login");
    } catch (err) {
      setErrors(err.response.data);
      console.log(errors);
    }
  };
  return (
    <div className="main-form">
      <div className="foreground">
        <h1 className="form-title">Register</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChange}
              value={registerData.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Control
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={onChange}
              value={registerData.first_name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={onChange}
              value={registerData.last_name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Control
              type="password"
              onChange={onChange}
              placeholder="Password"
              name="password"
              value={registerData.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password_confirmation"
              onChange={onChange}
              value={registerData.password_confirmation}
            />
          </Form.Group>
          <div className="btn-nav">
            {buttonActive ? (
              <Button
                className="form-btn"
                variant="primary"
                type="submit"
                size="lg"
                active
              >
                Sign Up
              </Button>
            ) : (
              <Button
                className="form-btn"
                variant="secondary"
                type="submit"
                size="lg"
                disabled
              >
                Sign Up
              </Button>
            )}
            <ul>
              <li>
                <Link className="switch-auth" to="/login">
                  OR SIGN IN
                </Link>
              </li>
            </ul>
          </div>
          <p>{errors.password}</p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
