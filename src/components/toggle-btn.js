import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { partialApply } from '../libs/todoHelpers'

class ToggleBtn extends Component {

  state = {
      active: 0,
  }  

 updateFilter = (filter, func, index) => {    
    func(filter);
    this.setState({active: index})
 }

  render () {
    return (
      <div className='todo-item-filter'>
        {this.props.labels.map((label, index) => {
          return ( 
            <span 
              key={index} 
              className={this.state.active === index ? 'filter-btn active' : 'filter-btn'}
              onClick={partialApply(this.updateFilter, label, this.props.func, index)}>
              {label}
            </span>
          )
        })}      
      </div>
    )
  }
}

ToggleBtn.propTypes = {
  func:PropTypes.func.isRequired,
  labels:PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ToggleBtn
