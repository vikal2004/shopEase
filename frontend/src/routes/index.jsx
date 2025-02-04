import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";

const AppRouter=()=>{
 return (
       <Routes>
           <Route path="/home" element={<Home />} />
           <Route path="/register" element={<Register />} />
       </Routes>
 )
}


export default AppRouter;