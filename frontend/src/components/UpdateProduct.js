import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    getProductDetails();
  },[]);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
    });
    result = await result.json();
    setTitle(result.title);
    setPrice(result.price);
    setDescription(result.description);
    setCompany(result.company);
  };

  const handleUpdateproduct = async () => {
    console.log(title, price, description, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ title, price, description, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    console.log(result);
    navigate("/")
  };

  return (
    <div className="Addproduct">
      <h1>Update product</h1>
      <form>
        <input
          type="text"
          className="inputbox"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title"
        />
        <input
          type="text"
          className="inputbox"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter your price"
        />
        <input
          type="text"
          className="inputbox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your description"
        />
        <input
          type="text"
          className="inputbox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter your company"
        />
        <button type="button" className="btn" onClick={handleUpdateproduct}>
          Update product
        </button>
      </form>
    </div>
  );
};
export default UpdateProduct;
