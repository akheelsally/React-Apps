import React, { Component } from 'react'

class ToggleBtn extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      active: null,
    }
  }

 updateFilter (filter, func, index) {    
    func(filter);
    this.setState({active: index})
 }

  render () {
    return (
      <div className="todo-item-filter">
        {this.props.labels.map((label, index) => {
          return ( 
            <span 
              key={index} 
              className={this.state.active === index ? 'filter-btn active' : 'filter-btn'}
              onClick={() => this.updateFilter(label, this.props.func, index)}>{label}</span>
          )
        })}      
      </div>
    )
  }
}

export default ToggleBtn
