import React, { Component } from 'react'
import { Upload } from '../cmps/Upload'
import ProfileImg from '../assets/img/profilePic.jpg'
import { userService } from '../services/userService.js'

export class UserDetails extends Component {
  state = {
    user: null
  }
  async componentDidMount() {
    const user = await userService.getById(this.props.match.params.userId)
    // const user = {
    //   _id: 'a123',
    //   username: 'NadavMgr',
    //   fullame: 'Nadav Magier',
    //   email: 'nadav1410@gmail.com',
    //   imgUrl: 'https://res.cloudinary.com/dorshaul/image/upload/v1617004425/ytav_twnglu.jpg',
    //   createdAt: '2021-03-29T07:54:21.000Z'
    // }
    this.setState({ user })
  }

  render() {
    if(!this.state.user) return <div>loading..</div>
    const { _id, username, fullname, email, imgUrl } = this.state.user
    const url = (imgUrl) ? imgUrl : ProfileImg
    return (
      <section className="user-details-container">
        <div className="user-details flex">
          <img src={url} />
          <div className="txt-user-details flex column fam-1">
            <span className="user-fullname">{fullname}</span>
            <span className="user-username">@{username}</span>
            <span className="user-email">{email}</span>
          </div>
        </div>
        {/* <Upload /> */}

      </section>
    )
  }
}

