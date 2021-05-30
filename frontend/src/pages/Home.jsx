import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainImg from '../assets/img/home/main-img.svg'
import TeamworkImg from '../assets/img/home/teamwork.svg'
import TimeImg from '../assets/img/home/time.svg'
import OrganizeImg from '../assets/img/home/organize.svg'
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
        <div className="features flex row space-between">
          <div className="feature flex column">
            <div className="feature-txt flex column">
            <h3 className="fam-1">All the tools your team needs</h3>
            <span>Organize and assign tasks.</span>
            <span>With lists, teams see immediately what they need to do,</span>
            <span>which tasks are a priority, and when work is due.</span>
            </div>
          <img className="feature-img w-30" src={TeamworkImg}/>
          </div>
          <div className="feature flex column">
            <div className="feature-txt flex column">
            <h3 className="fam-1">Manage your time wisely</h3>
            <span>Instantly see which projects are on track,</span>
            <span>which ones are falling behind,</span>
            <span>and what every team member is working on at a glance.</span>
            </div>
          <img className="feature-img w-25" src={TimeImg}/>
          </div>
          <div className="feature flex column">
            <div className="feature-txt flex column">
            <h3 className="fam-1">Organize anything with anyone, anywhere</h3>
            <span>Choose the project view that suits your style,</span>
            <span> and collaborate no matter where you are.</span>
            </div>
          <img className="feature-img " src={OrganizeImg}/>
          </div>
        </div>
      </div>
    )
  }
}

