import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import homeImage from "../assets/003-min.jpeg";

const HomePage = () => {
  return (
    <section className="homepage">
      <div className="left-home">
        <h1 className="home-title">
          Create. Share.
          <br /> Shop.
        </h1>
        <h2 className="home-desc">
          A community where artists & designers can share their true passion.
        </h2>
        <Button className="home-btn">
          <Link className="button" to="/register">
            Get Started
          </Link>
        </Button>
      </div>
      <div className="right-home">
        <img width="600px" height="600px" src={homeImage}></img>
      </div>
    </section>
  );
};

export default HomePage;
