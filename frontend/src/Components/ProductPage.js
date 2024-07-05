import React, { useState, useRef } from 'react';
import './ProductPage.css';

const ProductPage = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imgurl1);
  const imageRef = useRef(null);

  const changeImage = (newImage) => {
    setCurrentImage(newImage);
  };

  const nextImage = () => {
    setCurrentImage(product.imgurl2);
    imageRef.current.src = product.imgurl2;
  };

  const prevImage = () => {
    setCurrentImage(product.imgurl1);
    imageRef.current.src = product.imgurl1;
  };

  return (
    <>
      <div className="product-container">
        <div className="product-thumbnail">
          <div className="arrow left-arrow" onClick={prevImage}>&#8592;</div>
          <img ref={imageRef} src={currentImage} alt="Product Thumbnail" />
          <div className="arrow right-arrow" onClick={nextImage}>&#8594;</div>
        </div>
        <div className="product-details">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-id">Product ID: {product.Id}</p>
          <p className="stock">{product.stock}</p>
          <p className="product-description">{product.description}</p>
          <div className="additional-info">
            <table>
              <tbody>
              <tr>
                  <td>Packaging</td>
                  <td>{product.Packaging}</td>
                </tr>
                <tr>
                  <td>Packaging</td>
                  <td>{product.Packaging}</td>
                </tr>
                <tr>
                  <td>Package</td>
                  <td>{product.Package}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{product.Quantity}</td>
                </tr>
                <tr>
                  <td>Product Form</td>
                  <td>{product['Product Form']}</td>
                </tr>
                <tr>
                  <td>Bought</td>
                  <td>{product.bought}</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>{product.storage}</td>
                </tr>
                <tr>
                  <td>Country of Origin</td>
                  <td>{product.country_of_origin}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="MRP">&#8377; {product.MRP}</p>
          <button className="add-to-cart-btn">{product.for_sale}</button>
          <div className="discount-box">{product.discount_percent}</div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
