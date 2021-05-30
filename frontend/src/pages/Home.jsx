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
      <div className="home flex column fam-1 marg-4">
        <div className="flex row  space-between">
          <div className="align-center flex column">
              <div className="c-stand ps-2 font-xl"><span className="logo-span">T</span>askman</div>
              <h1 className="fam-1">Task management</h1>
              <h2 className="fam-1">The easiest way.</h2>
          </div>
          {/* <img src="/src/img/home/main-img.svg"/> */}
          <img className="main-img w-50" src={MainImg}/>
        </div>
       {/* <Link to="/board">Boards</Link> */}
      </div>
    )
  }
}

