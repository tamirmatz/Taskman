import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadReviews, addReview, removeReview } from '../store/actions/reviewActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { Link } from 'react-router-dom'

export class Home extends Component {
  state = {

  }
  componentDidMount() {

  }

  handleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      reviewToEdit: {
        ...prevState.reviewToEdit,
        [name]: value
      }
    }))
  }



  render() {
    return (
      <div className="home">
       Welcome Home!
       <Link to="/boards">Boards</Link>
      </div>
    )
  }
}

