import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux_store/action/productsAction";
import { getProductsWithId } from "../FetchedItems/index";
import "./styles.css";

export default function Cart() {
  const { productCart } = useSelector((state) => state);
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isInCart, setInCart] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Fetch product details only once per productId
  useEffect(() => {
    async function fetchProduct(id) {
      try {
        setLoading(true);
        const response = await getProductsWithId(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct(productId);
  }, [productId]);

  // Memoize cart checking to prevent unnecessary re-renders
  const checkProductInCart = useCallback(() => {
    return productCart.some((item) => parseInt(item.id) === parseInt(productId));
  }, [productCart, productId]);

  useEffect(() => {
    setInCart(checkProductInCart());
  }, [checkProductInCart]);

  const handleAddToCart = () => {
    dispatch(increment(productId));
    setInCart(true);
  };

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  const { image, title, description, price, rating, category } = product;

  return (
    <div className="product_details">
      <div className="left_product_details">
        <img
          src={image}
          alt={title}
          onError={(e) => (e.target.src = "/fallback-image.png")}
        />
        <div className="card__button">
          {!isInCart ? (
            <button className="addToCart_button" onClick={handleAddToCart}>
              Add To Cart
            </button>
          ) : (
            <Link to="/cart">
              <button className="addToCart_button">Go to Cart</button>
            </Link>
          )}
          <Link to="/cart">
            <button className="buyNow_button" onClick={handleAddToCart}>
              Buy Now
            </button>
          </Link>
        </div>
      </div>
      <div className="right_product_details">
        <div className="title">{title}</div>
        <div className="price">
          <span className="rupee">₹</span>
          {price}
        </div>
        <div className="rating">
          {rating?.rate} <span className="start_icon">★</span>
        </div>
        <div className="category">
          <strong>Category:</strong> {category}
        </div>
        <div className="description">
          <h4>Product Details:</h4>
          <div className="product__description">{description}</div>
        </div>
      </div>
    </div>
  );
}
