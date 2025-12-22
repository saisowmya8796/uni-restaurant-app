import {useContext} from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName} = props
  const {cartList} = useContext(CartContext)

  const cartItemsCount = cartList.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <h1 className="nav-heading">{restaurantName}</h1>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <p className="my-orders-text">My Orders</p>
          </li>
          <li className="nav-menu-item">
            <AiOutlineShoppingCart size={26} color="#3d3a3a" />
            <span className="cart-count-badge">{cartItemsCount}</span>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
