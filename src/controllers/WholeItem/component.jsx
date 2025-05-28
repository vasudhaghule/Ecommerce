import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetails from "./ItemDetails";
import "./styles.css";
import { checkout, setProducts } from "../redux_store/action/productsAction";
import { getProducts } from "../FetchedItems";

function findTotal(productCart, products) {
  return productCart.reduce(
    (sum, item) => sum + item.count * (products[item.id - 1]?.price || 0),
    0
  ).toFixed(2);
}

function TotalProducts() {
  const { productCart, products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      async function fetchData() {
        setLoading(true);
        try {
          let products = await getProducts();
          dispatch(setProducts(products.data));
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [dispatch, products.length]);

  const totalAmount = findTotal(productCart, products);

  const handleCheckout = () => {
    dispatch(checkout());
    alert("Checkout successful!");
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="user__cart">
      <div className="left__Cart">
        {productCart.length > 0 ? (
          productCart.map((item, index) => (
            <ItemDetails key={index} count={item.count} productId={item.id} />
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>No Items in Cart...</h3>
        )}
      </div>
      <div className="right__Cart">
        <div>
          <div>Total</div>
          <div className="cart__price">₹ {totalAmount}</div>
        </div>
        <div>
          <div>Discount</div>
          <div>₹ {0}</div>
        </div>
        <div>
          <div>Grand Total</div>
          <div className="cart__price">₹ {totalAmount}</div>
        </div>
        <button onClick={handleCheckout}>Checkout Product</button>
      </div>
    </div>
  );
}

export default TotalProducts;
