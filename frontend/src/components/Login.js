import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
        })
    const handlelogin= async()=>{
        console.log(email,password)
        let result = await fetch("http://localhost:5000/login", {
            method:"POST",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result= await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
        else{
            alert('Invalid email or password');
        }
    }
return (
    <div className="login">
       <h1>
       login page here.
        </h1> 
        <form>
        <input type="email" className="inputbox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        <input type="password" className="inputbox" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
        <button type="button" onClick={handlelogin} className="btn">Login</button>

        </form>
    </div>
)
}
export default Login;