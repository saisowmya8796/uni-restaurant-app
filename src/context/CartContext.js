import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  restaurantName: '',
  setRestaurantName: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
