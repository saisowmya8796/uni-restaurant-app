import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CategoryTabs from '../CategoryTabs'
import DishList from '../DishList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class RestaurantMenuPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    menuData: [],
    activeCategoryIndex: 0,
    restaurantName: '',
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error('API Failed')
      }

      const fetchedData = await response.json()
      const restaurant = fetchedData[0]

      const updatedData = {
        restaurantName: restaurant.restaurant_name,
        categories: restaurant.table_menu_list.map(category => ({
          categoryId: category.menu_category_id,
          categoryName: category.menu_category,
          dishes: category.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            dishImage: dish.dish_image,
            dishCurrency: dish.dish_currency,
            dishCalories: dish.dish_calories,
            dishDescription: dish.dish_description,
            dishAvailability: dish.dish_Availability,
            isVeg: dish.dish_Type === 1,
            hasCustomizations: dish.addonCat.length > 0,
          })),
        })),
      }

      this.setState({
        restaurantName: updatedData.restaurantName,
        menuData: updatedData.categories,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCategory = index => {
    this.setState({activeCategoryIndex: index})
  }

  renderSuccessView = () => {
    const {menuData, activeCategoryIndex, restaurantName} = this.state
    const activeCategory = menuData[activeCategoryIndex]

    return (
      <>
        <Header restaurantName={restaurantName} />

        <CategoryTabs
          categories={menuData}
          activeCategoryIndex={activeCategoryIndex}
          onChangeCategory={this.onChangeCategory}
        />

        <DishList dishes={activeCategory.dishes} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <p className="failure-text">Something went wrong</p>
      <button type="button" className="retry-button" onClick={this.getMenuData}>
        Retry
      </button>
    </div>
  )

  renderRestaurantMenuPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-menu-page">
        {this.renderRestaurantMenuPage()}
      </div>
    )
  }
}

export default RestaurantMenuPage
