// Import packages related first
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./food delivery/register";
import Login from "./food delivery/login";
import Restaurent from "./food delivery/restaurent";
import ManagerPost from "./food delivery/mangerpost";
import FoodList from "./food delivery/foodlist";
import CreateFood from "./food delivery/createfood";
import Mainpage from "./mainpage";
import Customerreg from "./customer/customerreg";
import Orderfood from "./food delivery/orderfood";
import ActiveOrder from "./food delivery/activeorder";
import Customerorderlist from "./customer/customerorderlist";
import Deliveredlist from "./customer/customerdeliveredlist";
import Deliveredmanager from "./food delivery/deliveredmanage";
import PermanentDrawerLeft from "./appbar/sidenav";
import Restaurentfoods from "./food delivery/restaurentitem";
import Managerfoodlist from "./food delivery/managerfoods";
import ResetPassword from "./customer/resetpassword";
import ForgetPassword from "./customer/forgetpassword";

function App() {
  return (
    <div className="App">
      <Router>
        <PermanentDrawerLeft />
        <Routes>
          <Route path="/" element={<Customerreg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cuslogin/restaurants" element={<Restaurent />} />
          <Route path="/managerpost" element={<ManagerPost />} />
          <Route path="/cuslogin/foodlist" element={<FoodList />} />
          <Route path="/postfood" element={<CreateFood />} />
          <Route path="/orderfood" element={<Orderfood />} />
          <Route path="/orderlist" element={<ActiveOrder />} />
          <Route path="/customerorderlist" element={<Customerorderlist />} />
          <Route path="/customerdeliveredorders" element={<Deliveredlist />} />
          <Route path="/managerdelivered" element={<Deliveredmanager />} />
          <Route path="/resfoodlist/:id" element={<Restaurentfoods />} />
          <Route path="/createfood" element={<Managerfoodlist />} />
          <Route path="/reset" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
