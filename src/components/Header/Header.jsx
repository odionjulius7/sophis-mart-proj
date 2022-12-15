import React, { useRef, useEffect } from "react";

import { NavLink } from "react-router-dom";
import "./Header.scss";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";

import Logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";

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

  let menuRef = useRef(null);

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
              <span className="cart__icon">
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
              </span>
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
