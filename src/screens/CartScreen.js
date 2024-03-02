import "./CartScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
// Components
import CartItem from "../components/CartItem";
import { useAlert } from "react-alert";
// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import useLogin from "../utils/hooks/useLogin";

const CartScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const cart = useSelector((state) => state.cart);

  const { loginInfo } = useLogin();

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleProceedBtn = () => {
    alert.success("Sucessfully checked out");
  };

  if (loginInfo.loading)
    return (
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
    );
  else if (!loginInfo.loading && loginInfo.isLogin)
    return (
      <>
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>Shopping Cart</h2>

            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/">Go Back</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={() => removeFromCartHandler(item)}
                />
              ))
            )}
          </div>

          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <p>Subtotal ({getCartCount()}) items</p>
              <p>${getCartSubTotal()}</p>
            </div>
            <div>
              <button
                title="Functionality need to be add."
                onClick={handleProceedBtn}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default CartScreen;
