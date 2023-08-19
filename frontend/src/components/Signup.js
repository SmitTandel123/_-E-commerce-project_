import React,{useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const Navigate = useNavigate();
    useEffect(()=>{

      const auth =localStorage.getItem("user");
      if(auth){
        Navigate("/")
      }
    })


    const collectData= async()=>{

        console.log(name,email,password)
       
        let result = await fetch("http://localhost:5000/Signup", {
          method:"POST",
          body: JSON.stringify({name,email,password}),
          headers:{'Content-Type': 'application/json'}
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))
        if(result){
          Navigate("/");
        }
    }
  return (
    <div className="signup">
      <h1>Register</h1>
    <form>
        <input type="text" className="inputbox" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"/>
        <input type="email" className="inputbox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
        <input type="password" className="inputbox" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
        <button type="button" className="btn" onClick={ collectData }>Submit</button>

    </form>
    
    </div>
  );
};

export default Signup;
