import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, restaurantName} = value
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header restaurantName={restaurantName} />
          <div className='cart-container'>
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className='cart-content-container'>
                <div className='heading-remove-all-container'>
                  <h1 className='cart-heading'>My Cart</h1>
                  <button
                    className='remove-all-btn'
                    type='button'
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
