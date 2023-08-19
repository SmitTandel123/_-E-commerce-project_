import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList=()=>{
    const [products,setProducts]=useState([])
    useEffect(()=>{
        getProduct();
    },[])

    const getProduct= async()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result);
        console.log("products", products)
    }
    
  const addToCart = async (productId) => {
    try {
      await fetch(`http://localhost:5000/add-to-cart/${productId}`, {
        method: "POST",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
    } catch (error) {
      console.error(error);
      
    }
  };
    const deleteproduct=async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if(result){
            getProduct();
        }
    }
    const handlesearch=async(event)=>{
        let key = event.target.value;
        if(key){

            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result=await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProduct();
        }
    }
    return(
        <div className="Product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product" placeholder="Search product" onChange={handlesearch} />
            <ul>
                <li>Sr.No</li>
                <li>TItle</li>
                <li>Price</li> 
                <li>Description</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
         {
             products.length >0 ? products.map((item,index)=>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.title}</li>
                    <li>${item.price}</li>
                    <li>{item.description}</li>
                    <li>{item.company}</li>
                    <li>
                        <button onClick={()=>deleteproduct(item._id)}>delete</button>
                        <button onClick={() => addToCart(item._id)}>Add to Cart</button>
                    <Link to={`/update/${item._id}`}>Update</Link>
                    </li>
                </ul>
                
            )
            : <h1>No Result found</h1>
        }
         
        </div>
    );
}
export default ProductList;