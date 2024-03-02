import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getProductById as listProducts } from "../redux/actions/productActions";
import { getProducts as listAllProducts } from "../redux/actions/productActions";
const SearchBar = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  console.log(products);
  const handleOnSearch = (string, results) => {
    if (products.length === 1) dispatch(listAllProducts());
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    dispatch(listProducts(item._id));
    console.log(item, "sree");
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <div className="App">
        <header className="App-header">
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={products}
              styling={{ backgroundColor: "#f1a6d8", color: "#fff" }}
              key={products._id}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default SearchBar;
