import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
  return (
    <>
      {/* wrap it in reat fragment tag, so the parent where it's import can be used to style it, like Container, Row */}
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </>
  );
};

export default ProductList;
