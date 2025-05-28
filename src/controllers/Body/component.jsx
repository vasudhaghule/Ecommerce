import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../cards/component";
import { getProducts } from "../FetchedItems";
import { setProducts } from "../redux_store/action/productsAction";
import { updateProductWithItsCount } from "./helperMethods";
import "./styles.css";

export default function Body() {
  let dispatch = useDispatch();
  const { products, productCart } = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");
  const [sortRating, setSortRating] = useState("none");

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [searchQuery]);

  useEffect(() => {
    async function fetchData() {
      let response = await getProducts();
      dispatch(setProducts(response.data));
    }
    fetchData();
  }, [dispatch]);

  
  const filteredProducts = products.filter((item) => {
    const matchesSearchQuery =
      item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearchQuery && matchesCategory;
  });

  const sortedByPrice = [...filteredProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") {
      return a.price - b.price;
    } else if (sortPrice === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  const sortedByRating = [...sortedByPrice].sort((a, b) => {
    if (sortRating === "highToLow") {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  const updatedProductWithCount = updateProductWithItsCount(
    sortedByRating,
    productCart
  );

  return (
    <div className="product__container flex-function">
  
 
     <div className="search-bar">
  <i className="search-icon">🔍</i>
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>


<div className="filters-container">
  
  <div className="category-dropdown">
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelry</option>
      <option value="women's clothing">Women's Clothing</option>
      <option value="men's clothing">Men's Clothing</option>
    </select>
  </div>
  <div className="sort-dropdowns">
    <select
      value={sortPrice}
      onChange={(e) => setSortPrice(e.target.value)}
    >
      <option value="none">Sort by Price</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
    <select
      value={sortRating}
      onChange={(e) => setSortRating(e.target.value)}
    >
      <option value="none">Sort by Rating</option>
      <option value="highToLow">Rating: High to Low</option>
    </select>
  </div>
</div>


      <div className="product__subcontainer flex-function">
        {updatedProductWithCount.length > 0 ? (
          updatedProductWithCount.map((item, index) => (
            <Card
              item={item}
              id={index + 1}
              key={Math.random() * products.length + index}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
