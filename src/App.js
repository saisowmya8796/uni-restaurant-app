import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RestaurantMenuPage from './components/RestaurantMenuPage'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: [], restaurantName: ''}

  setRestaurantName = name => {
    this.setState({restaurantName: name})
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const item = prevState.cartList.find(each => each.dishId === dishId)

      if (!item) return prevState

      if (item.quantity === 1) {
        return {
          cartList: prevState.cartList.filter(each => each.dishId !== dishId),
        }
      }

      return {
        cartList: prevState.cartList.map(each =>
          each.dishId === dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        ),
      }
    })
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const cartList = prevState.cartList || []

      const existingItem = cartList.find(item => item.dishId === dish.dishId)

      if (existingItem) {
        // Item already exists → update quantity
        return {
          cartList: cartList.map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity + dish.quantity}
              : item,
          ),
        }
      }
      // Item doesn't exist → add new
      return {cartList: [...cartList, dish]}
    })
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dishId !== dishId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, restaurantName} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            restaurantName,
            setRestaurantName: this.setRestaurantName,
            addCartItem: this.addCartItem,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path='/login' component={LoginForm} />
            <ProtectedRoute exact path='/' component={RestaurantMenuPage} />
            <ProtectedRoute exact path='/cart' component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
