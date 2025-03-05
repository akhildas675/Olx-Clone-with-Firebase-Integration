import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./View.css";

const View = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(firebase);

    const fetchProductDetails = async () => {
      try {
        if (postDetails && postDetails.id === productId) {
          console.log("Using existing postDetails:", postDetails);
          return postDetails;
        }

        const productDoc = await getDoc(doc(db, "products", productId));
        console.log("Product Doc:", productDoc);
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          console.log("Fetched product data:", productData);
          setPostDetails(productData);
          return productData;
        } else {
          console.log("Product not found");
          return null;
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        return null;
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (product) => {
      if (!product || !product.userId) {
        console.log("No userId found in product:", product);
        return;
      }
      console.log("Fetching user with userId:", product.userId);
      try {
        const userDoc = await getDoc(doc(db, "users", product.userId)); // Fetch by document ID
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Fetched user data:", userData);
          setUserDetails(userData);
        } else {
          console.log("No matching user found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchProductDetails().then((product) => {
      if (product) {
        fetchUserDetails(product);
      } else {
        console.log("No product data available to fetch user details.");
      }
    });
  }, [productId, postDetails, setPostDetails, firebase]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl || "fallback-image-url.jpg"}
          alt="Product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>₹ {postDetails?.price || "Unknown Price"}</p>
          <span>{postDetails?.name || "Unknown Vehicle"}</span>
          <p>{postDetails?.category || "Unknown Category"}</p>
          <span>
            {postDetails?.createdAt
              ? new Date(postDetails.createdAt.seconds * 1000).toLocaleDateString()
              : "Unknown Date"}
          </span>
        </div>
        <div className="contactDetails">
          <p>Seller Details</p>
          {userDetails ? (
            <>
              <p>Name: {userDetails.name || "Unknown"}</p>
              <p>Email: {userDetails.email || "Unknown"}</p>
              <p>Phone: {userDetails.phone || "Not Provided"}</p>
            </>
          ) : (
            <p>No seller details available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;