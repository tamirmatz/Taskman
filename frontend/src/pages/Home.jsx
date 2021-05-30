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
      <div className="home-page flex column fam-1 ">
        <div className="flex row marg-4 space-between">
          <div className="align-center flex column">
              <div className="c-stand ps-2 font-xl"><span className="logo-span">T</span>askman</div>
              <h1 className="fam-1">Task management</h1>
              <h2 className="fam-1">The <span className="main-color">easiest</span> way. </h2>
              <Link to="/board/606056b5f2a2af09afd9f2fb"><button class="btn-hover color-3">Try it now!</button></Link>
          </div>
          <img className="main-img w-50" src={MainImg}/>
        </div>
       {/*  */}
      </div>
    )
  }
}

