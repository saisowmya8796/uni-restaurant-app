import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishImage, dishName, quantity, dishPrice, dishCurrency} =
        cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onDecrement = () => {
        decrementCartItemQuantity(dishId)
      }

      const onIncrement = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className='cart-item'>
          <img className='cart-product-image' src={dishImage} alt={dishName} />
          <div className='cart-item-details-container'>
            <div className='cart-product-title-brand-container'>
              <p className='cart-product-title'>{dishName}</p>
            </div>
            <div className='cart-quantity-container'>
              <button
                data-testid='minus'
                type='button'
                onClick={onDecrement}
                className='quantity-controller-button'
              >
                -
              </button>
              <p className='cart-quantity' data-testid='item-quantity'>
                {quantity}
              </p>
              <button
                data-testid='plus'
                type='button'
                onClick={onIncrement}
                className='quantity-controller-button'
              >
                +
              </button>
            </div>
            <div className='total-price-remove-container'>
              <p className='cart-total-price'>
                {`${dishCurrency} ${(Number(dishPrice) * quantity).toFixed(2)}`}
              </p>

              <button
                className='remove-button'
                type='button'
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            data-testid='remove'
            className='delete-button'
            type='button'
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color='#616E7C' size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
