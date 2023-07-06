import { useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts-data";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import backImage from "../assets/D5V0zmiUUAM7f02.jpeg";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [buttonActive, setButtonActive] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setButtonActive(true);
    setErrors("");
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${DEV_API_URL}/auth/login/`,
        loginData
      );
      console.log("Response:", response);
      const { data } = response;
      console.log("Token:", data.token);
      const token = data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/feed");
      window.location.reload(false);
    } catch (err) {
      setErrors(err.response.data.detail);
      console.log(errors);
    }
  };
  return (
    <div className="main-form-login">
      <div className="foreground login-size">
        <h1 className="form-title">Login</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              onChange={onChange}
              placeholder="Password"
              name="password"
              value={loginData.password}
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
                Login
              </Button>
            ) : (
              <Button
                className="form-btn"
                variant="secondary"
                type="submit"
                size="lg"
                disabled
              >
                Login
              </Button>
            )}
            <ul>
              <li>
                <Link className="switch-auth" to="/register">
                  OR SIGN UP
                </Link>
              </li>
            </ul>
          </div>
          <p className="error">{errors}</p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
