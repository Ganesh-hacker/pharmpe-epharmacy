// import React, { useEffect, useState } from "react";
// import '../Stylesheets/Cartdetails.css';
// import Profile from './Profile';

// const CartItem = ({ item, onAdd, onSubtract, onRemove }) => {
//   return (
//     <li className="_grid shopping-cart--list-item">
//       <div className="_column product-image">
//         <img className="product-image--img" src={item.imageUrl} alt="Item image" />
//       </div>
//       <div className="_column product-info">
//         <h4 className="product-name">{item.name}</h4>
//         <p className="product-desc">{item.desc}</p>
//         <div className="price product-single-price">INR {item.price.toFixed(2)}</div>
//       </div>
//       <div className="_column product-modifiers" data-product-price={item.price}>
//         <div className="_grid">
//           <button className="_btn _column product-subtract" onClick={() => onSubtract(item._id)}>&minus;</button>
//           <div className="_column product-qty">{item.qty}</div>
//           <button className="_btn _column product-plus" onClick={() => onAdd(item._id)}>+</button>
//         </div>
//         <button className="_btn entypo-trash product-remove" onClick={() => onRemove(item._id)}>Remove</button>
//         <div className="price product-total-price">{(item.price * item.qty).toFixed(2)}/-</div>
//       </div>
//     </li>
//   );
// };

// const CartFooter = ({ subtotal, shipping, taxes, total, onCheckout }) => {
//   return (
//     <footer className="_grid cart-totals">
//       <div className="_column subtotal" id="subtotalCtr">
//         <div className="cart-totals-key">Subtotal</div>
//         <div className="cart-totals-value">INR {subtotal.toFixed(2)}</div>
//       </div>
//       <div className="_column shipping" id="shippingCtr">
//         <div className="cart-totals-key">Shipping</div>
//         <div className="cart-totals-value">INR {shipping.toFixed(2)}</div>
//       </div>
//       <div className="_column taxes" id="taxesCtr">
//         <div className="cart-totals-key">Taxes (6%)</div>
//         <div className="cart-totals-value">INR {taxes.toFixed(2)}</div>
//       </div>
//       <div className="_column total" id="totalCtr">
//         <div className="cart-totals-key">Total</div>
//         <div className="cart-totals-value">INR {total.toFixed(2)}</div>
//       </div>
//       <div className="_column checkout">
//         <button className="_btn checkout-btn entypo-forward" onClick={onCheckout}>Checkout</button>
//       </div>
//     </footer>
//   );
// };

