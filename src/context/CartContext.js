import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
})

export default CartContext
