import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _AppHeader extends Component {
    render() {
        // const { loggedInUser } = this.props;
        return <header className="app-header flex space-between center fam-1  font-s c-white">
            <div className="logo font-5 fam-3 ps-2"><Link to={`/`}>Taskman</Link></div>
            <nav className="main-nav w-20 flex space-evenly c-danger">
                    <NavLink to="/board">Boards</NavLink> 
                    <NavLink to="/login">Login</NavLink> 
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)