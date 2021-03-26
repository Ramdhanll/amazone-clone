import axios from "axios";
import {
   CART_ADD_ITEM,
   CART_REMOVE_ITEM,
   CART_EMPTY,
   CART_SAVE_SHIPPING_ADDRESS,
   CART_SAVE_PAYMENT_METHOD,
   CART_ADD_ITEM_FAIL,
} from "./CartTypes";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${productId}`);
   const {
      cart: { cartItems },
   } = getState();
   const {
      userSignin: { userInfo },
   } = getState();
   // VIDEO 52 FORCE-ORDER-ITEMS-FROM-ONE-SELLER
   // if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
   //    console.log({1: data.seller._id, 2: cartItems[0].seller._id})
   //    dispatch({
   //       type: CART_ADD_ITEM_FAIL,
   //       payload: `Can't Add To Cart, Buy only from ${cartItems[0].seller.seller.name} in this order.`
   //    })

   if (cartItems.length >= 0 && data.seller._id === userInfo._id) {
      dispatch({
         type: CART_ADD_ITEM_FAIL,
         payload: `Can't Add To Cart, Buy only from ${userInfo.name} in this order.`,
      });
   } else {
      dispatch({
         type: CART_ADD_ITEM,
         payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            seller: data.seller,
            qty,
         },
      });
      localStorage.setItem(
         "cartItems",
         JSON.stringify(getState().cart.cartItems)
      );
   }
};

export const removeFromCart = async (productId) => async (
   dispatch,
   getState
) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
   });

   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeAllFromCart = () => (dispatch) => {
   dispatch({
      type: CART_EMPTY,
   });
};

export const saveShippingAddress = (data) => (dispatch) => {
   dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
   localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
