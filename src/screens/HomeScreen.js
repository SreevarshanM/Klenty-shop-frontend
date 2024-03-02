import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Circles } from "react-loader-spinner";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import { setUserDeatils } from "../redux/actions/userAction";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <SearchBar />
      <div className="homescreen__products">
        {loading ? (
          <div className="center">
            <Circles
              height="80"
              width="80"
              color="#6f114f"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
