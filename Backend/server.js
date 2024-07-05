

const express = require('express');
const twilio = require('twilio');
const { Logindetails, cartproducts, purchproducts, addresslist,ordered } = require("./config");
require('dotenv').config();  // Ensure this is at the top
const { helpcenterinfo } = require('./Helpcenterinfo');
const { Medicines } = require('./Medicine_info');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay=require("razorpay")
const crypto=require("crypto")
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);
app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    client.verify.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then(verification => {
            console.log('OTP sent successfully to:', phoneNumber); // Log the success message
            res.status(200).send(verification);
        })
        .catch(error => {
            console.error('Error sending OTP:', error); // Log the error message
            res.status(500).send(error);
        });
});


app.post('/verify-otp', async (req, res) => {
    const { phoneNumber, code } = req.body;
    const data = {
        mno: phoneNumber
    };
    
    console.log(phoneNumber, code);
    
    try {
        const verification_check = await client.verify.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: code });
            const existingUser = await Logindetails.findOne({
                $or: [
                    
                    { mno: data.mno },
                  
                ]
            });
        
        if (verification_check.status === 'approved') {
            console.log("success");
            if (!existingUser){
            await Logindetails.create(data);
            }
            console.log("User registered successfully:", data);
            res.status(200).send('Verification successful');
        } else {
            console.log("fail");
            res.status(400).send('Verification failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



app.patch("/login/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const updateData = {
            name: req.body.name,
            mno: req.body.mno,
            email: req.body.email
        };

        // Find the user by _id and update
        const updatedUser = await Logindetails.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal server error. Please try again later.");
    }
});
app.get("/login/:mno", async(req,res)=>{
    const { mno } = req.params;
    try {
        const searchpro = await Logindetails.find({mno: mno });
        if (searchpro.length > 0) {
            console.log(searchpro)
            res.status(200).json(searchpro);
        } else {
            console.log("error")
            res.status(404).json({ message: 'No items found in the cart for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/signup", async (req, res) => {
   
    const data={
        mno:req.body.phoneNumber} 

    const otp=req.body.otp;

    try {
        const existingUser = await Logindetails.findOne({
            $or: [
                // { name: data.name },
                // { email: data.email },
                { mno: data.mno },
                // { $and: [ { email: data.email }, { otp: otpMap[data.email] } ] }
            ]
        });

        if (existingUser) {
            console.log("User already exists:", existingUser);
            res.status(409).send('urexist');
        } else {
            const saltRounds = 10;
            data.password = hashedPassword;
            await Logindetails.insertMany(data);
            console.log("User registered successfully:", data);
            res.status(201).send('successful'); 
        }
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send("Internal server error. Please try again later.");
    }
});

app.get('/v1/query', (req, res) => {
    try {
        const { search } = req.query;
        let sortedquest = helpcenterinfo;

        if (search) {
            const searchWords = search.split(" ").filter(Boolean);
            sortedquest = sortedquest.filter(question => {
                return searchWords.some(word => question.question.toLowerCase().includes(word.toLowerCase()));
            });
        }

        res.status(200).json(sortedquest);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/v1/medicines/query', async (req, res) => {
    const { search } = req.query;
    try {
        let sortedinfo = [];

        if (search) {
            const searchWords = search.split(" ").filter(Boolean); 
            const regexArray = searchWords.map(word => `(?=.*\\b${word}\\b)`);
            const regex = new RegExp(regexArray.join("") + ".*", "i");
            sortedinfo = Medicines.filter(medicine => regex.test(medicine.name));
        } else {
            sortedinfo = Medicines;
        }

        res.status(200).json(sortedinfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/medicine/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const searchpro = await Medicines.find(medicine => medicine.Id.toString() === id);
        if (searchpro) {
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/addingtocart/:id", async (req, res) => {
    const { id } = req.params;

  
    const data = {
        id: id, 
        userid:req.body.userid,
        name: req.body.name,
        manufacturers:req.body.manufacturers,
        imgurl1: req.body.imgurl1,
        MRP: req.body.MRP,
        price:req.body.MRP
    };

    try {
      const existingProduct = await cartproducts.findOne({ id: id, userid:data.userid });
      if (existingProduct) {
        console.log("Product is already in the cart:", data);
        res.status(200).send("Product is already in the cart");
      } else {
        await cartproducts.create(data);
        console.log("Product added to cart:", data);
        res.status(200).redirect('/cartdetails');
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).send("Internal server error. Please try again later.");
    }
  });
app.get('/v1/cart/:userid', async (req, res) => {
    const { userid} = req.params;
    try {
        const searchpro = await cartproducts.find({ userid: userid });
        if (searchpro.length > 0) {
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: 'No items found in the cart for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete("/cart/:id/:userid", async (req, res) => {
    const itemId = req.params.id;
    const userId = req.params.userid;
    try {
        const deletedItem = await cartproducts.findOneAndDelete({  _id: itemId, userid: userId });
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", deletedItem });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});
app.patch('/cart/:itemId/:userId', async (req, res) => {
    const { itemId, userId } = req.params;
    const { qty } = req.body;

    try {
        // Find the item in the cartproducts collection
        const cartItem = await cartproducts.findOne({ _id: itemId, userid: userId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update the quantity
        cartItem.qty = qty;
        cartItem.qty = qty;
        // cartItem.price= cartItem.price* cartItem.qty;
        await cartItem.save();
        console.log("Quantity updated:", qty);

        res.json(cartItem);
    } catch (error) {
        console.error("Error updating item quantity:", error);
        res.status(500).json({ message: 'Error updating item quantity', error });
    }
});

app.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
            console.log(order)
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

app.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

app.post('/checkout', async (req, res) => {
    const { userid, addressid, totalprice } = req.body;

    if (!userid || !addressid || !totalprice) {
        return res.status(400).json({ message: "Invalid request" });
    }

    try {
            const newPurchasedProduct = new  purchproducts({
                
                userid: userid,
                addressid:addressid,
                totalprice:totalprice
            });
            
         newPurchasedProduct.save();
        res.status(201).json({ success:true,orderid: newPurchasedProduct._id });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});



app.post('/address/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const addressData = { ...req.body, userid };
      const newAddress = new addresslist(addressData);
      await newAddress.save();
      res.status(201).json(newAddress);
    } catch (error) {
      res.status(400).json({ message: 'Error creating address', error: error.message });
    }
  });
app.get('/address/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const searchpro = await addresslist.find({userid: userid});
        if (searchpro.length > 0) {
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: ' no address exist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/v1/address/:id', async (req, res) => {
    const {id } = req.params;
    try {
        const searchpro = await addresslist.find({ _id:id});
        if (searchpro.length > 0) {
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: ' no address exist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.patch('/address/:userId/:addressId', async (req, res) => {
    try {
      const { userId, addressId } = req.params;
      const updatedAddress = await addresslist.findOneAndUpdate(
        {  userid:userId, _id: addressId },
        req.body,
        { new: true }
      );
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json(updatedAddress);
    } catch (error) {
      res.status(400).json({ message: 'Error updating address', error: error.message });
    }
  });

app.delete("/address/:_id/:userid", async (req, res) => {
    const itemId = req.params._id;
    const userid=req.params.userid;
    try {
        const deletedItem = await addresslist.findOneAndDelete({ _id: itemId, userid: userid});
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", deletedItem });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

app.post('/proceed',async (req,res) =>{
    const { userid, address, totalprice,orderid,upi,cartData } = req.body;

    if (!userid  || !orderid) {
        return res.status(400).json({ message: "Invalid request" });
    }
    
    try {
        const neworder= new  ordered({
          userid,
          address,
          orderid,
          upi,
          cartData,
          totalprice,   
        });
        
     neworder.save();
    res.status(201).json({ success:true, orderid: neworder.orderid });
} catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
}
})

app.patch('/proceed/:orderid', async (req, res) => {
    const { orderid } = req.params;
    try {
      const updatedOrder = await ordered.findOneAndUpdate(
        { orderid: orderid },
         { cancel: false } ,
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      res.status(200).json({ success: true, message: 'Order cancelled successfully', order: updatedOrder });
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ success: false, message: 'Error cancelling order' });
    }
  });
  
  app.patch('/status/:orderid', async (req, res) => {
    const { orderid } = req.params;
    const newStatus  = req.body.status;
    try {
      const updatedOrder = await ordered.findOne(
        { orderid: orderid }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: 'status not found' });
      }
      updatedOrder.status=newStatus;
      await  updatedOrder.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error Status updating:', error);
      res.status(500).json({ success: false, message: 'Error Status updating' });
    }
  });
  

app.get('/v1/order/:userid', async (req, res) => {
    const { userid} = req.params;
    try {
        const searchpro = await ordered.find({ userid: userid });
        if (searchpro.length > 0) {
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: 'No items found in the cart for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/order/:orderid', async (req, res) => {
    const { orderid} = req.params;
    try {
        const searchpro = await ordered.findOne({ orderid: orderid });
            res.status(200).json(searchpro);
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.delete('/cart/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
      const result = await cartproducts.deleteMany({ userid });
      if (result.deletedCount > 0) {
        res.json({ message: 'Cart items deleted successfully' });
      } else {
        res.status(404).json({ error: 'No cart items found for the given user ID' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting cart items' });
    }
  });

  app.get('/v1/order/:userid', async (req, res) => {
    const { userid} = req.params;
    try {
        const searchpro = await ordered.find({ userid: userid });
        if (searchpro.length > 0) {
            console.log(searchpro)
            res.status(200).json(searchpro);
        } else {
            res.status(404).json({ message: 'No items found in the recent orders for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
