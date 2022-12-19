import React, { useRef, useEffect } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";

import useAuth from "../../custom-hook/useAuth";
import { auth } from "../../firebase.config";

import Logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "home",
  },
  {
    path: "shop",
    display: "shop",
  },
  {
    path: "cart",
    display: "cart",
  },
];

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const headerRef = useRef(null);
  const { currentUser } = useAuth();

  const profileActionRef = useRef(null);

  let menuRef = useRef(null);

  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        // .scrollTo() or .scroll() is applicable on window object while .scrollTop() works with any DOM element
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        headerRef.current.classList.add("stick__header");
      } else {
        headerRef.current.classList.remove("stick__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const naigateToCart = () => navigate("/cart");

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileAction");

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("err.message");
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <div>
                <h1>Sophis-mart</h1>
                {/* <p>Since 2022</p> */}
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={naigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logOut}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
