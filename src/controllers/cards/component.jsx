import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux_store/action/productsAction";

export default function Card({ item }) {
  const { image, title, id, count, price, category } = item;  // Destructure to get price and category
  const dispatch = useDispatch();

  function increaseItemQuantity(id) {
    dispatch(increment(id));
  }

  function decreaseItemQuantity(id) {
    dispatch(decrement(id));
  }

  return (
    <div className="product__card">
      <div className="card">
        <Link to={`/productDetails/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
      <div className="meal_title">
        <p>{title}</p>
      </div>
      <div className="card_addItem">
      
      </div>
      <div className="product__info">
        <p><strong>Price:</strong> ₹{price}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>
    </div>
  );
}
