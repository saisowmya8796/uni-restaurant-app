import DishCard from '../DishCard'

import './index.css'

const DishList = props => {
  const {dishes} = props

  return (
    <ul className='dishlist-container'>
      {dishes.map(eachDish => (
        <DishCard key={eachDish.dishId} dishDetails={eachDish} />
      ))}
    </ul>
  )
}

export default DishList
