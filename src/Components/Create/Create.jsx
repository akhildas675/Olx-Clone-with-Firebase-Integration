import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/Context";
import { db } from "../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import uploadImageToCloudinary from "../../utils/uploadToCloudinary";

const Create = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to create a product!");
      return;
    }

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        alert("Image upload failed. Try again.");
        setLoading(false);
        return;
      }

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid, 
        createdAt: new Date(),
      });

      alert("Product uploaded successfully!");

      // Reset form fields
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);

      // Redirect to home page
      navigate("/"); 

    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
          <br />
          <br />
          {image && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />}
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
            {loading ? "Uploading..." : "Upload and Submit"}
          </button>
        </div>
      </div>
    </Fragment>
  );    
};

export default Create;
