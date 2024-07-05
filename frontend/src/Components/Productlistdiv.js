import "../Stylesheets/ProductList.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import  React,{useState}  from "react";

function Productlistdiv({ product }) {
  const [btndisable,setbtndisable]=useState(false)
  if (!product) {
    return <div>No product data available.</div>;
  }
  async function AddCart(){
    const user = localStorage.getItem('user');
    const userid = localStorage.getItem('userid');
    if (!user || !userid) {
      const storedProducts = localStorage.getItem('products');
      const newProducts = storedProducts ? [...JSON.parse(storedProducts),product] : [product];
      localStorage.setItem('products', JSON.stringify(newProducts));
    }
    else{
        try {
      setbtndisable(true);
      const response = await fetch(`http://localhost:3005/addingtocart/${product.Id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, userid: localStorage.getItem('userid') }),
      });
     
      // if (response.ok) {
      //     window.location.href = '/cartdetails';
      // } else {
      //     window.location.href = '/cartdetails';
      // }
      if (response.status === 200) {
        const message = await response.text();
        if (message === "Product is already in the cart") {
          alert("Product is already in the cart");
        } else {
          console.log("Product added to cart");
        }
      } else {
        console.error("Error adding product to cart:", await response.text());
      }

  } catch (error) {
      console.error('Error registering:', error);
      setbtndisable(false);
  }

  }
}

  return (
    <div key={product.Id} className="product-card">
      <Link to={`/productdetails?id=${product.Id}`} className="listlink">
        <img src={product.imgurl1} alt={product.name} className="product-imageing" />
      </Link>
      <div className="product-details">
        <Link to={`/productdetails?id=${product.Id}` } className="listlink" >
          <div className="product-namelist">{product.name}</div>
        </Link>
        <Link to={`/productdetails?id=${product.Id}`} className="listlink">
          <div className="product-packaging">{product.Packaging}</div>
        </Link>
        <Link to={`/productdetails?id=${product.Id}`} className="listlink">
          <div className="product-mrp">&#8377; {product.MRP}</div>
        </Link>
        <button
          className="add-to-cart-button"
          onClick={AddCart}
          disabled={btndisable}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

Productlistdiv.propTypes = {
  product: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imgurl1: PropTypes.string.isRequired,
    Packaging: PropTypes.string,
    MRP: PropTypes.number.isRequired,
  }).isRequired,
};

Productlistdiv.defaultProps = {
  product: {
    Id: 0,
    name: "",
    imgurl1: "",
    Packaging: "",
    MRP: 0,
  },
};

export default Productlistdiv;
