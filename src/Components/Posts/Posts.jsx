import React, { useContext, useEffect, useState } from "react";
import "./Posts.css";
import Heart from "../../assets/Heart";
import { db } from "../../Firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

// Reusable Card Component
const ProductCard = ({ product, setPostDetails, navigate }) => (
  <div
    className="card"
    onClick={() => {
      setPostDetails(product);
      navigate(`/view/${product.id}`);
    }}
    key={product.id}
  >
    <div className="favorite">
      <Heart />
    </div>
    <div className="image">
      <img src={product.imageUrl} alt={product.name} loading="lazy" />
    </div>
    <div className="content">
      <p className="rate">₹ {product.price}</p>
      <span className="kilometer">{product.name}</span>
      <p className="name">{product.category}</p>
    </div>
    <div className="date">
      <span>
        {product.createdAt
          ? new Date(product.createdAt.seconds * 1000).toLocaleDateString()
          : "Unknown Date"}
      </span>
    </div>
  </div>
);

const Posts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const allPosts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="cards">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setPostDetails={setPostDetails}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh Recommendations</span>
        </div>
        {loading ? (
          <p>Loading recommendations...</p>
        ) : (
          <div className="cards">
            {products.length > 0 ? (
              products.slice(0, 3).map((product) => ( // Show top 3 recent products
                <ProductCard
                  key={product.id}
                  product={product}
                  setPostDetails={setPostDetails}
                  navigate={navigate}
                />
              ))
            ) : (
              <p>No recent products available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;