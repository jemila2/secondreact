// // import Detail from "./components/Detail"
// // import  from "./components/Productpractical"
// import Navebar  from "./components/Navebar"
// // import Productpractical from "./components/Productpractical"
// // import About  from "./Pages/About"
// // import Contact  from "./Pages/Contact"
// import Home  from "./Pages/Home"
// // import Shop  from "./Pages/Shop"
// // import Head  from "./Pages/Head"
// // import Cart from './Pages/Cart'
// import Icons from './Pages/Icons'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import TaxSoftware from "./components/TaxSoftware"
// // import TaxSoftware from './TaxSoftware';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoginPage from './Pages/LoginPage'; // Adjust the path as needed
import Footer from "./components/Footer"
import Navebar from "./components/Navebar"
import Home from "./Pages/Home"
import UserList from "./components/UserList"
import ProductList from "./components/ProductList"
import Tshop from "./components/Tshop"
import Icons from "./pages/Icons"
import CertegoryList from "./components/CertegoryList"
import UserCreation from "./components/UserCreation"
import Dashboard from './components/Dashboard';
import ProductDetail from "./components/ProductDetail"
import MerchantCreation from './components/MerchantCreation';



function App() {

  return (
<Router>
<Navebar/> 
<Routes>
<Route path="/" element={<Home />}/>
<Route path="/Icons" element={<Icons />}/>
<Route path="/Tshop" element={<Tshop />}/>
<Route path="/Login" element={<LoginPage />}/>
<Route path="/use" element={<UserList />}/>
<Route path="/product" element={<ProductList />}/>
<Route path="/certegory" element={<CertegoryList />}/>
<Route path="/user" element={< UserCreation />}/>
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/creation" element={<MerchantCreation />} />
<Route path="/products/" element={<ProductDetail />}/>
</Routes>
<Footer/> 
{/* <Hero/> */}

</Router>
  )
}

export default App
