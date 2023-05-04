import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileIcon from "../assets/person-circle.svg";
import HeartIcon from "../assets/heart-fill.svg";
import CartIcon from "../assets/cart4.svg";

const NavBar = () => {
  const navigationLinks = [
    { img: ProfileIcon, slug: "/profile" },
    { img: HeartIcon, slug: "/favorites" },
    { img: CartIcon, slug: "/cart" },
    { title: "Logout", slug: "/" },
  ];
  const navigationLogout = [
    { img: ProfileIcon, slug: "/register" },
    { img: HeartIcon, slug: "/register" },
    { img: CartIcon, slug: "/register" },
  ];

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") ? true : false);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
  });
  const onLogout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  return (
    <nav>
      <ul className="navbar">
        {loggedIn ? (
          <ul className="main-nav">
            <div>
              <Link className="nav-feed" to={"/feed"}>
                My Feed
              </Link>
            </div>
            <div>
              <Link className="navtitle" to={"/"}>
                Shop & Buy
              </Link>
            </div>
            <div className="right-nav">
              {navigationLinks.map((link, idx) => (
                <li className="navbar" key={idx}>
                  <Link className="navicons" to={link.slug}>
                    <img width="25px" src={link.img}></img>
                    <p onClick={onLogout}>{link.title}</p>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        ) : (
          <ul className="init-nav">
            <div>
              <Link className="navtitle" to={"/"}>
                Shop&Buy
              </Link>
            </div>
            <div className="right-nav">
              {navigationLogout.map((link, idx) => (
                <li className="navbar" key={idx}>
                  <Link className="navicons" to={link.slug}>
                    <img width="25px" src={link.img}></img>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
