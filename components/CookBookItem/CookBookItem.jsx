import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import * as Recipes from '~/recipes'

class CookBookItem extends React.Component {
  constructor (props) {
    super(props)

    this.loadItem = this.loadItem.bind(this)
    this.getStateClassName = this.getStateClassName.bind(this)
    this.disableRecipe = this.disableRecipe.bind(this)
  }

  loadItem () {
    if (!this.props.cookBook || !this.props.id) {
      return {}
    }

    let item = this.props.cookBook.find(i => i.id === this.props.id)

    return {
      recipe: Recipes[item.className],
      instance: item
    }
  }

  getStateClassName (isValid) {
    if (this.props.disabled) {
      return 'disabled'
    } else if (!isValid) {
      return 'has-error'
    } else {
      return 'enabled'
    }
  }

  disableRecipe () {
    if (this.props.disableRecipe) {
      this.props.disableRecipe(this.props.id)
    }
  }

  render () {
    let item = this.loadItem()
    let recipe = item.recipe
    let instance = item.instance
    let isValid = recipe && recipe.validate(instance)

    return (
      <div className={ `recipe-item ${this.getStateClassName(isValid)}` }>
        <div className="recipe-title">
          <span className="float-left">
            { recipe.title }
          </span>
          <FontAwesomeIcon
            icon={faBan}
            className="float-right"
            onClick={this.disableRecipe}
          />
        </div>

        { recipe.render(instance, this.props.setRecipeProperty) }
      </div>
    )
  }
}

export default CookBookItem