// const Cartitemdetailscomp = () => {
//   const [cartedItems, setCartedItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userid');
//     fetch(`http://localhost:3005/v1/cart/${userId}`)
//       .then(response => response.json())
//       .then(data => {
//         setCartedItems(data);
//       })
//       .catch(error => {
//         setError(error);
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleAdd = (id) => {
//     setCartedItems(cartedItems.map(item => 
//       item._id === id ? { ...item, qty: item.qty + 1 } : item
//     ));
//   };

//   const handleSubtract = (id) => {
//     setCartedItems(cartedItems.map(item => 
//       item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
//     ));
//   };

//   const handleRemove = async (id) => {
//     const userId = localStorage.getItem('userid');
//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
//             method: "DELETE",
//         });
//         if (response.ok) {
//             window.location.href = "/cartdetails";
//         } else {
//             const errorData = await response.json();
//             console.error("Error deleting item:", errorData.message);
//         }
//     } catch (error) {
//         console.error("Error deleting item:", error);
//     }
// };


//   const calculateSubtotal = () => {
//     return cartedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
//   };

//   const calculateShipping = (subtotal) => {
//     return subtotal > 100 ? 0 : 10;
//   };

//   const calculateTaxes = (subtotal) => {
//     return subtotal * 0.06;
//   };

//   const subtotal = calculateSubtotal();
//   const shipping = calculateShipping(subtotal);
//   const taxes = calculateTaxes(subtotal);
//   const total = subtotal + shipping + taxes;

//   const handleCheckout = async () => {
//     const userId = localStorage.getItem('userid');
//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3005/checkout', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ userId, items: cartedItems, total })
//         });
//         if (response.ok) {
//             const data = await response.json();
//             alert(`Checkout successful! Order ID: ${data.orderId}`);
//             // Clear the cart or redirect to another page if needed
//         } else {
//             const errorData = await response.json();
//             console.error("Error during checkout:", errorData.message);
//         }
//     } catch (error) {
//         console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="mainprofilepagecontainer">
//       <Profile />
//       <div className="main">
//         <h1>Shopping Cart</h1>
//         <h2 className="sub-heading"></h2>
//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <section className="shopping-cart">
//             <ol className="ui-list shopping-cart--list" id="shopping-cart--list">
//               {cartedItems.map(item => (
//                 <CartItem 
//                   key={item._id} 
//                   item={item} 
//                   onAdd={handleAdd} 
//                   onSubtract={handleSubtract} 
//                   onRemove={handleRemove} 
//                 />
//               ))}
//             </ol>
//             <CartFooter 
//               subtotal={subtotal} 
//               shipping={shipping} 
//               taxes={taxes} 
//               total={total} 
//               onCheckout={handleCheckout} 
//             />
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cartitemdetailscomp;


import React, { useEffect, useState } from "react";
import '../Stylesheets/Cartdetails.css';
import Profile from './Profile';
import {Link} from 'react-router-dom'
import axios from "axios";
const CartItem = ({ item, onAdd, onSubtract, onRemove }) => {
  
  return (
    <li className="_grid shopping-cart--list-item">
      <div className="_column product-image">
      <Link to={`/productdetails?id=${item.id}`}>
      <img className="product-image--img" src={item.imgurl1} alt="Item image" />
      </Link>
      </div>
      <div className="_column product-info">
        <h4 className="product-name">{item.name}</h4>
        <p className="product-desc">{item.desc}</p>
        <div className="price product-single-price">INR {item.price.toFixed(2)}</div>
      </div>
      <div className="_column product-modifiers" data-product-price={item.price}>
        <div className="_grid">
          <button className="_btn _column product-subtract" onClick={() => onSubtract(item._id)}>-</button>
          <div className="_column product-qty">{item.qty}</div>
          <button className="_btn _column product-plus" onClick={() => onAdd(item._id)}>+</button>
        </div>
        <button className="_btn entypo-trash product-remove" onClick={() => onRemove(item._id)}>Remove</button>
        <div className="price product-total-price">{(item.price * item.qty).toFixed(2)}/-</div>
      </div>
    </li>
  );
};

const CartFooter = ({ subtotal, shipping, taxes, total, onCheckout }) => {
  return (
    <footer className="_grid cart-totals">
      <div className="_column subtotal" id="subtotalCtr">
        <div className="cart-totals-key">Subtotal</div>
        <div className="cart-totals-value">INR {subtotal.toFixed(2)}</div>
      </div>
      <div className="_column shipping" id="shippingCtr">
        <div className="cart-totals-key">Shipping</div>
        <div className="cart-totals-value">INR {shipping.toFixed(2)}</div>
      </div>
      <div className="_column taxes" id="taxesCtr">
        <div className="cart-totals-key">Taxes (6%)</div>
        <div className="cart-totals-value">INR {taxes.toFixed(2)}</div>
      </div>
      <div className="_column total" id="totalCtr">
        <div className="cart-totals-key">Total</div>
        <div className="cart-totals-value">INR {total.toFixed(2)}</div>
      </div>
      <div className="_column checkout">
        <button className="_btn checkout-btn entypo-forward" id="checkoutButton" onClick={onCheckout}>Checkout</button>
      </div>
    </footer>
  );
};

const Cartitemdetailscomp = () => {
  const [cartedItems, setCartedItems] = useState([]);
  const [error, setError] = useState(null);
  const [addressdata, setaddressdata] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [cart,setcart]= useState([])
 
   const userid = localStorage.getItem('userid');
   const addressid = localStorage.getItem('addressid');
  //  const totalprice = localStorage.getItem('totalprice');
  const product =JSON.parse(localStorage.getItem('products'));

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    if(!userId){
      setcart(product)
      console.log("login to get userinfo");
    }else{
      fetch(`http://localhost:3005/v1/cart/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCartedItems(data);
        } else {
          setCartedItems([]);
        }
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
    }
   
  }, []);
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3005/address/${userid}`)
        .then(response => {
            if (!response.ok) {
                console.log("unable to get userid")
            }
            return response.json();
        })
        .then(data => {
            setaddressdata(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
            console.error('Error fetching data:', error);
        });
        console.log("addressdata",addressdata);
}, [userid]);

console.log(cart);
  const updateQuantity = async (id, qty) => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty:qty })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating quantity:", errorData.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
      return false;
    }
  };

  const handleAdd = async (id) => {
    const item = cartedItems.find(item => item._id === id);
   
    if (item) {
      const newQty = item.qty + 1;
      if (await updateQuantity(id, newQty)) {
        setCartedItems(cartedItems.map(item =>
          item._id === id ? { ...item, qty: newQty } : item
        ));
      }
  
    }
  };

  const handleSubtract = async (id) => {
    const item = cartedItems.find(item => item._id === id);
    if (item && item.qty > 1) {
      const newQty = item.qty - 1;
      if (await updateQuantity(id, newQty)) {
        setCartedItems(cartedItems.map(item =>
          item._id === id ? { ...item, qty: newQty } : item
        ));
      }
    }
  };


  const handleRemove = async (id) => {
    const userId = localStorage.getItem('userid');
    const addressid = localStorage.getItem('addressid')
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCartedItems(cartedItems.filter(item => item._id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error deleting item:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartedItems.length > 0 ?cartedItems.reduce((acc, item) => acc + (item.price * item.qty), 0):0;
  };

  const calculateShipping = (subtotal) => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTaxes = (subtotal) => {
    return subtotal * 0.12;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const taxes = calculateTaxes(subtotal);
  const total = subtotal + shipping + taxes;

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userid');
    localStorage.setItem("totalprice",total);
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/checkout',{
        userid:userid,
        addressid:addressid,
        totalprice:total
      });
      if (response.data.success) {
        localStorage.setItem('orderid',response.data.orderid)
        const checkoutButton = document.getElementById('checkoutButton');
        checkoutButton.disabled = false;
      window.location.replace("/onlinepayment")
      
        // Clear the cart or redirect to another page if needed
      } else {
        const errorData = await response.json();
        console.error("Error during checkout:", errorData.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  function handleaddress() {
    localStorage.setItem("addressid", addressdata[0]._id);
    console.log("Address ID:", localStorage.getItem("addressid"));
  }
  
  const initPayment = (data) => {
    const options = {
        key: "rzp_test_oFFZk80YNcWGkP",
        amount: data.amount,
        currency: data.currency,
        description: "Test Transaction",
        order_id: data.id,
        handler: async (response) => {
            try {
                const verifyUrl = "http://localhost:3005/verify";
                const verifyData = {
                    ...response,
                    userid: localStorage.getItem('userid'),
                    addressdata: addressdata[0],
                    cartData: cartedItems,
                    totalprice:total
                };
                const verifyResponse = await axios.post(verifyUrl, verifyData);
                console.log(verifyResponse.data);
                
                if (verifyResponse.data.message === "Payment verified successfully") {
                    // Proceed to save the order data
                    const proceedUrl = "http://localhost:3005/proceed";
                    const proceedData = {
                        userid: localStorage.getItem('userid'),
                        address: addressdata[0],
                        totalprice: total,
                        orderid: response.razorpay_order_id,
                        cartData: cartedItems
                    };
                    await axios.post(proceedUrl, proceedData);
                    alert("order successfully placed with a order id "+response.razorpay_order_id);
                     await axios.delete(`http://localhost:3005/cart/${localStorage.getItem('userid')}`)
                }
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};

const handlePayment = async () => {
    try {
        const orderUrl = "http://localhost:3005/orders";
        const orderResponse = await axios.post(orderUrl, { amount: total });
      console.log(orderResponse.data);
      initPayment(orderResponse.data.data);
    } catch (error) {
        console.log(error);
    }
};


  return (
    <div className="mainprofilepagecontainer">
      <Profile />
      <div className="main">
        <h1>Shopping Cart</h1>
        <h2 className="sub-heading"></h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <section className="shopping-cart">
            <ol className="ui-list shopping-cart--list" id="shopping-cart--list" style={{overflowX:"hidden",overflowY:"auto"}}>
  {cartedItems && cartedItems.length > 0 ? (
    cartedItems.map(item => (
      <CartItem 
        key={item._id} 
        item={item} 
        onAdd={handleAdd} 
        onSubtract={handleSubtract} 
        onRemove={handleRemove} 
      />
    ))
  ) : (
    product ? ( cart.map(product=>{
    return(
      <div>
         <li className="_grid shopping-cart--list-item">
      <div className="_column product-image">
        <Link to={`/productdetails?id=${product.Id}`}>
        <img className="product-image--img" src={product.imgurl1} alt="Item image" />
      </Link>
      </div>
      <div className="_column product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-desc">{product.desc}</p>
        <div className="price product-single-price">INR {product.MRP}</div>
      </div>
      <div className="_column product-modifiers" data-product-price={product.MRP}>
        <div className="_grid">
          <button className="_btn _column product-subtract" onClick={() => handleSubtract(product._id)}>-</button>
          <div className="_column product-qty">{product.qty}</div>
          <button className="_btn _column product-plus" onClick={() => handleAdd(product._id)}>+</button>
        </div>
        <button className="_btn entypo-trash product-remove" onClick={() => handleRemove(product._id)}>Remove</button>
        <div className="price product-total-price">{(product.price * product.qty).toFixed(2)}/-</div>
      </div>
    </li>
      </div>
    )
   })):(<p>Cart is empty</p>)
  )}
</ol>
        <div style={{backgroundColor:"lightgray"}}>
              {addressdata.length > 0 ? (
          <label className='shippingaddress-item'>
            <input type="radio" name="selectedAddress" className="input-class" onClick={handleaddress}  />
            <div>
              <div style={{fontSize:"20px",color:"black"}}><b>{addressdata[0].name}</b></div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].houseNumber}</div>
              <div style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].area}</div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].landmark}</div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].town} {addressdata[0].state} {addressdata[0].pincode}</div>
              <div style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].number}</div><br />
              <div className='edit-buttons'>
                    <button style={{borderRadius:"20%"}}><Link to='/address' style={{color:"black",textDecoration:"none"}}>Change address</Link></button>

            </div>
            </div>
          </label>
        ) : (
          <div>No address data available.</div>
        )}
          </div>
            <CartFooter 
              subtotal={subtotal} 
              shipping={shipping} 
              taxes={taxes} 
              total={total} 
              onCheckout={handlePayment} 
            />
          </section>
        )}
      
      </div>
    </div>
  );
};

export default Cartitemdetailscomp;










