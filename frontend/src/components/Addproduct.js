
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

const Addproduct=()=>{
    const [title, setTitle]=useState("")
    const [price, setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [userId, setUserId]=useState("")
    const [company, setCompany]=useState("")
    const [error, setError]=useState(false)
    const navigate = useNavigate();
    const handleAddproduct= async()=>{
        if(!title || !price || !description || !userId || !company){
            setError(true);
            return false;
        }
        console.log(title,price,description,userId,company)
        const userid= JSON.parse(localStorage.getItem("user"))._id;
        console.log(userid)
        let result = await fetch("http://localhost:5000/add-product",{
            method:"post",
            body: JSON.stringify({title,price,description,userId,company}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result= await result.json();
        console.log(result);
        navigate("/");


    }
    return(
        <div className="Addproduct">
            <h1>ADD product</h1>
            <form>
        <input type="text" className="inputbox" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter your title"/>
        {error && !title && <span className="invalid-input">Enter valid name</span>}
        <input type="text" className="inputbox" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter your price"/>
        {error && !price && <span className="invalid-input">Enter valid price</span>}
        <input type="text" className="inputbox" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter your description"/>
        {error && !description && <span className="invalid-input">Enter valid description</span>}
        <input type="text" className="inputbox" value={userId} onChange={(e)=>setUserId(e.target.value)} placeholder="Enter your userId"/>
        {error && !userId && <span className="invalid-input">Enter valid userId</span>}
        <input type="text" className="inputbox" value={company} onChange={(e)=>setCompany(e.target.value)}placeholder="Enter your company"/>
        {error && !company && <span className="invalid-input">Enter valid company</span>}
        <button type="button" className="btn" onClick={handleAddproduct}>Add product</button>

    </form>
        </div>
    )
}
export default Addproduct;