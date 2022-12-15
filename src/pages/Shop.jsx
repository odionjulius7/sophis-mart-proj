import React, { useState } from "react";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { Container, Row, Col } from "reactstrap";

import "../styles/Shop.scss";

import ProductList from "../components/UI/ProductList";
import products from "../assets/data/products";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filteredProduct = products.filter(
        (item) => item.category === "sofa"
      );

      setProductsData(filteredProduct);
    }
    if (filterValue === "mobile") {
      const filteredProduct = products.filter(
        (item) => item.category === "mobile"
      );

      setProductsData(filteredProduct);
    }
    if (filterValue === "chair") {
      const filteredProduct = products.filter(
        (item) => item.category === "chair"
      );

      setProductsData(filteredProduct);
    }
    if (filterValue === "watch") {
      const filteredProduct = products.filter(
        (item) => item.category === "watch"
      );

      setProductsData(filteredProduct);
    }
    if (filterValue === "wireless") {
      const filteredProduct = products.filter(
        (item) => item.category === "wireless"
      );

      setProductsData(filteredProduct);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProduct = products.filter((item) =>
      item.productName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );

    setProductsData(searchedProduct);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search......."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No Products Are Found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;