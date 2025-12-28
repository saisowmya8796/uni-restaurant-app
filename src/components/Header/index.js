import {useContext} from 'react'
import {useHistory} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const history = useHistory()
  const {cartList, restaurantName} = useContext(CartContext)

  const cartItemsCount = cartList.length

  const onClickHome = () => history.push('/')
  const onClickCart = () => history.push('/cart')
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className='nav-header'>
      <div className='nav-content'>
        <button type='button' className='nav-heading' onClick={onClickHome}>
          {restaurantName}
        </button>

        <ul className='nav-menu'>
          <li className='nav-menu-item'>
            <p className='my-orders-text'>My Orders</p>
          </li>

          <li className='nav-menu-item'>
            <button
              type='button'
              className='cart-button'
              data-testid='cart'
              onClick={onClickCart}
            >
              <AiOutlineShoppingCart size={26} color='#3d3a3a' />
              <span className='cart-count-badge'>{cartItemsCount}</span>
            </button>
          </li>

          <li className='nav-menu-item'>
            <button
              type='button'
              className='logout-button'
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
