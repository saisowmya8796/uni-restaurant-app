import {useContext} from 'react'
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

  const {cartList, decrementCartItemQuantity, incrementCartItemQuantity} =
    useContext(CartContext)

  /* finding whether the dish present in cart or not */
  const cartItem = cartList.find(item => item.id === dishId)

  /* Whatever quantity a particular item has in the cart, we “project” that value back onto the DishCard UI. */
  const quantity = cartItem ? cartItem.quantity : 0

  const onIncrement = () => {
    incrementCartItemQuantity({
      id: dishId,
      name: dishName,
      price: dishPrice,
      image: dishImage,
      currency: dishCurrency,
    })
  }

  const onDecrement = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="dish-card">
      <div className="dish-left">
        <div
          className={`border-box ${isVeg ? 'veg-border' : 'non-veg-border'}`}
        >
          <div className={`veg-indicator ${isVeg ? 'veg' : 'non-veg'}`} />
        </div>

        <div className="dish-content">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">{`${dishCurrency} ${dishPrice}`}</p>
          <p className="dish-description">{dishDescription}</p>

          <div className="quantity-buttons-and-dish-availability">
            {dishAvailability ? (
              <div className="quantity-controls">
                <button
                  className="button-icon"
                  type="button"
                  onClick={onDecrement}
                  disabled={quantity === 0}
                >
                  -
                </button>
                <p className="quantity-text">{quantity}</p>
                <button
                  className="button-icon"
                  type="button"
                  onClick={onIncrement}
                >
                  +
                </button>
              </div>
            ) : (
              <p className="not-available-text">Not available</p>
            )}
          </div>

          {hasCustomizations && (
            <p className="customizations-availability-text">
              Customizations available
            </p>
          )}
        </div>
      </div>

      <div className="dish-right">
        <p className="dish-calories">{dishCalories} calories</p>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishCard
