import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth =localStorage.getItem("user");
const Navigate = useNavigate();
  const Logout=()=>{
    localStorage.clear("user")
    Navigate("/signup")
  }

  return ( <div>
    {/* <img src="E:\E-commerce website\frontend\src\components\img.png" alt="logo" className="logo"/> */}
    { auth ?
    <ul className="nav-ul">
      <li><Link to="/">Products</Link></li>
      <li><Link to="/add">Add products</Link></li>
      <li><Link to="/update/:id">Update products</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link onClick={Logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
    </ul>
     :
     <ul className="nav-ul nav-right">
      
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
      

     </ul>
}
      
      
  </div>
  );
};
export default Nav;
