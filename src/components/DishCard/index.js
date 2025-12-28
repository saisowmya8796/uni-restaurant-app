import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const DishCard = props => {
  const {dishDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    isVeg,
    hasCustomizations,
  } = dishDetails

  const {addCartItem} = useContext(CartContext)

  const [quantity, setQuantity] = useState(0)

  const onIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const onAddToCart = () => {
    addCartItem({
      dishId,
      dishName,
      dishPrice,
      dishImage,
      dishCurrency,
      quantity,
    })
  }

  return (
    <li className='dish-card'>
      <div className='dish-left'>
        <div
          className={`border-box ${isVeg ? 'veg-border' : 'non-veg-border'}`}
        >
          <div className={`veg-indicator ${isVeg ? 'veg' : 'non-veg'}`} />
        </div>

        <div className='dish-content'>
          <h1 className='dish-name'>{dishName}</h1>
          <p className='dish-price'>{`${dishCurrency} ${dishPrice}`}</p>
          <p className='dish-description'>{dishDescription}</p>

          <div className='quantity-buttons-and-dish-availability'>
            {dishAvailability ? (
              <div className='add-to-cart-control'>
                <div className='quantity-controls'>
                  <button
                    className='button-icon'
                    type='button'
                    onClick={onDecrement}
                    disabled={quantity === 0}
                  >
                    -
                  </button>
                  <p className='quantity-text'>{quantity}</p>
                  <button
                    className='button-icon'
                    type='button'
                    onClick={onIncrement}
                  >
                    +
                  </button>
                </div>

                {quantity > 0 && (
                  <button
                    type='button'
                    className='add-to-cart-btn'
                    onClick={onAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            ) : (
              <p className='not-available-text'>Not available</p>
            )}
          </div>

          {hasCustomizations && (
            <p className='customizations-availability-text'>
              Customizations available
            </p>
          )}
        </div>
      </div>

      <div className='dish-right'>
        <p className='dish-calories'>{dishCalories} calories</p>
        <img className='dish-image' src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishCard
