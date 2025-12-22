import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import RestaurantMenuPage from './components/RestaurantMenuPage'
import CartContext from './context/CartContext'

import './App.css'

/* write your code here */
class App extends Component {
  state = {cartList: []}

  /* decrement needs ONLY the id */
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const item = prevState.cartList.find(each => each.id === id)

      /* return undefined , so state update will not happen. React ignores state update */
      if (!item) {
        return prevState
      }

      /* when quantity is 1, by further decrementing, then that item get removed by filter method */
      if (item.quantity === 1) {
        return {
          cartList: prevState.cartList.filter(each => each.id !== id),
        }
      }

      return {
        cartList: prevState.cartList.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }
    })
  }

  /* increment must receive the entire dish object */
  incrementCartItemQuantity = dish => {
    this.setState(prevState => {
      const existing = prevState.cartList.find(item => item.id === dish.id)

      if (existing) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === dish.id ? {...item, quantity: item.quantity + 1} : item,
          ),
        }
      }

      /* add new item */
      return {
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/" component={RestaurantMenuPage} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
