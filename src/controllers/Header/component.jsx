import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";  

function countProduct(productCart) {
  
  let count = 0;
  productCart.forEach((element) => {
    count += element.count;  
  });
  return count;
}

function Header({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortPrice, setSortPrice, sortRating, setSortRating }) {

  const productCart = useSelector((state) => state.productCart);

  return (
    <div className="header">
      <div className="header__subcontainer">
        <div className="header_icon">
          <Link to="/"> Home </Link>
        </div>

        
        <Link to="/cart">
          <div className="header__cart">
            🛒<span className="product__count"> ({countProduct(productCart)})</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
