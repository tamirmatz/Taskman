import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainImg from '../assets/img/home/main-img.svg'
import { loadReviews, addReview, removeReview } from '../store/actions/reviewActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { Link } from 'react-router-dom';

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
      <div className="home flex column">
        <div className="flex row">
          <div className="flex column">
              
          </div>
          {/* <img src="/src/img/home/main-img.svg"/> */}
          <img className="main-img w-50" src={MainImg}/>
        </div>
       {/* <Link to="/board">Boards</Link> */}
      </div>
    )
  }
}

