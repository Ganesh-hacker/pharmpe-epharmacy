import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profilepage from "./Pages/Profilepage";
import Homepagecomp from './Components/Homepagecomp';
import Homepage from "./Pages/Homepage";
import Blogpage from "./Pages/Blogpage";
import Aboutuspage from "./Pages/Aboutuspage";
import Helpcenterpage from './Pages/Helpcenterpage';
import Helpcenterinfopage from './Pages/Helpcenterinfopage';
import ProductList from './Components/ProductList';
import ProductListpage from './Pages/ProductListpage';
import ProductPage from './Pages/ProductPage';
import Cartpage from './Pages/Cartpage';
import Paymentformpage from './Pages/Paymentformpage';
import Onlinepaymentpage from './Pages/Onlinepaymentpage';
import Addresspage from './Pages/Addresspage';
import OrderHistoryPage from "./Pages/OrderHistoryPage"
import Trackingpage from './Pages/Trackingpage';
 import Mainprofilepage from "./Pages/Mainprofilepage"
function App() {
  return (
    <div>
  <BrowserRouter >
    <Routes>
    {/* <Route index element={<Homepagecomp />} />  */}
    <Route index element={<Homepage />} />
        <Route path="/Privacy Policy" element={<Blogpage />} />
        <Route path="/Aboutus" element={<Aboutuspage/>}/>
      <Route path="/profile" element={ <Mainprofilepage/>}/>
      <Route path="/helpcenter and faqs" element={ <Helpcenterpage/>}/>
      <Route path="/helpcenterinfo" element={ <Helpcenterinfopage/>}/>
      <Route path="/searchresults" element={ <ProductListpage/>}/>
      <Route path="/productdetails" element={ <ProductPage/>}/>
      <Route path="/cartdetails" element={ <Cartpage/>}/>
      <Route path="/paymentform" element={ <Paymentformpage/>}/>
      <Route path="/onlinepayment" element={ <Onlinepaymentpage/>}/>   
      <Route path="/address" element={ <Addresspage/>}/>      
      <Route path="/recentorders" element={ <OrderHistoryPage/>}/>

        <Route path="/tracking/:orderid" element={ <Trackingpage/>}/>  
        <Route path='/editprofile' element={<Profilepage/>} />


    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
