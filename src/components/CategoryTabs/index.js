import './index.css'

const CategoryTabs = props => {
  const {categories, activeCategoryIndex, onChangeCategory} = props
  /* 
     category → gives access to the category object(categoryName, categoryId) in categories list
     index → tells us which position the category is in the categories array, which we need for UI selection (activeCategoryIndex) 
  */
  return (
    <ul className='category-section'>
      {categories.map((category, index) => {
        const isActive = index === activeCategoryIndex

        return (
          <li
            key={category.categoryId}
            className={`category-tab-item ${isActive ? 'active-tab' : ''}`}
          >
            <button
              type='button'
              className={`category-tab ${isActive ? 'active-tab-text' : ''}`}
              onClick={() => onChangeCategory(index)}
            >
              {category.categoryName}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryTabs
